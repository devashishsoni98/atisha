const prisma = require('@prisma/client').PrismaClient;
const prismaClient = new prisma();

// Create Quiz
async function createQuiz(req, res) {
  try {
    const { title, description } = req.body;
    const quiz = await prismaClient.quiz.create({
      data: { title, description }
    });
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ error: "Error creating quiz" });
  }
}

// Get all quizzes
async function getQuizzes(req, res) {
  try {
    const quizzes = await prismaClient.quiz.findMany({
      include: {
        activities: true
      }
    });
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ error: "Error fetching quizzes" });
  }
}

module.exports = { createQuiz, getQuizzes };
