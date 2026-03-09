import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const validate =
  (schema: z.ZodTypeAny) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    try {
      const parsed = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      }) as { body: unknown; query: unknown; params: unknown };

      req.body = parsed.body as Request["body"];

      // In Express 5, req.query can be getter-only. Mutate in place instead.
      if (parsed.query && typeof parsed.query === "object") {
        Object.assign(req.query as Record<string, unknown>, parsed.query);
      }

      if (parsed.params && typeof parsed.params === "object") {
        Object.assign(req.params as Record<string, unknown>, parsed.params);
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export const zod = z;
