import React, { useState,useRef,useEffect } from 'react';
import { motion } from "framer-motion";
import Swal from "sweetalert2"; 
import axiosInstance from '../../axiosInstance';
import showErrorToast from '../../utils/showErrorToast';
const SignUp= ({showComponent,setshowComponent, setRememberMe,rememberMe,setPhoneVerificationData}) => {

  const [usernameError, setUsernameError] = useState('');
const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
  const [username, setUsername] = useState('');
  const [phone_number, setphone_number] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isValidUsername = (username) => {
    const regex = /^[a-zA-Z0-9_.-]+$/;
    return regex.test(username);
  };
  const lastCheckedUsernameRef = useRef('');
  const debounceRef = useRef(null);
  useEffect(() => {
    setUsernameError('');
    setIsUsernameAvailable(null);
    if (!username) return;
  
    if (!isValidUsername(username)) {
      setUsernameError("نام کاربری فقط باید شامل حروف انگلیسی، عدد و _ یا . باشد");
      return;
    }
  
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
  
    debounceRef.current = setTimeout(async () => {
      if (username === lastCheckedUsernameRef.current) return;
      try {
        const res = await axiosInstance.post('/user/is_username_available', {
          username,
        });
        lastCheckedUsernameRef.current = username;
        setIsUsernameAvailable(res.data);
        if (res.data) {
          setUsernameError('');
        } else {
          setUsernameError("این نام کاربری قبلاً ثبت شده است.");
        }
      } catch (err) {
        console.error(err);
        setUsernameError("خطا در ارتباط با سرور.");
      }
    }, 800); 
  
    return () => clearTimeout(debounceRef.current);
  }, [username]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidUsername(username)) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "نام کاربری فقط باید شامل حروف انگلیسی، عدد و _ یا . باشد",
        showConfirmButton: false,
        timer: 2000,
        toast: true,
        customClass: {
          popup: 'w-2 h-20 text-sm flex items-center justify-center',
          title: 'text-xs',
          content: 'text-xs pb-2 mb-2',
          icon: 'text-xs mb-2',
        },
      });
      return;
    }
    
    if (password !== password2) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "پسورد تایید نشد",
        showConfirmButton: false,
        timer: 1500,
        toast: true,
        customClass: {
          popup: 'w-2 h-15 text-sm flex items-center justify-center',
          title: 'text-xs',
          content: 'text-xs',
          icon: 'text-xs mb-2',
        },
      });
    }

    try {
      const response = await axiosInstance.post('/phone_verification/user_sign_up_phone_verification', {
        phone_number,
      });

      if (response.status === 200) {
        setPhoneVerificationData({ username, phone_number, password });
        setshowComponent('phoneVerify');
      }

    } catch (error) {
      showErrorToast(error);
    }
  };


  return (
    
    <motion.div initial={{ x: "-7rem", opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{
      duration: 2,
      type: "spring",
    }}
     className="w-full md:w-1/2 g:h-[75vh] p-8 flex flex-col justify-center" dir='rtl'>
    <div className="max-w-sm mx-auto w-full">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">ثبت‌نام</h1>
      
      <form onSubmit={handleSubmit}>
        {/* username */}
        <div className="mb-4">
          <div className="relative">
            <input 
              type="text" 
              id="username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              placeholder="نام کاربری"
              required
            />
            {usernameError && (
              <p className="text-red-500 text-xs mt-2">{usernameError}</p>
              )}
              {isUsernameAvailable && (
                <p className="text-green-500 text-xs mt-2">نام کاربری در دسترس است</p>
              )}
            <i className="fas fa-envelope absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"></i>
          </div>
        </div>
        {/* phone_number */}
        <div className="mb-6">
          <div className="relative">
            <input 
              type="text"
              id="phone_number" 
              value={phone_number}
              onChange={(e) => setphone_number(e.target.value)}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              placeholder="شماره موبایل"
            />
            <i className="fas fa-envelope absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"></i>
          </div>
        </div>
        {/* paasword */}
        <div className="mb-6">
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"}
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              placeholder="پسورد"
              required
            />
            <i 
              className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer`}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </div>
        </div>
        <div className="mb-6">
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"}
              id="password2" 
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              placeholder="تایید پسورد"
              required
            />
            <i 
              className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer`}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </div>
        </div>
        <div className="flex items-center mb-6">
          <input 
            type="checkbox" 
            id="remember" 
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className="h-4 w-4 text-blue-500 border-gray-300 rounded cursor-pointer"
          />
          <label htmlFor="remember" className="mr-2 text-[13px] text-gray-600 cursor-pointer">مرا به خاطر بسپار</label>
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md transition-colors duration-200 ease-in-out font-medium"
        >
          ثبت‌نام
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          حساب کاربری دارید؟ <a href="#" className="inline text-blue-500 hover:underline cursor-pointer" onClick={() => setshowComponent("Signin")}>ورود</a>
        </p>
      </div>
      
     
    </div>
  </motion.div>
  );
};

export default SignUp;
