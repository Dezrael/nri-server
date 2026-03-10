import { z } from "zod";

export const adminLoginSchema = z.object({
  body: z.object({
    password: z.string().min(1),
  }),
  params: z.object({}).passthrough().optional().default({}),
  query: z.object({}).passthrough().optional().default({}),
});
