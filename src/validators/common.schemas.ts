import { z } from "zod";

// Treats blank strings as undefined so optional fields with defaults work correctly
// when clients submit empty form fields as ""
export const emptyToUndefined = (schema: z.ZodString) =>
  z.preprocess((v) => {
    if (v === null) {
      return undefined;
    }
    if (typeof v === "string" && v.trim() === "") {
      return undefined;
    }
    return v;
  }, schema.optional());

export const classNameSchema = z.string().trim().min(1).max(80);
export const entityNameSchema = z.string().trim().min(1).max(120);
export const descriptionSchema = z.string().trim().max(2000).optional();
export const textBlockSchema = z.string().trim().min(1).max(4000);

export const idParamSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
  body: z.object({}).passthrough().optional().default({}),
  query: z.object({}).passthrough().optional().default({}),
});

export const classFilterQuerySchema = z.object({
  query: z.object({
    className: classNameSchema.optional(),
  }),
  body: z.object({}).passthrough().optional().default({}),
  params: z.object({}).passthrough().optional().default({}),
});

export const classParamSchema = z.object({
  params: z.object({
    className: classNameSchema,
  }),
  body: z.object({}).passthrough().optional().default({}),
  query: z.object({}).passthrough().optional().default({}),
});
