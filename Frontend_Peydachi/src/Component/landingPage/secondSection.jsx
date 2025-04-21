import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdShoppingBag } from "react-icons/md";

const HowItWorks = () => {
    const steps = [
        {
          icon: IoSearch,
          title: "جستجو برای محصولات",
          description: "با وارد کردن کالای مورد نظر و موقعیت مکانی، نزدیکترین فروشگاه مورد نیاز را پیدا کنید"
        },
        {
          icon: FaMapLocationDot,
          title: "توانایی مقایسه",
          description: "موجودی لحظه‌ای را در چندین فروشگاه مشاهده کنید و قیمت‌ها را برای یافتن بهترین گزینه مقایسه کنید"
        },
        {
          icon: MdShoppingBag,
          title: " خرید با اطمینان  ",
          description: " بدانید دقیقاً چه چیزی در انبار فروشگاه موجود است! در وقت شما و سفرهای غیر ضروری صرفه جویی می شود"
        }
      ];
    

  return (
    <section className="py-16 bg-gray-50 ">
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-3xl font-bold text-center mb-3">چرا پیداچی؟</h2>
      <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
      فقط با چند مرحله ساده محصولات را در فروشگاه های محلی پیدا کنید
      </p>

      <div className="grid md:grid-cols-3 gap-9">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <step.icon className="text-2xl text-blue-700"/>
            </div>
            <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
            <p className="text-gray-600 ">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default HowItWorks;
