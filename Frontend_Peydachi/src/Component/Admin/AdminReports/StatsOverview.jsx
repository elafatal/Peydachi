import React, { useEffect, useState } from 'react';
import { FaStore, FaCheckCircle, FaClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const StatsOverview = () => {
  const [stats, setStats] = useState({ total: 0, reviewed: 0, pending: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // مثال:
        // const response = await axios.get('/api/admin/store-request-stats');
        // setStats(response.data);

        const fakeApi = () =>
          new Promise((resolve) =>
            setTimeout(() => {
              resolve({
                total: 6,
                reviewed: 3,
                pending: 3,
              });
            }, 500)
          );

        const data = await fakeApi();
        setStats(data);
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
        label="Total Requests"
        value={loading ? '...' : stats.total}
        Icon={FaStore}
        color="blue"
      />
      <StatsCard
        label="Reports"
        value={loading ? '...' : stats.reviewed}
        Icon={FaCheckCircle}
        color="green"
        onClick={() => navigate('reports')}
      />
      <StatsCard
        label="Requests"
        value={loading ? '...' : stats.pending}
        Icon={FaClock}
        color="yellow"
        onClick={() => navigate('requests')}
      />
    </div>
  );
};

const StatsCard = ({ label, value, Icon, color,onClick }) => (
  <div onClick={onClick}  className={`bg-white rounded-lg shadow-md p-6 border-l-4 border-${color}-500`}>
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
