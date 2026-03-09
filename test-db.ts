import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

prisma.skill
  .findMany()
  .then((d) => console.log("Skills:", JSON.stringify(d, null, 2)))
  .catch((e) => console.error("Error:", e))
  .finally(() => prisma.$disconnect());
