/*
  Warnings:

  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('student', 'counselor', 'institute', 'mentor');

-- CreateEnum
CREATE TYPE "SessionTypeEnum" AS ENUM ('online', 'offline');

-- CreateEnum
CREATE TYPE "InstituteTypeEnum" AS ENUM ('private', 'govt', 'semiGovt', 'public');

-- CreateEnum
CREATE TYPE "GenderEnum" AS ENUM ('female', 'male', 'other');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" VARCHAR(255) NOT NULL,
ADD COLUMN     "roleId" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(100);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "role_name" "RoleType" NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MasterSubject" (
    "id" SERIAL NOT NULL,
    "subjectName" VARCHAR(100) NOT NULL,

    CONSTRAINT "MasterSubject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MasterSport" (
    "id" SERIAL NOT NULL,
    "sportName" VARCHAR(100) NOT NULL,

    CONSTRAINT "MasterSport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MasterHobby" (
    "id" SERIAL NOT NULL,
    "hobbyName" VARCHAR(100) NOT NULL,

    CONSTRAINT "MasterHobby_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentPersonalInfo" (
    "userId" INTEGER NOT NULL,
    "image" TEXT,
    "dob" TIMESTAMP(3),
    "gender" "GenderEnum" NOT NULL,
    "location" TEXT,
    "contactNumber" TEXT,

    CONSTRAINT "StudentPersonalInfo_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "StudentEducation" (
    "userId" INTEGER NOT NULL,
    "schoolName" VARCHAR(255) NOT NULL,
    "class" INTEGER NOT NULL,

    CONSTRAINT "StudentEducation_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "StudentInterest" (
    "userId" INTEGER NOT NULL,
    "subjectIds" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "sportIds" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "hobbyIds" INTEGER[] DEFAULT ARRAY[]::INTEGER[],

    CONSTRAINT "StudentInterest_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "CounselorPersonalInfo" (
    "userId" INTEGER NOT NULL,
    "image" TEXT,
    "dob" TIMESTAMP(3),
    "gender" "GenderEnum" NOT NULL,
    "location" TEXT,
    "contactNumber" TEXT,

    CONSTRAINT "CounselorPersonalInfo_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "CounselorEducation" (
    "userId" INTEGER NOT NULL,
    "degree" VARCHAR(255) NOT NULL,
    "certificate" VARCHAR(50) NOT NULL,
    "association" VARCHAR(50) NOT NULL,

    CONSTRAINT "CounselorEducation_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "CounselorProfessional" (
    "userId" INTEGER NOT NULL,
    "bio" TEXT,
    "yearOfExperience" INTEGER,
    "domain" TEXT,
    "image" TEXT,

    CONSTRAINT "CounselorProfessional_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Session" (
    "sessionId" SERIAL NOT NULL,
    "studentId" INTEGER,
    "counselorId" INTEGER,
    "sessionTime" TIMESTAMP(3),
    "sessionDate" TIMESTAMP(3),
    "sessionType" "SessionTypeEnum" NOT NULL,
    "location" TEXT NOT NULL DEFAULT 'remote',

    CONSTRAINT "Session_pkey" PRIMARY KEY ("sessionId")
);

-- CreateTable
CREATE TABLE "InstituteInfo" (
    "userId" INTEGER NOT NULL,
    "imageId" INTEGER,
    "address" TEXT,
    "contactNumber" TEXT,
    "establishYear" INTEGER,
    "instituteType" "InstituteTypeEnum" NOT NULL,
    "studentBody" TEXT,

    CONSTRAINT "InstituteInfo_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Program" (
    "instituteId" INTEGER NOT NULL,
    "subjects" TEXT,
    "specialPrograms" TEXT,
    "languageOffer" TEXT,
    "certificateAndAffiliation" TEXT,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("instituteId")
);

-- CreateTable
CREATE TABLE "_SessionToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_role_name_key" ON "Role"("role_name");

-- CreateIndex
CREATE UNIQUE INDEX "MasterSubject_subjectName_key" ON "MasterSubject"("subjectName");

-- CreateIndex
CREATE UNIQUE INDEX "MasterSport_sportName_key" ON "MasterSport"("sportName");

-- CreateIndex
CREATE UNIQUE INDEX "MasterHobby_hobbyName_key" ON "MasterHobby"("hobbyName");

-- CreateIndex
CREATE UNIQUE INDEX "_SessionToUser_AB_unique" ON "_SessionToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SessionToUser_B_index" ON "_SessionToUser"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentPersonalInfo" ADD CONSTRAINT "StudentPersonalInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentEducation" ADD CONSTRAINT "StudentEducation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentInterest" ADD CONSTRAINT "StudentInterest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CounselorPersonalInfo" ADD CONSTRAINT "CounselorPersonalInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CounselorEducation" ADD CONSTRAINT "CounselorEducation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CounselorProfessional" ADD CONSTRAINT "CounselorProfessional_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_counselorId_fkey" FOREIGN KEY ("counselorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstituteInfo" ADD CONSTRAINT "InstituteInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_instituteId_fkey" FOREIGN KEY ("instituteId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SessionToUser" ADD CONSTRAINT "_SessionToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Session"("sessionId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SessionToUser" ADD CONSTRAINT "_SessionToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
