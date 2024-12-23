import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { id, name, email, cohort, course } = req.body;

    try {
      const updatedStudent = await prisma.student.update({
        where: { id },
        data: { name, email, cohort, course },
      });
      res.status(200).json(updatedStudent);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update student', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
