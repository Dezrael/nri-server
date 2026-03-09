import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const validate =
  (schema: z.ZodTypeAny) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const parsed = schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    }) as { body: unknown; query: unknown; params: unknown };

    req.body = parsed.body as Request["body"];
    req.query = parsed.query as Request["query"];
    req.params = parsed.params as Request["params"];
    next();
  };

export const zod = z;
