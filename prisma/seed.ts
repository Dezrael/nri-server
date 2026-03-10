import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.mushroom.deleteMany();
  await prisma.passive.deleteMany();
  await prisma.skill.deleteMany();

  await prisma.skill.createMany({
    data: [
      {
        className: "Воин",
        name: "Battle Cry",
        actionType: "main action",
        range: "self",
        stat: "strength",
        durationInCombat: "instant",
        durationOutOfCombat: "instant",
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
        className: "Маг",
        name: "Burning Beam",
        actionType: "main action",
        range: "60 feet",
        stat: "intelligence",
        durationInCombat: "concentration up to 1 minute",
        durationOutOfCombat: "concentration up to 1 minute",
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
        className: "Разбойник",
        name: "Precise Shot",
        actionType: "main action",
        range: "120 feet",
        stat: "dexterity",
        durationInCombat: "instant",
        durationOutOfCombat: "instant",
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
        className: "Грибомант",
        name: "Mushroom Blast",
        actionType: "main action",
        range: "30 feet",
        stat: "intelligence",
        durationInCombat: "instant",
        durationOutOfCombat: "instant",
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
        className: "Воин",
        name: "Battle Spirit",
        text: "Gain +1 initiative and can inspire allies in combat.",
      },
      {
        className: "Разбойник",
        name: "Shadow Walk",
        text: "Move silently and gain advantage on stealth checks.",
      },
      {
        className: "Маг",
        name: "Concentration Mastery",
        text: "Gain +2 on concentration saves when taking damage.",
      },
      {
        className: "Грибомант",
        name: "Spore Immunity",
        text: "Resistance to plant poisons and toxic spores.",
      },
    ],
  });

  await prisma.mushroom.createMany({
    data: [
      {
        className: "Грибомант",
        name: "Fire Mushroom",
        baseEffect: "Creates a small fire orb in a 5-foot area",
        activationEffect: "Explodes for 3d6 fire damage in 10 feet",
        summonEffect: "Summons a fire elemental companion",
        aspectEffect: "Grants fire resistance and fire breath",
      },
      {
        className: "Грибомант",
        name: "Ice Mushroom",
        baseEffect: "Creates a chilling aura in a 10-foot area",
        activationEffect: "Freezes enemies and deals 2d8 cold damage",
        summonEffect: "Summons an ice golem companion",
        aspectEffect: "Grants cold resistance and a frost touch",
      },
      {
        className: "Грибомант",
        name: "Poison Mushroom",
        baseEffect: "Spreads toxic spores in a 15-foot area",
        activationEffect:
          "Poisons enemies for 3 rounds and deals 2d6 poison damage",
        summonEffect: "Summons a venom slime companion",
        aspectEffect: "Grants poison immunity and venom strike",
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
