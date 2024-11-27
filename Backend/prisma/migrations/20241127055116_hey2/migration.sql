/*
  Warnings:

  - You are about to drop the column `address` on the `institute_info` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "institute_info" DROP COLUMN "address",
ADD COLUMN     "city" VARCHAR(50),
ADD COLUMN     "plot_no" VARCHAR(50),
ADD COLUMN     "state" VARCHAR(50),
ADD COLUMN     "street" VARCHAR(100);
