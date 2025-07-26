import React, { useState, useEffect }  from 'react';
import StatsCards from './StatsCards';
import Swal from "sweetalert2";  
import AnalyticsCharts from './AnalyticsCharts';
import axiosInstance from '../../axiosInstance';
import AdminActivity from './RecentActivity';
const DashboardOverview = () => {
  const [statistics, setStatistics] = useState(null);
  const [cityData, setCityData] = useState([]);
  const [topRatersData, setTopRatersData] = useState({ categories: [], values: [] });
  const [adminStats, setAdminStats] = useState(null);
  const [adminActivity, setAdminActivity] = useState([]);

  const chartsLoading = cityData.length === 0 || topRatersData.categories.length === 0;

  const [productData, setProductData] = useState([]); // در صورت نیاز آینده
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axiosInstance.get('/admin/statistics/get_all_dashboard_stats');
        if (response.status === 200) {
          const data = response.data
          //cards
          const { total_stores, total_active_products, total_cities, total_users} = data.general_statistics;
          const extractedStats = {
            totalStores: total_stores,
            activeProducts: total_active_products,
            citiesCovered: total_cities,
            totalUsers: total_users,
          };
          setStatistics(extractedStats);
          //charts 1
          console.log(response.data);
          const transformedCityData = data.store_distribution_by_city.map(item => ({
            name: item.city,
            value: item.store_count,
          }));
          setCityData(transformedCityData);
          // chart 2
          const transformedTopRaters = data.top_raters.reduce(
            (acc, item) => {
              acc.categories.push(item.username);
              acc.values.push(item.total_ratings);
              return acc;
            },
            { categories: [], values: [] }
          );
          setTopRatersData(transformedTopRaters);
          //admins
          const adminActivity = [
            {
              id: 1,
              type: 'total_admins',
              label: 'تعداد کل ادمین‌ها',
              value: data.general_statistics.total_admins
            },
            {
              id: 2,
              type: 'active_admins',
              label: 'ادمین‌های فعال',
              value: data.general_statistics.total_active_admins
            },
            {
              id: 3,
              type: 'super_admins',
              label: 'سوپر ادمین',
              value: data.general_statistics.total_super_admins
            }
          ];
          setAdminActivity(adminActivity);
          
          
        }
  
      } catch (error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.response?.data?.message || error.response?.data?.detail || "خطای ناشناخته‌ای رخ داده است",
          showConfirmButton: false,
          timer: 2000,
          toast: true,
          customClass: {
            popup: 'text-sm flex items-center justify-center',
            title: 'text-xs',
            content: 'text-xs',
            icon: 'text-xs mb-2',
          },
        });
      }
    };
  
    fetchDashboardData();
  }, []);
  
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
          <h2 className="text-xl font-semibold text-gray-800 mb-4">آنالیز آمار</h2>
          {chartsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((_, i) => (
                <div key={i} className="w-full h-80 bg-gray-100 animate-pulse rounded-lg" />
              ))}
            </div>
          ) : (
            <AnalyticsCharts
              cityData={cityData}
              topRatersData={topRatersData}
            />
          )}
        </div>
        </div>
        {adminActivity.length > 0 ? (
          <AdminActivity data={adminActivity} />
        ) : (
          <div className="bg-white rounded-lg shadow p-6">
            <div  className="w-full h-80 bg-gray-100 animate-pulse rounded-lg" />
        
        </div>
        )}


      </div>
    </div>
  );
};

export default DashboardOverview;
