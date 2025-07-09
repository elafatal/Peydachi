import React, { useState } from 'react';

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
      const res = await fetch('/super_admin/add_super_admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      console.log(result);
      alert('سوپر ادمین با موفقیت اضافه شد');
      setFormData({ username: '', password: '', phone_number: '', email: '' });
    } catch (err) {
      console.error('Add super admin failed', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 text-center">افزودن سوپر ادمین</h3>
      {['username', 'password', 'phone_number', 'email'].map((field) => (
        <input
          key={field}
          type="text"
          placeholder={field}
          value={formData[field]}
          onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
          className="w-full p-2 border rounded"
        />
      ))}
      <button type="submit" className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        ارسال
      </button>
    </form>
  );
};

export default AddSuperAdminSection;
