import React, { useState } from 'react';
import DeleteUserSection from './DeleteUserSection';
import CreateAdminSection from './CreateAdminSection';
import AddSuperAdminSection from './AddSuperAdminSection';
const AdminFormsPage = () => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <AddSuperAdminSection/>
      <CreateAdminSection/>
      <DeleteUserSection />
    </div>
  );
};

export default AdminFormsPage;
