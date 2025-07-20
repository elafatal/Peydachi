import React from 'react';
import { FaLinkedin } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import {BiLogoGmail , BiLogoTelegram } from "react-icons/bi";
import hero from '../../../public/hero.svg'

const AboutUs = () => {
  return (
    <div className=" bg-gray-50 flex items-center justify-center p-4" dir='rtl'>
      <div className="sm:flex flex-col items-center max-w-screen-xl bg-white  shadow-lg rounded-lg">
       
        <div className=" flex md:w-1/2 p-8">
          <div className="image object-center text-center">
            <img src={hero} alt="Company" />
          </div>
          
        </div>

        <div className="sm:w-1/2 p-5">
          <div className="text ">
            <span className="text-gray-500 border-b-2 border-blue-600 uppercase">درباره‌ی ما</span>
            <h2 className="my-4 font-bold text-3xl sm:text-3xl">
              درباره‌ی <span className="text-blue-600">اهداف ما</span>
            </h2>
            <p className="text-gray-700 text-md">
پیداچی پروژه ی نرم افزار ماست که قراره توسط اقای نوربخش نمره دهی بشه. اهداف این پروژه گرفتن نمره ی قبولی و مخاطب این پروژه افراد تنبلی هستند که برای خرید قرص سرما خوردگی حاضر نیستن تا 
سر کوچه برن و داروخونه ها رو بگردن. تیم ما شامل ۳ تا بکند کار و یک فرانت کار هست که این غیرمنصفانه ترین تقسیم بندی برای ترتیب دادن یک پروژه ست.             </p>
          <div className="flex justify-center space-x-4 mt-6" dir='ltr'>
            <a
              href="https://t.me/YourTelegramUsername"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BiLogoTelegram className="opacity-90 transition-opacity hover:opacity-100 text-blue-600 w-8 h-8 cursor-pointer" />
            </a>
            <a
              href="https://github.com/HB2102/Peydachi"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="opacity-90 transition-opacity hover:opacity-100 text-blue-600 w-8 h-8 cursor-pointer" />
            </a>
            <a
              href="mailto:your.email@example.com" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <BiLogoGmail className="opacity-90 transition-opacity hover:opacity-100 text-blue-600 w-8 h-8 cursor-pointer" />
            </a>
          </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default AboutUs;