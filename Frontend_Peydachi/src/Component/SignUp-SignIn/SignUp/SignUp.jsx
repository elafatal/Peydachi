import React, { useState } from 'react';
import { motion } from "framer-motion";
import Cookies from 'js-cookie';
import Swal from "sweetalert2"; 
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import { useAuth } from '../../AuthContext/AuthContext';

const SignUp= ({showComponent,setshowComponent}) => {
  const { login } = useAuth()
  const [username, setUsername] = useState('');
  const [phone_number, setphone_number] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log({ username, phone_number, password, rememberMe });
    if (password == password2) {
      try {
        // const response = await axios.post(
        //   'http://127.0.0.1:8000/user/create_user',
        //   { username: username, password: password, phone_number: phone_number },
        //   {
        //     headers: {
        //       'Content-Type': 'application/json',
        //       'Accept': 'application/json',
        //     },
        //   }
        // );
        const response = await axiosInstance.post(
          '/user/create_user',
          { username, password, phone_number },
          { headers: { 'Content-Type': 'application/json' } }
        );
        console.log(response);
    
        if (response.status === 201) {
          try{
            const loginResponse  = await axiosInstance.post('/authentication/token', 
              { username, password }, 
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                }
              }
            );
                  if (loginResponse .status === 200) {
                    if (rememberMe) {
                      Cookies.set('auth_token', loginResponse.data.access_token, { expires: 3, secure: true, sameSite: 'Strict' });
                      Cookies.set('refresh_token', loginResponse.data.refresh_token, { expires: 3, secure: true, sameSite: 'Strict' });
                    } else {
                      Cookies.set('auth_token', loginResponse.data.access_token, { secure: true, sameSite: 'Strict' });
                      Cookies.set('refresh_token', loginResponse.data.refresh_token, { secure: true, sameSite: 'Strict' });
                    }
            
            
                    const userData = {
                      userID: loginResponse.data.userID,
                      username: loginResponse.data.username,
                      role: loginResponse.data.is_super_admin
                        ? 'superadmin'
                        : loginResponse.data.is_admin
                        ? 'admin'
                        : loginResponse.data.is_seller
                        ? 'seller'
                        : 'user',
                    };
                   login(userData);
                   navigate('/', { replace: true });
                   }
          }catch(err){
console.log(err);

          }
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "ثبت نام شما انجام شد",
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
      } catch (error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "دوباره امتحان کنید",
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
    }else{
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

  };


  return (
    
    <motion.div initial={{ x: "-7rem", opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{
      duration: 2,
      type: "spring",
    }}
     className="w-full md:w-1/2 p-8 flex flex-col justify-center" dir='rtl'>
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
