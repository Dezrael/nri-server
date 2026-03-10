import { Prisma } from "@prisma/client";
import { prisma } from "../db/prisma";
import { AppError } from "../types/api";

export const mushroomService = {
  list(className?: string) {
    return prisma.mushroom.findMany({
      where: className ? { className } : undefined,
      orderBy: [{ className: "asc" }, { name: "asc" }],
    });
  },

  create(data: Prisma.MushroomCreateInput) {
    return prisma.mushroom.create({ data });
  },

  async update(id: number, data: Prisma.MushroomUpdateInput) {
    const existing = await prisma.mushroom.findUnique({ where: { id } });
    if (!existing) {
      throw new AppError("Гриб не найден", 404);
    }

    return prisma.mushroom.update({
      where: { id },
      data,
    });
  },

  async remove(id: number) {
    const existing = await prisma.mushroom.findUnique({ where: { id } });
    if (!existing) {
      throw new AppError("Гриб не найден", 404);
    }

    await prisma.mushroom.delete({ where: { id } });
  },
};
