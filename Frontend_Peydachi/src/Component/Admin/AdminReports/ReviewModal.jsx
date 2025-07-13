import React from 'react';
import { FaTimes } from 'react-icons/fa';
const ReviewModal = ({ show, onClose, onConfirm, request, getCityName, formatDate }) => {
  if (!show || !request) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-800">Review Store Request</h3>
            <button 
              className="text-gray-400 hover:text-gray-500 cursor-pointer"
              onClick={onClose}
            >
             <FaTimes className='inline' />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Store Name</p>
              <p className="text-lg font-medium">{request.store_name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Phone Number</p>
              <p className="text-lg font-medium">{request.phone_number}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">City</p>
              <p className="text-lg font-medium">{getCityName(request.city_id)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Date Added</p>
              <p className="text-lg font-medium">{formatDate(request.date_added)}</p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-1">Description</p>
            <p className="text-gray-700">{request.description}</p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Review Notes (Optional)</label>
            <textarea 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              placeholder="Add any notes about this store request..."
            ></textarea>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button 
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
            onClick={onConfirm}
          >
            Confirm Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
