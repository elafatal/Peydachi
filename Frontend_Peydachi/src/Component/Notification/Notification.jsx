import React , { useState ,useEffect } from "react";
import axiosInstance from '../axiosInstance';
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";

const Notifications=()=>{
    const navigate = useNavigate();
    const [notif , setNotif] = useState([])
    const [unreadNotif , setUnreadNotif] = useState({})
    const [isUnreadNotif,setisUnreadNotif]=useState(false)
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);
  
    useEffect(() => {
        const GetAllNotif = async () => {
          try {
            const response = await axiosInstance.post('/notification/get_all_self_notifications', {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
            setNotif(response.data);
            console.log(response.data);
          } catch (error) {
            console.log(error); 
          } 
        };
        GetAllNotif();
      }, []);


      // useEffect(() => {
      //   const GetUnreadNotif = async () => {
      //     try {
      //       const response = await axiosInstance.post('/notification/get_all_self_unread_notifications', {
      //         headers: {
      //           'Content-Type': 'multipart/form-data'
      //         }
      //       });
      //       setUnreadNotif(response.data);
      //       setisUnreadNotif(true)
      //       console.log(response.data);
      //     } catch (error) {
      //       console.log(error); 
      //     } 
      //   };
      //   GetUnreadNotif();
      // }, []);

      const goToNotifPage =()=>{
        navigate('/', { replace: true });
      }

      useEffect(() => {
        const GetUnreadNotif = async () => {
          try {
            const response = await axiosInstance.get('/notification/get_notif_count_and_first_three_notifs', {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
            setUnreadNotif(response.data);
            setisUnreadNotif(true)
            console.log(response.data);
          } catch (error) {
            console.log(error); 
          } 
        };
        GetUnreadNotif();
      }, []);
    
      const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
        setSelectedNotification(null); 
      };
    
      const handleTitleClick = (notif) => {
        setSelectedNotification(notif);
        navigate('/AllNotification', { replace: true });
      };
      return (
        <div className="relative w-fit m-auto">
            {isUnreadNotif ? (
                <IoIosNotifications onClick={toggleDropdown} className="text-3xl" />
            ) : (
                <IoIosNotificationsOutline className="text-3xl" />
            )}
            {unreadNotif.notif_count > 0 && (
                <span className="absolute -top-0 -right-0 bg-red-600 text-white text-xs font-bold rounded-full h-3 w-3 flex items-center justify-center">
                    <span className="text-[8px] pt-1">{unreadNotif.notif_count}</span>
                </span>
            )}
       <AnimatePresence>
          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute top-10 left-0 w-56 bg-white shadow-lg border border-gray-100 rounded-md p-2 z-10"
            >
              {unreadNotif.first_three_notifs.slice(0, 3).map((n, index) => (
                <div
                  key={n.id}
                  className={`px-4 py-3 cursor-pointer hover:bg-gray-100 transition-all duration-300`}
                  onClick={() => handleTitleClick(n)}
                >
                  {n.title}
                </div>
              ))}
              {unreadNotif.first_three_notifs.length === 0 && (
                <div className="text-gray-500 text-sm">اعلان جدیدی ندارید</div>
              )}
            </motion.div>
          )}
        </AnimatePresence>


     
        </div>
    );
}
export default Notifications