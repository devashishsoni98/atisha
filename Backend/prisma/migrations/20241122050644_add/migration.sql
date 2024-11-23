-- CreateTable
CREATE TABLE "UserTraitsStatus" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "hollandCodeTraits" TEXT[],
    "bigFiveTraits" TEXT[],
    "aptitudeStatus" TEXT,
    "iqStatus" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserTraitsStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecommendedCareers" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "career1" TEXT,
    "career2" TEXT,
    "career3" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecommendedCareers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserTraitsStatus" ADD CONSTRAINT "UserTraitsStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecommendedCareers" ADD CONSTRAINT "RecommendedCareers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
