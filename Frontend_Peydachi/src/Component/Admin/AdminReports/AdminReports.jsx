import { Outlet } from 'react-router-dom';
import StatsOverview from './StatsOverview';

const AdminReports = () => {
  return (
    <div className="min-h-screen bg-gray-50" dir="ltr">
      <main className="container mx-auto px-4 pt-2">
        {/* فقط کارت‌ها */}
        <StatsOverview />

        {/* Outlet برای محتوای زیر تب */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminReports;
