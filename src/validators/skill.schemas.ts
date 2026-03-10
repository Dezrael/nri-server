import { z } from "zod";
import {
  classNameSchema,
  entityNameSchema,
  textBlockSchema,
} from "./common.schemas";

const createSkillBodySchema = z.object({
  className: classNameSchema,
  name: entityNameSchema,
  actionType: z.string().trim().min(1).max(120).optional().default("-"),
  range: z.string().trim().min(1).max(120).optional().default("-"),
  stat: z.string().trim().min(1).max(120).optional().default("-"),
  duration: z.string().trim().min(1).max(240).optional().default("-"),
  damage: z.string().trim().min(1).max(120).optional().default("-"),
  inCombatCooldown: z.string().trim().min(1).max(120).optional().default("0"),
  outCombatCooldown: z.string().trim().min(1).max(120).optional().default("-"),
  outCombatCharges: z
    .string()
    .trim()
    .min(1)
    .max(120)
    .optional()
    .default("infinite"),
  shortDescription: z.string().trim().min(1).max(300),
  description: textBlockSchema,
  concentration: z.coerce.boolean().default(false),
  isChosen: z.coerce.boolean().default(false),
});

const updateSkillBodySchema = z.object({
  className: classNameSchema.optional(),
  name: entityNameSchema.optional(),
  actionType: z.string().trim().min(1).max(120).optional(),
  range: z.string().trim().min(1).max(120).optional(),
  stat: z.string().trim().min(1).max(120).optional(),
  duration: z.string().trim().min(1).max(240).optional(),
  damage: z.string().trim().min(1).max(120).optional(),
  inCombatCooldown: z.string().trim().min(1).max(120).optional(),
  outCombatCooldown: z.string().trim().min(1).max(120).optional(),
  outCombatCharges: z.string().trim().min(1).max(120).optional(),
  shortDescription: z.string().trim().min(1).max(300).optional(),
  description: textBlockSchema.optional(),
  concentration: z.coerce.boolean().optional(),
  isChosen: z.coerce.boolean().optional(),
});

export const createSkillSchema = z.object({
  body: createSkillBodySchema,
  params: z.object({}).passthrough().optional().default({}),
  query: z.object({}).passthrough().optional().default({}),
});

export const updateSkillSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
  body: updateSkillBodySchema.refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  }),
  query: z.object({}).passthrough().optional().default({}),
});
