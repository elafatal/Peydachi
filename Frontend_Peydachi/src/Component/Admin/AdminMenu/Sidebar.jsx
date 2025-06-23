import React from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Sidebar = ({ isMenuOpen,setIsMenuOpen, toggleMenu, activeTab, setActiveTab }) => {
  const manageTab=(key)=>{
    setActiveTab(key)
    setIsMenuOpen(false)
  }
  return (
    <div className="flex">
      <div className="sm:hidden fixed top-4 right-4 z-50">
        <button onClick={toggleMenu} className="text-gray-500 p-2 rounded-md">
          {isMenuOpen ? <FaTimes className="h-4 w-4" /> : <FaBars className="h-4 w-4" />}
        </button>
      </div>
      <div className={`fixed sm:relative z-40 w-64 bg-gray-900 text-white h-screen transform transition-transform duration-300 ease-in-out ${isMenuOpen ? '-translate-x-0' : 'translate-x-full'} sm:translate-x-0`}>

        <nav className="mt-6" dir='rtl'>
          <ul>
            {[
              { key: 'dashboard', label: 'داشبورد' },
              { key: 'stores', label: 'مدیریت فروشگاه‌ها' },
              { key: 'users', label: 'مدیریت کاربران' },
              { key: 'notifications', label: ' اعلان‌ها و درخواست' },
              { key: 'comments', label: 'مدیریت بازخوردها' },
              { key: 'cities', label: 'شهر و استان' },
            ].map(item => (
              <li
                key={item.key}
                className={`flex items-center px-4 py-3 cursor-pointer ${activeTab === item.key ? 'bg-gray-800 border-l-4 border-blue-500' : 'hover:bg-blue-900'}`}
                onClick={() => manageTab(item.key)}
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
