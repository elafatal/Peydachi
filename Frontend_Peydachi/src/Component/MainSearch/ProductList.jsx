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
// const renderStars = (rating) => {
//   const fullStars = Math.floor(rating);
//   const halfStar = rating % 1 >= 0.5;
//   const elements = [];
  
  
//   for (let i = 0; i < fullStars; i++) {
//     elements.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
//   }
//   if (halfStar) {
//     elements.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
//   }
//   const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
//   for (let i = 0; i < emptyStars; i++) {
//     elements.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
//   }
//   return elements;
// };


const ProductList = ({ stores }) => {
  return (
    <div className="flex-1 overflow-auto p-4">
    <div className="mb-4">
      <h2 className="text-lg font-medium text-gray-800">
        Found {stores.length} stores nearby
      </h2>
    </div>

    <div className="space-y-4">
      {stores.map((item, i) => (
        <div
          key={item.store.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="p-4">
            <div className="flex items-start">
              {/* Thumbnail */}
              <div className="h-16 w-16 rounded-lg overflow-hidden bg-blue-100 flex-shrink-0 mr-4">
                <img
                  src={`https://readdy.ai/api/search-image?query=Fresh%20organic%20grocery%20store%20with%20apples%20and%20fruits%2C%20clean%20modern%20interior%2C%20bright%20lighting%2C%20professional%20product%20display%2C%20minimalist%20design%2C%20high%20quality%20commercial%20photography&width=100&height=100&seq=${
                    i + 1
                  }&orientation=squarish`}
                  alt={item.store.name}
                  className="h-full w-full object-cover object-top"
                />
              </div>

              {/* Details */}
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium text-gray-800">
                    {item.store.name}
                  </h3>
                  <span className="text-sm font-medium text-blue-600">
                    {item.distance} km
                  </span>
                </div>

                {/* Rating */}
                <div className="flex items-center mt-1">
                  <div className="flex mr-1">{renderStars(item.store.average_rating)}</div>
                  <span className="text-sm text-gray-500">
                    ({item.store.average_rating.toFixed(1)})
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mt-1">
                  {item.product.description}
                </p>

                {/* Stock badge */}
                <div className="mt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <FaCheckCircle className="mr-1" />
                    In Stock: {item.product.quantity}
                  </span>
                </div>
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
