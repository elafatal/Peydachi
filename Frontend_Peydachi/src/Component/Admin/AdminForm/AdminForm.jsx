import React, { useState } from 'react';

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
      <form onSubmit={handleSuperAdminSubmit} className="bg-white p-6 rounded shadow space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 text-center">افزودن سوپر ادمین</h3>
        {['username', 'password', 'phone_number', 'email'].map((field) => (
          <input
            key={field}
            type="text"
            placeholder={field}
            value={superAdminData[field]}
            onChange={(e) => setSuperAdminData({ ...superAdminData, [field]: e.target.value })}
            className="w-full p-2 border rounded"
          />
        ))}
        <button type="submit" className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          ارسال
        </button>
      </form>

      {/* Create Admin */}
      <form onSubmit={handleAdminSubmit} className="bg-white p-6 rounded shadow space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 text-center">ایجاد ادمین</h3>
        {['username', 'password', 'phone_number', 'email'].map((field) => (
          <input
            key={field}
            type="text"
            placeholder={field}
            value={adminData[field]}
            onChange={(e) => setAdminData({ ...adminData, [field]: e.target.value })}
            className="w-full p-2 border rounded"
          />
        ))}
        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          ارسال
        </button>
      </form>

      {/* Delete User */}
      <form onSubmit={handleDeleteUser} className="bg-white p-6 rounded shadow space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 text-center">حذف کاربر</h3>
        <input
          type="number"
          placeholder="شناسه کاربر"
          value={deleteUserId}
          onChange={(e) => setDeleteUserId(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          حذف
        </button>
      </form>
    </div>
  );
};

export default AdminFormsPage;
