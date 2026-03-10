import { z } from "zod";
import {
  classNameSchema,
  entityNameSchema,
  textBlockSchema,
} from "./common.schemas";

const classSkillInputSchema = z.object({
  className: classNameSchema.optional(),
  name: entityNameSchema,
  actionType: z.string().trim().min(1).max(120).optional().default("-"),
  range: z.string().trim().min(1).max(120).optional().default("-"),
  stat: z.string().trim().min(1).max(120).optional().default("-"),
  duration: z.string().trim().min(1).max(240).optional().default("-"),
  damage: z.string().trim().min(1).max(120).optional().default("-"),
  inCombatCooldown: z.string().trim().min(1).max(120).optional().default("-"),
  outCombatCooldown: z.string().trim().min(1).max(120).optional().default("-"),
  outCombatCharges: z.string().trim().min(1).max(120).optional().default("-"),
  shortDescription: z.string().trim().min(1).max(300),
  description: textBlockSchema,
  concentration: z.coerce.boolean().default(false),
  isChosen: z.coerce.boolean().default(false),
});

const classPassiveInputSchema = z.object({
  className: classNameSchema.optional(),
  name: entityNameSchema,
  text: textBlockSchema,
});

const classMushroomInputSchema = z.object({
  className: classNameSchema.optional(),
  name: entityNameSchema,
  baseEffect: textBlockSchema,
  activationEffect: z.string().trim().max(4000).optional().default(""),
  summonEffect: z.string().trim().max(4000).optional().default(""),
  aspectEffect: z.string().trim().max(4000).optional().default(""),
});

export const createClassSchema = z.object({
  body: z.object({
    className: classNameSchema,
    skills: z.array(classSkillInputSchema).optional().default([]),
    passives: z.array(classPassiveInputSchema).optional().default([]),
    mushrooms: z.array(classMushroomInputSchema).optional().default([]),
  }),
  params: z.object({}).passthrough().optional().default({}),
  query: z.object({}).passthrough().optional().default({}),
});
