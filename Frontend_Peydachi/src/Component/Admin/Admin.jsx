import React, { useState,useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './AdminMenu/Sidebar';
import TopHeader from './AdminMenu/TopHeader';
import DashboardOverview from './AdminDashboard/DashboardOverview';
import StoreManagement from './AdminStore/StoreManagement';
import axiosInstance from '../axiosInstance';
import { useAuth } from '../AuthContext/AuthContext';
import UnauthorizedPage from '../Error/UnauthorizedPage';
import CityManagement from './AdminCity/CityManagement';
import UserManagement from './AdminUser/UserManagement';
import StoreCommentManagement from './AdminCommet/StoreCommentManagement';
const AdminPage = () => {
  const { role } = useAuth(); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');


  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
   <>{role === 'admin' || role=== 'superadmin' ? <div className="flex max-h-screen bg-gray-50" dir="rtl">
    <Sidebar />
    <div className="flex-1 flex flex-col overflow-hidden">
      <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  </div> : <UnauthorizedPage/>}</>
  );
};

export default AdminPage;
