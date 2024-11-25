/*
  Warnings:

  - You are about to drop the column `certificate` on the `counselor_education` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `counselor_professional` table. All the data in the column will be lost.
  - Added the required column `degree_image` to the `counselor_education` table without a default value. This is not possible if the table is not empty.
  - Added the required column `counselor_speciality` to the `counselor_professional` table without a default value. This is not possible if the table is not empty.
  - Added the required column `counselor_type` to the `counselor_professional` table without a default value. This is not possible if the table is not empty.
  - Added the required column `institute_board` to the `institute_info` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "institute_board_type_enum" AS ENUM ('cbse', 'icse', 'state', 'international');

-- AlterTable
ALTER TABLE "counselor_education" DROP COLUMN "certificate",
ADD COLUMN     "degree_image" VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE "counselor_professional" DROP COLUMN "image",
ADD COLUMN     "certificates" TEXT[],
ADD COLUMN     "counselor_speciality" "counselor_specialization_type_enum" NOT NULL,
ADD COLUMN     "counselor_type" "counselor_type_enum" NOT NULL;

-- AlterTable
ALTER TABLE "institute_info" ADD COLUMN     "institute_board" "institute_board_type_enum" NOT NULL;
