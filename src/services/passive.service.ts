import { Prisma } from "@prisma/client";
import { prisma } from "../db/prisma";
import { AppError } from "../types/api";

export const passiveService = {
  list(className?: string) {
    return prisma.passive.findMany({
      where: className ? { className } : undefined,
      orderBy: [{ className: "asc" }, { name: "asc" }],
    });
  },

  create(data: Prisma.PassiveCreateInput) {
    return prisma.passive.create({ data });
  },

  async update(id: number, data: Prisma.PassiveUpdateInput) {
    const existing = await prisma.passive.findUnique({ where: { id } });
    if (!existing) {
      throw new AppError("Пассивка не найдена", 404);
    }

    return prisma.passive.update({
      where: { id },
      data,
    });
  },

  async remove(id: number) {
    const existing = await prisma.passive.findUnique({ where: { id } });
    if (!existing) {
      throw new AppError("Пассивка не найдена", 404);
    }

    await prisma.passive.delete({ where: { id } });
  },
};
