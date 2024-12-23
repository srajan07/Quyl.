import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import StudentManagement from './StudentManagement'; // Import the StudentManagement component

const App = () => {
  const [activeLink, setActiveLink] = useState('student');

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar setActiveLink={setActiveLink} activeLink={activeLink} />

        <div className="flex-1 p-4 overflow-auto">
          {/* Conditional rendering based on the active link */}
          {activeLink === 'student' && <StudentManagement />}
        </div>
      </div>
    </div>
  );
};

export default App;
