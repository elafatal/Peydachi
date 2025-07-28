
import { FaStar, FaRegStar, FaStarHalfAlt, FaTimes } from 'react-icons/fa';
import axiosInstance from "../axiosInstance";
import React, { useEffect, useState } from "react";
import formatDate from '../utils/formatDate';

const SelfProductModal = ({
  selectedProduct,
  isModalOpen,
  comments,
  closeProductModal,
  toggleFavorite,
  favorites
}) => {
  if (!isModalOpen || !selectedProduct) return null;
  const [cityName, setCityName] = useState('');
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axiosInstance.get('/city/get_all_cities');
        setCities(res.data); 
      } catch (err) {
        console.error('خطا در دریافت لیست شهرها:', err);
      }
    };
    
    if (!cities.length) { 
      fetchCities();
    }
  }, [cities]);

  useEffect(() => {
    const findCityName = () => {
      if (selectedProduct?.city_id) {
        const city = cities.find(c => c.id === selectedProduct.city_id); 
        setCityName(city ? city.name : 'نامشخص');
      }
    };
    
    findCityName();
  }, [selectedProduct, cities]);
  
 const renderStars = (rating) => {
     const stars = [];
     const fullStars = Math.floor(rating);
     const hasHalfStar = rating % 1 >= 0.5;
     for (let i = 0; i < fullStars; i++) {
       stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
     }
     if (hasHalfStar) {
       stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
     }
     const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
     for (let i = 0; i < emptyStars; i++) {
       stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
     }
     return stars;
   };
   
  

  return (
  <>{isModalOpen && selectedProduct && (
    <div dir="ltr" className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm bg-opacity-75 transition-opacity" aria-hidden="true" data-testid="overlay" onClick={closeProductModal} />
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button data-testid="close-button" type="button" className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none !rounded-button whitespace-nowrap cursor-pointer" onClick={closeProductModal}>
              <span className="sr-only">بستن</span>
              <FaTimes className="text-xl" />
            </button>
          </div>
          <div className="bg-white p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* image & details */}
              <div dir="rtl">
                <div className="rounded-lg overflow-hidden mb-4">
                  <img src={selectedProduct.pic_url} alt={selectedProduct.name} className="w-full h-auto object-cover" />
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">جزئیات محصول</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-600">موجودی:</div>
                    <div className={`font-medium ${selectedProduct.quantity>0?'text-green-600':'text-red-600'}`}>
                      {selectedProduct.quantity>0 ? `${selectedProduct.quantity} موجود` : 'ناموجود'}
                    </div>
                    <div className="text-gray-600">شهر:</div>
                    <div> {cityName || '---'}</div>
                    <div className="text-gray-600">تاریخ اضافه شدن:</div>
                    <div>{formatDate(selectedProduct.date_added)}</div>
                    <div className="text-gray-600">شناسه محصول:</div>
                    <div>#{selectedProduct.id}</div>
                  </div>
                </div>
              </div>

              {/* right column */}
              <div>
                <h2 className="text-end text-2xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h2>
                <div className="flex items-center mb-4">
                  {renderStars(selectedProduct.average_rating)}
                  <span className="ml-2 text-sm text-gray-600">{(selectedProduct.average_rating ?? 0).toFixed(1)}</span>
                </div>
                <p dir="rtl" className=" text-justify text-gray-700 mb-6">{selectedProduct.description}</p>

                <div  className="mb-6">
                  <h3 dir='rtl' className="text-lg text-start font-semibold text-gray-900 mb-3">نظرات مشتریان</h3>
                  <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                    {comments.length === 0 ?  <p className="text-sm text-end text-gray-500">.نظری برای این محصول ثبت نشده است</p> :
                    comments.map(c=>(
                      <div dir='rtl' key={c.id} className="border-b border-gray-200 pb-3">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-medium text-gray-900">{c.user_name}</h4>
                          <div className="">{formatDate(c.date_added)}</div>
                        </div>
                        <p className="text-sm text-start  text-gray-600">{c.text}</p>
                      </div>
                    ))}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}</>
  );
};

export default SelfProductModal;
