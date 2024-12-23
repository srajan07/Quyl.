import { useEffect, useState } from 'react';
import { fetchStudents } from './services/studentService';

const StudentTable = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await fetchStudents();  // Ensure this function returns an array of students
        const formattedStudents = data.map((student) => ({
          ...student,  // Keep all the original data
          courses: [
            { name: `CBSE 9 ${student.course}`, img: `/path-to-icon/${student.course.toLowerCase()}.png` },
          ],
          dateJoin: new Date(student.created_at).toLocaleDateString(),  // Keep the date format for "Date Joined"
          lastLogin: `${new Date(student.created_at).toLocaleDateString()} ${new Date(student.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`, // Combine date and time
          status: student.status ? 'active' : 'inactive',
        }));
        
        
        setStudents(formattedStudents);
      } catch (error) {
        console.error("Error loading students:", error);  // Catch and log errors
      }
    };
  
    loadStudents();  // Call the function to load students
  }, []);  // Empty dependency array ensures this runs once when the component mounts
  

  return (
    <div className="w-full p-12">


      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-900 font-medium">
            <tr>
              <th className="px-6 py-4">Student Name</th>
              <th className="px-6 py-4">Cohort</th>
              <th className="px-6 py-4">Courses</th>
              <th className="px-6 py-4">Date Joined</th>
              <th className="px-6 py-4">Last Login</th>
              <th className="px-6 py-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index} className="border-b last:border-none hover:bg-gray-50">
                <td className="px-6 py-4">{student.name}</td>
                <td className="px-6 py-4">{student.cohort}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    {student.courses.map((course, idx) => (
                      <button key={idx} className="flex items-center bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                        <img src={course.img} alt={course.name} className="w-5 h-5 mr-2" />
                        <span className="text-sm">{course.name}</span>
                      </button>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">{student.dateJoin}</td>
                <td className="px-6 py-4">{student.lastLogin}</td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-block w-3 h-3 rounded-full ${
                      student.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  ></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;