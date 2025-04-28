import React from 'react';
import StatsCards from './StatsCards';
import RecentActivity from './RecentActivity';

const DashboardOverview = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard Overview</h2>
      <StatsCards />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Analytics Overview</h3>
            <p>No charts available.</p>
          </div>
        </div>
        <RecentActivity />
      </div>
    </div>
  );
};

export default DashboardOverview;
