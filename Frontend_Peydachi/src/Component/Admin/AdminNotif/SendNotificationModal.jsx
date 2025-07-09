import React from 'react';

const SendNotificationModal = ({
  isOpen,
  onClose,
  onSend,
  userSearchQuery,
  setUserSearchQuery,
  userSuggestions,
  isUserDropdownOpen,
  handleUserSelect,
  selectedUser,
  setSelectedUser,
  notificationTitle,
  setNotificationTitle,
  notificationText,
  setNotificationText
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50" dir='rtl'>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#191970]">ارسال اعلان جدید</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="space-y-4">
          {/* Select User */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              انتخاب کاربر
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-user text-gray-400"></i>
              </div>
              <input
                type="text"
                placeholder="جستجوی نام کاربری..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-[#191970] focus:border-[#191970]"
                value={userSearchQuery}
                onChange={(e) => setUserSearchQuery(e.target.value)}
              />
            </div>

            {isUserDropdownOpen && userSuggestions.length > 0 && (
              <div className="mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto border border-gray-200">
                <div className="py-1">
                  {userSuggestions.map(user => (
                    <button
                      key={user.id}
                      onClick={() => handleUserSelect(user)}
                      className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 text-gray-700 cursor-pointer"
                    >
                      {user.username} ({user.email})
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedUser && (
              <div className="mt-2 p-2 bg-gray-50 rounded-lg flex justify-between items-center">
                <div>
                  <span className="font-medium">{selectedUser.username}</span>
                  <span className="text-sm text-gray-500 ml-2">{selectedUser.email}</span>
                </div>
                <button
                  onClick={() => {
                    setSelectedUser(null);
                    setUserSearchQuery('');
                  }}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            )}
          </div>

          {/* Notification Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              عنوان اعلان
            </label>
            <input
              type="text"
              placeholder="عنوان را وارد کنید..."
              className="px-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-[#191970] focus:border-[#191970]"
              value={notificationTitle}
              onChange={(e) => setNotificationTitle(e.target.value)}
            />
          </div>

          {/* Notification Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              متن پیام
            </label>
            <textarea
              placeholder="متن پیام را وارد کنید..."
              rows={4}
              className="px-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-[#191970] focus:border-[#191970]"
              value={notificationText}
              onChange={(e) => setNotificationText(e.target.value)}
            ></textarea>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg shadow-sm"
          >
            لغو
          </button>
          <button
            onClick={onSend}
            className="bg-[#191970] hover:bg-[#0F0F4B] text-white px-4 py-2 rounded-lg shadow-sm"
          >
            <i className="fas fa-paper-plane mr-2"></i>
            ارسال اعلان
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendNotificationModal;
