import { prisma } from "../db/prisma";
import { AppError } from "../types/api";

export const classService = {
  async list() {
    const classes = await prisma.class.findMany({
      select: { className: true },
      orderBy: { className: "asc" },
    });
    return classes.map((c) => c.className);
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
    const existingClass = await prisma.class.findUnique({
      where: { className: data.className },
    });
    if (existingClass) {
      throw new AppError("Класс уже существует", 409);
    }

    const result = await prisma.$transaction(async (tx) => {
      // Create class record first
      const classRecord = await tx.class.create({
        data: { className: data.className },
      });

      // Create related entities
      if (data.skills.length > 0) {
        await tx.skill.createMany({
          data: data.skills.map((item) => ({
            className: data.className,
            classId: classRecord.id,
            ...item,
          })),
        });
      }

      if (data.passives.length > 0) {
        await tx.passive.createMany({
          data: data.passives.map((item) => ({
            className: data.className,
            classId: classRecord.id,
            ...item,
          })),
        });
      }

      if (data.mushrooms.length > 0) {
        await tx.mushroom.createMany({
          data: data.mushrooms.map((item) => ({
            className: data.className,
            classId: classRecord.id,
            ...item,
          })),
        });
      }

      return {
        className: data.className,
        skills: data.skills.length,
        passives: data.passives.length,
        mushrooms: data.mushrooms.length,
      };
    });

    return result;
  },

  async remove(className: string) {
    const classRecord = await prisma.class.findUnique({
      where: { className },
    });
    if (!classRecord) {
      throw new AppError("Класс не найден", 404);
    }

    const result = await prisma.$transaction(async (tx) => {
      // Delete entities first (due to cascade, this is handled, but explicit for clarity)
      const deletedMushrooms = await tx.mushroom.deleteMany({
        where: { classId: classRecord.id },
      });
      const deletedPassives = await tx.passive.deleteMany({
        where: { classId: classRecord.id },
      });
      const deletedSkills = await tx.skill.deleteMany({
        where: { classId: classRecord.id },
      });

      // Delete class record
      await tx.class.delete({
        where: { id: classRecord.id },
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
