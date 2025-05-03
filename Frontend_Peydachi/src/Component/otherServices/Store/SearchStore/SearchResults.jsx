import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import StoresCard from '../../../SkeletionLoading/StoresCards';
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

  if (isLoading) return <StoresCard />;
  if (error) return <div className="text-red-500 text-center py-6">{error}</div>;
  if ((searchQuery || selectedCity) && searchResults.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-gray-500 text-xl mb-2">نتیجه‌ای یافت نشد</div>
        <p className="text-gray-500 mb-4">Try adjusting your search or explore popular options below</p>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-button"
          onClick={clearSearch}
        >
          Clear Search
        </button>
      </div>
    );
  }

  if (!searchQuery && !selectedCity) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-gray-700 text-xl mb-4">Start searching to discover stores</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {['داروخانه', 'سوپر مارکت', 'رستوران'].map((suggestion) => (
  <button
    key={suggestion}
    className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-button"
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {searchResults.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg"
          onClick={() => handleItemClick(item)}
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
            {!item.is_banned ?  <p className='text-xs text-red-500 mb-1'>مسدود شده</p>: ''}
            </div>
            
            {renderStars(item.average_rating)}
            <p className="text-gray-600 mt-2 line-clamp-2">{item.description}</p>
            <div className="mt-3 flex items-center text-gray-500">
              <FaMapMarkerAlt className="ml-1" />
              <span>{allCities.find((city) => city.id === item.city_id)?.name || 'Unknown'}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
