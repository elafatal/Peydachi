import React, { useEffect, useState } from 'react';
import { FaBell, FaExclamationCircle, FaInbox } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';

const StatsOverview = () => {
  const [stats, setStats] = useState({
    unseen: 0,
    pending: 0,
    totalAlerts: 0
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axiosInstance.get('/admin/statistics/get_general_stats');
        const data = response.data;

        const unseen = data.total_unseen_notifications || 0;
        const pending = data.total_pending_review_reports || 0;
        const totalAlerts = unseen + pending;

        setStats({ unseen, pending, totalAlerts });
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatsCard
        label="مجموع هشدارها"
        value={loading ? '...' : stats.totalAlerts}
        Icon={FaBell}
        color="blue"
      />
      <StatsCard
        label="گزارش‌های خوانده نشده"
        value={loading ? '...' : stats.pending}
        Icon={FaExclamationCircle}
        color="red"
        onClick={() => navigate('reports')}
      />
      <StatsCard
        label="درخواست‌های بررسی نشده"
        value={loading ? '...' : stats.unseen}
        Icon={FaInbox}
        color="yellow"
        onClick={() => navigate('requests')}
      />
    </div>
  );
};

const StatsCard = ({ label, value, Icon, color, onClick }) => (
  <div
    onClick={onClick}
    className={`bg-white rounded-lg shadow-md p-6 border-l-4 border-${color}-500 cursor-pointer hover:shadow-lg transition-shadow`}
  >
    <div className="flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm pb-2">{label}</p>
        <h2 className="text-3xl font-bold text-gray-800">{value}</h2>
      </div>
      <div className={`bg-${color}-100 p-3 rounded-full`}>
        <Icon className={`text-${color}-500 text-xl`} />
      </div>
    </div>
  </div>
);

export default StatsOverview;
