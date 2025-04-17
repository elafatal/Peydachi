import React , { useState ,useEffect } from "react";
import { motion } from 'framer-motion'; 
import { FaUniversity } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";

const Navbar = ()=>{
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    return(
        <motion.div 
        initial={{ y: -100, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 1 }} className="fixed w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100" dir='rtl'>
        <div  className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-location-crosshairs text-blue-600 text-2xl"></i>
              <span className="text-2xl font-bold text-gray-800">پیداچی</span>
            </div>
            <div className="sm:hidden">
                      {isMenuOpen ? (
                        <FaUniversity onClick={toggleMenu} className="h-6 w-6 cursor-pointer" strokeWidth={2} />
                      ) : (
                        <FaUniversity onClick={toggleMenu} className="h-6 w-6 cursor-pointer" strokeWidth={2} />
                      )}
                    </div>
                    <nav className={`sm:flex ${isMenuOpen ? 'block fixed inset-x-0 top-full left-0 w-4/5 m-auto  sm:w-auto sm:relative sm:bg-transparent bg-white shadow-lg ' : 'hidden'} mt-3 rounded-lg p-6 sm:p-0 z-10`}>
                      <ul className="flex flex-col items-center sm:flex-row sm:space-x-4 gap-4 ">
                        <li className="relative text-gray-600 hover:text-gray-800 px-2 py-2 cursor-pointer whitespace-nowrap !rounded-button">
                          ورود/ثبت نام
                        </li>
                        <li className="relative text-gray-600 hover:text-gray-800 px-2 py-2 cursor-pointer whitespace-nowrap !rounded-button">ثبت درخواست </li>
                        <li className="relative  text-blue-600 py-2  cursor-pointer whitespace-nowrap !rounded-button">
                          <IoIosNotificationsOutline className="text-3xl"/>
                        </li>
                      </ul>
                    </nav>
            </div>
      </motion.div>
    )
}

export default Navbar;