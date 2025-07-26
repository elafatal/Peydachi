import React , { useState ,useEffect } from "react";
import axiosInstance from '../axiosInstance';
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { isLoggedIn } from '../auth';
const Notifications=()=>{
    const navigate = useNavigate();
    const [unreadNotif , setUnreadNotif] = useState({})
    const [isUnreadNotif,setisUnreadNotif]=useState(false)
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);


    useEffect(() => {
      let intervalId;
    
      const GetUnreadNotif = async () => {
        if (isLoggedIn()) {
          try {
            const response = await axiosInstance.get('/notification/get_notif_count_and_first_three_notifs');
            setUnreadNotif(response.data);
            setisUnreadNotif(true);
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
        }
      };
    
      GetUnreadNotif();
      intervalId = setInterval(GetUnreadNotif, 10000); 
    
      return () => clearInterval(intervalId);
    }, []);
    
    
      const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
        setSelectedNotification(null); 
      };
    
      const handleTitleClick = (notif) => {
        setSelectedNotification(notif);
        navigate(`/AllNotification?id=${notif.id}`);

      };
      return (
        <div className="relative w-fit m-auto">
            {unreadNotif.notif_count > 0 ? (
               <IoIosNotifications onClick={toggleDropdown} data-testid="notif-icon" className="text-3xl" />
            ) : (
              <IoIosNotificationsOutline onClick={toggleDropdown} data-testid="notif-icon" className="text-3xl" />
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

            {Array.isArray(unreadNotif.first_three_notifs) && unreadNotif.first_three_notifs.length > 0 ? (
              unreadNotif.first_three_notifs.slice(0, 3).map((n, index) => (
                <div
                  key={n.id}
                  className="px-4 py-3 cursor-pointer hover:bg-gray-100 transition-all duration-300"
                  onClick={() => {
                    handleTitleClick(n);
                    setShowDropdown(false);
                  }}
                >
                  {n.title}
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-sm">اعلان جدیدی ندارید</div>
            )}

               <div
                  className={`px-4 py-3 text-gray-800 cursor-pointer border-t border-gray-100 hover:bg-gray-100 transition-all duration-300`}
                  onClick={() => {
                    navigate('/AllNotification', { replace: true });
                    setShowDropdown(false);
                }}
                >
                  مشاهده‌ی همه‌ی اعلان‌ها
                </div>
            </motion.div>
          )}
        </AnimatePresence>


     
        </div>
    );
}
export default Notifications