/*
  Warnings:

  - You are about to drop the column `imageId` on the `InstituteInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "InstituteInfo" DROP COLUMN "imageId",
ADD COLUMN     "imageUrl" TEXT;
