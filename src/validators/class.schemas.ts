import { z } from "zod";
import {
  classNameSchema,
  entityNameSchema,
  textBlockSchema,
} from "./common.schemas";

const classSkillInputSchema = z.object({
  className: classNameSchema.optional(),
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

const classPassiveInputSchema = z.object({
  className: classNameSchema.optional(),
  name: entityNameSchema,
  text: textBlockSchema,
});

const classMushroomInputSchema = z.object({
  className: classNameSchema.optional(),
  name: entityNameSchema,
  baseEffect: textBlockSchema,
  activationEffect: textBlockSchema,
  summonEffect: textBlockSchema,
  aspectEffect: textBlockSchema,
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
