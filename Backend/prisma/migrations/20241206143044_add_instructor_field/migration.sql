/*
  Warnings:

  - A unique constraint covering the columns `[institute_code]` on the table `institute_info` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `institute_code` to the `institute_info` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "instructor" TEXT,
ADD COLUMN     "speaker" TEXT;

-- AlterTable
ALTER TABLE "institute_info" ADD COLUMN     "institute_code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "institute_info_institute_code_key" ON "institute_info"("institute_code");
