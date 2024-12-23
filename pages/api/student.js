// pages/api/student.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_ANON_KEY');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, cohort, course } = req.body;

    if (!name || !email || !cohort || !course) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      const { data, error } = await supabase
        .from('students')
        .insert([{ name, email, cohort, course }]);

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res.status(200).json({ student: data[0] });
    } catch (error) {
      console.error('Error adding student:', error);
      return res.status(500).json({ error: 'Failed to add student' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
