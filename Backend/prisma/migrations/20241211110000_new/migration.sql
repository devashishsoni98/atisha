-- CreateTable
CREATE TABLE "career_lens" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "skills" TEXT[],
    "props" TEXT[],
    "cons" TEXT[],
    "related_careers" TEXT[],
    "salary" TEXT NOT NULL,

    CONSTRAINT "career_lens_pkey" PRIMARY KEY ("id")
);
