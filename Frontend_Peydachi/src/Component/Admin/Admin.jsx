import React, { useState,useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './AdminMenu/Sidebar';
import { useAuth } from '../Context/AuthContext';
import UnauthorizedPage from '../Error/UnauthorizedPage';
const AdminPage = () => {
  const { role } = useAuth(); 
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
