import React, { useState } from 'react';
import axiosInstance from '../../axiosInstance';
import Swal from "sweetalert2";  
const CreateAdminSection = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    phone_number: '',
    email: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axiosInstance.post('/super_admin/admin/create_admin',formData);
          console.log(response);
          if (response.status === 201) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: " ادمین اضافه شد",
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
      console.error('Create admin failed', err);
    }
  };

  const placeholders = {
    username: 'نام کاربری',
    password: 'رمز عبور',
    phone_number: 'شماره موبایل',
    email: 'ایمیل',
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4" dir="rtl">
      <h3 className="text-lg font-semibold text-gray-800 text-center">ایجاد ادمین</h3>
      {Object.keys(formData).map((field) => (
        <input
          key={field}
          type={field === 'password' ? 'password' : 'text'}
          placeholder={placeholders[field]}
          value={formData[field]}
          onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
          className="w-full p-2 border rounded text-right"
        />
      ))}
      <button type="submit" className="w-full border-2 border-indigo-500 text-indigo-600 px-4 py-2 rounded hover:bg-indigo-100 transition-all duration-300">
        ارسال
      </button>
    </form>
  );
};

export default CreateAdminSection;
