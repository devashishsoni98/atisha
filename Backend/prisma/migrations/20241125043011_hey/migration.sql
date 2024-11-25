/*
  Warnings:

  - You are about to drop the column `domain` on the `counselor_professional` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "counselor_type_enum" AS ENUM ('private', 'govt', 'fresher');

-- CreateEnum
CREATE TYPE "counselor_specialization_type_enum" AS ENUM ('mentalHealth', 'career', 'parenting');

-- AlterTable
ALTER TABLE "counselor_professional" DROP COLUMN "domain",
ADD COLUMN     "career_specialization" TEXT[],
ADD COLUMN     "specialization" TEXT;

-- AlterTable
ALTER TABLE "institute_info" ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "mentors" ADD COLUMN     "image_url" TEXT;
