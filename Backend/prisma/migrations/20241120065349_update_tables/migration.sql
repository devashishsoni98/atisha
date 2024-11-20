/*
  Warnings:

  - Changed the type of `class` on the `QuizQuestion` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "QuizQuestion" DROP COLUMN "class",
ADD COLUMN     "class" INTEGER NOT NULL;
