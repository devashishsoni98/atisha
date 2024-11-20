/*
  Warnings:

  - You are about to drop the column `class` on the `QuizQuestion` table. All the data in the column will be lost.
  - Added the required column `grade` to the `QuizQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuizQuestion" DROP COLUMN "class",
ADD COLUMN     "grade" INTEGER NOT NULL;
