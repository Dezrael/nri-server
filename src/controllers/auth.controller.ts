import { Request, Response } from "express";
import { AppError } from "../types/api";
import { createAdminToken, verifyAdminPassword } from "../utils/adminToken";

export const authController = {
  async login(req: Request, res: Response) {
    const { password } = req.body as { password: string };

    if (!verifyAdminPassword(password)) {
      throw new AppError("Invalid credentials", 401);
    }

    const data = { token: createAdminToken() };
    res.json({ data });
  },
};
