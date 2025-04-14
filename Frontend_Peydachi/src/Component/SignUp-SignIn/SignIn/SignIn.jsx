import React, { useState } from 'react';
 import "./SignIn.css";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
const SignIn= ({showComponent,setshowComponent}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });
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
      <h1 className="text-3xl font-bold mb-8 text-gray-800">ورود</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="relative">
            <input 
              type="text" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              placeholder="ایمیل"
              required
            />
            <i className="fas fa-envelope absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"></i>
          </div>
        </div>
        
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
          ورود
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          حساب کاربری ندارید؟ <p className="inline text-blue-500 hover:underline cursor-pointer" onClick={() => setshowComponent("Signup")}>ثبت‌نام</p>
        </p>
      </div>
      
      {/* <div className="mt-8 text-center">
        <p className="text-xs text-gray-500">
          By signing up, you agree to PeydaChi's <a href="#" className="text-blue-500 hover:underline cursor-pointer">Terms of Service</a> and <a href="#" className="text-blue-500 hover:underline cursor-pointer">Privacy Policy</a>
        </p>
      </div> */}
    </div>
  </motion.div>
  );
};

export default SignIn;
