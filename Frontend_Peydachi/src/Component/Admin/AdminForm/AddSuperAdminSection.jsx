import React, { useState } from 'react';
import axiosInstance from '../../axiosInstance';
import Swal from "sweetalert2";  
const AddSuperAdminSection = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    phone_number: '',
    email: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axiosInstance.post('/super_admin/add_super_admin',formData);
          console.log(response);
          if (response.status === 201) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "سوپر ادمین اضافه شد",
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
            setFormData({ username: '', password: '', phone_number: '', email: '' });
          }
    } catch (err) {
      console.error('Add super admin failed', err);
    }
  };
  const placeholders = {
    username: 'نام کاربری',
    password: 'رمز عبور',
    phone_number: 'شماره موبایل',
    email: 'ایمیل',
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 text-center">افزودن سوپر ادمین</h3>
      {['username', 'password', 'phone_number', 'email'].map((field) => (
        <input
          key={field}
          type="text"
          placeholder={placeholders[field]}
          value={formData[field]}
          onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
        />
      ))}
      <button type="submit" className="w-full border-2 border-blue-800 text-blue-800 px-4 py-2 rounded hover:bg-blue-100 transition-all duration-300">
        ارسال
      </button>
    </form>
  );
};

export default AddSuperAdminSection;
