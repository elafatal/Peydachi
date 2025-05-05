import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { IoBanSharp } from "react-icons/io5";
const SearchResults = ({
    isLoading,
    error,
    searchQuery,
    selectedCity,
    searchResults,
    allCities,
    handleItemClick,
    clearSearch,
    onKeywordClick 
  }) => {
  const renderStars = (rating) => {
    const safeRating = typeof rating === 'number' ? rating : 0;
    const fullStars = Math.floor(safeRating);
    const hasHalfStar = safeRating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => <span key={`full-${i}`} className="text-yellow-400">★</span>)}
        {hasHalfStar && <span className="text-yellow-400">☆</span>}
        {[...Array(emptyStars)].map((_, i) => <span key={`empty-${i}`} className="text-yellow-400">☆</span>)}
        <span className="ml-1 text-gray-600">{safeRating.toFixed(1)}</span>
      </div>
    );
  };

  if (isLoading) return <>  <div className="flex items-center justify-center h-1/2">
                              <div className="flex space-x-2">
                                <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" />
                              </div>
                            </div>
                        </>;
  if (error) return <div className="text-red-500 text-center py-6">{error}</div>;
  if ((searchQuery || selectedCity) && searchResults.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-gray-500 text-xl mb-2">نتیجه‌ای یافت نشد</div>
        <p className="text-gray-500 test-xs mb-4">حداقل یکی از کلمات را کامل بنویسید</p>
        <button
          className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-white px-6 py-2 rounded-full"
          onClick={clearSearch}
        >
         سرچ مجدد
        </button>
      </div>
    );
  }

  if (!searchQuery && !selectedCity) {
    return (
      <div className="flex flex-col items-center justify-center py-12" >
        <div className="text-gray-500 text-lg mb-3 text-center">میتوانید برای جستجو از کلمات پیشنهادی استفاده کنید  </div>
        <div className="flex flex-wrap justify-center gap-2 mt-1">
        {['داروخانه', 'سوپر مارکت', 'رستوران'].map((suggestion) => (
  <button
    key={suggestion}
    className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors cursor-pointer  whitespace-nowrap"
    onClick={() => onKeywordClick(suggestion)} 
  >
    {suggestion}
  </button>
))}

        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" > 
      {searchResults.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg"
          onClick={() => handleItemClick(item)}
          dir='rtl'
        >
          <div className="h-48 bg-gray-200">
            <img
              src={`https://readdy.ai/api/search-image?query=Professional%20store&width=600&height=400&seq=${item.id}`}
              alt={item.name}
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="p-4">
            <div className="flex gap-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">{item.name}</h3>
            {item.is_banned ?  <p className='text-xs text-red-500 mb-1'>مسدود شده</p>: ''}
            </div>
            
            {renderStars(item.average_rating)}
            <p className="text-gray-600 mt-2 line-clamp-2">{item.description}</p>
            <div className="mt-3 flex items-center text-gray-500">
              <FaMapMarkerAlt className="ml-1 text-blue-500" />
              <span>{allCities.find((city) => city.id === item.city_id)?.name || 'Unknown'}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
