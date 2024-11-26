-- AlterTable
ALTER TABLE "session_reports" ADD COLUMN     "counselor_name" TEXT,
ALTER COLUMN "student_name" DROP NOT NULL;
