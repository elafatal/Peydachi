import React, { useState } from 'react';
import Sidebar from './AdminMenu/Sidebar';
import TopHeader from './AdminMenu/TopHeader';
import DashboardOverview from './AdminDashboard/DashboardOverview';
import StoreManagement from './AdminStore/StoreManagement';

const AdminPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="flex h-screen bg-gray-50" dir="ltr">
      <Sidebar
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopHeader toggleMenu={toggleMenu} />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {activeTab === 'dashboard' && <DashboardOverview />}
          {activeTab === 'stores' && <StoreManagement />}
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
