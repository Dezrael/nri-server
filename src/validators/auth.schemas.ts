import { z } from "zod";

export const adminLoginSchema = z.object({
  body: z.object({
    password: z.string().min(1),
  }),
  params: z.object({}).passthrough().optional().default({}),
  query: z.object({}).passthrough().optional().default({}),
});

const importedSkillSchema = z.object({
  id: z.number().optional(),
  className: z.string(),
  name: z.string(),
  actionType: z.string(),
  range: z.string(),
  stat: z.string(),
  duration: z.string(),
  damage: z.string(),
  inCombatCooldown: z.string(),
  outCombatCooldown: z.string(),
  outCombatCharges: z.string(),
  shortDescription: z.string(),
  description: z.string(),
  concentration: z.boolean(),
  isChosen: z.boolean(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

const importedPassiveSchema = z.object({
  id: z.number().optional(),
  className: z.string(),
  name: z.string(),
  text: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

const importedMushroomSchema = z.object({
  id: z.number().optional(),
  className: z.string(),
  name: z.string(),
  baseEffect: z.string(),
  activationEffect: z.string(),
  summonEffect: z.string(),
  aspectEffect: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

const importedClassDataSchema = z.object({
  skills: z.array(importedSkillSchema),
  passives: z.array(importedPassiveSchema),
  mushrooms: z.array(importedMushroomSchema),
});

export const adminBulkImportSchema = z.object({
  body: z.object({
    exportedAt: z.string(),
    source: z.string(),
    data: z.record(z.string(), importedClassDataSchema),
  }),
  params: z.object({}).passthrough().optional().default({}),
  query: z.object({}).passthrough().optional().default({}),
});
