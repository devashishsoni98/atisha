const prisma = require('@prisma/client').PrismaClient;
const prismaClient = new prisma();

// Create Response
async function createResponse(req, res) {
  try {
    const { studentId, activityId, questionId, answer } = req.body;
    const newResponse = await prismaClient.response.create({
      data: {
        studentId,
        activityId,
        questionId,
        answer
      }
    });
    res.status(201).json(newResponse);
  } catch (error) {
    res.status(500).json({ error: "Error creating response" });
  }
}

module.exports = { createResponse };
