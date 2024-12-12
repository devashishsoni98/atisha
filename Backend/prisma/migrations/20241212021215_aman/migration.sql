/*
  Warnings:

  - You are about to drop the column `props` on the `career_lens` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `career_lens` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "career_lens" DROP COLUMN "props",
ADD COLUMN     "currency" VARCHAR(10),
ADD COLUMN     "description" TEXT,
ADD COLUMN     "max_salary" INTEGER,
ADD COLUMN     "median_salary" INTEGER,
ADD COLUMN     "min_salary" INTEGER,
ADD COLUMN     "period" VARCHAR(20),
ADD COLUMN     "pros" TEXT[],
ADD COLUMN     "trend" TEXT,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "salary" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "career_lens_name_key" ON "career_lens"("name");
