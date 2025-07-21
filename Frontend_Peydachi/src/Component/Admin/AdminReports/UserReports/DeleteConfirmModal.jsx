const DeleteConfirmModal = ({ show, onClose, onConfirm }) => {
    if (!show) return null;
  
    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl w-80 text-center">
          <h2 className="text-lg font-bold mb-4 text-gray-800">آیا از حذف این گزارش اطمینان دارید؟</h2>
          <div className="flex justify-center gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              لغو
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              حذف
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default DeleteConfirmModal;
  