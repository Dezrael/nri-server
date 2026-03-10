import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { asyncHandler } from "../middlewares/asyncHandler";
import { validate } from "../middlewares/validate";
import { adminLoginSchema } from "../validators/auth.schemas";

export const authRouter = Router();

authRouter.post(
  "/login",
  validate(adminLoginSchema),
  asyncHandler(authController.login),
);
