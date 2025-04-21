import React , { useState ,useEffect } from "react";
import Swal from "sweetalert2";  
import { motion } from 'framer-motion'; 
import { FaUniversity } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { IoIosNotificationsOutline } from "react-icons/io";
import { TbMapPinSearch } from "react-icons/tb";
import { TbMapSearch } from "react-icons/tb";
import { useAuth } from '../AuthContext/AuthContext';
import Cookies from 'js-cookie';
const Navbar = ()=>{
  const { logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const [token, setToken] = useState(Cookies.get('auth_token'));

    useEffect(() => {
      const interval = setInterval(() => {
        setToken(Cookies.get('auth_token'));
      }, 1000); // Check every second

      return () => clearInterval(interval);
    }, []);

    const handleLinks=(link)=>{
      navigate(link)
    }

    const handleLogOut = () => {
      Cookies.remove('auth_token');  
      logout();
      Swal.fire({
                position: "top-end",
                icon: "success",
                title: " خارج شدید",
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
      console.log(Cookies.get('auth_token'));
      
  };

    return(
        <motion.div 
        initial={{ y: -100, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 1 }} className="fixed w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100" dir='rtl'>
        <div  className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TbMapPinSearch className=" text-blue-600 text-4xl absolute top-[25%] right-[11.5%]"/>
              <TbMapSearch className="z-10 text-blue-600 text-6xl  opacity-10 "/>
             
              <span className="text-3xl font-bold text-gray-800">پیداچی</span>
            </div>
            <div className="sm:hidden">
              {isMenuOpen ? (
                <FaUniversity onClick={toggleMenu} className="h-6 w-6 cursor-pointer" strokeWidth={2} />
              ) : (
                <FaUniversity onClick={toggleMenu} className="h-6 w-6 cursor-pointer" strokeWidth={2} />
              )}
            </div>
            <nav className={`sm:flex ${isMenuOpen ? 'block fixed inset-x-0 top-full left-0 w-4/5 m-auto sm:w-auto sm:relative sm:bg-transparent bg-white shadow-lg' : 'hidden'} mt-3 rounded-lg p-6 sm:p-0 z-10`}>
              <ul className="flex flex-col items-center sm:flex-row sm:space-x-4 gap-4">
                  {!token ? 
                  ( <li onClick={()=>handleLinks('login')} className="relative w-full text-center text-gray-600 sm:hover:bg-transparent hover:bg-gray-100 sm:hover:text-blue-900 hover:text-gray-800 hover:rounded-xl  px-2 py-2 cursor-pointer whitespace-nowrap !rounded-button transition-colors duration-300 sm:transition-all  sm:after:content-[''] sm:after:absolute sm:after:block sm:after:w-0 after:h-0.5 sm:after:bg-blue-600 sm:after:transition-all sm:after:duration-300 sm:after:left-1/2 sm:after:bottom-0 sm:hover:after:w-full sm:hover:after:left-0">
                  ورود/ثبت‌نام  
                  </li>):
                ( <>
                <li  onClick={handleLogOut} className="  relative w-full text-center text-gray-600 sm:hover:bg-transparent hover:bg-gray-100 sm:hover:text-blue-900 hover:text-gray-800 hover:rounded-xl  px-2 py-2 cursor-pointer whitespace-nowrap !rounded-button transition-colors duration-300 sm:transition-all  sm:after:content-[''] sm:after:absolute sm:after:block sm:after:w-0 after:h-0.5 sm:after:bg-blue-600 sm:after:transition-all sm:after:duration-300 sm:after:left-1/2 sm:after:bottom-0 sm:hover:after:w-full sm:hover:after:left-0">
                    خروج
                  </li>
                  <li onClick={()=>handleLinks('userInfo')} className="relative w-full text-center text-gray-600 sm:hover:bg-transparent hover:bg-gray-100 sm:hover:text-blue-900 hover:text-gray-800 hover:rounded-xl  px-2 py-2 cursor-pointer whitespace-nowrap !rounded-button transition-colors duration-300 sm:transition-all  sm:after:content-[''] sm:after:absolute sm:after:block sm:after:w-0 after:h-0.5 sm:after:bg-blue-600 sm:after:transition-all sm:after:duration-300 sm:after:left-1/2 sm:after:bottom-0 sm:hover:after:w-full sm:hover:after:left-0">
                    اطلاعات کاربر
                  </li>
                </>) }
                        
                  <li onClick={()=>handleLinks('sendRequest')} className="relative w-full text-center text-gray-600 sm:hover:bg-transparent hover:bg-gray-100 sm:hover:text-blue-900 hover:text-gray-800 hover:rounded-xl px-2 py-2 cursor-pointer whitespace-nowrap !rounded-button transition-colors duration-300 sm:transition-all  sm:after:content-[''] sm:after:absolute sm:after:block sm:after:w-0 after:h-0.5 sm:after:bg-blue-600 sm:after:transition-all sm:after:duration-300 sm:after:left-1/2 sm:after:bottom-0 sm:hover:after:w-full sm:hover:after:left-0">
                    ثبت درخواست
                  </li>
                  <li className="relative w-full text-blue-600 sm:hover:bg-transparent hover:bg-gray-100 sm:hover:text-blue-700 hover:text-blue-800 hover:rounded-xl  py-2 cursor-pointer whitespace-nowrap !rounded-button transition-colors duration-300">
                    <IoIosNotificationsOutline className="text-3xl m-auto"/>
                  </li>
              </ul>
            </nav>
            </div>
      </motion.div>
    )
}

export default Navbar;