-- Skill: expand to class-focused skill payload
ALTER TABLE "Skill"
  ADD COLUMN "actionType" TEXT,
  ADD COLUMN "range" TEXT,
  ADD COLUMN "stat" TEXT,
  ADD COLUMN "duration" TEXT,
  ADD COLUMN "damage" TEXT,
  ADD COLUMN "inCombatCooldown" TEXT,
  ADD COLUMN "outCombatCooldown" TEXT,
  ADD COLUMN "outCombatCharges" TEXT,
  ADD COLUMN "shortDescription" TEXT,
  ADD COLUMN "concentration" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "isChosen" BOOLEAN NOT NULL DEFAULT false;

UPDATE "Skill"
SET
  "actionType" = 'main action',
  "range" = 'self',
  "stat" = 'strength',
  "duration" = 'instant',
  "damage" = '0',
  "inCombatCooldown" = "inCombatCooldownTurns"::TEXT,
  "outCombatCooldown" = CASE
    WHEN "outCombatCooldownMinutes" = 0 THEN '-'
    ELSE "outCombatCooldownMinutes"::TEXT || ' minutes'
  END,
  "outCombatCharges" = 'infinite',
  "shortDescription" = "name",
  "description" = COALESCE("description", '');

ALTER TABLE "Skill"
  ALTER COLUMN "actionType" SET NOT NULL,
  ALTER COLUMN "range" SET NOT NULL,
  ALTER COLUMN "stat" SET NOT NULL,
  ALTER COLUMN "duration" SET NOT NULL,
  ALTER COLUMN "damage" SET NOT NULL,
  ALTER COLUMN "inCombatCooldown" SET NOT NULL,
  ALTER COLUMN "outCombatCooldown" SET NOT NULL,
  ALTER COLUMN "outCombatCharges" SET NOT NULL,
  ALTER COLUMN "shortDescription" SET NOT NULL,
  ALTER COLUMN "description" SET NOT NULL;

ALTER TABLE "Skill"
  DROP COLUMN "inCombatCooldownTurns",
  DROP COLUMN "outCombatCooldownMinutes";

-- Passive: rename description->text shape
ALTER TABLE "Passive"
  ADD COLUMN "text" TEXT;

UPDATE "Passive"
SET "text" = COALESCE("description", '');

ALTER TABLE "Passive"
  ALTER COLUMN "text" SET NOT NULL;

ALTER TABLE "Passive"
  DROP COLUMN "description";

-- Mushroom: switch to effect-oriented shape
ALTER TABLE "Mushroom"
  ADD COLUMN "baseEffect" TEXT,
  ADD COLUMN "activationEffect" TEXT,
  ADD COLUMN "summonEffect" TEXT,
  ADD COLUMN "aspectEffect" TEXT;

UPDATE "Mushroom"
SET
  "baseEffect" = COALESCE("description", ''),
  "activationEffect" = '',
  "summonEffect" = '',
  "aspectEffect" = '';

ALTER TABLE "Mushroom"
  ALTER COLUMN "baseEffect" SET NOT NULL,
  ALTER COLUMN "activationEffect" SET NOT NULL,
  ALTER COLUMN "summonEffect" SET NOT NULL,
  ALTER COLUMN "aspectEffect" SET NOT NULL;

ALTER TABLE "Mushroom"
  DROP COLUMN "description";
