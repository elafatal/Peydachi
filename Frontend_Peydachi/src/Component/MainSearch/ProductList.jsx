import React from 'react';
import { FaCheckCircle, FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const renderStars = (rating) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <>
      {[...Array(full)].map((_, i) => <FaStar key={`f${i}`} className="text-yellow-400" />)}
      {half && <FaStarHalfAlt className="text-yellow-400" />}
      {[...Array(empty)].map((_, i) => <FaRegStar key={`e${i}`} className="text-yellow-400" />)}
    </>
  );
};

const ProductList = ({ stores }) => {
  return (
    <div className="flex-1 overflow-auto p-4">
      <h2 className="text-lg font-medium text-gray-800 mb-4">
        Found {stores.length} stores nearby
      </h2>
      <div className="space-y-4">
        {stores.map((item, i) => (
          <div key={item.store.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md">
            <div className="flex items-start">
              <div className="h-16 w-16 rounded-lg overflow-hidden bg-blue-100 mr-4 flex-shrink-0">
                <img
                  src={`https://readdy.ai/api/search-image?query=Fresh%20organic%20grocery%20store&width=100&height=100&seq=${i + 1}`}
                  alt={item.store.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium text-gray-800">{item.store.name}</h3>
                  <span className="text-sm font-medium text-blue-600">{item.distance} km</span>
                </div>
                <div className="flex items-center mt-1">
                  <div className="flex mr-1">{renderStars(item.store.average_rating)}</div>
                  <span className="text-sm text-gray-500 ml-1">
                    ({item.store.average_rating.toFixed(1)})
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{item.product.description}</p>
                <div className="mt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <FaCheckCircle className="mr-1" />
                    In Stock: {item.product.quantity}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
