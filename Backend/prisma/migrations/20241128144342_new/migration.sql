/*
  Warnings:

  - You are about to drop the `inititue_spoc` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "inititue_spoc" DROP CONSTRAINT "inititue_spoc_user_id_fkey";

-- DropTable
DROP TABLE "inititue_spoc";

-- CreateTable
CREATE TABLE "institute_spoc" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contact_number" TEXT NOT NULL,

    CONSTRAINT "institute_spoc_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "institute_spoc" ADD CONSTRAINT "institute_spoc_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
