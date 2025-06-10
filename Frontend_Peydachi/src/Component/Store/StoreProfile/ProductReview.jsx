import axiosInstance from '../../axiosInstance';
import Swal from 'sweetalert2';
import React, { useState, useEffect } from 'react';
import { FaTimes,FaStar,FaSpinner } from 'react-icons/fa';
const ProductReview = ({ closeProductModal, isModalOpen,setIsModalOpen, selectedProduct }) => {
const [rating, setRating] = useState(0);
const [hoverRating, setHoverRating] = useState(0);
const [comment, setComment] = useState('');
const [isSubmitting, setIsSubmitting] = useState(false);
const [feedback, setFeedback] = useState(null);
const [productData, setProductData] = useState({
id: 123,
storeId: 456,
name: 'Premium Wireless Headphones',
image: 'https://readdy.ai/api/search-image?query=Premium%20wireless%20headphones%20with%20blue%20accents%20on%20a%20clean%20white%20background%2C%20professional%20product%20photography%20with%20soft%20shadows%20and%20minimal%20styling%2C%20high%20resolution%20detailed%20image&width=400&height=400&seq=1&orientation=squarish'
});
useEffect(() => {
    if (selectedProduct) {
      setProductData({
        id: selectedProduct.id,
        storeId: selectedProduct.store_id || 456, 
        name: selectedProduct.name,
        image: selectedProduct.pic_url,
      });
    }
  }, [selectedProduct]);

const handleRatingClick = (selectedRating) => {
setRating(selectedRating);
};
// Handle comment input change
const handleCommentChange = (e) => {
setComment(e.target.value);
};

// Handle form submission
const handleSubmit = async (e) => {
e.preventDefault();
if (rating === 0 && !comment.trim()) {
setFeedback({ type: 'error', message: 'Please provide either a rating or a comment' });
return;
}
setIsSubmitting(true);
setFeedback(null);
try {

const ratingPayload = {
store_id: productData.storeId,
rating: rating,
product_id: productData.id
};
// Submit rating if provided
if (rating > 0) {
const ratingPayload = {
store_id: productData.storeId,
rating: rating,
product_id: productData.id
};
try {
    const response = await axiosInstance.post('/product_rating/rate_product', ratingPayload);
    console.log(response);
    if (response.status === 201) {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "بازخورد شما ثبت شد",
            showConfirmButton: false,
            timer: 1500,
            toast: true,
            customClass: {
              popup: 'w-2 h-15 text-sm flex items-center justify-center', 
              title: 'text-xs', 
              content: 'text-xs',
              icon : 'text-xs mb-2'
            }
        });
        setIsModalOpen(false)
    }
  } catch (err) {
    console.log('خطا در دریافت اطلاعات محصول:', err);
  } 
}

// Submit comment if provided
if (comment.trim()) {
const commentPayload = {
product_id: productData.id,
text: comment
};
try {
    const response = await axiosInstance.post('/product_comment/add_product_comment', commentPayload);
    console.log(response);
    if (response.status === 201) {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "نظر شما ثبت شد",
            showConfirmButton: false,
            timer: 1500,
            toast: true,
            customClass: {
              popup: 'w-2 h-15 text-sm flex items-center justify-center', 
              title: 'text-xs', 
              content: 'text-xs',
              icon : 'text-xs mb-2'
            }
        });
        setIsModalOpen(false)
    }
  } catch (err) {
    console.log('خطا در دریافت اطلاعات محصول:', err);
  } 
}


// Simulate API call delay
await new Promise(resolve => setTimeout(resolve, 1000));
setFeedback({ type: 'success', message: 'Thank you for your feedback!' });
// Reset form after successful submission
setTimeout(() => {
setRating(0);
setComment('');
setFeedback(null);
}, 3000);
} catch (error) {
setFeedback({ type: 'error', message: 'An error occurred. Please try again.' });
} finally {
setIsSubmitting(false);
}
};


// Handle clicking outside the modal to close it
const handleOutsideClick = (e) => {
if (e.target === e.currentTarget) {
    closeProductModal();
}
};
if (!isModalOpen) return null;
return (
<div dir='rtl' className="fixed inset-0 flex items-center justify-center  bg-black/40 backdrop-blur-sm z-50" onClick={handleOutsideClick}>
<div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 md:mx-auto overflow-hidden transform transition-all duration-300 ease-in-out">
{/* Header */}
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 flex justify-between items-center">
        <h2 className="text-white font-semibold text-lg">امتیاز و بررسی</h2>
        <button
        onClick={closeProductModal}
        className="text-white hover:text-blue-100 transition-colors cursor-pointer !rounded-button whitespace-nowrap"
        aria-label="Close"
        >
        <FaTimes className="text-white hover:text-blue-100 transition-colors cursor-pointer" />
        </button>
    </div>
{/* Product Info */}
    <div className="flex items-center p-6 border-b border-gray-100">
      <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
      <img
      src={productData.image}
      alt={productData.name}
      className="w-full h-full object-cover object-top"
      />
      </div>
      <div className="mr-4">
      <h3 className="font-bold text-lg text-gray-800">{productData.name}</h3>
      </div>
    </div>
<form onSubmit={handleSubmit} className="p-6">
{/* Rating Section */}
<div className="mb-6">
<label className="block text-gray-700 font-medium mb-2">امتیاز دهید</label>
<div dir='ltr' className="flex items-center">
{[1, 2, 3, 4, 5].map((star) => (
<button
key={star}
type="button"
className={`text-2xl mr-1 transition-transform hover:scale-110 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap ${
(hoverRating || rating) >= star
? 'text-blue-500'
: 'text-gray-300'
}`}
onClick={() => handleRatingClick(star)}
onMouseEnter={() => setHoverRating(star)}
onMouseLeave={() => setHoverRating(0)}
aria-label={`Rate ${star} out of 5 stars`}
>
<FaStar className="text-2xl ml-1 transition-transform hover:scale-110 focus:outline-none cursor-pointer" />
</button>
))}
<span className="ml-2 text-sm text-gray-500">
{rating > 0 ? `${rating}` : ' '}
</span>
</div>
</div>
{/* Comment Section */}
<div className="mb-6">
<label htmlFor="comment" className="block text-gray-700 font-medium mb-2">نظر شما (اختیاری)</label>
<textarea
id="comment"
className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-sm"
rows={4}
placeholder="نظرات خود را در مورد این محصول با ما در میان بگذارید..."
value={comment}
onChange={handleCommentChange}
></textarea>
<div className="text-right text-xs text-gray-500 mt-1">
{comment.length} کاراکتر
</div>
</div>
{/* Feedback Message */}
{feedback && (
<div className={`mb-4 p-3 rounded-md ${
feedback.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
}`}>
<p className="text-sm">{feedback.message}</p>
</div>
)}
{/* Submit Button */}
<div className="flex justify-end">
<button
type="button"
onClick={closeProductModal}
className="ml-3 px-5 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors cursor-pointer !rounded-button whitespace-nowrap"
>
لغو
</button>
<button
type="submit"
className={`px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer !rounded-button whitespace-nowrap ${
isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
}`}
disabled={isSubmitting}
>
{isSubmitting ? (
<span className="flex items-center">
<FaSpinner className="animate-spin ml-2" />
درحال ثبت
</span>
) : 'ثبت بازخورد'}
</button>
</div>
</form>
</div>
</div>
);
};
export default ProductReview