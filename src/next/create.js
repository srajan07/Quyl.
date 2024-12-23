// pages/api/students/create.js
import { prisma } from '../../../lib/prisma';  // If using Prisma ORM

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, cohort, course } = req.body;

    try {
      const newStudent = await prisma.student.create({
        data: {
          name,
          email,
          cohort,
          course,
        },
      });

      res.status(200).json(newStudent);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to add student' });
    }
  } else {
    res.status(404).json({ message: 'Endpoint not found' });
  }
}
