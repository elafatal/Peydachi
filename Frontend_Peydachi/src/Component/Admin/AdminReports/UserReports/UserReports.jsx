// AdminReports/UserReports/UserReports.jsx
import { useAdminStats } from '../../../Context/AdminStatsContext';

import React, { useEffect, useState } from 'react';
import UserReportCard from './UserReportCard';
import Swal from "sweetalert2";  
import axiosInstance from '../../../axiosInstance'; 
import DeleteConfirmModal from './DeleteConfirmModal';
const UserReports = () => {
  const { refreshStats } = useAdminStats();
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [selectedReportId, setSelectedReportId] = useState(null);
const [showModal, setShowModal] = useState(false);
const handleDeleteClick = (reportId) => {
  setSelectedReportId(reportId);
  setShowModal(true);
};

const handleDeleteConfirm = async () => {
  try {
    const response = await axiosInstance.delete('/admin/report/delete_report', {
      data: { report_id: selectedReportId },
    });
    if (response.status === 200) {
      Swal.fire({
                position: "top-end",
                icon: "success",
                title: "گزارش حذف شد ",
                showConfirmButton: false,
                timer: 1500,
                toast: true,
                customClass: {
                  popup: 'w-2 h-15 text-sm flex items-center justify-center', 
                  title: 'text-xs', 
                  content: 'text-xs',
                  icon : 'text-xs mb-2'
                }
            });
            setFiltered(prev => prev.filter(r => r.id !== selectedReportId));
            setReports(prev => prev.filter(r => r.id !== selectedReportId));
            setShowModal(false);
            await refreshStats();

    }
  } catch (err) {
    console.error('خطا در حذف گزارش:', err);
  }
};

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axiosInstance.get('/admin/report/get_all_reports', {
          headers: {
            Authorization: null,
            'Content-Type': 'multipart/form-data'
          }
        });
        setReports(response.data);
        setFiltered(response.data);
      } catch (error) {
        console.log(error);
        
      } 
    };
  
    fetchReports();
  }, []);
  
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axiosInstance.post('/admin/report/search_reports', {
          report_text : search
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
          <UserReportCard key={report.id} report={report} onDeleteClick={handleDeleteClick} />
        ))}
      </div>
      <DeleteConfirmModal
  show={showModal}
  onClose={() => setShowModal(false)}
  onConfirm={handleDeleteConfirm}
/>

    </div>
  );
};

export default UserReports;
