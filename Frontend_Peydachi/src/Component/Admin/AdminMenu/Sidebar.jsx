import React from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
const Sidebar = () => {
  const location = useLocation();
  const tabs = [
    { path: '/admin', label: 'داشبورد' },
    { path: '/admin/stores', label: 'مدیریت فروشگاه‌ها' },
    { path: '/admin/users', label: 'مدیریت کاربران' },
    { path: '/admin/cities', label: 'شهر و استان' },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white h-screen">
    <nav className="mt-6" dir="rtl">
      <ul>
        {tabs.map(tab => (
          <li key={tab.path}>
            <Link
              to={tab.path}
              className={`block px-4 py-3 ${location.pathname === tab.path ? 'bg-gray-800 border-l-4 border-blue-500' : 'hover:bg-blue-900'}`}
            >
              {tab.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  </div>
  );
};

export default Sidebar;
