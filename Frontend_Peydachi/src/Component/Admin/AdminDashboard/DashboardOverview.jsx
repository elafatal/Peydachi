import React from 'react';
import StatsCards from './StatsCards';
import RecentActivity from './RecentActivity';
import AnalyticsCharts from './AnalyticsCharts';

const DashboardOverview = () => {
  // DashboardOverview.jsx
// ...
const cityChartData = [
  { value: 35, name: 'New York' },
  { value: 30, name: 'Los Angeles' },
  { value: 25, name: 'Chicago' },
  { value: 20, name: 'Miami' }
];

const productChartData = {
  categories: ['Electronics', 'Fashion', 'Food', 'Books', 'Sports'],
  values: [120, 200, 150, 80, 70],
};

  return (
    <div>
      <StatsCards />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Analytics Overview</h3>
            <AnalyticsCharts cityData={cityChartData} productData={productChartData} />
          </div>
        </div>
        <RecentActivity />
      </div>
    </div>
  );
};

export default DashboardOverview;
