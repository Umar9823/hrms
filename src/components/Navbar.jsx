import React, { useState } from 'react';

const Navbar = () => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Function to toggle profile dropdown
  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  return (
    <div className="w-full h-16 bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-between px-6 shadow-lg">
      {/* App Name */}
      <div className="text-3xl font-bold text-gray-800 tracking-wide">
        HRMS
      </div>

      {/* Search Bar */}
      <div className="flex-1 px-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Icons and Profile Dropdown */}
      <div className="space-x-4 flex items-center">
        {/* Notification Button */}
        <button className="relative px-4 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out">
          <i className="fas fa-bell"></i>
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
        </button>

        {/* Profile Button with Dropdown */}
        <div className="relative">
          <button
            onClick={toggleProfileDropdown}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200 ease-in-out flex items-center"
          >
            <i className="fas fa-user-circle mr-2"></i>Profile
          </button>

          {/* Dropdown Menu */}
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
              <a
                href="#profile"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                View Profile
              </a>
              <a
                href="#settings"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Settings
              </a>
              <a
                href="#logout"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
