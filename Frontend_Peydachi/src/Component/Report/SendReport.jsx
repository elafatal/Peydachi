// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import axiosInstance from '../axiosInstance';
import React, { useState, useEffect, useRef } from 'react';
import Swal from "sweetalert2"; 
import { FaSearch,FaChevronDown, FaEdit,FaEye,FaTrash } from "react-icons/fa";
const SendReport= () => {
  const [title, setTitle] = useState('');
  const [text, settext] = useState('');
  const [drafts, setDrafts] = useState([]);
  const [showDrafts, setShowDrafts] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success'
  });
  const textareaRef = useRef(null);

  const showToast = (title, icon = "success") => {
    Swal.fire({
      position: "top-end",
      icon,
      title,
      showConfirmButton: false,
      timer: 1500,
      toast: true,
      customClass: {
        popup: 'w-2 h-15 text-sm flex items-center justify-center',
        title: 'text-xs',
        content: 'text-xs',
        icon: 'text-xs mb-2'
      }
    });
  };
  // Load drafts from localStorage on component mount
  useEffect(() => {
    const savedDrafts = localStorage.getItem('reportDrafts');
    if (savedDrafts) {
      setDrafts(JSON.parse(savedDrafts));
    }
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  // Auto-save draft every 30 seconds if there's content
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if ((title || text) && !isSubmitting) {
        saveDraft();
      }
    }, 30000);

    return () => clearInterval(autoSaveInterval);
  }, [title, text, isSubmitting]);

  const saveDraft = () => {
    if (!title && !text) return;
    
    const newDraft = {
      id: Date.now(),
      title,
      text,
      date: new Date().toLocaleString()
    };
    
    const updatedDrafts = [newDraft, ...drafts.slice(0, 9)]; 
    setDrafts(updatedDrafts);
    localStorage.setItem('reportDrafts', JSON.stringify(updatedDrafts));
    
    showToast("پیش نویس ذخیره شد");
  };

  const loadDraft = (draft) => {
    setTitle(draft.title);
    settext(draft.text);
    setShowDrafts(false);
  };

  const deleteDraft = (id, e) => {
    e.stopPropagation();
    const updatedDrafts = drafts.filter(draft => draft.id !== id);
    setDrafts(updatedDrafts);
    localStorage.setItem('reportDrafts', JSON.stringify(updatedDrafts));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      showNotification('عنوان درخواست را وارد کنید', 'error');
      return;
    }
    
    if (!text.trim()) {
      showNotification('محتوای درخواست نمیتواند خالی باشد', 'error');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await axiosInstance.post('/report/send_report', {title : title , text: text});
      console.log(response);
      if (response.status === 201) {
        showToast("درخواست شما برای ادمین ارسال شد");
        setTitle('');
        settext('');
      }
      const updatedDrafts = drafts.filter(draft => 
        draft.title !== title || draft.text !== text
      );
      setDrafts(updatedDrafts);
      localStorage.setItem('reportDrafts', JSON.stringify(updatedDrafts));
    } catch (error) {
      showNotification('درخواست ارسال نشد. دوباره امتحان کنید', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  return (
    <div className=" bg-gradient-to-b from-blue-50 to-white flex flex-col items-center">
      
      <main className="w-full max-w-4xl px-4 pb-20  mt-8">
        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            {/* Title Input */}
            <div className="mb-6 relative">
              <label 
                htmlFor="title" 
                className={`absolute transition-all duration-300 ${
                  title ? 'text-xs text-blue-600 top-0' : 'text-base text-gray-700 top-2'
                }`}
              >
                عنوان درخواست
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="outline-none w-full pb-2 pt-6 px-0 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-blue-500 bg-transparent text-gray-800"
                placeholder=""
              />
              <div className="text-xs text-gray-500 mt-1 text-right">
                {title.length}/100 کاراکتر
              </div>
            </div>

            {/* Report Content */}
            <div className="mb-8 relative">
              <label 
                htmlFor="reportContent" 
                className={`absolute transition-all duration-300 ${
                  text ? 'text-xs text-blue-600 top-0' : 'text-base text-gray-700 top-2'
                }`}
              >
                متن درخواست
              </label>
              <textarea
                id="reportContent"
                ref={textareaRef}
                value={text}
                onChange={(e) => settext(e.target.value)}
                className="outline-none w-full pb-2 pt-6 px-0 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-blue-500 bg-transparent text-gray-800 min-h-[150px] resize-none"
                placeholder=""
              />
              <div className="text-xs text-gray-500 mt-1 text-right">
                {text.split(/\s+/).filter(Boolean).length} کلمه
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                type="button"
                onClick={saveDraft}
                className="order-2 sm:order-1 px-6 py-2 border-2 border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors whitespace-nowrap cursor-pointer"
              >
               ذخیره پیش‌نویس
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="order-1 sm:order-2 px-8 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center whitespace-nowrap cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-circle-notch fa-spin ml-2"></i>
                    درحال ارسال...
                  </>
                ) : 'ارسال درخواست'}
              </button>
            </div>
          </form>
        </div>

        {/* Drafts Section */}
        <div className="mt-8">
          <button
            onClick={() => setShowDrafts(!showDrafts)}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4 cursor-pointer"
          >
            <i className={`fas fa-chevron-${showDrafts ? 'down' : 'right'} ml-2`}></i>
            {drafts.length > 0 ? `پیش‌نویس ذخیره شده (${drafts.length})` : 'پیش‌نویسی ذخیره نشده'}
          </button>

          {showDrafts && drafts.length > 0 && (
            <div className="bg-blue-50 rounded-lg p-4 transition-all duration-300">
              <div className="text-sm text-blue-800 mb-2">
                <i className="fas fa-info-circle mr-2"></i>
                برای بارگذاری پیش‌نویس، روی آن کلیک کنید. پیش‌نویس‌ها هر 30 ثانیه به‌طور خودکار ذخیره می‌شوند.
              </div>
              <ul className="space-y-2">
                {drafts.map((draft) => (
                  <li 
                    key={draft.id}
                    onClick={() => loadDraft(draft)}
                    className="bg-white p-3 rounded-md shadow-sm hover:shadow-md transition-shadow cursor-pointer flex justify-between items-start"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800 truncate">
                        {draft.title || '(بدون عنوان)'}
                      </h3>
                      <p className="text-gray-500 text-sm truncate">
                        {draft.text.substring(0, 60)}{draft.text.length > 60 ? '...' : ''}
                      </p>
                      <span className="text-xs text-gray-400">
                        {draft.date}
                      </span>
                    </div>
                    <button 
                      onClick={(e) => deleteDraft(draft.id, e)}
                      className="text-gray-400 hover:text-red-500 p-1 cursor-pointer"
                      aria-label="حذف پیش‌نویس"
                    >
                      <FaTrash className='inline'/>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>

      {/* Notification Toast */}
      <div 
        className={`fixed bottom-4 right-4 max-w-xs bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 transform ${
          notification.show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
        }`}
      >
        <div className={`px-4 py-3 flex items-center ${notification.type === 'success' ? 'bg-blue-500' : 'bg-red-500'}`}>
          <i className={`fas fa-${notification.type === 'success' ? 'check-circle' : 'exclamation-circle'} text-white mr-2`}></i>
          <span className="text-white font-medium">
            {notification.type === 'Success' ? 'اعلان' : 'خطا'}
          </span>
        </div>
        <div className="px-4 py-3">
          <p className="text-gray-700">{notification.message}</p>
        </div>
      </div>
    </div>
  );
};

export default SendReport;
