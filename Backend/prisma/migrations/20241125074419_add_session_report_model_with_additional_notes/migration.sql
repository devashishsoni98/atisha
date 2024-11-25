-- CreateTable
CREATE TABLE "session_reports" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "counselor_id" INTEGER,
    "mentor_id" INTEGER,
    "session_date" TIMESTAMP(3) NOT NULL,
    "session_time" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "objective" TEXT NOT NULL,
    "topics_discussed" TEXT NOT NULL,
    "student_concerns" TEXT,
    "strengths_identified" TEXT,
    "areas_for_improvement" TEXT,
    "career_alignment" TEXT,
    "action_items" TEXT[],
    "recommendations" TEXT[],
    "follow_up_plan" TEXT,
    "additional_notes" TEXT,

    CONSTRAINT "session_reports_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "session_reports" ADD CONSTRAINT "session_reports_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_reports" ADD CONSTRAINT "session_reports_counselor_id_fkey" FOREIGN KEY ("counselor_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_reports" ADD CONSTRAINT "session_reports_mentor_id_fkey" FOREIGN KEY ("mentor_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
