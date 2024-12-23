import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.body;

    try {
      const deletedStudent = await prisma.student.delete({
        where: { id },
      });
      res.status(200).json(deletedStudent);
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete student', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
