import crypto from "crypto";
import { AppError } from "../types/api";

type AdminTokenPayload = {
  role: "admin";
  exp: number;
};

function getAdminPassword(): string {
  const value = process.env.ADMIN_PASSWORD;
  if (!value) {
    throw new AppError("ADMIN_PASSWORD is not configured", 500);
  }
  return value;
}

function getTokenSecret(): string {
  return process.env.ADMIN_TOKEN_SECRET || getAdminPassword();
}

function timingSafeEqual(a: string, b: string): boolean {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  if (aBuffer.length !== bBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(aBuffer, bBuffer);
}

function signPayload(payload: string): string {
  return crypto
    .createHmac("sha256", getTokenSecret())
    .update(payload)
    .digest("base64url");
}

function parseTtlSeconds(): number {
  const raw = process.env.ADMIN_TOKEN_TTL_SECONDS;
  if (!raw) {
    return 60 * 60 * 8;
  }

  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return 60 * 60 * 8;
  }

  return Math.floor(parsed);
}

export function verifyAdminPassword(password: string): boolean {
  const expected = getAdminPassword();
  return timingSafeEqual(password, expected);
}

export function createAdminToken(): string {
  const payloadObject: AdminTokenPayload = {
    role: "admin",
    exp: Date.now() + parseTtlSeconds() * 1000,
  };

  const payload = Buffer.from(JSON.stringify(payloadObject)).toString(
    "base64url",
  );
  const signature = signPayload(payload);

  return `${payload}.${signature}`;
}

export function verifyAdminToken(token: string): boolean {
  const [payload, signature] = token.split(".");

  if (!payload || !signature) {
    return false;
  }

  const expectedSignature = signPayload(payload);
  if (!timingSafeEqual(signature, expectedSignature)) {
    return false;
  }

  let parsed: AdminTokenPayload;
  try {
    const json = Buffer.from(payload, "base64url").toString("utf8");
    parsed = JSON.parse(json) as AdminTokenPayload;
  } catch {
    return false;
  }

  if (parsed.role !== "admin") {
    return false;
  }

  return Date.now() < parsed.exp;
}
