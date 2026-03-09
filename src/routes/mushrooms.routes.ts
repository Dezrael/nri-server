import { Router } from "express";
import { mushroomController } from "../controllers/mushroom.controller";
import { asyncHandler } from "../middlewares/asyncHandler";
import { validate } from "../middlewares/validate";
import {
  classFilterQuerySchema,
  idParamSchema,
} from "../validators/common.schemas";
import {
  createMushroomSchema,
  updateMushroomSchema,
} from "../validators/mushroom.schemas";

export const mushroomsRouter = Router();

mushroomsRouter.get(
  "/",
  validate(classFilterQuerySchema),
  asyncHandler(mushroomController.list),
);
mushroomsRouter.post(
  "/",
  validate(createMushroomSchema),
  asyncHandler(mushroomController.create),
);
mushroomsRouter.put(
  "/:id",
  validate(updateMushroomSchema),
  asyncHandler(mushroomController.update),
);
mushroomsRouter.delete(
  "/:id",
  validate(idParamSchema),
  asyncHandler(mushroomController.remove),
);
