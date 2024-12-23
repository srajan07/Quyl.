import React, { useState } from 'react';
import { FaTachometerAlt, FaUserGraduate, FaBook, FaQuestionCircle, FaFileAlt, FaCog } from 'react-icons/fa';

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState(null);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="w-56 lg:w-56 sm:w-16 bg-gray-800 text-white flex flex-col h-screen">
  


    <div className="flex flex-col bg-white text-gray-900 h-screen w-64 p-4 shadow-lg">
      {/* Logo */}
      <div className="flex items-center mb-8 mt-4">
        <img src="/logo.png" alt="Quyl Logo" className="w-24 h-8 mr-3" />
      </div>

      {/* Sidebar Links */}
      <ul className="space-y-4">
        {[
          { name: 'Dashboard', icon: <FaTachometerAlt />, link: 'dashboard' },
          { name: 'Student', icon: <FaUserGraduate />, link: 'student' },
          { name: 'Chapter', icon: <FaBook />, link: 'chapters' },
          { name: 'Help', icon: <FaQuestionCircle />, link: 'help' },
          { name: 'Reports', icon: <FaFileAlt />, link: 'reports' },
          { name: 'Settings', icon: <FaCog />, link: 'settings' },
        ].map(({ name, icon, link }) => (
          <li key={link}>
            <a
              href="#"
              onClick={() => handleLinkClick(link)}
              className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${activeLink === link ? 'bg-gray-400 text-black' : 'text-gray-600 hover:bg-gray-200'}`}
            >
              <span className={`w-6 h-6 mr-3 ${activeLink === link ? 'text-white' : 'text-gray-600'}`}>
                {icon}
              </span>
              {name}
            </a>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default Sidebar;
