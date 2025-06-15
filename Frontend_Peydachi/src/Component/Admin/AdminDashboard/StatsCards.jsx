import React from 'react';
import { FaStore, FaBox, FaCity, FaFlag } from 'react-icons/fa';

const StatsCards = () => {
  const stats = {
    totalStores: { label: 'Total Stores', value: 1248, icon: <FaStore /> },
    activeProducts: { label: 'Active Products', value: 8765, icon: <FaBox /> },
    citiesCovered: { label: 'Cities Covered', value: 42, icon: <FaCity /> },
    pendingReports: { label: 'Pending Reports', value: 17, icon: <FaFlag /> },
  };

  return (
    <div dir='rtl' className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Object.entries(stats).map(([key, stat]) => (
        <div key={key} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-500 text-xl">
              {stat.icon}
            </div>
            <div className="mr-4">
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
