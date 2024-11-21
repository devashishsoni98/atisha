-- CreateEnum
CREATE TYPE "MentorTypeEnum" AS ENUM ('associate', 'chief');

-- CreateTable
CREATE TABLE "Mentor" (
    "userId" INTEGER NOT NULL,
    "expertise" TEXT,
    "bio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "certifications" TEXT[],

    CONSTRAINT "Mentor_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "MentorEducation" (
    "userId" INTEGER NOT NULL,
    "degree" TEXT,
    "institution" TEXT,

    CONSTRAINT "MentorEducation_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "MentorProfessional" (
    "userId" INTEGER NOT NULL,
    "bio" TEXT,
    "yearOfExperience" INTEGER,
    "type" "MentorTypeEnum" NOT NULL,

    CONSTRAINT "MentorProfessional_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "Mentor" ADD CONSTRAINT "Mentor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MentorEducation" ADD CONSTRAINT "MentorEducation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Mentor"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MentorProfessional" ADD CONSTRAINT "MentorProfessional_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Mentor"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
