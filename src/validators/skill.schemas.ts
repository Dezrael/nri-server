import { z } from "zod";
import {
  classNameSchema,
  descriptionSchema,
  entityNameSchema,
} from "./common.schemas";

const skillBodyBase = z.object({
  className: classNameSchema,
  name: entityNameSchema,
  description: descriptionSchema,
  inCombatCooldownTurns: z.coerce.number().int().min(0).default(0),
  outCombatCooldownMinutes: z.coerce.number().int().min(0).default(0),
});

export const createSkillSchema = z.object({
  body: skillBodyBase,
  params: z.object({}).passthrough().optional().default({}),
  query: z.object({}).passthrough().optional().default({}),
});

export const updateSkillSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
  body: skillBodyBase.partial().refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  }),
  query: z.object({}).passthrough().optional().default({}),
});
