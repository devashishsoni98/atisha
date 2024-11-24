/*
  Warnings:

  - The primary key for the `student_personal_info` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `student_personal_info` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `student_personal_info` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "student_personal_info" DROP CONSTRAINT "student_personal_info_userId_fkey";

-- AlterTable
ALTER TABLE "student_personal_info" DROP CONSTRAINT "student_personal_info_pkey",
DROP COLUMN "userId",
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD CONSTRAINT "student_personal_info_pkey" PRIMARY KEY ("user_id");

-- AddForeignKey
ALTER TABLE "student_personal_info" ADD CONSTRAINT "student_personal_info_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
