import { z } from "zod";
import {
  classNameSchema,
  descriptionSchema,
  entityNameSchema,
} from "./common.schemas";

const mushroomBodyBase = z.object({
  className: classNameSchema,
  name: entityNameSchema,
  description: descriptionSchema,
});

export const createMushroomSchema = z.object({
  body: mushroomBodyBase,
  params: z.object({}).passthrough(),
  query: z.object({}).passthrough(),
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
  query: z.object({}).passthrough(),
});
