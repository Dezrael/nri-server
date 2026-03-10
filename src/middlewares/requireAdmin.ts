import { NextFunction, Request, Response } from "express";
import { AppError } from "../types/api";
import { verifyAdminToken } from "../utils/adminToken";

export const requireAdmin = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    next(new AppError("Unauthorized", 401));
    return;
  }

  const [scheme, token] = authHeader.split(" ");
  if (scheme !== "Bearer" || !token) {
    next(new AppError("Unauthorized", 401));
    return;
  }

  if (!verifyAdminToken(token)) {
    next(new AppError("Unauthorized", 401));
    return;
  }

  next();
};
