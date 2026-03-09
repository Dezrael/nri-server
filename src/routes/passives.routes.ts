import { Router } from "express";
import { passiveController } from "../controllers/passive.controller";
import { asyncHandler } from "../middlewares/asyncHandler";
import { validate } from "../middlewares/validate";
import {
  classFilterQuerySchema,
  idParamSchema,
} from "../validators/common.schemas";
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
  validate(updatePassiveSchema),
  asyncHandler(passiveController.update),
);
passivesRouter.delete(
  "/:id",
  validate(idParamSchema),
  asyncHandler(passiveController.remove),
);
