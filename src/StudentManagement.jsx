import React, { useState, useEffect } from 'react';
import StudentTable from './StudentTable';
import Dropdownbtns from './Dropdownbtns';
import { fetchStudents, addStudent } from './services/studentService';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const loadStudents = async () => {
      const data = await fetchStudents();
      const formattedStudents = data.map((student) => ({
        ...student,
        courses: [
          { name: `CBSE 9 ${student.course}`, img: `/path-to-icon/${student.course.toLowerCase()}.png` },
        ],
        dateJoin: new Date(student.created_at).toLocaleDateString(),
        lastLogin: new Date(student.created_at).toLocaleString(),
        status: student.status ? 'active' : 'inactive',
      }));
      setStudents(formattedStudents);
    };

    loadStudents();
  }, []);

  const handleAddStudent = async (newStudent) => {
    try {
      console.log('Adding student:', newStudent);
      const addedStudent = await addStudent(newStudent);
      
      // Assuming `addedStudent` contains the response data from the backend
      setStudents((prev) => [
        ...prev,
        {
          ...addedStudent,
          courses: [
            { name: `CBSE 9 ${addedStudent.course}`, img: `/path-to-icon/${addedStudent.course.toLowerCase()}.png` },
          ],
          dateJoin: new Date(addedStudent.created_at).toLocaleDateString(),
          lastLogin: new Date(addedStudent.created_at).toLocaleString(),
          status: addedStudent.status ? 'active' : 'inactive',
        },
      ]);
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };
  

  return (
    <div>
      <Dropdownbtns onAddStudent={handleAddStudent} />
      <StudentTable students={students} />
    </div>
  );
};

export default StudentManagement;
