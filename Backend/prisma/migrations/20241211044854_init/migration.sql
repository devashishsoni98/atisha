/*
  Warnings:

  - You are about to drop the column `classNumber` on the `school_students` table. All the data in the column will be lost.
  - You are about to drop the column `fileId` on the `school_students` table. All the data in the column will be lost.
  - You are about to drop the `files_upload` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `class` to the `school_students` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "files_upload" DROP CONSTRAINT "files_upload_instituteId_fkey";

-- DropForeignKey
ALTER TABLE "school_students" DROP CONSTRAINT "school_students_fileId_fkey";

-- AlterTable
ALTER TABLE "school_students" DROP COLUMN "classNumber",
DROP COLUMN "fileId",
ADD COLUMN     "class" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "files_upload";

-- CreateTable
CREATE TABLE "career_lens" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "skills" TEXT[],
    "props" TEXT[],
    "cons" TEXT[],
    "related_careers" TEXT[],
    "salary" TEXT NOT NULL,

    CONSTRAINT "career_lens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "school_students" ADD CONSTRAINT "school_students_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "institute_info"("institute_code") ON DELETE RESTRICT ON UPDATE CASCADE;
