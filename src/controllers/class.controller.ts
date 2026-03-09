import { Request, Response } from "express";
import { classService } from "../services/class.service";
import { mushroomService } from "../services/mushroom.service";
import { passiveService } from "../services/passive.service";
import { skillService } from "../services/skill.service";

export const classController = {
  async list(_req: Request, res: Response) {
    const data = await classService.list();
    res.json({ data });
  },

  async listSkills(req: Request, res: Response) {
    const className = String(req.params.className);
    const data = await skillService.list(className);
    res.json({ data });
  },

  async listPassives(req: Request, res: Response) {
    const className = String(req.params.className);
    const data = await passiveService.list(className);
    res.json({ data });
  },

  async listMushrooms(req: Request, res: Response) {
    const className = String(req.params.className);
    const data = await mushroomService.list(className);
    res.json({ data });
  },
};
