const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;
  
    return (
      <div className="font-iran fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full">
          <h2 className="text-lg font-bold text-gray-800 mb-4">{title || 'تأیید عملیات'}</h2>
          <p className="text-gray-600 mb-6">{message || 'آیا مطمئنی می‌خواهی ادامه دهی؟'}</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              لغو
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700"
            >
              تایید
            </button>
          </div>
        </div>
      </div>
    );
  };
  

  export default ConfirmModal