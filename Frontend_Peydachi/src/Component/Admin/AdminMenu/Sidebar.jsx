import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useAuth } from '../../Context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { role } = useAuth();

  const tabs = [
    { path: '/admin', label: 'داشبورد' },
    { path: '/admin/stores', label: 'مدیریت فروشگاه‌ها' },
    { path: '/admin/users', label: 'مدیریت کاربران' },
    { path: '/admin/reports', label: 'بررسی درخواست‌ها' },
    { path: '/admin/notifications', label: 'مدیریت اعلان‌ها' },
    { path: '/admin/comments', label: 'مدیریت نظرات' },
    ...(role === 'superadmin' ? [{ path: '/admin/adminManagement', label: 'ادمین‌ها' } ,{ path: '/admin/cities', label: 'شهر و استان' },] : []),
  ];
  
  const handleLinkClick = () => {
    if (window.innerWidth < 640) setIsMenuOpen(false);
  };

  return (
    <>

      {!isMenuOpen && (
        <button
          onClick={() => setIsMenuOpen(true)}
          className="fixed right-2 top-1/2 transform -translate-y-1/2 z-50 sm:hidden bg-gray-800 text-white p-2 rounded-l-md shadow-lg hover:bg-gray-700"
          title="باز کردن منو"
        >
          <FaArrowLeftLong />
        </button>
      )}

      <div
        className={` min-h-[calc(100vh-5rem)] fixed sm:relative top-[5rem] sm:top-0  right-0 z-40 w-64 bg-gray-900 text-white overflow-y-auto transition-transform duration-300 ease-in-out
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} sm:translate-x-0`}
        
      >
        {isMenuOpen && (
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute -left-0 top-1/2 z-50 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-r-md shadow-md hover:bg-gray-700 sm:hidden"
            title="بستن منو"
          >
           <FaArrowLeftLong className="rotate-180" />
          </button>
        )}

        <nav className="mt-6" dir="rtl">
          <ul>
            {tabs.map(tab => (
              <li key={tab.path}>
                <Link
                  to={tab.path}
                  onClick={handleLinkClick}
                  className={`block px-4 py-3 ${location.pathname === tab.path ? 'bg-gray-800 border-l-4 border-blue-500' : 'hover:bg-blue-900'}`}
                >
                  {tab.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* بک‌دراپ برای کلیک بیرون از منو در موبایل */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30 sm:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
