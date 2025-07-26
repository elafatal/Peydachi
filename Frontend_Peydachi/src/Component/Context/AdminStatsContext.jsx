import React, { createContext, useContext, useState, useEffect } from 'react';
import showErrorToast from '../utils/showErrorToast'; 
import axiosInstance from '../axiosInstance';
import { useAuth } from './AuthContext';
const AdminStatsContext = createContext();

export const useAdminStats = () => useContext(AdminStatsContext);

export const AdminStatsProvider = ({ children }) => {
  const { user } = useAuth();
  const { role } = useAuth();
  const [stats, setStats] = useState({
    requests: 0,
    pending: 0,
    totalAlerts: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      if (role === 'admin' || role==='superadmin') {
        const res = await axiosInstance.get('/admin/statistics/get_add_store_request_and_report_stats');
      const data = res.data;
      const requests = data.total_pending_review_add_store_requests || 0;
      const pending = data.total_pending_review_reports || 0;
      const totalAlerts = requests + pending;
      setStats({ requests, pending, totalAlerts });
      }
    } catch (err) {
      showErrorToast(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    fetchStats();
  }, [user]);

  return (
    <AdminStatsContext.Provider value={{ stats, loading, refreshStats: fetchStats }}>
      {children}
    </AdminStatsContext.Provider>
  );
};
