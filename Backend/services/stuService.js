import prisma from '../prisma/prismaClient.js';

export const saveStudents = async (students) => {
  return prisma.school_students.createMany({
    data: students,
  });
};
