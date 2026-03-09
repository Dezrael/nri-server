-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "className" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "inCombatCooldownTurns" INTEGER NOT NULL DEFAULT 0,
    "outCombatCooldownMinutes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Passive" (
    "id" SERIAL NOT NULL,
    "className" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Passive_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mushroom" (
    "id" SERIAL NOT NULL,
    "className" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mushroom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cooldown" (
    "id" SERIAL NOT NULL,
    "className" TEXT NOT NULL,
    "skillName" TEXT NOT NULL,
    "inCombatTurns" INTEGER NOT NULL DEFAULT 0,
    "outCombatMinutes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cooldown_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Skill_className_name_key" ON "Skill"("className", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Passive_className_name_key" ON "Passive"("className", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Mushroom_className_name_key" ON "Mushroom"("className", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Cooldown_className_skillName_key" ON "Cooldown"("className", "skillName");
