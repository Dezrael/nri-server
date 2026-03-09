import { prisma } from "../db/prisma";

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
};
