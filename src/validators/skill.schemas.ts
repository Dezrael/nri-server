import { z } from "zod";
import {
  classNameSchema,
  entityNameSchema,
  textBlockSchema,
} from "./common.schemas";

const skillBodyBase = z.object({
  className: classNameSchema,
  name: entityNameSchema,
  actionType: z.string().trim().min(1).max(120),
  range: z.string().trim().min(1).max(120),
  stat: z.string().trim().min(1).max(120),
  duration: z.string().trim().min(1).max(240),
  damage: z.string().trim().min(1).max(120),
  inCombatCooldown: z.string().trim().min(1).max(120),
  outCombatCooldown: z.string().trim().min(1).max(120),
  outCombatCharges: z.string().trim().min(1).max(120),
  shortDescription: z.string().trim().min(1).max(300),
  description: textBlockSchema,
  concentration: z.coerce.boolean().default(false),
  isChosen: z.coerce.boolean().default(false),
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
