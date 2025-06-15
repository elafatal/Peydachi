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
  const [storeId] = useState(1); // Assuming store ID is 1
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);
  const [averageRating, setAverageRating] = useState(4.2); // Mock average rating
  const [totalReviews, setTotalReviews] = useState(128); 

  // Mock fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      console.log(storeID);
    try {
      const response = await axiosInstance.post('/store_comment/get_store_comments', {store_id : storeID})
      console.log(response);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error); 
    }   
  };
  fetchComments();
  }, []);

  const handleCommentSubmit = async () => {
    if (!newComment.trim() && userRating === 0) {
      setNotification({
        message: "Please add a comment or rating before submitting",
        type: "error"
      });
      return;
    }
    setIsSubmitting(true);
    try {
      // Mock API call for submitting comment
      if (newComment.trim()) {
        // In a real app, this would be an API call
        const newCommentResponse = {
          store_id: storeId,
          text: newComment,
          id: comments.length + 1,
          user_id: 999, // Mock user ID
          user_name: "Current User", // Mock username
          date_added: new Date().toISOString()
        };
        
        setComments([newCommentResponse, ...comments]);
        setNewComment('');
      }

      // Mock API call for submitting rating
      if (userRating > 0) {
        // In a real app, this would be an API call
        const ratingResponse = {
          store_id: storeId,
          user_id: 999, // Mock user ID
          rating: userRating
        };
        
        // Update average rating (this would normally come from the API)
        const newTotal = totalReviews + 1;
        const newAverage = ((averageRating * totalReviews) + userRating) / newTotal;
        setAverageRating(parseFloat(newAverage.toFixed(1)));
        setTotalReviews(newTotal);
      }

      setNotification({
        message: "Your feedback has been submitted successfully!",
        type: "success"
      });
    } catch (error) {
      setNotification({
        message: "Failed to submit your feedback. Please try again.",
        type: "error"
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setNotification(null), 5000);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'امروز';
    } else if (diffDays === 1) {
      return 'دیروز';
    } else if (diffDays < 7) {
      return `${diffDays} روز قبل`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Store Rating Overview */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-10">
          <div className="relative">
            <img 
              src="https://readdy.ai/api/search-image?query=A%20modern%2C%20elegant%20retail%20storefront%20with%20large%20glass%20windows%20displaying%20stylish%20products%2C%20soft%20ambient%20lighting%2C%20and%20a%20clean%20minimalist%20design.%20The%20store%20has%20a%20sophisticated%20blue%20color%20scheme%20with%20white%20accents%2C%20creating%20an%20inviting%20and%20premium%20shopping%20atmosphere%20with%20subtle%20decorative%20elements&width=1200&height=400&seq=1&orientation=landscape" 
              alt="Store front" 
              className="w-full h-64 object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 right-0 p-6 text-white">
              <h2 className="text-3xl font-bold">Awesome Store</h2>
              <p className="text-blue-100 mt-1">Premium shopping experience since 2020</p>
            </div>
          </div>
          
          <div className="p-6 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-6 md:mb-0">
              <div className="bg-blue-50 rounded-full p-4 ml-6">
                <div className="text-5xl font-bold text-blue-600 px-3 pt-3">{averageRating}</div>
                <div className="text-sm text-blue-500 text-center mt-1">out of 5</div>
              </div>
              
              <div>
                <div className="flex mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar  key={star}
                    className={`fas fa-star text-2xl ${
                      star <= Math.floor(averageRating) 
                        ? 'text-yellow-400' 
                        : star <= averageRating 
                          ? 'text-yellow-300' 
                          : 'text-gray-200'
                    } ml-1`} />
                  ))}
                </div>
                <p className="text-gray-600">Based on <span className="font-semibold">{totalReviews}</span> customer reviews</p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">24/7</div>
                <div className="text-sm text-gray-500">Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">100%</div>
                <div className="text-sm text-gray-500">Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">Fast</div>
                <div className="text-sm text-gray-500">Shipping</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Feedback Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              
              <FaPenToSquare className="text-blue-500 ml-2" />    
                Write a Review
              </h2>
              
              {/* Rating Input */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Your Rating</label>
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
                    {userRating === 1 ? 'Poor' : 
                     userRating === 2 ? 'Fair' : 
                     userRating === 3 ? 'Good' : 
                     userRating === 4 ? 'Very Good' : 'Excellent'}
                  </div>
                )}
              </div>
              
              {/* Comment Input */}
              <div className="mb-6">
                <label htmlFor="comment" className="block text-gray-700 font-medium mb-2">Your Review (optional)</label>
                <textarea
                  id="comment"
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-700"
                  placeholder="Share your experience with this store..."
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
                    Submitting...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="inline ml-2" />
                    Submit Review
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
                Customer Reviews
                <span className="mr-2 text-sm bg-blue-100 text-blue-800 pt-1 px-2 rounded-full">{comments.length}</span>
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
                          
                          {/* We don't have rating in the comment object, but in a real app we would show it here */}
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
                 <FaComments className="text-5xl text-blue-300 mb-4" />
                  <h3 className="text-xl font-medium text-gray-800 mb-2">No Reviews Yet</h3>
                  <p className="text-gray-600">Be the first to share your experience with this store!</p>
                </div>
              )}
              
              {/* Load More Button */}
              {comments.length > 0 && (
                <div className="mt-8 text-center">
                  <button 
                    type="button"
                    className="px-6 py-3 border border-blue-500 text-blue-600 font-medium rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200 cursor-pointer !rounded-button whitespace-nowrap"
                  >
                   <FaSpinner className=" inline ml-2 animate-spin" />
                    Load More Reviews
                  </button>
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
