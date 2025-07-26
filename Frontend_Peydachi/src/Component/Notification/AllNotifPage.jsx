import { useNavigate } from 'react-router-dom';
import React, { useState , useEffect } from 'react';
import {
    FaClock,
    FaTrashAlt,
    FaBell,
    FaCheckDouble,
    FaSearch,
    FaTimes,
  } from 'react-icons/fa';
  import { isLoggedIn } from '../auth';
  import { useLocation } from 'react-router-dom';
  import { FaRegFaceRollingEyes } from "react-icons/fa6";
  import axiosInstance from '../axiosInstance';
  import { BiMessageRoundedCheck } from "react-icons/bi";
  import { formatDistanceToNow } from 'date-fns';
  import faIR from 'date-fns/locale/fa-IR';
  import Swal from "sweetalert2";  
const AllNotifPage= () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const notifId = searchParams.get('id');
  const [notifications, setNotifications] = useState([]);
  const [unredNotifications,setUnreadNotifications]=useState([])
  const [loading, setLoading] = useState(true);
  const [selectedNotification, setSelectedNotification] = useState(null);
      const [notificationsCache, setNotificationsCache] = useState({
        all: null,
        unread: null,
      });
      const [searchQuery, setSearchQuery] = useState('');
      const filteredNotifications = notifications.filter(notification =>
        notification.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notification.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      

  const [showModal, setShowModal] = useState(false);

  const [activeFilter, setActiveFilter] = useState('unread');
  useEffect(() => {
    const getNotifById =async()=>{
      if (notifId) {
        try {
          const response = await axiosInstance.post('/notification/get_notification_by_id', { notification_id: Number(notifId) });
          setSelectedNotification(response.data)
          console.log(response.data);
        } catch (error) {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: error.response?.data?.message || error.response?.data?.detail || "خطای ناشناخته‌ای رخ داده است",
            showConfirmButton: false,
            timer: 2000,
            toast: true,
            customClass: {
              popup: 'w-60 h-18 text-sm flex items-center justify-center',
              title: 'text-xs',
              content: 'text-xs',
              icon: 'text-xs mb-2',
            },
          });        } 
      }
    }
    getNotifById();
  }, [notifId]);

useEffect(() => {
  const fetchNotifications = async () => {
    setLoading(true);
    if (notificationsCache[activeFilter]) {
      setNotifications(notificationsCache[activeFilter]);
      setLoading(false);
      return;
    }

    let endpoint = '/notification/get_all_self_notifications';
    if (activeFilter === 'unread') {
      endpoint = '/notification/get_all_self_unread_notifications';
    }

    try {
      const response = await axiosInstance.get(endpoint, {
        headers: { 'text-Type': 'multipart/form-data' }
      });
      setNotifications(response.data);
      setNotificationsCache((prev) => ({
        ...prev,
        [activeFilter]: response.data,
      }));
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error.response?.data?.message || error.response?.data?.detail || "خطای ناشناخته‌ای رخ داده است",
        showConfirmButton: false,
        timer: 2000,
        toast: true,
        customClass: {
          popup: 'w-60 h-18 text-sm flex items-center justify-center',
          title: 'text-xs',
          content: 'text-xs',
          icon: 'text-xs mb-2',
        },
      });;
    } finally {
      setLoading(false);
    }
  };

  fetchNotifications();
}, [activeFilter]);


  // State for expanded notification
  const [expandedId, setExpandedId] = useState(null);


  const [showStats, setShowStats] = useState(true);

   const formatRelativeDate = (dateString) => {
      return formatDistanceToNow(new Date(dateString), {
        addSuffix: true,
        locale: faIR,
      });
    };


    const toggleReadStatus = async (id, e) => {
      e.stopPropagation();
      if (activeFilter === 'unread') {
        setNotifications((prevNotifications) =>
          prevNotifications.filter((notification) => notification.id !== id)
        );
      } else {
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) =>
            notification.id === id
              ? { ...notification, has_seen: true }
              : notification
          )
        );
      }  
      try {
        const response=await axiosInstance.put('/notification/review_notification', {
          notification_id: id,
        });
        console.log(`Notification ${id} marked as read on server.`);
    
        
        setNotificationsCache((prevCache) => ({
          ...prevCache,
          unread: prevCache.unread
            ? prevCache.unread.filter((n) => n.id !== id)
            : null,
          all: prevCache.all
            ? prevCache.all.map((n) =>
                n.id === id ? { ...n, has_seen: true } : n
              )
            : null,
        }));
        if (response.status === 200) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: " انجام شد",
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
        }else{
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "اعلان از قبل مشاهده شده است",
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
               
      } catch (error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.response?.data?.message || error.response?.data?.detail || "خطای ناشناخته‌ای رخ داده است",
          showConfirmButton: false,
          timer: 2000,
          toast: true,
          customClass: {
            popup: 'w-60 h-18 text-sm flex items-center justify-center',
            title: 'text-xs',
            content: 'text-xs',
            icon: 'text-xs mb-2',
          },
        });
      }
    };
    



  // Delete notification
  const deleteNotification =async () => {
    e.stopPropagation();
    try {
      const response = await axiosInstance.delete('/notification/user_delete_self_notif', { data:{} });
      setSelectedNotification(response.data)
      console.log(response.data);
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error.response?.data?.message || error.response?.data?.detail || "خطای ناشناخته‌ای رخ داده است",
        showConfirmButton: false,
        timer: 2000,
        toast: true,
        customClass: {
          popup: 'w-60 h-18 text-sm flex items-center justify-center',
          title: 'text-xs',
          content: 'text-xs',
          icon: 'text-xs mb-2',
        },
      });
    } 
  };



  const notificationStats = {
    total: notificationsCache.all ? notificationsCache.all.length : 0,
    unhas_seen: notificationsCache.unread ? notificationsCache.unread.length : 0
  };
  
  const markAllAsRead = async () => {
    try {
       const response =await axiosInstance.put('/notification/mark_all_notifs_as_seen');
       Swal.fire({
        position: "top-end",
        icon: "success",
        title: " انجام شد",
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
    } catch (err) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: err.response?.data?.message || err.response?.data?.detail || "خطای ناشناخته‌ای رخ داده است",
        showConfirmButton: false,
        timer: 2000,
        toast: true,
        customClass: {
          popup: 'w-60 h-18 text-sm flex items-center justify-center',
          title: 'text-xs',
          content: 'text-xs',
          icon: 'text-xs mb-2',
        },
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-900 flex flex-col" dir='rtl'>
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Filter tabs */}
          <div className="flex justify-between  pb-2 pt-4">
            <div className="flex space-x-4">
            {['all', 'unread'].map((filter) => (
            <div className="relative" key={filter}>
              <button
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors !rounded-button whitespace-nowrap ${
                  activeFilter === filter
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {filter === 'all' ? 'همه' : 'خوانده نشده'}
              </button>
              
         
              {filter === 'unread' && notificationStats.unhas_seen > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
               <span className="text-[8px] pt-1">{filter === 'unread' && notificationStats.unhas_seen}</span> 
              </span>
              )}
         
             
            </div>
        ))}
            </div>
            <button onClick={markAllAsRead} className="text-xs px-3 py-3 bg-white text-blue-700 border-2 border-blue-700 rounded hover:bg-blue-100 transition-colors cursor-pointer !rounded-button whitespace-nowrap">
             <FaCheckDouble className='ml-1 inline' />
             خواندن همه‌ی اعلان‌ها
            </button>

          </div>
        </div>
      </header>
        <div className="flex flex-col md:flex-row gap-4 mt-6 w-11/12 m-auto">
            <div  dir='rtl' className="relative flex-1">
              <div className="flex items-center bg-white rounded-4xl shadow-md overflow-hidden w-5/6 m-auto">
                <div className="pr-5 text-gray-500"><FaSearch className='text-xl text-blue-500' /></div>
                <input value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} id='search_store' type="text" className="w-full py-4 px-4 text-gray-700 focus:outline-none border-none text-lg" placeholder="جستجو در اعلان‌ها"  />
                {searchQuery && (
                  <button
                    className="px-4 text-gray-500 hover:text-gray-700"
                    onClick={() => setSearchQuery('')}
                  >
                    <FaTimes />
                  </button>
                )}              </div>
            </div>
            
           
          </div>
      {/* Main text */}
      <main className="flex-grow flex max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="w-full flex gap-5">
          {/* right column - Notifications */}
          <div className="flex-grow">
          {loading ? (
              <div className="text-center py-20">
                <div className="inline-block w-12 h-12 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
                <p className="mt-4 text-sm text-gray-600">در حال بارگذاری اعلان‌ها...</p>
              </div>
            ) :filteredNotifications.length > 0 ? (
              <div className="space-y-4 w-full">
                {filteredNotifications.map((notification) => (
                  <div dir='rtl'
                    key={notification.id}
                    className={`bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 ${
                      expandedId === notification.id ? 'ring-2 ring-blue-300' : 'hover:shadow-md'
                    } ${!notification.has_seen ? 'border-r-4 border-blue-500' : ''}`}
                  >
                    <div 
                      className="p-4 cursor-pointer flex items-start group"
                      onClick={() => {
                        setExpandedId(expandedId === notification.id ? null : notification.id);
                        setSelectedNotification(notification); 
                        if (window.innerWidth < 1024) {
                          setShowModal(true); 
                        }
                      }}
                    >
                      {/* Icon based on notification type */}
                      <div className={`ml-4 flex-shrink-0 rounded-full p-2 ${
                        notification.type === 'mention' ? 'bg-blue-100 text-blue-600' :
                        notification.type === 'system' ? 'bg-purple-100 text-purple-600' :
                        notification.type === 'reminder' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                       <BiMessageRoundedCheck/>
                      </div>
                      
                      {/* text */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className={`font-medium ${!notification.has_seen ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notification.title}
                            
                          </h3>
                          <span className="text-xs text-gray-500 ml-2 flex items-center">
                          <FaClock className='ml-1 mb-1 inline'/>
                          {formatRelativeDate(notification.date_added)}
                          </span>
                        </div>
                        <p className={`mt-1 text-sm ${!notification.has_seen ? 'text-gray-800' : 'text-gray-600'}`}>
                        {notification.text.length > 100 
                          ? `${notification.text.substring(0, 100)}...` 
                          : notification.text}
                      </p>

                        {/* Action buttons - only show on expanded or hover */}
                        <div className={`mt-3 flex space-x-2 ${expandedId === notification.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                        <button 
                        onClick={(e) => toggleReadStatus(notification.id, e)}
                        disabled={notification.has_seen}
                        className={`text-xs px-2 py-1.5 rounded transition-colors cursor-pointer !rounded-button whitespace-nowrap
                          ${notification.has_seen 
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                            : 'bg-gray-100 text-green-700 hover:bg-green-200'}`}
                      >
                        {notification.has_seen ? 'خوانده شده' : 'خواندن'}
                        <FaRegFaceRollingEyes className='inline text-md mr-1' />
                      </button>

                          <button 
                            onClick={(e) => deleteNotification(notification.id, e)}
                            className="text-xs px-2 py-1 rounded bg-gray-100 text-red-600 hover:bg-red-100 transition-colors cursor-pointer !rounded-button whitespace-nowrap"
                          >
                            <FaTrashAlt className='ml-1 inline'/>
                            حذف
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                <div className="text-blue-500 mb-4">
                <FaBell className=" text-6xl opacity-30 inline"/>
                </div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">اعلانی ندارید! </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                وقتی اعلان‌هایی دریافت می‌کنید، اینجا نمایش داده می‌شوند. بعداً دوباره بررسی کنید یا تنظیمات اعلان‌های خود را تغییر دهید.
                </p>
              </div>
            )}
          </div>
          
          {/* left column - Stats and Quick Actions */}
          <div className="w-1/3 hidden lg:block sticky top-24 self-start">
            {showStats && selectedNotification && (
            <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                {selectedNotification.title}
              </h3>
              <p className="text-gray-700 text-sm whitespace-pre-line leading-relaxed">
                {selectedNotification.text}
              </p>
              <div className="mt-6 pt-4 border-t border-gray-100">         
                <div onClick={(e) => toggleReadStatus(selectedNotification.id, e)} className="grid grid-cols-1 gap-2">
                  <button className="text-xs px-3 py-3 bg-white text-green-700 border-2 border-green-700 rounded hover:bg-green-100 transition-colors cursor-pointer !rounded-button whitespace-nowrap">
                   <FaCheckDouble className='ml-1 inline' />
                   مشاهده
                  </button>
                            
                      
                </div>
              </div>
          </div>
          
        )}
           
          </div>
        </div>
      </main>


    {showModal && selectedNotification && (
      <div className="font-iran fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">{selectedNotification.title}</h3>
            <button
              onClick={() => setShowModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <p className="text-gray-700 text-sm whitespace-pre-line leading-relaxed">
            {selectedNotification.text}
          </p>
        </div>
      </div>
    )}

    </div>
  );
};

export default AllNotifPage;
