const prisma = require('@prisma/client').PrismaClient;
const prismaClient = new prisma();

// Create Question
async function createQuestion(req, res) {
  try {
    const { quizId, question, optionA, optionB, optionC, optionD, correctOption } = req.body;
    const newQuestion = await prismaClient.question.create({
      data: {
        quizId,
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        correctOption
      }
    });
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ error: "Error creating question" });
  }
}

module.exports = { createQuestion };
