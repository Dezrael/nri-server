-- AlterTable
ALTER TABLE "public"."Mushroom" ADD COLUMN     "classId" INTEGER;

-- AlterTable
ALTER TABLE "public"."Passive" ADD COLUMN     "classId" INTEGER;

-- AlterTable
ALTER TABLE "public"."Skill" ADD COLUMN     "classId" INTEGER;

-- CreateTable
CREATE TABLE "public"."Class" (
    "id" SERIAL NOT NULL,
    "className" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Class_className_key" ON "public"."Class"("className");

-- AddForeignKey
ALTER TABLE "public"."Skill" ADD CONSTRAINT "Skill_classId_fkey" FOREIGN KEY ("classId") REFERENCES "public"."Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Passive" ADD CONSTRAINT "Passive_classId_fkey" FOREIGN KEY ("classId") REFERENCES "public"."Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Mushroom" ADD CONSTRAINT "Mushroom_classId_fkey" FOREIGN KEY ("classId") REFERENCES "public"."Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;
