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

  async create(req: Request, res: Response) {
    const payload = req.body as {
      className: string;
      skills?: Array<{
        className?: string;
        name: string;
        actionType: string;
        range: string;
        stat: string;
        durationInCombat: string;
        durationOutOfCombat: string;
        damage: string;
        inCombatCooldown: string;
        outCombatCooldown: string;
        outCombatCharges: string;
        cooldownType?: string;
        savingThrow?: string;
        shortDescription: string;
        description: string;
        concentration: boolean;
        isChosen: boolean;
      }>;
      passives?: Array<{
        className?: string;
        name: string;
        text: string;
      }>;
      mushrooms?: Array<{
        className?: string;
        name: string;
        baseEffect: string;
        activationEffect: string;
        summonEffect: string;
        aspectEffect: string;
      }>;
    };

    const data = await classService.create({
      className: payload.className,
      skills: payload.skills ?? [],
      passives: payload.passives ?? [],
      mushrooms: payload.mushrooms ?? [],
    });

    res.status(201).json({ data });
  },

  async remove(req: Request, res: Response) {
    const className = String(req.params.className);
    const data = await classService.remove(className);
    res.json({ data });
  },
};
