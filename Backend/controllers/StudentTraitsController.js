const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getStudentTraits = async (req, res) => {
  try {
    const studentTraits = await prisma.user_traits_status.findMany();
    res.json(studentTraits);
  } catch (error) {
    console.error('Error fetching student traits:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getStudentTraitByUserId = async (req, res) => {
    const { userId } = req.params;
    console.log('Received userId:', userId);

    try {
      const studentTrait = await prisma.user_traits_status.findFirst({
        where: {
          user_id: parseInt(userId),
        },
      });

      if (!studentTrait) {
        return res.status(404).json({ error: 'Student trait not found' });
      }

      res.json(studentTrait);
    } catch (error) {
      console.error('Error fetching student trait:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getStudentTraits,
    getStudentTraitByUserId,
}