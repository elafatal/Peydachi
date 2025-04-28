import React from 'react';


const StatsCards = () => {
    const stats = {
        totalStores: 1248,
        activeProducts: 8765,
        citiesCovered: 42,
        pendingReports: 17,
      };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Object.entries(stats).map(([key, value]) => (
        <div key={key} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-500">
              <i className="fas fa-store text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500 font-medium">{key.replace(/([A-Z])/g, ' $1')}</p>
              <p className="text-2xl font-semibold text-gray-800">{value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
