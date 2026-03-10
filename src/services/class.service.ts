import { prisma } from "../db/prisma";
import { AppError } from "../types/api";

export const classService = {
  async list() {
    const [skillClasses, passiveClasses, mushroomClasses] = await Promise.all([
      prisma.skill.findMany({
        distinct: ["className"],
        select: { className: true },
      }),
      prisma.passive.findMany({
        distinct: ["className"],
        select: { className: true },
      }),
      prisma.mushroom.findMany({
        distinct: ["className"],
        select: { className: true },
      }),
    ]);

    const classNames = new Set<string>();
    for (const item of skillClasses) classNames.add(item.className);
    for (const item of passiveClasses) classNames.add(item.className);
    for (const item of mushroomClasses) classNames.add(item.className);

    return Array.from(classNames).sort((a, b) => a.localeCompare(b));
  },

  async create(data: {
    className: string;
    skills: Array<{
      name: string;
      actionType: string;
      range: string;
      stat: string;
      duration: string;
      damage: string;
      inCombatCooldown: string;
      outCombatCooldown: string;
      outCombatCharges: string;
      shortDescription: string;
      description: string;
      concentration: boolean;
      isChosen: boolean;
    }>;
    passives: Array<{
      name: string;
      text: string;
    }>;
    mushrooms: Array<{
      name: string;
      baseEffect: string;
      activationEffect: string;
      summonEffect: string;
      aspectEffect: string;
    }>;
  }) {
    const classNames = await this.list();
    if (classNames.includes(data.className)) {
      throw new AppError("Класс уже существует", 409);
    }

    await prisma.$transaction(async (tx) => {
      if (data.skills.length > 0) {
        await tx.skill.createMany({
          data: data.skills.map((item) => ({
            className: data.className,
            ...item,
          })),
        });
      }

      if (data.passives.length > 0) {
        await tx.passive.createMany({
          data: data.passives.map((item) => ({
            className: data.className,
            ...item,
          })),
        });
      }

      if (data.mushrooms.length > 0) {
        await tx.mushroom.createMany({
          data: data.mushrooms.map((item) => ({
            className: data.className,
            ...item,
          })),
        });
      }
    });

    return {
      className: data.className,
      skills: data.skills.length,
      passives: data.passives.length,
      mushrooms: data.mushrooms.length,
    };
  },

  async remove(className: string) {
    const classNames = await this.list();
    if (!classNames.includes(className)) {
      throw new AppError("Класс не найден", 404);
    }

    const result = await prisma.$transaction(async (tx) => {
      const deletedMushrooms = await tx.mushroom.deleteMany({
        where: { className },
      });
      const deletedPassives = await tx.passive.deleteMany({
        where: { className },
      });
      const deletedSkills = await tx.skill.deleteMany({
        where: { className },
      });

      return {
        className,
        skills: deletedSkills.count,
        passives: deletedPassives.count,
        mushrooms: deletedMushrooms.count,
      };
    });

    return result;
  },
};
