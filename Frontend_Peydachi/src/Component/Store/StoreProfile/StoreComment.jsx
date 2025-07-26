import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";  
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import {FaChevronLeft , FaEllipsisH } from 'react-icons/fa';
import { FaRegUser } from "react-icons/fa";
const RecentComments = ({storeID}) => {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const seeAll =()=>{
    navigate(`/storeComments/${storeID}`);
  }


  useEffect(() => {
    const fetchComments = async () => {
        console.log("storeID:", storeID);
      try {
        const response = await axiosInstance.post('/store_comment/get_last_5_store_comments', {store_id : storeID})
        setComments(response.data);
        setLoading(false);
      } catch (error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.response?.data?.message || error.response?.data?.detail || "خطای ناشناخته‌ای رخ داده است",
          showConfirmButton: false,
          timer: 2000,
          toast: true,
          customClass: {
            popup: 'w-60 h-18 text-sm flex items-center justify-center',
            title: 'text-xs',
            content: 'text-xs',
            icon: 'text-xs mb-2',
          },
        });
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  const formatDate = (dateString) => {
    const now = new Date();
    const addedDate = new Date(dateString);
    
    const diffInMilliseconds = now - addedDate;
    const seconds = Math.floor(diffInMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
  
    if (seconds < 60) return 'لحظاتی پیش';
    if (minutes < 60) return `${minutes} دقیقه قبل`;
    if (hours < 24) return `${hours} ساعت قبل`;
    if (days < 7) return `${days} روز قبل`;
    if (weeks < 4) return `${weeks} هفته قبل`;
    if (months < 12) return `${months} ماه قبل`;
    return `${years} سال قبل`;
  };


  // skeleton loader 
  const renderSkeletons = () => {
    return Array(5).fill(0).map((_, index) => (
      <div key={`skeleton-${index}`} className="min-w-[280px] bg-white rounded-xl p-4 shadow-md animate-pulse">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
          <div className="mr-2 h-4 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          <div className="h-3 bg-gray-200 rounded w-4/6"></div>
        </div>
        <div className="mt-3 h-3 bg-gray-200 rounded w-16"></div>
      </div>
    ));
  };

  return (
    <div  dir='rtl' className="bg-gradient-to-r from-blue-50 to-white w-full  py-6 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">نظرات اخیر</h2>
          <button onClick={seeAll} className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center cursor-pointer whitespace-nowrap !rounded-button">
            مشاهده‌ی همه
            <FaChevronLeft  className="mr-1 text-xs" />
          </button>
        </div>
        
        {/* Comments scroll container */}
        <div className="relative">
          <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            <div className="flex space-x-4">
              {loading ? (
                renderSkeletons()
              ) : (
                comments.map(comment => (
                  <div 
                    key={comment.id} 
                    className="min-w-[280px] sm:min-w-[280px] bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-transform duration-200 hover:scale-[1.02] flex flex-col"
                  >
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                       <FaRegUser/>
                      </div>
                      <span className="mr-2 font-medium text-gray-800">{comment.user_name}</span>
                    </div>
                    <p className="text-gray-700 line-clamp-3 flex-grow">
                      {comment.text}
                    </p>
                    <div className="mt-3 text-xs text-gray-500">
                      {formatDate(comment.date_added)}
                    </div>
                  </div>
                ))
              )}
              
              {/* Show a partial card to indicate more content */}
              {!loading && (
                <div className="min-w-[100px] bg-white/50 rounded-xl shadow-sm flex items-center justify-center cursor-pointer whitespace-nowrap !rounded-button">
                  <button className="text-blue-600 hover:text-blue-800 px-4">
                  <FaEllipsisH />
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Scroll indicators */}
          {/* <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 bg-gradient-to-r from-blue-50 to-transparent h-full pointer-events-none"></div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 bg-gradient-to-l from-blue-50 to-transparent h-full pointer-events-none"></div> */}
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

const StoreComment = ({storeID}) => {
  return (
    <div dir='ltr' className=" bg-white">
      <RecentComments storeID={storeID} />
    </div>
  );
};

export default StoreComment;
