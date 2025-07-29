import React from 'react';
import { FaLinkedin } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import {BiLogoGmail , BiLogoTelegram } from "react-icons/bi";

const AboutUs = () => {
  return (
    <div className=" bg-gray-50 flex items-center justify-center p-4" dir='rtl'>
      <div className="sm:flex flex-col items-center max-w-screen-xl bg-white  shadow-lg rounded-lg">
       
        <div className=" flex md:w-1/2 p-8">
          <div className="image object-center text-center">
            <img src="/hero.svg" alt="Company" />
          </div>
          
        </div>

        <div className="sm:w-1/2 p-5">
          <div className="text ">
            <span className="text-gray-500 border-b-2 border-blue-600 uppercase">درباره‌ی ما</span>
            <h2 className="my-4 font-bold text-3xl sm:text-3xl">
               از <span className="text-blue-600">پیداچی </span>
            </h2>
            <p className="text-gray-700 text-md">
            پیداچی یک پروژه‌ی دانشجویی دو نفره‌ست که با هدف ساده‌ کردن خرید حضوری توی شهر طراحی شده. ما دنبال راهی بودیم تا بدون گشتن تو خیابون‌ها، آدم‌ها بتونن سریع و دقیق کالاهای مورد نیازشون رو پیدا کنن.
با پیداچی می‌تونی فروشگاه‌ها و محصولات رو بر اساس نام یا شهر جست‌وجو کنی، نظرات بقیه رو بخونی، خودت نظر بدی و راه‌های ارتباطی با فروشنده‌ها رو ببینی.
 فقط کافیه اسم محصولت و موقعیتت رو وارد کنی؛ پیداچی فروشگاه‌هایی که اون کالا رو نزدیکت دارن پیدا می‌کنه، اطلاعاتشونو نشون می‌ده و حتی مسیر رسیدن بهشون رو هم برات مشخص می‌کنه.
با پیداچی، خرید حضوری هوشمندتر و سریع‌تر می‌شه.            </p>
          <div className="flex justify-center space-x-4 mt-6" dir='ltr'>
            <a
              href="https://t.me/peydachi"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BiLogoTelegram title='تلگرام' className="opacity-90 transition-opacity hover:opacity-100 text-blue-600 w-8 h-8 cursor-pointer" />
            </a>
            {/* <a
              href="https://github.com/HB2102/Peydachi"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub title='گیتهاب' className="opacity-90 transition-opacity hover:opacity-100 text-blue-600 w-8 h-8 cursor-pointer" />
            </a> */}
            <a
              href="mailto:peydachi.management@gmail.com" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <BiLogoGmail title='ایمیل' className="opacity-90 transition-opacity hover:opacity-100 text-blue-600 w-8 h-8 cursor-pointer" />
            </a>
          </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default AboutUs;