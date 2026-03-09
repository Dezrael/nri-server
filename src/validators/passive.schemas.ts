import { z } from "zod";
import {
  classNameSchema,
  entityNameSchema,
  textBlockSchema,
} from "./common.schemas";

const passiveBodyBase = z.object({
  className: classNameSchema,
  name: entityNameSchema,
  text: textBlockSchema,
});

export const createPassiveSchema = z.object({
  body: passiveBodyBase,
  params: z.object({}).passthrough().optional().default({}),
  query: z.object({}).passthrough().optional().default({}),
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
  query: z.object({}).passthrough().optional().default({}),
});
