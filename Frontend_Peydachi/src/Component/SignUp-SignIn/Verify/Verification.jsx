import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";  
import Cookies from 'js-cookie';
import axiosInstance from '../../axiosInstance';
import { useAuth } from '../../Context/AuthContext';
const OTPVerification = ({ showComponent,setshowComponent ,username }) => {
  const navigate = useNavigate();
  const { login } = useAuth()
  const inputsRef = useRef([]);
  const [verificationCode, setVerificationCode] = useState('');

  const handleKeyDown = (e, index) => {
    const input = e.target;

    
    if (!/^[0-9]{1}$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab') {
      e.preventDefault();
    }

    if (e.key === 'Delete' || e.key === 'Backspace') {

      if (input.value !== '') {
        inputsRef.current[index].value = '';
        updateVerificationCode();
      } else {
        if (index > 0 && e.key === 'Backspace') {
          inputsRef.current[index - 1].focus();
        }
      }
    }
  };

  const handleInput = (e, index) => {
    const input = e.target;
    if (input.value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
    updateVerificationCode();
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text');
    if (!new RegExp(`^[0-9]{${inputsRef.current.length}}$`).test(text)) {
      return;
    }

    const digits = text.split('');
    digits.forEach((digit, index) => {
      inputsRef.current[index].value = digit;
    });
    updateVerificationCode();
    inputsRef.current[inputsRef.current.length - 1].focus();
  };

  // Function to update the verification code in the state
  const updateVerificationCode = () => {
    const code = inputsRef.current.map(input => input.value).join('');
    setVerificationCode(code);
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Submitted Verification Code:', verificationCode);
    try {
        const response = await axiosInstance.post('/phone_verification/user_forget_password_check', {
          username: username ,
          code : verificationCode
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });
        console.log(response);

        // Handle success
        if (response.status === 200) {
            console.log("yesssssss");

            if (response.status === 200) {
                Cookies.set('auth_token', response.data.access_token, { expires: 3, secure: true, sameSite: 'Strict' });
                Cookies.set('refresh_token', response.data.refresh_token, { expires: 3, secure: true, sameSite: 'Strict' });
                  const userData = {
                    userID: response.data.userID,
                    username: response.data.username,
                    role: response.data.is_super_admin
                      ? 'superadmin'
                      : response.data.is_admin
                      ? 'admin'
                      : response.data.is_seller
                      ? 'seller'
                      : 'user',
                  };
                 login(userData);
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "خوش آمدید",
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
                
                navigate('/', { replace: true });
                }
        }
      } catch (error) {
        console.log('Error during verification', error);
        Swal.fire('Error', 'Request failed. Please try again.', 'error');
      }
   
  };

  

  return (
    <div dir="ltr" className="flex flex-col items-center justify-center mx-auto text-center min-h-[400px] py-10">

      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-1">تایید شماره تلفن</h1>
        <p className="text-[15px] text-slate-500">
          کد تأیید 5 رقمی را وارد کنید
        </p>
      </header>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-center gap-3">
          {[...Array(5)].map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              ref={(el) => (inputsRef.current[index] = el)}
              className="w-12 h-12 text-center text-xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              onKeyDown={(e) => handleKeyDown(e, index)}
              onInput={(e) => handleInput(e, index)}
              onFocus={handleFocus}
              onPaste={handlePaste}
            />
          ))}
        </div>

        <div className="max-w-[260px] mx-auto mt-4">
          <button
            type="submit"
            className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-blue-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-blue-950/10 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-300 transition-colors duration-150"
          >
             تایید کد/ ورود
          </button>
        </div>
      </form>

      <div className="text-sm text-slate-500 mt-4">
        کد را دریافت نکرده‌اید؟{' '}
        <a className="font-medium text-blue-500 hover:text-blue-600" href="#0">
          ارسال دوباره
        </a>
      </div>
      <div onClick={()=>setshowComponent("sign")} className="font-medium pt-2 border-b-2 text-blue-800 text-xs hover:text-blue-600" href="#0">
         بازگشت
        </div>

    </div>
  );
};

export default OTPVerification;