// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import axiosInstance from '../../axiosInstance';
import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';
import SendNotificationModal from './SendNotificationModal';
import Swal from "sweetalert2";
const AdminNotification = () => {
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationText, setNotificationText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(0);
    const [searchResult,setSearchResult]=useState([])
  // Mock data for demonstration

  useEffect(() => {
    const fetchLastNotifSent = async () => {
        try {
          const response = await axiosInstance.post('/admin/notification/get_last_n_sent_notifications_of_admin?n=12');
          console.log(response)
          setNotifications(response.data);
          setFilteredNotifications(response.data);
          setIsLoading(false);
        } catch (error) {
          console.log('last 12 notif sent errors:', error);
        }  
    };
  
    fetchLastNotifSent();
  }, []);


  useEffect(() => {
    const fetchLastNotifSent = async () => {
      let filtered = [...notifications];
      // Filter by type
      if (filterType === 'seen') {
        try {
          const response = await axiosInstance.post('/admin/notification/get_last_n_seen_notifications?n=12');
          filtered=response.data
        } catch (error) {
          console.log('last 9 seen notif errors:', error);
        }  
      } else if (filterType === 'unseen') {
        try {
          const response = await axiosInstance.post('/admin/notification/get_last_n_unseen_notifications?n=12');
          filtered=response.data
        } catch (error) {
          console.log('last 9 seen notif errors:', error);
        }  
      }
      
      // Filter by search query
      if (searchQuery) {
        filtered = filtered.filter(
          notif => 
            notif.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            notif.text.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    
    setFilteredNotifications(filtered);
  };

  fetchLastNotifSent();
   
  }, [filterType, searchQuery, notifications]);

  // Initialize notification stats chart
  useEffect(() => {
    if (!isLoading) {
      const chartDom = document.getElementById('notificationStatsChart');
      if (chartDom) {
        const myChart = echarts.init(chartDom);
        
        const seenCount = notifications.filter(n => n.has_seen).length;
        const unseenCount = notifications.filter(n => !n.has_seen).length;
        
        const option = {
          animation: false,
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '5%',
            left: 'center',
            textStyle: {
              color: '#333'
            }
          },
          series: [
            {
              name: 'Notification Status',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '18',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: seenCount, name: 'Seen', itemStyle: { color: '#191970' } },
                { value: unseenCount, name: 'Unseen', itemStyle: { color: '#4169E1' } }
              ]
            }
          ]
        };
        
        myChart.setOption(option);
        
        // Cleanup
        return () => {
          myChart.dispose();
        };
      }
    }
  }, [notifications, isLoading]);

  useEffect(() => {
    const fetchUserSuggestions = async () => {
      if (userSearchQuery.length > 1) {
        try {
          const response = await axiosInstance.post('/admin/user/search_users', { username: userSearchQuery });
          setIsUserDropdownOpen(true);
          setUserSuggestions(response.data);
        } catch (error) {
          console.log('search username error:', error);
        }
      } else {
        setUserSuggestions([]);
        setIsUserDropdownOpen(false);
      }
    };
  
    fetchUserSuggestions();
  }, [userSearchQuery]);
  

  const handleFilterChange = (type) => {
    setFilterType(type);
    setIsFilterMenuOpen(false);
  };

  const handleSearch = () => {
    // Search is already handled by useEffect
    showToastMessage('Search completed', 'success');
  };

  // const handleClearFilters = () => {
  //   setFilterType('all');
  //   setSearchQuery('');
  //   setUserSearchQuery('');
  //   setSelectedUser(null);
  //   setFilteredNotifications(notifications);
  //   showToastMessage('Filters cleared', 'success');
  // };

  const handleSearchUser=async()=>{
    try {
      const response = await axiosInstance.post('/admin/user/search_users', {username : userSearchQuery});
      console.log(response);
      setSearchResult(response.data)
    } catch (error) {
      console.log('search username error:', error);
    }
  }
  const handleDeleteNotification = (id) => {
    // Simulate API call
    setTimeout(() => {
      const updatedNotifications = notifications.filter(notif => notif.id !== id);
      setNotifications(updatedNotifications);
      showToastMessage('Notification deleted successfully', 'success');
    }, 500);
  };

  const handleDeleteAllSeen = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteAllSeen = () => {
    // Simulate API call
    setTimeout(() => {
      const updatedNotifications = notifications.filter(notif => !notif.has_seen);
      setNotifications(updatedNotifications);
      setIsDeleteModalOpen(false);
      showToastMessage('All seen notifications deleted', 'success');
    }, 500);
  };

  const handleSendNotification = async() => {
    if (!selectedUserId) {
      showToastMessage('یک کاربر را انتخاب کنید', 'error');
      return;
    }
    
    
    if (!notificationTitle.trim() || !notificationText.trim()) {
      showToastMessage('تمام فیلدها را پر کنید', 'error');
      return;
    }
    
    try {
      const response = await axiosInstance.post('/admin/notification/admin_send_notification', {user_id : selectedUserId , title:notificationTitle , text: notificationText});
      if (response.status === 201) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "خوش آمدید",
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
      setIsModalOpen(false);
      setNotificationTitle('');
      setNotificationText('');
      setSelectedUserId(null);
      setUserSearchQuery('');
    }
    } catch (error) {
       Swal.fire({
              position: "top-end",
              icon: "error",
              title: "خطا در ارسال پیغام",
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
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setUserSearchQuery(user.username);
    setIsUserDropdownOpen(false);
  };

  const showToastMessage = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const formatDate = (dateString) => {
    const now = new Date();
    const addedDate = new Date(dateString);
    
    const diffInMilliseconds = now - addedDate;
    const seconds = Math.floor(diffInMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
  
    if (seconds < 60) return 'لحظاتی پیش';
    if (minutes < 60) return `${minutes} دقیقه قبل`;
    if (hours < 24) return `${hours} ساعت قبل`;
    if (days < 7) return `${days} روز قبل`;
    if (weeks < 4) return `${weeks} هفته قبل`;
    if (months < 12) return `${months} ماه قبل`;
    return `${years} سال${years > 1 ? 's' : ''} گذشته`;
  };

  return (
    <div className="min-h-screen bg-gray-50" dir='ltr'>
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="flex justify-between w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#191970] hover:bg-[#0F0F4B] text-white px-4 py-2 rounded-lg shadow-sm transition-colors duration-200 ease-in-out !rounded-button whitespace-nowrap cursor-pointer"
            >
              <i className="fas fa-plus mr-2"></i>
              ارسال پیغام جدید
            </button>          
            <button
              onClick={handleDeleteAllSeen}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-sm transition-colors duration-200 ease-in-out ml-auto !rounded-button whitespace-nowrap cursor-pointer"
            >
              <i className="fas fa-trash-alt mr-2"></i>
              پاک کردن خوانده شده‌ها
            </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir='rtl'>
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-search text-gray-400"></i>
              </div>
              <input
                type="text"
                placeholder="جستجوی اعلان‌ها"
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-[#191970] focus:border-[#191970] text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="relative">
              <button
                onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                className="px-4 py-2 border border-gray-300 rounded-lg flex items-center bg-white hover:bg-gray-50 text-sm !rounded-button whitespace-nowrap cursor-pointer"
              >
                <i className="fas fa-filter mr-2 text-[#191970]"></i>
                {filterType === 'all' ? 'تمام اعلان‌ها' : 
                 filterType === 'seen' ? 'دیده شده‌ها' : 'دیده نشده‌ها '}
                <i className="fas fa-chevron-down ml-2 text-gray-500"></i>
              </button>
              
              {isFilterMenuOpen && (
                <div className="absolute z-10 mt-1 w-48 bg-white rounded-md shadow-lg">
                  <div className="py-1">
                    <button
                      onClick={() => handleFilterChange('all')}
                      className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 ${filterType === 'all' ? 'bg-gray-100 text-[#191970]' : 'text-gray-700'} cursor-pointer`}
                    >
                      تمام اعلان‌ها
                    </button>
                    <button
                      onClick={() => handleFilterChange('seen')}
                      className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 ${filterType === 'seen' ? 'bg-gray-100 text-[#191970]' : 'text-gray-700'} cursor-pointer`}
                    >
                      ‌دیده شده‌ها
                    </button>
                    <button
                      onClick={() => handleFilterChange('unseen')}
                      className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 ${filterType === 'unseen' ? 'bg-gray-100 text-[#191970]' : 'text-gray-700'} cursor-pointer`}
                    >
                      دیده نشده‌ها
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-user text-gray-400"></i>
                </div>
                <input
                  type="text"
                  placeholder="جستحو نام کاربری"
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-[#191970] focus:border-[#191970] text-sm"
                  value={userSearchQuery}
                  onChange={(e) => setUserSearchQuery(e.target.value)}
                />
              </div>
              
              {isUserDropdownOpen && userSuggestions.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto">
                  <div className="py-1">
                    {userSuggestions.map(user => (
                      <button
                        key={user.id}
                        onClick={() => handleUserSelect(user)}
                        className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 text-gray-700 cursor-pointer"
                      >
                        {user.username}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleSearch}
              className="bg-[#191970] hover:bg-[#0F0F4B] text-white px-4 py-2 rounded-lg shadow-sm transition-colors duration-200 ease-in-out !rounded-button whitespace-nowrap cursor-pointer"
            >
              <i className="fas fa-search mr-2"></i>
              جستجو
            </button>

          </div>
        </div>
        
        {/* Notifications List */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-[#191970] mb-4">
            {filterType === 'all' ? 'All Notifications' : 
             filterType === 'seen' ? 'Seen Notifications' : 'Unseen Notifications'}
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({filteredNotifications.length} {filteredNotifications.length === 1 ? 'notification' : 'notifications'})
            </span>
          </h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#191970]"></div>
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl text-gray-300 mb-4">
                <i className="fas fa-bell-slash"></i>
              </div>
              <p className="text-gray-500">No notifications found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredNotifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`border rounded-lg p-4 transition-all duration-200 hover:shadow-md relative ${
                    notification.has_seen ? 'bg-white' : 'bg-blue-50'
                  }`}
                >
                  {!notification.has_seen && (
                    <div className="absolute top-4 right-4 h-3 w-3 rounded-full bg-blue-500"></div>
                  )}
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-[#191970]">{notification.title}</h3>
                    <button 
                      onClick={() => handleDeleteNotification(notification.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                  <p className="text-gray-600 mt-2 text-sm">{notification.text}</p>
                  <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
                    <span>
                      <i className="fas fa-user mr-1"></i>
                      User ID: {notification.user_id}
                    </span>
                    <span>
                      <i className="far fa-clock mr-1"></i>
                      {formatDate(notification.date_added)}
                    </span>
                  </div>
                  <div className="mt-2 text-xs">
                    <span className={`px-2 py-1 rounded-full ${notification.has_seen ? 'bg-gray-100 text-gray-600' : 'bg-blue-100 text-blue-800'}`}>
                      {notification.has_seen ? 'Seen' : 'Unseen'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <SendNotificationModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onSend={handleSendNotification}
  userSearchQuery={userSearchQuery}
  setUserSearchQuery={setUserSearchQuery}
  notificationTitle={notificationTitle}
  setNotificationTitle={setNotificationTitle}
  notificationText={notificationText}
  setNotificationText={setNotificationText}
  handleSearchUser={handleSearchUser}
  searchResult={searchResult}
  setSelectedUserId={setSelectedUserId}
/>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 mx-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <i className="fas fa-exclamation-triangle text-red-500 text-xl"></i>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">حذف همه اعلان‌های مشاهده‌شده</h3>
              <p className="text-sm text-gray-500">
              آیا مطمئن هستید که می‌خواهید همه اعلان‌های دیده‌شده را حذف کنید؟ این اقدام قابل بازگشت نیست.
              </p>
            </div>
            
            <div className="mt-6 flex justify-center space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg shadow-sm transition-colors duration-200 ease-in-out !rounded-button whitespace-nowrap cursor-pointer"
              >
                لغو
              </button>
              <button
                onClick={confirmDeleteAllSeen}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-sm transition-colors duration-200 ease-in-out !rounded-button whitespace-nowrap cursor-pointer"
              >
                <i className="fas fa-trash-alt mr-2"></i>
                پاک کردن همه
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className={`fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg ${
          toastType === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white flex items-center z-50 transition-opacity duration-300`}>
          <i className={`mr-2 ${toastType === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'}`}></i>
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default AdminNotification;
