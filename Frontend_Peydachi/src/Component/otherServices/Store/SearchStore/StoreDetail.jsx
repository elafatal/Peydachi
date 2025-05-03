import React from 'react';
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaGlobeAmericas,
  FaPhone,
  FaEnvelope,
  FaStar,
  FaStarHalfAlt,
  FaRegStar
} from 'react-icons/fa';

const StoreDetail = ({ selectedItem, filteredCities, handleBackToResults }) => {
  if (!selectedItem) return null;

  const renderStars = (rating) => {
    const safeRating = typeof rating === 'number' ? rating : 0;
    const fullStars = Math.floor(safeRating);
    const hasHalfStar = safeRating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => <FaStar key={`full-${i}`} className="text-yellow-400" />)}
        {hasHalfStar && <FaStarHalfAlt className="text-yellow-400" />}
        {[...Array(emptyStars)].map((_, i) => <FaRegStar key={`empty-${i}`} className="text-yellow-400" />)}
        <span className="ml-1 text-gray-600">{safeRating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative mt-10 h-1/6 md:h-1/6">
        {/* Background image can be added here */}
        <button
          onClick={handleBackToResults}
          className="absolute top-4 left-4 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-md cursor-pointer transition-all"
        >
          <FaArrowLeft className="text-gray-700" />
        </button>
      </div>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-800">{selectedItem.name}</h1>
          <div className="mt-2 md:mt-0">{renderStars(selectedItem.average_rating)}</div>
        </div>
        <div className="mb-6">
          <p className="text-xl font-medium text-red-700 mb-2">{selectedItem.is_banned? 'مسدود شده' : ''}</p>
          <p className="text-gray-600">{selectedItem.description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Location</h2>
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <FaMapMarkerAlt className="text-red-500 mr-2" />
                <span className="text-gray-700">
                  {filteredCities.find(city => city.id === selectedItem.city_id)?.name || 'Unknown Location'}
                </span>
              </div>
              <div className="flex items-center">
                <FaGlobeAmericas className="text-blue-500 mr-2" />
                <span className="text-gray-700">
                  Coordinates: {selectedItem.location_latitude}, {selectedItem.location_longitude}
                </span>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Contact Information</h2>
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <FaPhone className="text-green-500 mr-2" />
                <span className="text-gray-700">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-blue-500 mr-2" />
                <span className="text-gray-700">
                  contact@{selectedItem.name.toLowerCase().replace(/\s+/g, '')}.com
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-button">
            Visit Store
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreDetail;
