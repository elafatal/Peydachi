import React from 'react';
import { FaUserShield, FaUserCheck, FaUserTie } from 'react-icons/fa';
import { useAuth } from '../../Context/AuthContext';

const AdminActivity = ({ data }) => {
  const { role } = useAuth();

  const getIconAndStyle = (type) => {
    switch (type) {
      case 'total_admins':
        return { icon: <FaUserShield />, bg: 'bg-blue-100', text: 'text-blue-600' };
      case 'active_admins':
        return { icon: <FaUserCheck />, bg: 'bg-green-100', text: 'text-green-600' };
      case 'super_admins':
        return { icon: <FaUserTie />, bg: 'bg-purple-100', text: 'text-purple-600' };
      default:
        return { icon: null, bg: '', text: '' };
    }
  };

  return (
    role==='superadmin' ?
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">آمار ادمین‌ها</h3>
      </div>
      <div className="p-6">
        <ul className="divide-y divide-gray-200">
          {data.map((item) => {
            const { icon, bg, text } = getIconAndStyle(item.type);
            return (
              <li key={item.id} className="py-3">
                <div className="flex items-start">
                  <div className={`p-2 rounded-full text-xl ml-2 ${bg} ${text}`}>
                    {icon}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-800">
                      {item.label}
                    </p>
                    <p className="text-xs text-gray-500">{item.value} نفر</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div> : null
  );
};

export default AdminActivity;
