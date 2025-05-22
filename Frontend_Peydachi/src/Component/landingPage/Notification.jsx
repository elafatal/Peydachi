import React , { useState ,useEffect } from "react";
import axiosInstance from '../axiosInstance';
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
const Notifications=()=>{
    const [notif , setNotif] = useState([])
    const [unreadNotif , setUnreadNotif] = useState([])
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


      useEffect(() => {
        const GetUnreadNotif = async () => {
          try {
            const response = await axiosInstance.post('/notification/get_all_self_unread_notifications', {
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
      };
      return (
        <div className="relative w-fit m-auto">
            {isUnreadNotif ? (
                <IoIosNotifications onClick={toggleDropdown} className="text-3xl" />
            ) : (
                <IoIosNotificationsOutline className="text-3xl" />
            )}
            {unreadNotif.length > 0 && (
                <span className="absolute -top-0 -right-0 bg-red-600 text-white text-xs font-bold rounded-full h-3 w-3 flex items-center justify-center">
                    <span className="text-[8px] pt-1">{unreadNotif.length}</span>
                </span>
            )}
            {showDropdown && (
        <div className="absolute top-10 left-0 w-64 bg-white border shadow-md rounded-md p-2 z-10">
          <h3 className="font-bold mb-2">Unread Notifications</h3>
          {unreadNotif.slice(0, 3).map((n,index) => (
            // <div
            //   key={n.id}
            //   className="cursor-pointer text-sm text-blue-600 hover:underline mb-1"
            //   onClick={() => handleTitleClick(n)}
            // >
            //   {n.title}
            // </div>
            <div
            key={n.id}
            className={`px-4 py-3 cursor-pointer ${
              index === n.id ? 'bg-blue-50' : 'hover:bg-gray-100'
            }`
           }
           onClick={() => handleTitleClick(n)}
          >
            {n.title}
          </div>
          ))}
          {unreadNotif.length === 0 && (
            <div className="text-gray-500 text-sm">No unread notifications</div>
          )}
        </div>
      )}

      {selectedNotification && (
        <div className="absolute top-36 right-0 w-80 bg-white border shadow-md rounded-md p-4 z-20">
          <h4 className="font-semibold mb-2">{selectedNotification.title}</h4>
          <p className="text-sm text-gray-700">{selectedNotification.text}</p>
        </div>
      )}
        </div>
    );
}
export default Notifications