// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import { useNavigate } from 'react-router-dom';
import React, { useState , useEffect } from 'react';
import {
    FaCog,
    FaClock,
    FaArchive,
    FaTrashAlt,
    FaBell,
    FaCheckDouble,
    FaBellSlash,
    FaTimes,
    FaChartPie,
    FaCheckCircle,
    FaComment,
    FaUpload
  } from 'react-icons/fa';
  import { IoArrowBackCircleOutline } from "react-icons/io5";
  import axiosInstance from '../axiosInstance';
  import { BiMessageRoundedCheck } from "react-icons/bi";
const AllNotifPage= () => {
    const navigate = useNavigate();
  // Sample notification data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      sender: 'Team Project',
      content: 'Alex commented on your project proposal: "Great work on the analysis section! I think we should expand on the market research findings."',
      time: '10 minutes ago',
      read: false,
      type: 'mention',
      priority: 'high'
    },
    {
      id: 2,
      sender: 'System',
      content: 'Your account security was enhanced. We\'ve added two-factor authentication to your login process.',
      time: '1 hour ago',
      read: false,
      type: 'system',
      priority: 'medium'
    },
    {
      id: 3,
      sender: 'Calendar',
      content: 'Reminder: You have a meeting with the design team tomorrow at 10:00 AM.',
      time: '3 hours ago',
      read: true,
      type: 'reminder',
      priority: 'high'
    },
    {
      id: 4,
      sender: 'Sarah Miller',
      content: 'I\'ve shared the updated document with you. Please review it when you have a chance and let me know your thoughts.',
      time: 'Yesterday',
      read: true,
      type: 'mention',
      priority: 'medium'
    },
    {
      id: 5,
      sender: 'Task Manager',
      content: 'Task "Finalize Q2 Report" is due in 2 days. 3 of 5 items are completed.',
      time: 'Yesterday',
      read: true,
      type: 'task',
      priority: 'low'
    }
  ]);
  const [data,setData]=useState([])
      useEffect(() => {
        const GetUnreadNotif = async () => {
          try {
            const response = await axiosInstance.post('/notification/get_all_self_unread_notifications', {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
            setData(response.data);
            console.log(response.data);
          } catch (error) {
            console.log(error); 
          } 
        };
        GetUnreadNotif();
      }, []);

  // State for expanded notification
  const [expandedId, setExpandedId] = useState(null);
  
  // State for active filter
  const [activeFilter, setActiveFilter] = useState('all');
  
  // State for settings panel
  const [showSettings, setShowSettings] = useState(false);
  
  // State for notification stats
  const [showStats, setShowStats] = useState(true);
  
  // Settings state
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: false,
    soundAlerts: true,
    quietHours: false
  });

  // Toggle notification read status
  const toggleReadStatus = () => {
    e.stopPropagation();
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: !notification.read } : notification
    ));
  };

  const goHome=()=>{
    navigate('/', { replace: true });
  }

  // Delete notification
  const deleteNotification = () => {
    e.stopPropagation();
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  // Archive notification
  const archiveNotification = () => {
    e.stopPropagation();
    // In a real app, we would move this to an archive collection
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  // Toggle settings
  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  // Filter notifications
  const filteredNotifications = notifications.filter(notification => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return !notification.read;
    if (activeFilter === 'mentions') return notification.type === 'mention';
    if (activeFilter === 'high') return notification.priority === 'high';
    return true;
  });

  // Calculate notification stats
  const notificationStats = {
    total: notifications.length,
    unread: notifications.filter(n => !n.read).length,
    mentions: notifications.filter(n => n.type === 'mention').length,
    highPriority: notifications.filter(n => n.priority === 'high').length
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans flex flex-col" dir='ltr'>
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 border-b border-gray-100">
            <div className="flex items-center">
              <h1 className="text-2xl font-semibold text-blue-600">Notifications</h1>
              <span className="ml-3 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {notificationStats.unread} unread
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <button 
                onClick={markAllAsRead}
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors cursor-pointer !rounded-button whitespace-nowrap"
              >
                Mark all as read
              </button>
              <button 
                onClick={goHome}
                className="text-blue-600 hover:text-blue-700 transition-colors cursor-pointer !rounded-button whitespace-nowrap"
                aria-label="Notification settings"
              >
                <IoArrowBackCircleOutline className='text-3xl inline' />
              </button>
            </div>
          </div>
          
          {/* Filter tabs */}
          <div className="flex space-x-1 py-2">
            {['all', 'unread', 'mentions', 'high'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors !rounded-button whitespace-nowrap ${
                  activeFilter === filter
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {filter === 'high' ? 'High Priority' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                {filter === 'unread' && notificationStats.unread > 0 && (
                  <span className="ml-1 text-xs bg-blue-200 text-blue-800 px-1.5 rounded-full">
                    {notificationStats.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow flex max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="w-full flex gap-6">
          {/* Left column - Notifications */}
          <div className="flex-grow">
            {filteredNotifications.length > 0 ? (
              <div className="space-y-4">
                {filteredNotifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className={`bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 ${
                      expandedId === notification.id ? 'ring-2 ring-blue-300' : 'hover:shadow-md'
                    } ${!notification.read ? 'border-l-4 border-blue-500' : ''}`}
                  >
                    <div 
                      className="p-4 cursor-pointer flex items-start group"
                      onClick={() => setExpandedId(expandedId === notification.id ? null : notification.id)}
                    >
                      {/* Icon based on notification type */}
                      <div className={`mr-4 flex-shrink-0 rounded-full p-2 ${
                        notification.type === 'mention' ? 'bg-blue-100 text-blue-600' :
                        notification.type === 'system' ? 'bg-purple-100 text-purple-600' :
                        notification.type === 'reminder' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                       <BiMessageRoundedCheck/>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notification.sender}
                            {notification.priority === 'high' && (
                              <span className="ml-2 text-xs bg-red-100 text-red-800 px-1.5 py-0.5 rounded">
                                High Priority
                              </span>
                            )}
                          </h3>
                          <span className="text-xs text-gray-500 ml-2 flex items-center">
                          <FaClock className='mr-1 inline'/>
                            {notification.time}
                          </span>
                        </div>
                        <p className={`mt-1 text-sm ${!notification.read ? 'text-gray-800' : 'text-gray-600'}`}>
                          {expandedId === notification.id 
                            ? notification.content 
                            : notification.content.length > 100 
                              ? `${notification.content.substring(0, 100)}...` 
                              : notification.content}
                        </p>
                        
                        {/* Action buttons - only show on expanded or hover */}
                        <div className={`mt-3 flex space-x-2 ${expandedId === notification.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                          <button 
                            onClick={(e) => toggleReadStatus(notification.id, e)}
                            className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer !rounded-button whitespace-nowrap"
                          >
                            {notification.read ? 'Mark as unread' : 'Mark as read'}
                          </button>
                          <button 
                            onClick={(e) => archiveNotification(notification.id, e)}
                            className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer !rounded-button whitespace-nowrap"
                          >
                             <FaArchive className='mr-1 inline' />
                            Archive
                          </button>
                          <button 
                            onClick={(e) => deleteNotification(notification.id, e)}
                            className="text-xs px-2 py-1 rounded bg-gray-100 text-red-600 hover:bg-red-100 transition-colors cursor-pointer !rounded-button whitespace-nowrap"
                          >
                            <FaTrashAlt className='mr-1 inline'/>
                            Delete
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
                <h3 className="text-xl font-medium text-gray-700 mb-2">No notifications</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  When you receive notifications, they will appear here. Check back later or adjust your notification settings.
                </p>
              </div>
            )}
          </div>
          
          {/* Right column - Stats and Quick Actions */}
          <div className="w-80 hidden lg:block">
            {showStats && (
              <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Notification Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total</span>
                    <span className="font-medium">{notificationStats.total}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Unread</span>
                    <span className="font-medium text-blue-600">{notificationStats.unread}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Mentions</span>
                    <span className="font-medium">{notificationStats.mentions}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">High Priority</span>
                    <span className="font-medium text-red-600">{notificationStats.highPriority}</span>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100">
                 
                  <div className="grid grid-cols-1 gap-2">
                    <button className="text-xs px-3 py-3 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors cursor-pointer !rounded-button whitespace-nowrap">
                    <FaCheckDouble className='mr-1 inline' />
                      Mark all read
                    </button>
                    
              
                  </div>
                </div>
              </div>
            )}
            
            <div className="bg-white rounded-lg shadow-sm p-5">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Recent Activity</h3>
              <div className="space-y-3">
               
               
                
                 
              </div>
              <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800 cursor-pointer !rounded-button whitespace-nowrap">
                View all activity
              </button>
            </div>
          </div>
        </div>
      </main>

     
      {/* Mobile floating action button for settings */}
      <div className="lg:hidden fixed bottom-6 right-6 flex flex-col space-y-3">
        <button 
          onClick={() => setShowStats(!showStats)}
          className="bg-white text-blue-600 p-4 rounded-full shadow-lg hover:bg-blue-50 transition-colors cursor-pointer !rounded-button whitespace-nowrap"
        >
        <FaChartPie className='inline'/>
         
        </button>
       
      </div>

  
      {/* Mobile stats panel */}
    {showStats && (
        <div className="lg:hidden fixed bottom-24 right-6 bg-white rounded-lg shadow-lg p-4 w-64 ">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium text-gray-800">Notification Stats</h3>
            <button 
              onClick={() => setShowStats(false)}
              className="text-gray-400 hover:text-gray-600 cursor-pointer !rounded-button whitespace-nowrap"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="bg-blue-50 p-2 rounded">
              <div className="text-lg font-semibold text-blue-600">{notificationStats.total}</div>
              <div className="text-xs text-gray-600">Total</div>
            </div>
            <div className="bg-blue-50 p-2 rounded">
              <div className="text-lg font-semibold text-blue-600">{notificationStats.unread}</div>
              <div className="text-xs text-gray-600">Unread</div>
            </div>
            <div className="bg-blue-50 p-2 rounded">
              <div className="text-lg font-semibold text-blue-600">{notificationStats.mentions}</div>
              <div className="text-xs text-gray-600">Mentions</div>
            </div>
            <div className="bg-red-50 p-2 rounded">
              <div className="text-lg font-semibold text-red-600">{notificationStats.highPriority}</div>
              <div className="text-xs text-gray-600">High Priority</div>
            </div>
          </div>
        </div>
      )} 
    
    </div>
  );
};

export default AllNotifPage;
