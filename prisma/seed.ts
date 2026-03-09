import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.mushroom.deleteMany();
  await prisma.passive.deleteMany();
  await prisma.skill.deleteMany();

  await prisma.skill.createMany({
    data: [
      {
        className: "Mage",
        name: "Fireball",
        description: "Deals fire damage to enemies.",
        inCombatCooldownTurns: 3,
        outCombatCooldownMinutes: 10,
      },
      {
        className: "Mage",
        name: "Ice Shield",
        description: "Absorbs incoming damage.",
        inCombatCooldownTurns: 2,
        outCombatCooldownMinutes: 5,
      },
      {
        className: "Rogue",
        name: "Shadow Step",
        description: "Teleport behind target.",
        inCombatCooldownTurns: 2,
        outCombatCooldownMinutes: 4,
      },
    ],
  });

  await prisma.passive.createMany({
    data: [
      {
        className: "Mage",
        name: "Arcane Intellect",
        description: "Increases mana regeneration.",
      },
      {
        className: "Rogue",
        name: "Backstab Mastery",
        description: "Boosts critical strike chance from behind.",
      },
    ],
  });

  await prisma.mushroom.createMany({
    data: [
      {
        className: "Mage",
        name: "Blue Mushroom",
        description: "Restores mana over time.",
      },
      {
        className: "Rogue",
        name: "Red Mushroom",
        description: "Temporarily increases attack speed.",
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
