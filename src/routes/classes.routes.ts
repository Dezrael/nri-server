import { Router } from "express";
import { classController } from "../controllers/class.controller";
import { asyncHandler } from "../middlewares/asyncHandler";
import { validate } from "../middlewares/validate";
import { classParamSchema } from "../validators/common.schemas";

export const classesRouter = Router();

classesRouter.get("/", asyncHandler(classController.list));
classesRouter.get(
  "/:className/skills",
  validate(classParamSchema),
  asyncHandler(classController.listSkills),
);
classesRouter.get(
  "/:className/passives",
  validate(classParamSchema),
  asyncHandler(classController.listPassives),
);
classesRouter.get(
  "/:className/mushrooms",
  validate(classParamSchema),
  asyncHandler(classController.listMushrooms),
);
