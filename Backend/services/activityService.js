const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createActivity = async (data) => {
  try {
    const activity = await prisma.activity.create({ data });
    return activity;
  } catch (error) {
    throw new Error('Failed to create activity: ' + error.message);
  }
};

module.exports = { createActivity };
