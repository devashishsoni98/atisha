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
    "role_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_subjects" (
    "id" SERIAL NOT NULL,
    "subject_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "master_subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_sports" (
    "id" SERIAL NOT NULL,
    "sport_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "master_sports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_hobbies" (
    "id" SERIAL NOT NULL,
    "hobby_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "master_hobbies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_personal_info" (
    "userId" INTEGER NOT NULL,
    "image" TEXT,
    "dob" TIMESTAMP(3),
    "gender" "gender_enum" NOT NULL,
    "location" TEXT,
    "contact_number" TEXT,

    CONSTRAINT "student_personal_info_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "student_education" (
    "user_id" INTEGER NOT NULL,
    "school_name" VARCHAR(255) NOT NULL,
    "class" INTEGER NOT NULL,

    CONSTRAINT "student_education_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "student_interest" (
    "user_id" INTEGER NOT NULL,
    "subject_ids" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "sport_ids" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "hobby_ids" INTEGER[] DEFAULT ARRAY[]::INTEGER[],

    CONSTRAINT "student_interest_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "counselor_personal_info" (
    "user_id" INTEGER NOT NULL,
    "image" TEXT,
    "dob" TIMESTAMP(3),
    "gender" "gender_enum" NOT NULL,
    "location" TEXT,
    "contact_number" TEXT,

    CONSTRAINT "counselor_personal_info_pkey" PRIMARY KEY ("user_id")
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
    "user_id" INTEGER NOT NULL,
    "bio" TEXT,
    "year_of_experience" INTEGER,
    "domain" TEXT,
    "image" TEXT,

    CONSTRAINT "counselor_professional_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "session_id" SERIAL NOT NULL,
    "student_id" INTEGER,
    "counselor_id" INTEGER,
    "session_time" TIMESTAMP(3),
    "session_date" TIMESTAMP(3),
    "session_type" "session_type_enum" NOT NULL,
    "location" TEXT NOT NULL DEFAULT 'remote',

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("session_id")
);

-- CreateTable
CREATE TABLE "institute_info" (
    "user_id" INTEGER NOT NULL,
    "image_url" TEXT,
    "address" TEXT,
    "contact_number" TEXT,
    "establish_year" INTEGER,
    "institute_type" "institute_type_enum" NOT NULL,
    "student_body" TEXT,

    CONSTRAINT "institute_info_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "mentors" (
    "user_id" INTEGER NOT NULL,
    "expertise" TEXT,
    "bio" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "certifications" TEXT[],

    CONSTRAINT "mentors_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "mentor_education" (
    "user_id" INTEGER NOT NULL,
    "degree" TEXT,
    "institution" TEXT,

    CONSTRAINT "mentor_education_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "mentor_professional" (
    "user_id" INTEGER NOT NULL,
    "bio" TEXT,
    "year_of_experience" INTEGER,
    "type" "mentor_type_enum" NOT NULL,

    CONSTRAINT "mentor_professional_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "programs" (
    "institute_id" INTEGER NOT NULL,
    "subjects" TEXT,
    "special_programs" TEXT,
    "language_offer" TEXT,
    "certificate_and_affiliation" TEXT,

    CONSTRAINT "programs_pkey" PRIMARY KEY ("institute_id")
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
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quiz_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_traits_status" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "holland_code_traits" TEXT[],
    "big_five_traits" TEXT[],
    "aptitude_status" TEXT,
    "iq_status" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_traits_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recommended_careers" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "career1" TEXT,
    "career2" TEXT,
    "career3" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recommended_careers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "counselor_availability" (
    "id" SERIAL NOT NULL,
    "counselor_id" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "start_time" TIME NOT NULL,
    "end_time" TIME NOT NULL,
    "is_booked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "counselor_availability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_sessionsTousers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_role_name_key" ON "roles"("role_name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "master_subjects_subject_name_key" ON "master_subjects"("subject_name");

-- CreateIndex
CREATE UNIQUE INDEX "master_sports_sport_name_key" ON "master_sports"("sport_name");

-- CreateIndex
CREATE UNIQUE INDEX "master_hobbies_hobby_name_key" ON "master_hobbies"("hobby_name");

-- CreateIndex
CREATE UNIQUE INDEX "quiz_questions_question_key" ON "quiz_questions"("question");

-- CreateIndex
CREATE UNIQUE INDEX "_sessionsTousers_AB_unique" ON "_sessionsTousers"("A", "B");

-- CreateIndex
CREATE INDEX "_sessionsTousers_B_index" ON "_sessionsTousers"("B");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_personal_info" ADD CONSTRAINT "student_personal_info_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_education" ADD CONSTRAINT "student_education_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_interest" ADD CONSTRAINT "student_interest_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "counselor_personal_info" ADD CONSTRAINT "counselor_personal_info_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "counselor_education" ADD CONSTRAINT "counselor_education_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "counselor_professional" ADD CONSTRAINT "counselor_professional_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_counselor_id_fkey" FOREIGN KEY ("counselor_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institute_info" ADD CONSTRAINT "institute_info_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentors" ADD CONSTRAINT "mentors_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentor_education" ADD CONSTRAINT "mentor_education_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "mentors"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentor_professional" ADD CONSTRAINT "mentor_professional_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "mentors"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "programs" ADD CONSTRAINT "programs_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_traits_status" ADD CONSTRAINT "user_traits_status_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recommended_careers" ADD CONSTRAINT "recommended_careers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "counselor_availability" ADD CONSTRAINT "counselor_availability_counselor_id_fkey" FOREIGN KEY ("counselor_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_sessionsTousers" ADD CONSTRAINT "_sessionsTousers_A_fkey" FOREIGN KEY ("A") REFERENCES "sessions"("session_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_sessionsTousers" ADD CONSTRAINT "_sessionsTousers_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
