
import { useAdminStats } from '../../../Context/AdminStatsContext';
import UserReportSkeleton from '../../../SkeletionLoading/UserReportSkeleton';
import React, { useEffect, useState } from 'react';
import UserReportCard from './UserReportCard';
import { useAuth } from '../../../Context/AuthContext';
import Swal from "sweetalert2";  
import axiosInstance from '../../../axiosInstance'; 
import DeleteConfirmModal from './DeleteConfirmModal';
const UserReports = () => {
  const { role } = useAuth(); 
  const { refreshStats } = useAdminStats();
  const { stats } = useAdminStats();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [selectedReportId, setSelectedReportId] = useState(null);
const [showModal, setShowModal] = useState(false);
const handleDeleteClick = (reportId) => {
  setSelectedReportId(reportId);
  setShowModal(true);
};
const handleRemoveAllReviewed = async () => {
  try {
    const response = await axiosInstance.delete('/super_admin/report/delete_all_reviewed_reports');
    
    if (response.status === 200) {
      const updatedRequests = reports.filter(req => !req.is_reviewed);
      setReports(updatedRequests);
      setFiltered(updatedRequests);
      await refreshStats();

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "گزارش‌ها با موفقیت حذف شدند",
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
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: err.response?.data?.message || err.response?.data?.detail || "خطای ناشناخته‌ای رخ داده است",
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

const handleCheckClick = async (reportId) => {
  try {
    const res = await axiosInstance.post('/admin/report/review_report', {
      report_id: reportId
    });

    if (res.status === 200) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "گزارش بررسی شد",
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
      setReports(prev => prev.map(r => 
        r.id === reportId ? { ...r, is_reviewed: true } : r
      ));
      setFiltered(prev => prev.map(r => 
        r.id === reportId ? { ...r, is_reviewed: true } : r
      ));

      await refreshStats();
    }

  } catch (err) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: err.response?.data?.message || err.response?.data?.detail || "خطای ناشناخته‌ای رخ داده است",
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


useEffect(() => {
  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/admin/report/get_reports_to_review', {
        headers: {
          Authorization: null,
          'Content-Type': 'multipart/form-data'
        }
      });
      setReports(response.data);
      setFiltered(response.data);
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
      });    } finally {
      setLoading(false);
    }
  };

  fetchReports();
}, []);

  
useEffect(() => {
  if (search.trim() === '') return; 

  const searchReports = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.post('/admin/report/search_reports', {
        report_text: search
      });
      setReports(res.data);
      setFiltered(res.data);
    } catch (err) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: err.response?.data?.message || err.response?.data?.detail || "خطای ناشناخته‌ای رخ داده است",
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
    } finally {
      setLoading(false);
    }
  };

  searchReports();
}, [search]);


  return (
    <div>

      <div className="flex sm:justify-between flex-col gap-2 lg:flex-row items-center mb-6">
      
        <input
          type="text"
          className="w-full md:w-96 border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-400"
          placeholder="جستجو در گزارش‌ها..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

          { role=== 'superadmin' ? ( <div className="flex items-center">
            <button
              className="flex items-center bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg shadow-md transition-colors !rounded-button whitespace-nowrap cursor-pointer"
              onClick={handleRemoveAllReviewed}
              // disabled={stats.reviewed === 0}
            >
              <i className="fas fa-trash-alt mr-2"></i>
             پاک کردن گزارش‌های بررسی شده
            </button>
          </div>) : (<> </>)}
         
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: stats?.pending || 6 }).map((_, i) => <UserReportSkeleton key={i} />)
          : filtered.map((report) => (
              <UserReportCard key={report.id} report={report} onDeleteClick={handleDeleteClick} onCheckClick={handleCheckClick} />
            ))
        }
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
