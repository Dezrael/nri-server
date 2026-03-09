import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.mushroom.deleteMany();
  await prisma.passive.deleteMany();
  await prisma.skill.deleteMany();

  await prisma.skill.createMany({
    data: [
      {
        className: "Warrior",
        name: "Battle Cry",
        actionType: "main action",
        range: "self",
        stat: "strength",
        duration: "instant",
        damage: "0",
        inCombatCooldown: "3",
        outCombatCooldown: "10 minutes",
        outCombatCharges: "infinite",
        shortDescription: "Rally allies with a loud cry",
        description:
          "All allies within 30 feet gain +2 to attacks for 1 round.",
        concentration: false,
        isChosen: true,
      },
      {
        className: "Mage",
        name: "Burning Beam",
        actionType: "main action",
        range: "60 feet",
        stat: "intelligence",
        duration: "concentration up to 1 minute",
        damage: "2d6",
        inCombatCooldown: "2",
        outCombatCooldown: "5 minutes",
        outCombatCharges: "5",
        shortDescription: "A thin line of fire scorches targets",
        description:
          "Create a 15-foot cone of flame. Targets save on dexterity or take 2d6 fire damage.",
        concentration: true,
        isChosen: true,
      },
      {
        className: "Rogue",
        name: "Precise Shot",
        actionType: "main action",
        range: "120 feet",
        stat: "dexterity",
        duration: "instant",
        damage: "1d8+3",
        inCombatCooldown: "0",
        outCombatCooldown: "-",
        outCombatCharges: "infinite",
        shortDescription: "A well-aimed ranged attack",
        description: "Make a ranged attack. On hit deal 1d8+3 damage.",
        concentration: false,
        isChosen: true,
      },
      {
        className: "Mushroomancer",
        name: "Mushroom Blast",
        actionType: "main action",
        range: "30 feet",
        stat: "intelligence",
        duration: "instant",
        damage: "2d6",
        inCombatCooldown: "2",
        outCombatCooldown: "5 minutes",
        outCombatCharges: "3",
        shortDescription: "Throw an explosive mushroom",
        description:
          "Throw a mushroom projectile. On hit, deal fire damage and stun for 1 round.",
        concentration: false,
        isChosen: true,
      },
    ],
  });

  await prisma.passive.createMany({
    data: [
      {
        className: "Warrior",
        name: "Battle Spirit",
        text: "Gain +1 initiative and can inspire allies in combat.",
      },
      {
        className: "Rogue",
        name: "Shadow Walk",
        text: "Move silently and gain advantage on stealth checks.",
      },
      {
        className: "Mage",
        name: "Concentration Mastery",
        text: "Gain +2 on concentration saves when taking damage.",
      },
      {
        className: "Mushroomancer",
        name: "Spore Immunity",
        text: "Resistance to plant poisons and toxic spores.",
      },
    ],
  });

  await prisma.mushroom.createMany({
    data: [
      {
        className: "Mushroomancer",
        name: "Fire Mushroom",
        baseEffect: "Creates a small fire orb in a 5-foot area",
        activationEffect: "Explodes for 3d6 fire damage in 10 feet",
        summonEffect: "Summons a fire elemental companion",
        aspectEffect: "Grants fire resistance and fire breath",
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
