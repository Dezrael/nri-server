import { Prisma } from "@prisma/client";
import { prisma } from "../db/prisma";
import { AppError } from "../types/api";

export const skillService = {
  list(className?: string) {
    return prisma.skill.findMany({
      where: className ? { className } : undefined,
      orderBy: [{ className: "asc" }, { name: "asc" }],
    });
  },

  create(data: Prisma.SkillCreateInput) {
    return prisma.skill.create({ data });
  },

  async update(id: number, data: Prisma.SkillUpdateInput) {
    const existing = await prisma.skill.findUnique({ where: { id } });
    if (!existing) {
      throw new AppError("Навык не найден", 404);
    }

    return prisma.skill.update({
      where: { id },
      data,
    });
  },

  async remove(id: number) {
    const existing = await prisma.skill.findUnique({ where: { id } });
    if (!existing) {
      throw new AppError("Навык не найден", 404);
    }

    await prisma.skill.delete({ where: { id } });
  },
};
