import React from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Sidebar = ({ isMenuOpen, toggleMenu, activeTab, setActiveTab }) => {
  return (
    <div className="flex">
      <div className="sm:hidden fixed top-4 left-4 z-50">
        <button onClick={toggleMenu} className="text-gray-500 p-2 rounded-md">
          {isMenuOpen ? <FaTimes className="h-4 w-4" /> : <FaBars className="h-4 w-4" />}
        </button>
      </div>
      <div className={`fixed sm:relative z-40 w-64 bg-gray-900 text-white h-screen transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}>
        <div className="p-4 flex items-center space-x-2">

        </div>
        <nav className="mt-6">
          <ul>
            {[
              { key: 'dashboard', label: 'Dashboard' },
              { key: 'stores', label: 'Store Management' },
              { key: 'cities', label: 'City Management' },
              { key: 'reports', label: 'Report Management' },
              { key: 'settings', label: 'Settings' },
            ].map(item => (
              <li
                key={item.key}
                className={`flex items-center px-4 py-3 cursor-pointer ${activeTab === item.key ? 'bg-gray-800 border-l-4 border-indigo-500' : 'hover:bg-gray-800'}`}
                onClick={() => setActiveTab(item.key)}
              >
                <span className="mx-3">{item.label}</span>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
