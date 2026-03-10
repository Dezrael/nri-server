import { Router } from "express";
import { mushroomController } from "../controllers/mushroom.controller";
import { asyncHandler } from "../middlewares/asyncHandler";
import { requireAdmin } from "../middlewares/requireAdmin";
import { validate } from "../middlewares/validate";
import { idParamSchema } from "../validators/common.schemas";
import {
  createMushroomSchema,
  updateMushroomSchema,
} from "../validators/mushroom.schemas";

export const mushroomsRouter = Router();

mushroomsRouter.get("/", asyncHandler(mushroomController.list));
mushroomsRouter.post(
  "/",
  validate(createMushroomSchema),
  asyncHandler(mushroomController.create),
);
mushroomsRouter.put(
  "/:id",
  requireAdmin,
  validate(updateMushroomSchema),
  asyncHandler(mushroomController.update),
);
mushroomsRouter.delete(
  "/:id",
  requireAdmin,
  validate(idParamSchema),
  asyncHandler(mushroomController.remove),
);
