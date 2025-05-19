import React, { useState } from "react";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { FaMapLocationDot } from "react-icons/fa6";
import { RiProductHuntLine } from "react-icons/ri";
import { FaProductHunt } from "react-icons/fa";
import { FaStore } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
const Features = () => {
    const navigate = useNavigate();
    const features = [
        {
          id:1,
          icon: FaStore,
          title: 'جستجوی فروشگاه',
          description: ' به دنبال فروشگاه خاصی میگردید؟'
        },
        {
          id:2,
          icon: RiProductHuntLine,
          title: ' جستجوی محصول',
          description: 'مشخصات محصول خاصی را میخواهید؟'
        },
        {
          id:3,
          icon: AiOutlineAppstoreAdd,
          title: 'اضافه کردن فروشگاه',
          description: 'فروشگاه خود را در پیداچی اضافه کنید'
        },
        {
          id:4,
          icon: TbReportAnalytics,
          title: 'گزارش‌ها',
          description: 'فعالیت‌های حساب خود را بررسی کنید'
        }
      ];

const handleLink =(Link)=>{
  console.log(Link);
  
  switch (Link) {
      case  0 :
        navigate('/SearchStore')
        break;
      case 1 :
        navigate('/SearchProduct')
        break;
      case 2 :
        navigate('/AddStoreRequest')
        break;
      case 3 :
        navigate('/UserCommentReport')
        break;
    default:
      break;
  }
}
  return (
    <div className="py-16 bg-gray-50 border-t-2 border-gray-100" dir="rtl">
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
        خدمات متفرقه 
        <h4 className="text-sm font-bold text-center text-gray-700 mb-16">  
          (بدون نیاز به لوکیشن)
      </h4>
      </h2>
     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow" onClick={()=>handleLink(index)}>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <feature.icon className='text-2xl text-blue-600'/>
            </div>
            <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default Features;
