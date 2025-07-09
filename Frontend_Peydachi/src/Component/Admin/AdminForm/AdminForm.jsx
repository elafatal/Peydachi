import React, { useState } from 'react';
import DeleteUserSection from './DeleteUserSection';
import CreateAdminSection from './CreateAdminSection';
import AddSuperAdminSection from './AddSuperAdminSection';
const AdminFormsPage = () => {
  const [superAdminData, setSuperAdminData] = useState({
    username: '',
    password: '',
    phone_number: '',
    email: '',
  });

  const [adminData, setAdminData] = useState({
    username: '',
    password: '',
    phone_number: '',
    email: '',
  });

  const [deleteUserId, setDeleteUserId] = useState('');

  const handleSuperAdminSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/super_admin/add_super_admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(superAdminData),
    });
    console.log(await res.json());
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/super_admin/admin/create_admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(adminData),
    });
    console.log(await res.json());
  };

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    const res = await fetch('/super_admin/admin/delete_user', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: Number(deleteUserId) }),
    });
    console.log(await res.json());
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Add Super Admin */}
      <AddSuperAdminSection/>
      <CreateAdminSection/>
      <DeleteUserSection />
    </div>
  );
};

export default AdminFormsPage;
