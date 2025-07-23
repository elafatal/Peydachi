import React, { useState } from 'react';
import DeleteUserSection from './DeleteUserSection';
import CreateAdminSection from './CreateAdminSection';
import AddSuperAdminSection from './AddSuperAdminSection';
import { useAuth } from '../../Context/AuthContext'; 
import UnauthorizedPage from '../../Error/UnauthorizedPage';

const AdminFormsPage = () => {
  const { role } = useAuth();

  return (
    role === 'superadmin' ?
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <AddSuperAdminSection/>
      <CreateAdminSection/>
      <DeleteUserSection />
    </div> : <UnauthorizedPage/>
  );
};

export default AdminFormsPage;
