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


const ProductList = ({ stores , onStoreClick }) => {
  return (
    <div className="flex-1 overflow-auto p-4">
    <div className="mb-4">
      <h2 className="text-lg font-medium text-gray-800">
      {stores.length > 0 ? <> برای شما
       <span className='p-0.5'> {stores.length} </span>
        فروشگاه پیدا شد </> : <span className='p-0.5'> نتیجه‌ای یافت نشد </span>}
       
      </h2>
    </div>

    <div className="space-y-4">
      {stores.map((item, i) => (
        <div
          key={item.store.id}
          onClick={() => onStoreClick(item.store)}
          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="p-4">
            <div className="flex items-start">
              {/* Thumbnail */}
              <div className="h-16 w-16 rounded-lg overflow-hidden bg-blue-100 flex-shrink-0 mr-4">
                <img
                  src={item.product.pic_url}
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
                    ({item.store.average_rating?.toFixed(1)})
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mt-1">
                  {item.product.description}
                </p>

                {/* Stock badge */}
                <div className="mt-2 flex justify-between">
             
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    <FaCheckCircle className="mr-1" /> 
                    موجود در انبار: {item.product.quantity}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <FaCheckCircle className="mr-1" /> 
                    جزئیات فروشگاه 
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
