import { z } from "zod";

export const classNameSchema = z.string().trim().min(1).max(80);
export const entityNameSchema = z.string().trim().min(1).max(120);
export const descriptionSchema = z.string().trim().max(2000).optional();

export const idParamSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
  body: z.object({}).passthrough(),
  query: z.object({}).passthrough(),
});

export const classFilterQuerySchema = z.object({
  query: z.object({
    className: classNameSchema.optional(),
  }),
  body: z.object({}).passthrough(),
  params: z.object({}).passthrough(),
});
