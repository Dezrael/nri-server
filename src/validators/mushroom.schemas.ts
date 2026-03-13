import { z } from "zod";
import {
  classNameSchema,
  entityNameSchema,
  textBlockSchema,
} from "./common.schemas";

const createMushroomBodySchema = z.object({
  className: classNameSchema,
  name: entityNameSchema,
  baseEffect: textBlockSchema,
  activationEffect: z.string().trim().max(4000).optional().default(""),
  summonEffect: z.string().trim().max(4000).optional().default(""),
  aspectEffect: z.string().trim().max(4000).optional().default(""),
  isChosen: z.coerce.boolean().default(false),
});

const updateMushroomBodySchema = z.object({
  className: classNameSchema.optional(),
  name: entityNameSchema.optional(),
  baseEffect: textBlockSchema.optional(),
  activationEffect: z.string().trim().max(4000).optional(),
  summonEffect: z.string().trim().max(4000).optional(),
  aspectEffect: z.string().trim().max(4000).optional(),
  isChosen: z.coerce.boolean().optional(),
});

export const createMushroomSchema = z.object({
  body: createMushroomBodySchema,
  params: z.object({}).passthrough().optional().default({}),
  query: z.object({}).passthrough().optional().default({}),
});

export const updateMushroomSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
  body: updateMushroomBodySchema.refine(
    (data) => Object.keys(data).length > 0,
    {
      message: "At least one field is required",
    },
  ),
  query: z.object({}).passthrough().optional().default({}),
});
