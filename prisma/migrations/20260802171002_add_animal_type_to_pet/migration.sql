-- CreateEnum
CREATE TYPE "AnimalType" AS ENUM ('DOG', 'CAT');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN "animal_type" "AnimalType";

UPDATE "pets"
SET "animal_type" = 'DOG'
WHERE "animal_type" IS NULL;

ALTER TABLE "pets"
ALTER COLUMN "animal_type" SET NOT NULL;
