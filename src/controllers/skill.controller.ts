import { Request, Response } from "express";
import { skillService } from "../services/skill.service";

export const skillController = {
  async list(req: Request, res: Response) {
    const className = req.query.className as string | undefined;
    const data = await skillService.list(className);
    res.json({ data });
  },

  async create(req: Request, res: Response) {
    const data = await skillService.create(req.body);
    res.status(201).json({ data });
  },

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = await skillService.update(id, req.body);
    res.json({ data });
  },

  async remove(req: Request, res: Response) {
    const id = Number(req.params.id);
    await skillService.remove(id);
    res.status(204).send();
  },
};
