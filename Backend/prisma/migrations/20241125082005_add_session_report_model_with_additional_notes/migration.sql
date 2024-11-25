/*
  Warnings:

  - Added the required column `student_name` to the `session_reports` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "session_reports" ADD COLUMN     "student_name" TEXT NOT NULL;
