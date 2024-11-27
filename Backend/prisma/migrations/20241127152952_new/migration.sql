-- CreateTable
CREATE TABLE "mentor_availability" (
    "id" SERIAL NOT NULL,
    "mentor_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "is_booked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "mentor_availability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mentor_bookings" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "mentor_id" INTEGER NOT NULL,
    "mentor_availability_id" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "start_time" TIME NOT NULL,
    "end_time" TIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "type" TEXT,
    "location" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mentor_bookings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "mentor_availability" ADD CONSTRAINT "mentor_availability_mentor_id_fkey" FOREIGN KEY ("mentor_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentor_bookings" ADD CONSTRAINT "mentor_bookings_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentor_bookings" ADD CONSTRAINT "mentor_bookings_mentor_id_fkey" FOREIGN KEY ("mentor_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentor_bookings" ADD CONSTRAINT "mentor_bookings_mentor_availability_id_fkey" FOREIGN KEY ("mentor_availability_id") REFERENCES "mentor_availability"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
