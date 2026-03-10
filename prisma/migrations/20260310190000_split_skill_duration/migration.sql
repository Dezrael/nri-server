ALTER TABLE "Skill"
ADD COLUMN "durationInCombat" TEXT NOT NULL DEFAULT '-',
ADD COLUMN "durationOutOfCombat" TEXT NOT NULL DEFAULT '-';

UPDATE "Skill"
SET
	"durationInCombat" = "duration",
	"durationOutOfCombat" = "duration";

ALTER TABLE "Skill"
DROP COLUMN "duration";