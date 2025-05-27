import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const ErrorPage = () => {
    const navigate = useNavigate();
    
    const handleBackHome = ()=> {
        navigate('/', { replace: true });
      }
  

    return (
        <>
        
            <main>
        <section class=" relative max-w-screen  flex justify-center items-center h-screen ">
            <div class="mx-auto  px-4 sm:px-6 lg:px-8 relative">

                <div class=" w-full mx-auto h-auto text-center mb-7">
                    <div class="w-full h-auto mx-auto py-8 rounded-2xl">
                        <h1 class="font-serif font-black text-6xl leading-relaxed text-blue-600 text-center mb-6">
                            4<span class="text-blue-200">0</span>4</h1>
                        <p dir='rtl' class="font-medium text-xl leading-9 text-gray-100 text-center mb-4">آدرس اشتباهی وارد کردید!</p>
                        <p class="font-medium text-md leading-9 text-gray-600 text-center mb-6">صفحه ای که به دنبال آن هستید وجود ندارد یا منتقل شده است</p>
                        <button onClick={handleBackHome} class="w-44 bg-blue-600 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 py-3.5 px-6 text-sm hover:bg-blue-700">
                          بازگشت به خانه  </button>
                    </div>
                </div>
            </div>
        </section>
    </main>
        </>
    );
};

export default ErrorPage;