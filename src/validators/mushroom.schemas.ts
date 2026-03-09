import { z } from "zod";
import {
  classNameSchema,
  entityNameSchema,
  textBlockSchema,
} from "./common.schemas";

const mushroomBodyBase = z.object({
  className: classNameSchema,
  name: entityNameSchema,
  baseEffect: textBlockSchema,
  activationEffect: textBlockSchema,
  summonEffect: textBlockSchema,
  aspectEffect: textBlockSchema,
});

export const createMushroomSchema = z.object({
  body: mushroomBodyBase,
  params: z.object({}).passthrough().optional().default({}),
  query: z.object({}).passthrough().optional().default({}),
});

export const updateMushroomSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
  body: mushroomBodyBase
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field is required",
    }),
  query: z.object({}).passthrough().optional().default({}),
});
