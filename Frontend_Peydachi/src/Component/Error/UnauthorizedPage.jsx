import React from 'react';
import { useNavigate } from 'react-router-dom';
function UnauthorizedPage() {
  const navigate = useNavigate();
  const handleBackHome = ()=> {
    
    navigate('/Login', { replace: true });
  }

    return (
      <div className="mx-auto  px-4 sm:px-6 lg:px-8 relative">

                <div className=" w-full mx-auto h-[59vh] text-center mb-7">
                    <div className="w-full h-auto mx-auto py-8 rounded-2xl">
                        <h1 className="font-serif font-black text-6xl leading-relaxed text-blue-600 text-center mb-6">
                            4<span className="text-blue-300">0</span>1</h1>
                        <p dir='rtl' className="font-medium text-xl leading-9 text-gray-600 text-center mb-4">  دسترسی غیر مجاز</p>
                        <p className="font-medium text-md leading-9 text-gray-600 text-center mb-6">  برای مشاهده‌ی این صفحه وارد حساب کاربری خود شوید </p>
                        <button onClick={handleBackHome} className="w-44 bg-blue-600 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 py-3.5 px-6 text-sm hover:bg-blue-700">
                            ورود به حساب کاربری  </button>
                    </div>
                </div>
            </div>
    );
  }
  
  export default UnauthorizedPage;
  