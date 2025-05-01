import React, { useEffect, useState } from 'react';
import { FaStar, FaRegThumbsUp, FaRegCommentDots, FaRegStar } from 'react-icons/fa';
import axiosInstance from '../../axiosInstance';
import { MdDelete } from "react-icons/md";
const CommentCard = ({ item, isStore }) => { 
    function timeAgo(dateAdded) {
        const now = new Date();
        const addedDate = new Date(dateAdded);
        
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
        return `${years} سال${years > 1 ? 's' : ''} ago`;
      }

      const handleDeleteSelfComment = async (id) => {
        if (!isStore) {
            try {
                const response = await axiosInstance.delete(
                    '/product_comment/user_delete_product_comment',
                    {
                        data: { product_comment_id: id }, // Pass data like this
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
    
                if (response.status === 200) {
                    console.log("product comment delete");
                }
            } catch (error) {
                console.error(error);
            }
        } else if (isStore) {
            try {
                const response = await axiosInstance.delete(
                    '/store_comment/user_delete_store_comment',
                    {
                        data: { store_comment_id: id }, // Pass data like this
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
    
                if (response.status === 200) {
                    console.log("store comment delete");
                }
            } catch (error) {
                console.error(error);
            }
        }
    };
    

    const renderStars = (rating) => (
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            />
          ))}
        </div>
      )
      return(<div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition" dir='rtl'>
        <div className="flex gap-2 mb-4">
          <img
            src={isStore ? item.storeImage : item.productImage}
            alt={isStore ? item.storeName : item.productName}
            className={`${
              isStore ? 'w-12 h-12 rounded-full' : 'w-16 h-16 rounded-md'
            } object-cover object-top mr-4`}
          />
          <div>
            
            <h3 className="font-bold text-gray-800">
              {isStore ? item.storeName : item.productName}
            </h3>
            
            {!isStore && <p className="text-sm text-gray-600">from {item.storeName}</p>}
            <div className="flex items-center gap-1 mt-1">
              {renderStars(item.rating)}
              <span className="text-xs text-gray-500 mr-2">{timeAgo(item.timestamp)}</span>
            </div>
          </div>
        </div>
        <p className="text-gray-700">{item.comment}</p>
        <div className="flex items-center justify-between">
          <div className="flex text-gray-500 text-sm items-center">
            {/* <FaRegThumbsUp className="mr-1" />
            {item.likes} */}
          </div>
          <div className="flex space-x-2 text-sm">
            <button onClick={()=>handleDeleteSelfComment(item.id)} className="text-red-600 text-2xl "><MdDelete /></button>
          </div>
        </div>
      </div>)
    
            }
  export default CommentCard