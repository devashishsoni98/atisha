/*
  Warnings:

  - A unique constraint covering the columns `[question]` on the table `QuizQuestion` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "QuizQuestion_question_key" ON "QuizQuestion"("question");
