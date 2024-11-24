-- CreateTable
CREATE TABLE "counselor_bookings" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "counselor_id" INTEGER NOT NULL,
    "counselor_availability_id" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "start_time" TIME NOT NULL,
    "end_time" TIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "type" TEXT,
    "location" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "counselor_bookings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "counselor_bookings" ADD CONSTRAINT "counselor_bookings_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "counselor_bookings" ADD CONSTRAINT "counselor_bookings_counselor_id_fkey" FOREIGN KEY ("counselor_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "counselor_bookings" ADD CONSTRAINT "counselor_bookings_counselor_availability_id_fkey" FOREIGN KEY ("counselor_availability_id") REFERENCES "counselor_availability"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
