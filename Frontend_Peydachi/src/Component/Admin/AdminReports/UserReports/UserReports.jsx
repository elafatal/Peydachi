// AdminReports/UserReports/UserReports.jsx

import React, { useEffect, useState } from 'react';
import UserReportCard from './UserReportCard';
import axiosInstance from '../../../axiosInstance'; // مسیر درست axios

const UserReports = () => {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axiosInstance.post('/admin/report/search_reports', {
          search
        });
        setReports(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchReports();
  }, [search]);

  return (
    <div>
      <div className="mb-6">
        <input
          type="text"
          className="w-full md:w-96 border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-400"
          placeholder="جستجو در گزارش‌ها..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((report) => (
          <UserReportCard key={report.id} report={report} />
        ))}
      </div>
    </div>
  );
};

export default UserReports;
