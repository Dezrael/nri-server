import { z } from "zod";
import {
  classNameSchema,
  emptyToUndefined,
  entityNameSchema,
  textBlockSchema,
} from "./common.schemas";

const createSkillBodySchema = z.object({
  className: classNameSchema,
  name: entityNameSchema,
  actionType: emptyToUndefined(z.string().trim().min(1).max(120)).default("-"),
  range: emptyToUndefined(z.string().trim().min(1).max(120)).default("-"),
  stat: emptyToUndefined(z.string().trim().min(1).max(120)).default("-"),
  duration: emptyToUndefined(z.string().trim().min(1).max(240)).default("-"),
  damage: emptyToUndefined(z.string().trim().min(1).max(120)).default("-"),
  inCombatCooldown: emptyToUndefined(z.string().trim().min(1).max(120)).default(
    "0",
  ),
  outCombatCooldown: emptyToUndefined(
    z.string().trim().min(1).max(120),
  ).default("-"),
  outCombatCharges: emptyToUndefined(z.string().trim().min(1).max(120)).default(
    "infinite",
  ),
  category: emptyToUndefined(z.string().trim().min(1).max(120)).default(
    "Основные",
  ),
  shortDescription: z.string().trim().min(1).max(300),
  description: textBlockSchema,
  concentration: z.coerce.boolean().default(false),
  isChosen: z.coerce.boolean().default(false),
});

const updateSkillBodySchema = z.object({
  className: classNameSchema.optional(),
  name: entityNameSchema.optional(),
  actionType: emptyToUndefined(z.string().trim().min(1).max(120)),
  range: emptyToUndefined(z.string().trim().min(1).max(120)),
  stat: emptyToUndefined(z.string().trim().min(1).max(120)),
  duration: emptyToUndefined(z.string().trim().min(1).max(240)),
  damage: emptyToUndefined(z.string().trim().min(1).max(120)),
  inCombatCooldown: emptyToUndefined(z.string().trim().min(1).max(120)),
  outCombatCooldown: emptyToUndefined(z.string().trim().min(1).max(120)),
  outCombatCharges: emptyToUndefined(z.string().trim().min(1).max(120)),
  category: emptyToUndefined(z.string().trim().min(1).max(120)),
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
