import { Router } from "express";
import { skillController } from "../controllers/skill.controller";
import { asyncHandler } from "../middlewares/asyncHandler";
import { requireAdmin } from "../middlewares/requireAdmin";
import { validate } from "../middlewares/validate";
import { idParamSchema } from "../validators/common.schemas";
import {
  createSkillSchema,
  updateSkillSchema,
} from "../validators/skill.schemas";

export const skillsRouter = Router();

skillsRouter.get("/", asyncHandler(skillController.list));
skillsRouter.post(
  "/",
  validate(createSkillSchema),
  asyncHandler(skillController.create),
);
skillsRouter.put(
  "/:id",
  requireAdmin,
  validate(updateSkillSchema),
  asyncHandler(skillController.update),
);
skillsRouter.delete(
  "/:id",
  requireAdmin,
  validate(idParamSchema),
  asyncHandler(skillController.remove),
);
