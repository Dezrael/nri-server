import { Request, Response } from "express";
import { mushroomService } from "../services/mushroom.service";

export const mushroomController = {
  async list(req: Request, res: Response) {
    const className = req.query.className as string | undefined;
    const data = await mushroomService.list(className);
    res.json({ data });
  },

  async create(req: Request, res: Response) {
    const data = await mushroomService.create(req.body);
    res.status(201).json({ data });
  },

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = await mushroomService.update(id, req.body);
    res.json({ data });
  },

  async remove(req: Request, res: Response) {
    const id = Number(req.params.id);
    await mushroomService.remove(id);
    res.status(204).send();
  },
};
