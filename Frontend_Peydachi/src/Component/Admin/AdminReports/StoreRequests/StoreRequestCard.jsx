import React from 'react';
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCheckCircle,
  FaTrashAlt
} from 'react-icons/fa';

const StoreRequestCard = ({ request, onReview, onRemove, getCityName, formatDate }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg" dir='rtl'>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-800 truncate">
            {request.store_name}
          </h3>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              request.isReviewed
                ? 'bg-green-100 text-green-800'
                : 'bg-blue-100 text-blue-800'
            }`}
          >
            {request.isReviewed ? 'بررسی شده' : 'در انتظار'}
          </span>
        </div>

        <div className="mb-4 space-y-2 text-sm">
          <div className="flex items-center text-gray-600">
            <FaMapMarkerAlt className="ml-2 text-blue-500" />
            <span>{getCityName(request.city_id)}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FaCalendarAlt className="ml-2 text-blue-500" />
            <span>{formatDate(request.date_added)}</span>
          </div>
        </div>

        {/* <p className="text-gray-600 mb-6 line-clamp-3">
          {request.description}
        </p> */}

        <div className="flex justify-between items-center gap-2">
          {!request.isReviewed ? (
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded-lg shadow-sm transition-colors"
              onClick={() => onReview(request)}
            >
              <FaCheckCircle className="ml-2 inline" />
              بررسی
            </button>
          ) : (
            <button
              className="bg-gray-200 text-gray-700 py-1 px-4 rounded-lg shadow-sm"
              disabled
            >
              <FaCheckCircle className="ml-2 inline" />
              بررسی شد
            </button>
          )}

          <button
            className="bg-red-100 hover:bg-red-200 text-red-600 py-1 px-4 rounded-lg shadow-sm transition-colors"
            onClick={() => onRemove(request.id)}
          >
            <FaTrashAlt className="ml-2 inline" />
            حذف
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreRequestCard;
