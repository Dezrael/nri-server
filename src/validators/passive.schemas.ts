import { z } from "zod";
import {
  classNameSchema,
  descriptionSchema,
  entityNameSchema,
} from "./common.schemas";

const passiveBodyBase = z.object({
  className: classNameSchema,
  name: entityNameSchema,
  description: descriptionSchema,
});

export const createPassiveSchema = z.object({
  body: passiveBodyBase,
  params: z.object({}).passthrough(),
  query: z.object({}).passthrough(),
});

export const updatePassiveSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
  body: passiveBodyBase
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field is required",
    }),
  query: z.object({}).passthrough(),
});
