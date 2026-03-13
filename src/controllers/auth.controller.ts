import { Request, Response } from "express";
import { prisma } from "../db/prisma";
import { AppError } from "../types/api";
import { createAdminToken, verifyAdminPassword } from "../utils/adminToken";

export const authController = {
  async login(req: Request, res: Response) {
    const { password } = req.body as { password: string };

    if (!verifyAdminPassword(password)) {
      throw new AppError("Неверный пароль", 401);
    }

    const data = { token: createAdminToken() };
    res.json({ data });
  },

  async bulkImport(req: Request, res: Response) {
    const payload = req.body as {
      exportedAt: string;
      source: string;
      data: Record<
        string,
        {
          skills: Array<{
            className: string;
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
            category?: string;
            shortDescription: string;
            description: string;
            concentration: boolean;
            isChosen: boolean;
          }>;
          passives: Array<{
            className: string;
            name: string;
            text: string;
            isChosen: boolean;
          }>;
          mushrooms: Array<{
            className: string;
            name: string;
            baseEffect: string;
            activationEffect: string;
            summonEffect: string;
            aspectEffect: string;
            isChosen: boolean;
          }>;
        }
      >;
    };

    const skillRows: Array<{
      className: string;
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
      category: string;
      shortDescription: string;
      description: string;
      concentration: boolean;
      isChosen: boolean;
    }> = [];

    const passiveRows: Array<{
      className: string;
      name: string;
      text: string;
      isChosen: boolean;
    }> = [];

    const mushroomRows: Array<{
      className: string;
      name: string;
      baseEffect: string;
      activationEffect: string;
      summonEffect: string;
      aspectEffect: string;
      isChosen: boolean;
    }> = [];

    for (const [className, classData] of Object.entries(payload.data)) {
      for (const skill of classData.skills) {
        if (skill.className !== className) {
          throw new AppError(
            `Несовпадение класса у навыка "${skill.name}"`,
            400,
          );
        }

        skillRows.push({
          className,
          name: skill.name,
          actionType: skill.actionType,
          range: skill.range,
          stat: skill.stat,
          durationInCombat: skill.durationInCombat,
          durationOutOfCombat: skill.durationOutOfCombat,
          damage: skill.damage,
          inCombatCooldown: skill.inCombatCooldown,
          outCombatCooldown: skill.outCombatCooldown,
          outCombatCharges: skill.outCombatCharges,
          cooldownType: skill.cooldownType,
          savingThrow: skill.savingThrow,
          category: skill.category ?? "Основные",
          shortDescription: skill.shortDescription,
          description: skill.description,
          concentration: skill.concentration,
          isChosen: skill.isChosen,
        });
      }

      for (const passive of classData.passives) {
        if (passive.className !== className) {
          throw new AppError(
            `Несовпадение класса у пассивки "${passive.name}"`,
            400,
          );
        }

        passiveRows.push({
          className,
          name: passive.name,
          text: passive.text,
          isChosen: passive.isChosen,
        });
      }

      for (const mushroom of classData.mushrooms) {
        if (mushroom.className !== className) {
          throw new AppError(
            `Несовпадение класса у гриба "${mushroom.name}"`,
            400,
          );
        }

        mushroomRows.push({
          className,
          name: mushroom.name,
          baseEffect: mushroom.baseEffect,
          activationEffect: mushroom.activationEffect,
          summonEffect: mushroom.summonEffect,
          aspectEffect: mushroom.aspectEffect,
          isChosen: mushroom.isChosen,
        });
      }
    }

    await prisma.$transaction(async (tx) => {
      await tx.mushroom.deleteMany();
      await tx.passive.deleteMany();
      await tx.skill.deleteMany();

      if (skillRows.length > 0) {
        await tx.skill.createMany({ data: skillRows });
      }

      if (passiveRows.length > 0) {
        await tx.passive.createMany({ data: passiveRows });
      }

      if (mushroomRows.length > 0) {
        await tx.mushroom.createMany({ data: mushroomRows });
      }
    });

    res.json({
      data: {
        importedAt: new Date().toISOString(),
        source: payload.source,
        classes: Object.keys(payload.data).length,
        skills: skillRows.length,
        passives: passiveRows.length,
        mushrooms: mushroomRows.length,
      },
    });
  },
};
