import React, { useState } from "react";
import { supabase } from "./api/supabaseClient";

const Dropdownbtns = () => {
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [isClassOpen, setIsClassOpen] = useState(false);
  const [isCourseOpen, setIsCourseOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState("AY 2024-25");
  const [selectedClass, setSelectedClass] = useState("Class-9");
  const [selectedCourse, setSelectedCourse] = useState("Maths");

  const academicYears = ["AY 2023-24", "AY 2024-25", "AY 2025-26"];
  const classes = ["Class-8", "Class-9", "Class-10"];
  const courses = ["Maths", "Science", "History"];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cohort: selectedYear,
    course: selectedCourse,
  });

  const toggleYearDropdown = () => setIsYearOpen(!isYearOpen);
  const toggleClassDropdown = () => setIsClassOpen(!isClassOpen);
  const toggleCourseDropdown = () => setIsCourseOpen(!isCourseOpen);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddStudent = async () => {
    // Validation check
    if (!formData.name.trim() || !formData.email.trim()) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const { data, error } = await supabase.from("students").insert([formData]);

      if (error) {
        console.error("Error adding student:", error.message);
        alert("Error adding student.");
      } else {
        console.log("Student added successfully:", data);
        // Reset form and close modal on success
        setFormData({
          name: "",
          email: "",
          cohort: selectedYear,
          course: selectedCourse,
        });
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error adding student:", error.message);
    }
  };

  return (
    <div className="flex items-center justify-between mt-16 w-full px-4">
      {/* Left Section: Dropdowns */}
      <div className="flex gap-4">
        {/* Academic Year Dropdown */}
        <div className="relative w-[150px]">
          <button
            className="w-full h-[38px] bg-gray-200 text-gray-700 px-[15px] py-[7px] flex justify-between items-center rounded-md shadow-sm"
            onClick={toggleYearDropdown}
          >
            {selectedYear}
            <span className="ml-2 text-gray-500">▼</span>
          </button>
          {isYearOpen && (
            <ul className="absolute w-full max-w-[150px] bg-white shadow-lg mt-2 rounded-md max-h-[200px] overflow-y-auto">
              {academicYears.map((year, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedYear(year);
                    setFormData((prev) => ({ ...prev, cohort: year }));
                    setIsYearOpen(false);
                  }}
                >
                  {year}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Class Dropdown */}
        <div className="relative w-[117px]">
          <button
            className="w-full h-[38px] bg-gray-200 text-gray-700 px-[15px] py-[7px] flex justify-between items-center rounded-md shadow-sm"
            onClick={toggleClassDropdown}
          >
            {selectedClass}
            <span className="ml-2 text-gray-500">▼</span>
          </button>
          {isClassOpen && (
            <ul className="absolute w-full max-w-[117px] bg-white shadow-lg mt-2 rounded-md max-h-[200px] overflow-y-auto">
              {classes.map((cls, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedClass(cls);
                    setIsClassOpen(false);
                  }}
                >
                  {cls}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Right Section: Add Student Button */}
      <div className="mr-[50px] flex">
        <button
          className="bg-gray-500 text-black px-4 py-2 rounded-md"
          onClick={() => setIsModalOpen(true)}
        >
          + Add new Student
        </button>
      </div>

      {/* Modal for Adding New Student */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-[400px]">
            <h2 className="text-lg font-bold mb-4">Add New Student</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md bg-white text-black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md bg-white text-black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Cohort</label>
              <input
                type="text"
                name="cohort"
                value={formData.cohort}
                disabled
                className="w-full border border-gray-300 px-3 py-2 rounded-md bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Course</label>
              <select
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md bg-white text-black"
              >
                {courses.map((course, index) => (
                  <option key={index} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-200 px-4 py-2 rounded-md"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={handleAddStudent}
              >
                Add Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdownbtns;
