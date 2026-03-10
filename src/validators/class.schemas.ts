import { z } from "zod";
import {
  classNameSchema,
  emptyToUndefined,
  entityNameSchema,
  textBlockSchema,
} from "./common.schemas";

const classSkillInputSchema = z.object({
  className: classNameSchema.optional(),
  name: entityNameSchema,
  actionType: emptyToUndefined(z.string().trim().min(1).max(120)).default("-"),
  range: emptyToUndefined(z.string().trim().min(1).max(120)).default("-"),
  stat: emptyToUndefined(z.string().trim().min(1).max(120)).default("-"),
  durationInCombat: emptyToUndefined(z.string().trim().min(1).max(240)).default(
    "-",
  ),
  durationOutOfCombat: emptyToUndefined(
    z.string().trim().min(1).max(240),
  ).default("-"),
  damage: emptyToUndefined(z.string().trim().min(1).max(120)).default("-"),
  inCombatCooldown: emptyToUndefined(z.string().trim().min(1).max(120)).default(
    "-",
  ),
  outCombatCooldown: emptyToUndefined(
    z.string().trim().min(1).max(120),
  ).default("-"),
  outCombatCharges: emptyToUndefined(z.string().trim().min(1).max(120)).default(
    "-",
  ),
  category: emptyToUndefined(z.string().trim().min(1).max(120)).default(
    "Основные",
  ),
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
