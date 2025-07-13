import { NavLink, Outlet } from 'react-router-dom';
import StatsOverview from './StatsOverview';

const AdminReports = () => {
  const tabs = [
    { path: 'requests', label: 'درخواست فروشگاه‌ها' },
    { path: 'reports', label: 'گزارش کاربران' },
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="ltr">
      <main className="container mx-auto px-4 py-8">
        {/* Stats section - مشترک بین تب‌ها */}
        <StatsOverview/>

        {/* Tabs */}
        <div className="flex gap-4 border-b mb-6">
          {tabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `py-2 px-4 border-b-2 ${
                  isActive
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-blue-500'
                }`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </div>

        {/* Outlet for tab content */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminReports;
