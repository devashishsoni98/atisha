/*
  Warnings:

  - The primary key for the `counselor_education` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `counselor_education` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `counselor_education` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "counselor_education" DROP CONSTRAINT "counselor_education_userId_fkey";

-- AlterTable
ALTER TABLE "counselor_education" DROP CONSTRAINT "counselor_education_pkey",
DROP COLUMN "userId",
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD CONSTRAINT "counselor_education_pkey" PRIMARY KEY ("user_id");

-- AddForeignKey
ALTER TABLE "counselor_education" ADD CONSTRAINT "counselor_education_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
