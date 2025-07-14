import React, { useState, useEffect }  from 'react';
import StatsCards from './StatsCards';
import RecentActivity from './RecentActivity';
import AnalyticsCharts from './AnalyticsCharts';
import axiosInstance from '../../axiosInstance';
const DashboardOverview = () => {
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    const fetchLastNotifSent = async () => {
      try {
        const response = await axiosInstance.get('/admin/statistics/get_all_dashboard_stats');
        if (response.data === 200) {
          //cards
          const { total_stores, total_active_products, total_cities, total_users} =response.data.general_statistics;
          const extractedStats = {
            totalStores: total_stores,
            activeProducts: total_active_products,
            citiesCovered: total_cities,
            totalUsers: total_users,
          };
          setStatistics(extractedStats);
          //charts
          console.log(response.data);
          
        }
       

       
      } catch (error) {
        console.log('last 12 notif sent errors:', error);
      }
    };
  
    fetchLastNotifSent();
  }, []);
  

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
  {statistics ? (
  <StatsCards stats={statistics} />
) : (
  <div dir="rtl" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-gray-200 w-10 h-10" />
          <div className="mr-4 flex-1 space-y-2">
            <div className="h-3 bg-gray-200 rounded w-24" />
            <div className="h-5 bg-gray-300 rounded w-20" />
          </div>
        </div>
      </div>
    ))}
  </div>
)}

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
