import React, { useState } from 'react';

const TopHeader = ({ toggleMenu }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <button onClick={toggleMenu} className="text-gray-500 focus:outline-none">
            <i className="fas fa-bars"></i>
          </button>
        </div>
        <div className="relative">
          <button
            className="flex items-center space-x-2 focus:outline-none cursor-pointer whitespace-nowrap"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img
              src="https://readdy.ai/api/search-image?query=professional%20headshot..."
              alt="Admin"
              className="w-8 h-8 rounded-full object-cover object-top"
            />
            <span className="text-gray-700">Admin User</span>
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
              <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
              <a href="#logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
