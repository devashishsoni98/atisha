/*
  Warnings:

  - You are about to drop the `CounselorEducation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CounselorPersonalInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CounselorProfessional` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InstituteInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MasterHobby` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MasterSport` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MasterSubject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Mentor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MentorEducation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MentorProfessional` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Program` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuizQuestion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecommendedCareers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentEducation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentInterest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentPersonalInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserTraitsStatus` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "role_type" AS ENUM ('student', 'counselor', 'institute', 'mentor');

-- CreateEnum
CREATE TYPE "session_type_enum" AS ENUM ('online', 'offline');

-- CreateEnum
CREATE TYPE "institute_type_enum" AS ENUM ('private', 'govt', 'semiGovt', 'public');

-- CreateEnum
CREATE TYPE "gender_enum" AS ENUM ('female', 'male', 'other');

-- CreateEnum
CREATE TYPE "mentor_type_enum" AS ENUM ('associate', 'chief');

-- DropForeignKey
ALTER TABLE "CounselorEducation" DROP CONSTRAINT "CounselorEducation_userId_fkey";

-- DropForeignKey
ALTER TABLE "CounselorPersonalInfo" DROP CONSTRAINT "CounselorPersonalInfo_userId_fkey";

-- DropForeignKey
ALTER TABLE "CounselorProfessional" DROP CONSTRAINT "CounselorProfessional_userId_fkey";

-- DropForeignKey
ALTER TABLE "InstituteInfo" DROP CONSTRAINT "InstituteInfo_userId_fkey";

-- DropForeignKey
ALTER TABLE "Mentor" DROP CONSTRAINT "Mentor_userId_fkey";

-- DropForeignKey
ALTER TABLE "MentorEducation" DROP CONSTRAINT "MentorEducation_userId_fkey";

-- DropForeignKey
ALTER TABLE "MentorProfessional" DROP CONSTRAINT "MentorProfessional_userId_fkey";

-- DropForeignKey
ALTER TABLE "Program" DROP CONSTRAINT "Program_instituteId_fkey";

-- DropForeignKey
ALTER TABLE "RecommendedCareers" DROP CONSTRAINT "RecommendedCareers_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_counselorId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_studentId_fkey";

-- DropForeignKey
ALTER TABLE "StudentEducation" DROP CONSTRAINT "StudentEducation_userId_fkey";

-- DropForeignKey
ALTER TABLE "StudentInterest" DROP CONSTRAINT "StudentInterest_userId_fkey";

-- DropForeignKey
ALTER TABLE "StudentPersonalInfo" DROP CONSTRAINT "StudentPersonalInfo_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_roleId_fkey";

-- DropForeignKey
ALTER TABLE "UserTraitsStatus" DROP CONSTRAINT "UserTraitsStatus_userId_fkey";

-- DropForeignKey
ALTER TABLE "_SessionToUser" DROP CONSTRAINT "_SessionToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_SessionToUser" DROP CONSTRAINT "_SessionToUser_B_fkey";

-- DropTable
DROP TABLE "CounselorEducation";

-- DropTable
DROP TABLE "CounselorPersonalInfo";

-- DropTable
DROP TABLE "CounselorProfessional";

-- DropTable
DROP TABLE "InstituteInfo";

-- DropTable
DROP TABLE "MasterHobby";

-- DropTable
DROP TABLE "MasterSport";

-- DropTable
DROP TABLE "MasterSubject";

-- DropTable
DROP TABLE "Mentor";

-- DropTable
DROP TABLE "MentorEducation";

-- DropTable
DROP TABLE "MentorProfessional";

-- DropTable
DROP TABLE "Program";

-- DropTable
DROP TABLE "QuizQuestion";

-- DropTable
DROP TABLE "RecommendedCareers";

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "StudentEducation";

-- DropTable
DROP TABLE "StudentInterest";

-- DropTable
DROP TABLE "StudentPersonalInfo";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserTraitsStatus";

-- DropEnum
DROP TYPE "GenderEnum";

-- DropEnum
DROP TYPE "InstituteTypeEnum";

-- DropEnum
DROP TYPE "MentorTypeEnum";

-- DropEnum
DROP TYPE "RoleType";

-- DropEnum
DROP TYPE "SessionTypeEnum";

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "role_name" "role_type" NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "roleId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_subjects" (
    "id" SERIAL NOT NULL,
    "subjectName" VARCHAR(100) NOT NULL,

    CONSTRAINT "master_subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_sports" (
    "id" SERIAL NOT NULL,
    "sportName" VARCHAR(100) NOT NULL,

    CONSTRAINT "master_sports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_hobbies" (
    "id" SERIAL NOT NULL,
    "hobbyName" VARCHAR(100) NOT NULL,

    CONSTRAINT "master_hobbies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_personal_info" (
    "userId" INTEGER NOT NULL,
    "image" TEXT,
    "dob" TIMESTAMP(3),
    "gender" "gender_enum" NOT NULL,
    "location" TEXT,
    "contactNumber" TEXT,

    CONSTRAINT "student_personal_info_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "student_education" (
    "userId" INTEGER NOT NULL,
    "schoolName" VARCHAR(255) NOT NULL,
    "class" INTEGER NOT NULL,

    CONSTRAINT "student_education_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "student_interest" (
    "userId" INTEGER NOT NULL,
    "subjectIds" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "sportIds" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "hobbyIds" INTEGER[] DEFAULT ARRAY[]::INTEGER[],

    CONSTRAINT "student_interest_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "counselor_personal_info" (
    "userId" INTEGER NOT NULL,
    "image" TEXT,
    "dob" TIMESTAMP(3),
    "gender" "gender_enum" NOT NULL,
    "location" TEXT,
    "contactNumber" TEXT,

    CONSTRAINT "counselor_personal_info_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "counselor_education" (
    "userId" INTEGER NOT NULL,
    "degree" VARCHAR(255) NOT NULL,
    "certificate" VARCHAR(50) NOT NULL,
    "association" VARCHAR(50) NOT NULL,

    CONSTRAINT "counselor_education_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "counselor_professional" (
    "userId" INTEGER NOT NULL,
    "bio" TEXT,
    "yearOfExperience" INTEGER,
    "domain" TEXT,
    "image" TEXT,

    CONSTRAINT "counselor_professional_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "sessions" (
    "sessionId" SERIAL NOT NULL,
    "studentId" INTEGER,
    "counselorId" INTEGER,
    "sessionTime" TIMESTAMP(3),
    "sessionDate" TIMESTAMP(3),
    "sessionType" "session_type_enum" NOT NULL,
    "location" TEXT NOT NULL DEFAULT 'remote',

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("sessionId")
);

-- CreateTable
CREATE TABLE "institute_info" (
    "userId" INTEGER NOT NULL,
    "imageUrl" TEXT,
    "address" TEXT,
    "contactNumber" TEXT,
    "establishYear" INTEGER,
    "instituteType" "institute_type_enum" NOT NULL,
    "studentBody" TEXT,

    CONSTRAINT "institute_info_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "mentors" (
    "userId" INTEGER NOT NULL,
    "expertise" TEXT,
    "bio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "certifications" TEXT[],

    CONSTRAINT "mentors_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "mentor_education" (
    "userId" INTEGER NOT NULL,
    "degree" TEXT,
    "institution" TEXT,

    CONSTRAINT "mentor_education_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "mentor_professional" (
    "userId" INTEGER NOT NULL,
    "bio" TEXT,
    "yearOfExperience" INTEGER,
    "type" "mentor_type_enum" NOT NULL,

    CONSTRAINT "mentor_professional_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "programs" (
    "instituteId" INTEGER NOT NULL,
    "subjects" TEXT,
    "specialPrograms" TEXT,
    "languageOffer" TEXT,
    "certificateAndAffiliation" TEXT,

    CONSTRAINT "programs_pkey" PRIMARY KEY ("instituteId")
);

-- CreateTable
CREATE TABLE "quiz_questions" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "grade" INTEGER NOT NULL,
    "traits" TEXT,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "options" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quiz_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_traits_status" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "hollandCodeTraits" TEXT[],
    "bigFiveTraits" TEXT[],
    "aptitudeStatus" TEXT,
    "iqStatus" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_traits_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recommended_careers" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "career1" TEXT,
    "career2" TEXT,
    "career3" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recommended_careers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_role_name_key" ON "roles"("role_name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "master_subjects_subjectName_key" ON "master_subjects"("subjectName");

-- CreateIndex
CREATE UNIQUE INDEX "master_sports_sportName_key" ON "master_sports"("sportName");

-- CreateIndex
CREATE UNIQUE INDEX "master_hobbies_hobbyName_key" ON "master_hobbies"("hobbyName");

-- CreateIndex
CREATE UNIQUE INDEX "quiz_questions_question_key" ON "quiz_questions"("question");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_personal_info" ADD CONSTRAINT "student_personal_info_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_education" ADD CONSTRAINT "student_education_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_interest" ADD CONSTRAINT "student_interest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "counselor_personal_info" ADD CONSTRAINT "counselor_personal_info_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "counselor_education" ADD CONSTRAINT "counselor_education_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "counselor_professional" ADD CONSTRAINT "counselor_professional_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_counselorId_fkey" FOREIGN KEY ("counselorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institute_info" ADD CONSTRAINT "institute_info_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentors" ADD CONSTRAINT "mentors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentor_education" ADD CONSTRAINT "mentor_education_userId_fkey" FOREIGN KEY ("userId") REFERENCES "mentors"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentor_professional" ADD CONSTRAINT "mentor_professional_userId_fkey" FOREIGN KEY ("userId") REFERENCES "mentors"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "programs" ADD CONSTRAINT "programs_instituteId_fkey" FOREIGN KEY ("instituteId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_traits_status" ADD CONSTRAINT "user_traits_status_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recommended_careers" ADD CONSTRAINT "recommended_careers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SessionToUser" ADD CONSTRAINT "_SessionToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "sessions"("sessionId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SessionToUser" ADD CONSTRAINT "_SessionToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
