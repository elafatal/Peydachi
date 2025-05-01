import React, { useState } from 'react';
import { FaStar, FaRegThumbsUp, FaRegCommentDots, FaRegStar } from 'react-icons/fa';

const UserComment = () => {
  const [activeTab, setActiveTab] = useState('stores');

  const storeComments = [
    {
      id: 1,
      storeName: 'Organic Harvest Market',
      storeImage: 'https://vectorloo.com/wp-content/uploads/edd/2023/08/%D9%88%DA%A9%D8%AA%D9%88%D8%B1-%D8%B5%D9%88%D8%B1%D8%AA-%D8%AA%D8%B1%D9%88%D9%84-%D8%A8%D8%A7-%D8%B9%DB%8C%D9%86%DA%A9-%D9%88-%D8%B3%DB%8C%DA%AF%D8%A7%D8%B1-1.webp',
      timestamp: '2025-04-25 14:30',
      rating: 4,
      comment:
        'Great selection of organic produce. The staff was helpful. Loved the fresh fruit section.',
      likes: 12,
    },
    {
      id: 2,
      storeName: 'Tech Galaxy',
      storeImage: 'https://vectorloo.com/wp-content/uploads/edd/2023/08/%D9%88%DA%A9%D8%AA%D9%88%D8%B1-%D8%B5%D9%88%D8%B1%D8%AA-%D8%AA%D8%B1%D9%88%D9%84-%D8%A8%D8%A7-%D8%B9%DB%8C%D9%86%DA%A9-%D9%88-%D8%B3%DB%8C%DA%AF%D8%A7%D8%B1-1.webp',
      timestamp: '2025-04-20 10:15',
      rating: 5,
      comment:
        'Excellent service and great product selection. Installation support was a bonus.',
      likes: 8,
    },
  ];

  const productComments = [
    {
      id: 1,
      productName: 'Wireless Headphones',
      storeName: 'Tech Galaxy',
      productImage: 'https://vectorloo.com/wp-content/uploads/edd/2023/08/%D9%88%DA%A9%D8%AA%D9%88%D8%B1-%D8%B5%D9%88%D8%B1%D8%AA-%D8%AA%D8%B1%D9%88%D9%84-%D8%A8%D8%A7-%D8%B9%DB%8C%D9%86%DA%A9-%D9%88-%D8%B3%DB%8C%DA%AF%D8%A7%D8%B1-1.webp',
      timestamp: '2025-04-26 09:20',
      rating: 5,
      comment:
        'Amazing sound and noise cancellation. Battery lasted 10 hours straight!',
      likes: 24,
    },
    {
      id: 2,
      productName: 'Organic Avocado Set',
      storeName: 'Organic Harvest Market',
      productImage: 'https://vectorloo.com/wp-content/uploads/edd/2023/08/%D9%88%DA%A9%D8%AA%D9%88%D8%B1-%D8%B5%D9%88%D8%B1%D8%AA-%D8%AA%D8%B1%D9%88%D9%84-%D8%A8%D8%A7-%D8%B9%DB%8C%D9%86%DA%A9-%D9%88-%D8%B3%DB%8C%DA%AF%D8%A7%D8%B1-1.webp',
      timestamp: '2025-04-22 11:35',
      rating: 4,
      comment: 'Ripe and fresh, though one was a bit overripe. Still great value.',
      likes: 7,
    },
  ];

  const renderStars = (rating) => (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );

  const CommentCard = ({ item, isStore }) => (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
      <div className="flex mb-4">
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
          <div className="flex items-center mt-1">
            {renderStars(item.rating)}
            <span className="text-xs text-gray-500 ml-2">{item.timestamp}</span>
          </div>
        </div>
      </div>
      <p className="text-gray-700 mb-4">{item.comment}</p>
      <div className="flex items-center justify-between">
        <div className="flex text-gray-500 text-sm items-center">
          <FaRegThumbsUp className="mr-1" />
          {item.likes} 
        </div>
        <div className="flex space-x-2 text-sm">
          <button className="text-blue-600 font-medium">Edit</button>
          <button className="text-red-600 font-medium">Delete</button>
        </div>
      </div>
    </div>
  );

  const activeData = activeTab === 'stores' ? storeComments : productComments;

  return (
    <div className="min-h-screen bg-gray-50" dir='ltr'>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Comments History</h1>

        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('stores')}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'stores'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Store Reviews
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'products'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Product Reviews
          </button>
        </div>

        <div className="space-y-6">
          {activeData.length > 0 ? (
            activeData.map((item) => (
              <CommentCard key={item.id} item={item} isStore={activeTab === 'stores'} />
            ))
          ) : (
            <div className="text-center py-12">
              {activeTab === 'stores' ? (
                <FaRegCommentDots className="text-gray-300 text-5xl mb-4 mx-auto" />
              ) : (
                <FaRegStar className="text-gray-300 text-5xl mb-4 mx-auto" />
              )}
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                No {activeTab === 'stores' ? 'store' : 'product'} comments yet
              </h3>
              <p className="text-gray-500 mb-6">
                {activeTab === 'stores'
                  ? 'Browse stores and share your experience'
                  : 'Start shopping and share your thoughts'}
              </p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium">
                {activeTab === 'stores' ? 'Explore Stores' : 'Discover Products'}
              </button>
            </div>
          )}

          {activeData.length > 3 && (
            <div className="text-center mt-8">
              <button className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-md font-medium">
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserComment;
