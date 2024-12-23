import { supabase } from '../api/supabaseClient';

export const fetchStudents = async () => {
  const { data, error } = await supabase
    .from('students')
    .select('*'); // Adjust columns as per your table

  if (error) {
    console.error('Error fetching students:', error);
    return []; // Return an empty array in case of error
  }

  return data;
};

export const addStudent = async (newStudent) => {
  try {
    const { data, error } = await supabase
      .from('students')
      .insert([newStudent]); // Insert the new student into the database

    if (error) {
      console.error('Error adding student:', error.message);
      throw new Error(error.message);
    }

    return data[0]; // Return the first added student
  } catch (error) {
    console.error('Error adding student:', error);
    throw error; // Rethrow for caller handling
  }
};

