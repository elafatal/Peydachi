import React from 'react';
import { FaStore, FaBox, FaCity, FaFlag } from 'react-icons/fa';
import { FaUsers } from "react-icons/fa6";
const StatsCards = ({stats}) => {
  const cards = {
    totalStores: { label: 'تعداد فروشگاه', value: stats.totalStores, icon: <FaStore /> },
    activeProducts: { label: 'محصولات فعال ', value: stats.activeProducts, icon: <FaBox /> },
    citiesCovered: { label: 'شهرها', value: stats.citiesCovered, icon: <FaCity /> },
    pendingReports: { label: 'تعداد کاربران ', value: stats.totalUsers, icon: <FaUsers /> },
  };
  return (
    <div dir='rtl' className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Object.entries(cards).map(([key, stat]) => (
        <div key={key} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-500 text-xl">
              {stat.icon}
            </div>
            <div className="mr-4">
              <p className="text-sm pb-1 text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
