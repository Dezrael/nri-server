import { Request, Response } from "express";
import { passiveService } from "../services/passive.service";

export const passiveController = {
  async list(req: Request, res: Response) {
    const className = req.query.className as string | undefined;
    const data = await passiveService.list(className);
    res.json({ data });
  },

  async create(req: Request, res: Response) {
    const data = await passiveService.create(req.body);
    res.status(201).json({ data });
  },

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = await passiveService.update(id, req.body);
    res.json({ data });
  },

  async remove(req: Request, res: Response) {
    const id = Number(req.params.id);
    await passiveService.remove(id);
    res.status(204).send();
  },
};
