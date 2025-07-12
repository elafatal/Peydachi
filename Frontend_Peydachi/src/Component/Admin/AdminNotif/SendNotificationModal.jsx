import React from 'react';

const SendNotificationModal = ({
  isOpen,
  onClose,
  onSend,
  userSearchQuery,
  setUserSearchQuery,
  selectedUser,
  setSelectedUser,
  notificationTitle,
  setNotificationTitle,
  notificationText,
  setNotificationText,
  handleSearchUser,
  searchResult,
  setSelectedUserId
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
      {/* فیلد جستجو */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="نام کاربری"
          value={userSearchQuery}
          onChange={(e) => setUserSearchQuery(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={handleSearchUser}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          جستجو
        </button>

      </div>
      {searchResult.length !=0 ?
            <div  className="mt-1 max-h-40 overflow-scroll z-50 block w-4/5  border border-gray-300 rounded-md shadow-sm py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
              {searchResult.map(user => (
              <span onClick={()=>{setSelectedUserId(user.id) , setUserSearchQuery(user.username)}} className='cursor-pointer block p-2 hover:bg-blue-100 transition-all duration-300' key={user.id} > {user.username}
              </span>
              ))}
        </div> : null}


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
