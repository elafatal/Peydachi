// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import axiosInstance from '../../axiosInstance';
import React, { useState, useEffect } from 'react';
import { FaFacebookF,FaComments,FaRegFlag,FaCheckCircle, FaExclamationCircle ,FaPaperPlane,FaStar,FaSpinner } from 'react-icons/fa';
import { FaPenToSquare } from 'react-icons/fa6';
const StoreFullComment = () => {
  const { storeID } = useParams(); 
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);
const [sommentNumber,setCommentNumbers]=useState(4)
  // Mock fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      console.log(storeID);
    try {
      const response = await axiosInstance.post('/store_comment/get_store_comments', {store_id : storeID})
      console.log(response);
      setComments(response.data);
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
    }   
  };
  fetchComments();
  }, []);

  const handleCommentSubmit = async () => {
    if (!newComment.trim() && userRating === 0) {
      setNotification({
        message: "لطفا قبل از ارسال، نظر یا امتیاز خود را اضافه کنید",
        type: "error"
      });
      return;
    }
    setIsSubmitting(true);
    try {
      // Mock API call for submitting comment
      if (newComment.trim()) {
        try {
          const response = await axiosInstance.post('/store_comment/add_store_comment', {
            store_id: storeID,
            text: newComment,
          });
          console.log(response.data);
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
        }
      }

      if (userRating > 0) {
        const ratingResponse = {
          store_id: storeID,
          rating: userRating
        };
        try {
          const response = await axiosInstance.post('/store_rating/rate_store', ratingResponse);
          console.log(response.data);
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
        }

      }

      setNotification({
        message: "بازخورد شما با موفقیت ارسال شد!",
        type: "success"
      });
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
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setNotification(null), 5000);
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Feedback Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              
              <FaPenToSquare className="text-blue-500 ml-2" />    
                ثبت بازخورد
              </h2>
              
              {/* Rating Input */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">امتیاز شما به فروشگاه</label>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="text-3xl ml-1 focus:outline-none transition-colors duration-200 ease-in-out cursor-pointer !rounded-button whitespace-nowrap"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setUserRating(star)}
                    >
                      <FaStar 
                        className={`fas fa-star ${
                          (hoverRating || userRating) >= star 
                            ? 'text-yellow-400' 
                            : 'text-gray-200'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {userRating > 0 && (
                  <div className="mt-2 text-blue-600 font-medium">
                    {userRating === 1 ? 'ضعیف' : 
                     userRating === 2 ? 'متوسط' : 
                     userRating === 3 ? 'خوب' : 
                     userRating === 4 ? 'خیلی خوب' : 'عالی'}
                  </div>
                )}
              </div>
              
              {/* Comment Input */}
              <div className="mb-6">
                <label htmlFor="comment" className="block text-gray-700 font-medium mb-2">ثبت نظر (اختیاری)</label>
                <textarea
                  id="comment"
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-700"
                  placeholder="تجربه‌ی خود را از این فروشگاه به اشتراک بگذارید..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                ></textarea>
              </div>
              
              {/* Submit Button */}
              <button
                type="button"
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200 cursor-pointer !rounded-button whitespace-nowrap"
                onClick={handleCommentSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
               <FaSpinner className="inline ml-2 animate-spin text-lg" />
                    درحال انجام...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="inline ml-2" />
                    ثبت بازخورد
                  </>
                )}
              </button>
              
              {/* Notification */}
              {notification && (
                <div className={`mt-4 p-4 rounded-lg ${
                  notification.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  <div className="flex items-center">
                  {notification.type === 'success' ? (
                    <FaCheckCircle className="ml-2 text-green-500" />
                  ) : (
                    <FaExclamationCircle className="ml-2 text-red-500" />
                  )}
                    <p>{notification.message}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Comments List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <FaComments className="text-blue-500 ml-2" />
                نظرات مشتریان
                <span className="mr-2 text-sm bg-blue-100 text-blue-800 pt-2 px-2 rounded-full">{comments.length}</span>
              </h2>
              
              {comments.length > 0 ? (
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div 
                      key={comment.id} 
                      className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0"
                    >
                      <div className="flex items-start">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                             <FaRegUser/>
                        </div>
                        <div className="mr-4 flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <h3 className="font-semibold text-gray-800">{comment.user_name}</h3>
                            <p className="text-sm text-gray-500 mt-1 sm:mt-0">{formatDate(comment.date_added)}</p>
                          </div>
                          <div className="flex my-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <FaStar
                              key={star}
                              className={`text-sm ${
                                star <= (comment.id % 5 || 5) ? 'text-yellow-400' : 'text-gray-200'
                              } mr-1`}
                            />
                            ))}
                          </div>
                          <p className="text-gray-700 mt-2 leading-relaxed">{comment.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-blue-50 rounded-lg">
                 <FaComments className="inline text-5xl text-blue-300 mb-4" />
                  <h3 className="text-xl font-medium text-gray-800 mb-2">هنوز نظری وجود ندارد</h3>
                  <p className="text-gray-600">اولین نفری باشید که تجربه خود را از این فروشگاه به اشتراک می‌گذارد!</p>
                </div>
              )}
            
            </div>
          </div>
        </div>
      </main>
      
  
    </div>
  );
};

export default StoreFullComment;
