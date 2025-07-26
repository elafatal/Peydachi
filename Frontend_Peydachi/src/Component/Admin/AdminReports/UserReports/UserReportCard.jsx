// AdminReports/UserReports/UserReportCard.jsx
import { FaClock, FaTrashAlt } from 'react-icons/fa';
import { IoIosCheckmarkCircleOutline,IoIosCheckmarkCircle } from "react-icons/io";
import React, { useEffect, useState } from 'react';
import formatDate from '../../../utils/formatDate';

const UserReportCard = ({ report,onDeleteClick,onCheckClick  }) => {
      const [showModal, setShowModal] = useState(false);

  
  const handleCheckClick = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    onCheckClick(report.id);
    setShowModal(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4"  dir='rtl'>
      <div className="flex justify-between" onClick={handleCheckClick}>
       <h3 className="text-lg font-semibold text-gray-800  mb-2">{report.title}</h3>
       <div className="flex gap-1">
        {report.is_reviewed ? <IoIosCheckmarkCircle title="بررسی شده"  className="text-green-500 text-2xl pb-1" /> 
        : <IoIosCheckmarkCircleOutline  
          className="text-green-500 text-2xl pb-1 cursor-pointer" title="بررسی این گزارش"/> }
        <FaTrashAlt
          className="text-red-500 cursor-pointer"
          onClick={() => onDeleteClick(report.id)}
        />
      </div>
       
      </div>
           <div className="flex justify-between items-center text-sm text-gray-500">
        <span>
          <FaClock className="inline ml-1" />
          {formatDate(report.date_added)}
        </span>
        <span className={`px-2 py-1 rounded-full text-xs ${report.is_reviewed ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
          {report.is_reviewed ? 'بررسی‌شده' : 'در انتظار بررسی'}
        </span>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6" dir="rtl">
            <h2 className="text-lg font-bold mb-4">{report.title}</h2>
            <p className="text-gray-700 mb-6">{report.text}</p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setShowModal(false)}
              >
                انصراف
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={handleConfirm}
              >
                تایید بررسی
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserReportCard;
