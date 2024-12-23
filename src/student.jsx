import React, { useState, useEffect } from "react";
import supabase from "./superbaseclient"; // Ensure the correct import path for Supabase client

const Students = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    cohort: "",
    course: "",
  });

  // Fetch students from the database on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data, error } = await supabase.from("students").select("*");

        if (error) {
          console.error("Error fetching students:", error.message);
          return;
        }

        setStudents(data || []);
      } catch (error) {
        console.error("Unexpected error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  // Add new student to the database
  const handleAddStudent = async () => {
    if (!validateForm()) return;

    try {
      const { data, error } = await supabase
        .from("students")
        .insert([newStudent]);

      if (error) {
        console.error("Error adding student:", error.message);
        return;
      }

      // Update local state with the new student
      setStudents((prev) => [...prev, ...data]);
      resetForm(); // Clear the form after adding
    } catch (error) {
      console.error("Unexpected error adding student:", error);
    }
  };

  // Validate form inputs
  const validateForm = () => {
    if (!newStudent.name.trim()) {
      alert("Name is required");
      return false;
    }
    if (!newStudent.email.trim()) {
      alert("Email is required");
      return false;
    }
    return true;
  };

  // Reset form inputs
  const resetForm = () => {
    setNewStudent({
      name: "",
      email: "",
      cohort: "",
      course: "",
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Student Management</h1>

      {/* Form for adding a new student */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddStudent();
        }}
        className="mb-6 space-y-4"
      >
        <input
          type="text"
          placeholder="Name"
          value={newStudent.name}
          onChange={(e) =>
            setNewStudent((prev) => ({ ...prev, name: e.target.value }))
          }
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={newStudent.email}
          onChange={(e) =>
            setNewStudent((prev) => ({ ...prev, email: e.target.value }))
          }
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Cohort"
          value={newStudent.cohort}
          onChange={(e) =>
            setNewStudent((prev) => ({ ...prev, cohort: e.target.value }))
          }
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Course"
          value={newStudent.course}
          onChange={(e) =>
            setNewStudent((prev) => ({ ...prev, course: e.target.value }))
          }
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Student
        </button>
      </form>

      {/* Student list */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Students List</h2>
        {students.length === 0 ? (
          <p>No students available</p>
        ) : (
          <ul className="space-y-2">
            {students.map((student) => (
              <li
                key={student.id}
                className="p-2 border rounded flex justify-between"
              >
                <span>{student.name}</span>
                <span>{student.email}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Students;
