import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import { RiDeleteBin6Line } from "react-icons/ri";
import { useAuth } from '../AuthContext/AuthContext';
import { FaRegEdit } from "react-icons/fa";
import Swal from "sweetalert2";  
import UnauthorizedPage from '../Error/UnauthorizedPage';
const UserInfo = () => {
  const navigate = useNavigate();
  const { role } = useAuth(); 
  const [userInfo, setUserInfo] = useState({});
  const [nameInfo, setNameInfo] = useState();
  const [errors, setErrors] = useState({});
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [formData, setFormData] = useState({
    username: '' ,
    password: '',
    Confirmpassword: '',
    phone_number: '',
    email: 'user@example.com',
    is_admin : false,
    is_seller: false,
  });
  const [storeInfo , setStoreInfo] = useState(
    {
      name : ''
    }
  )


  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const authToken = Cookies.get('auth_token');
        if (!authToken) {
          console.log("No auth token found");
          return;
        }
        const response = await axiosInstance.get('/userget_self_user_info', {
          headers: {
             'Accept': 'application/json'
            // 'Content-Type': 'multipart/form-data'
          }
        });
        if (response.data) {
            setFormData(prev => ({
              ...prev,
              phone_number: response.data.phone_number,
              username: response.data.username,
              email: response.data.email ,
              is_seller:response.data.is_seller,
              is_admin : response.data.is_admin
            }));
            setNameInfo(response.data.username)
            console.log(response);
            
          }
        
        
      } catch (error) {
        console.log(error);
      }
    };
    
    getUserInfo();
  }, []);


  useEffect(() => {
    const getStoreInfo = async () => {
      try {
        const authToken = Cookies.get('auth_token');
        if (!authToken) {
          console.log("No auth token found");
          return;
        }
  
        // فقط اگر کاربر فروشنده باشد نمایش داده شود
        if (role === 'seller') {
          const response = await axiosInstance.get('/seller/store/get_self_store', {
            headers: {
              'Accept': 'application/json'
            }
          });
          if (response.data) {
            setStoreInfo(response.data);
            console.log(response);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getStoreInfo();
  }, [role]);

  
  useEffect(() => {
    const usernameChecking = async () => {
      try {
        if (userInfo.username) { 
          if (userInfo.username != nameInfo) {
            const response = await axiosInstance.post('/user/is_username_available', {
              username: formData.username  
            }, {
              headers: {
                Authorization: null,
                'Content-Type': 'application/json'
              }
            });
    
            setUsernameAvailable(response.data);
            setIsCheckingUsername(false);
          }
         
        }
      } catch (error) {
        if (error.response?.status === 422) {
          console.error('خطا در اعتبارسنجی نام کاربری:', error.response.data);
        } else {
          console.error('خطای دیگر:', error);
        }
        setIsCheckingUsername(false);
      }
    };
  
  
    if (formData.username.length > 0) {
      const timer = setTimeout(() => {
        setIsCheckingUsername(true);
        usernameChecking();
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setUsernameAvailable(null);
    }
  }, [formData.username]); 
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
  if (name !='Confirmpassword') {
    setUserInfo(prev => ({ ...prev, [name]: value }));
  }

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };


  const validateForm = () => {
    const newErrors = {};

    if (formData.password.trim() && !formData.Confirmpassword.trim()) newErrors.Confirmpassword = 'پسورد جدید را تایید کنید';
    if (formData.Confirmpassword.trim() && formData.Confirmpassword != formData.password) newErrors.Confirmpassword = 'پسورد تایید شده با پسورد اولیه یکسان نیست';
    
 

    else if (!/^\d{11}$/.test(formData.phone_number.replace(/\D/g, '')) && formData.phone_number.trim()) {
      newErrors.phone_number = 'Please enter a valid 10-digit phone number';
    }



    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
const handleGoHome =()=>{
  navigate('/', { replace: true });
}
const handleGoSelfStore =()=>{
  navigate('/selfStore');
}
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        if (validateForm()) {
            const response = await axiosInstance.put('/user/update_user', userInfo, {
              headers: {
                'Content-Type': 'application/json'
              }
            })
            if (response.status === 200) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "به روزرسانی انجام شد",
                showConfirmButton: false,
                timer: 1500,
                toast: true,
                customClass: {
                  popup: 'w-3 h-15 text-xs flex items-center justify-center',
                  title: 'text-xs', 
                  content: 'text-xs', 
                  icon : 'text-xs mb-2'
                }
            });
            }
          }

      } catch (error) {
        if (error.status === 406) {
         Swal.fire({
                 position: "top-end",
                 icon: "error",
                 title: " شماره قبلا ثبت‌نام شده‌است",
                 showConfirmButton: false,
                 timer: 1500,
                 toast: true,
                 customClass: {
                   popup: 'w-3 h-15 text-xs flex items-center justify-center',
                   title: 'text-xs', 
                   content: 'text-xs', 
                   icon : 'text-xs mb-2'
                 }
             });
        }
        console.log('Error response:', error.response);
        console.log('Error details:', error.response?.data);
      }
   
  };

  const DeleteSelfStore = async () => {    
    try {
      await axiosInstance.delete('/seller/store/delete_store', {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Store deleted successfully');
    } catch (error) {
      if (error.response?.status === 401) {
        console.error('Authentication failed. Please login again.');
      } else {
        console.log('An error occurred:', error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 py-12" >
{Cookies.get('auth_token') ?       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

{/* Main Form */}
<div className="bg-white shadow-xl rounded-lg overflow-hidden">
  <form onSubmit={handleSubmit} className="p-8">
    <div className="space-y-8">
      {/* Personal Information Section */}
      <div>
        <h2 className="text-xl font-semibold border-b border-gray-200 text-gray-800 mb-6">اطلاعات شخصی</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              رمز عبور 
            </label>
            <input
              type="text"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="رمزعبور جدید را وارد کنید"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          { !formData.password.trim() ? (<></>):(    <div>
            <label htmlFor="Confirmpassword" className="block text-sm font-medium text-gray-700 mb-1">
              تایید پسورد <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="Confirmpassword"
              name="Confirmpassword"
              value={formData.Confirmpassword}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="رمز جدید را تکرار کنید"
            />
            {errors.Confirmpassword && (
              <p className="mt-1 text-sm text-red-600">{errors.Confirmpassword}</p>
            )}
          </div>)}
          
      
        </div>

        {/* Username */}
        <div className="mt-6">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username 
          </label>
          <div className="relative">
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Choose a unique username"
            />
            {isCheckingUsername && (
              <div className="absolute right-3 top-2.5">
                <i className="fas fa-circle-notch fa-spin text-gray-400"></i>
              </div>
            )}
            {!isCheckingUsername && usernameAvailable === true && formData.username && (
              <div className="absolute right-3 top-2.5 text-green-500">
                <i className="fas fa-check-circle"></i>
              </div>
            )}
            {!isCheckingUsername && usernameAvailable === false && (
              <div className="absolute right-3 top-2.5 text-red-500">
                <i className="fas fa-times-circle"></i>
              </div>
            )}
          </div>
          {errors.username && (
            <p className="mt-1 text-sm text-red-600">{errors.username}</p>
          )}
          {!errors.username && usernameAvailable === false && (
            <p className="mt-1 text-sm text-red-600">This username is already taken</p>
          )}
          {!errors.username && usernameAvailable === true && formData.username && (
            <p className="mt-1 text-sm text-green-600">Username is available</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="mt-6">
          <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="flex">
            
            <input
              type="tel"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              className="flex-1 min-w-0 block w-full px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="(123) 456-7890"
            />
          </div>
          {errors.phone_number && (
            <p className="mt-1 text-sm text-red-600">{errors.phone_number}</p>
          )}
        </div>

        {/* Email (pre-filled) */}
        <div className="mt-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            
            className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 text-sm"
          />
        
        </div>
      </div>
        {/* Store Information Section */}
        { role === 'seller' ? ( <div className="pt-6  flex flex-col justify-between ">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b border-gray-200">اطلاعات فروشگاه</h2>
                        <div className='flex justify-between '>
                        <p className="text-lg text-gray-800">{storeInfo.name} فروشگاه</p>
                        <div className='flex gap-3'>
                        <FaRegEdit onClick={handleGoSelfStore} className="text-xl text-gray-800"/>
                        <RiDeleteBin6Line onClick={DeleteSelfStore} className="text-xl text-red-600"/></div>
                        </div>
                       
        </div>) : null }
       

    </div>

    {/* Form Actions */}
    <div className="mt-10 pt-6  flex flex-col items-center">
      <button 
        type="submit"
        className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white text-base font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
      >
تایید اطلاعات             </button>
      <button 
       onClick={handleGoHome}
        type="button"
        className="mt-3 text-sm text-gray-600 hover:text-gray-800"
      >
فعلا نه              </button>
    </div>
  </form>
</div>

{/* Footer */}
<div className="mt-3 text-center text-xs text-gray-500">
  <p>مشکلی پیش آمده؟ <a href="#" className="text-blue-600 hover:text-blue-800">تماس با پشتیبانی</a></p>
</div>
</div> : <UnauthorizedPage/>}
    </div>
  );
};

export default UserInfo;
