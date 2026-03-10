import { Router } from "express";
import { passiveController } from "../controllers/passive.controller";
import { asyncHandler } from "../middlewares/asyncHandler";
import { requireAdmin } from "../middlewares/requireAdmin";
import { validate } from "../middlewares/validate";
import { idParamSchema } from "../validators/common.schemas";
import {
  createPassiveSchema,
  updatePassiveSchema,
} from "../validators/passive.schemas";

export const passivesRouter = Router();

passivesRouter.get("/", asyncHandler(passiveController.list));
passivesRouter.post(
  "/",
  validate(createPassiveSchema),
  asyncHandler(passiveController.create),
);
passivesRouter.put(
  "/:id",
  requireAdmin,
  validate(updatePassiveSchema),
  asyncHandler(passiveController.update),
);
passivesRouter.delete(
  "/:id",
  requireAdmin,
  validate(idParamSchema),
  asyncHandler(passiveController.remove),
);
