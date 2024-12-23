import React, { useState } from 'react';
import { FaSearch, FaQuestionCircle, FaRegComment, FaBars, FaBell } from 'react-icons/fa';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log(`Searching courses for: ${searchQuery}`);
      // Add the logic to perform the search, such as making an API call.
    }
  };

  return (
    <div className="fixed top-3 left-[255px] right-3 h-12 flex justify-between items-center px-4 bg-transparent">
      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="w-[614px] h-full flex items-center bg-white rounded-tl-xl px-4 gap-2 shadow-md"
      >
        <FaSearch className="w-6 h-6 text-gray-600" />
        <input
          type="text"
          placeholder="Search your course..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent text-gray-700 focus:outline-none placeholder-gray-500 pl-2 pr-4"
        />
      </form>

      {/* Icons Section */}
      <div className="flex items-center gap-6">
        {/* Question Icon */}
        <FaQuestionCircle className="w-6 h-6 text-gray-600" />
        {/* Message Icon */}
        <FaRegComment className="w-6 h-6 text-gray-600" />
        {/* Hamburger Menu Icon (Replacing Filter Icon) */}
        <FaBars className="w-6 h-6 text-gray-600" />
        {/* Notification Icon */}
        <FaBell className="w-6 h-6 text-gray-600" />
        {/* Profile Section */}
        <div className="flex items-center gap-4">
          <img
            src="./profile.jpg" // Placeholder image
            alt="User Profile"
            className="w-10 h-10 rounded-full"
          />
          <span className="text-gray-700">John Doe</span> {/* Sample name */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
 