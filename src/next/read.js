import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const students = await prisma.student.findMany();
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch students' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
