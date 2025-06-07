import React from 'react';
import { FaSearch, FaMapMarkerAlt, FaCrosshairs } from 'react-icons/fa';
const SearchControls = ({
  searchTerm,
  setSearchTerm,
  locationQuery,
  setLocationQuery,
  handleSearchLocation,
  range,
  setRange,
  handleSearch,
  cityName,
  setCityName,
  handleSearchLocation2
}) => {
  
  return (
<div className="space-y-4">
            {/* Product name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400 text-sm" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Search products"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Location
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <FaMapMarkerAlt className="text-gray-400 text-sm" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Enter coordinates"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaCrosshairs onClick={handleSearchLocation} />
                  </button>
                </div>
                
              </div>

              <div className="relative">
              <input
                type="text"
                placeholder="تغییر شهر مرکزی (مثلاً آمل)"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                className="block w-full my-3 pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaCrosshairs onClick={handleSearchLocation2} />
                  </button>
                </div>
                
              </div>
             

            </div>

            {/* Range slider */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Search Range: {range} km
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">1 km</span>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={range}
                  onChange={(e) => setRange(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <span className="text-xs text-gray-500">20 km</span>
              </div>
            </div>

            {/* Search button */}
            <button
              onClick={handleSearch}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm transition duration-150 ease-in-out flex items-center justify-center space-x-2 !rounded-button whitespace-nowrap"
            >
              <FaSearch />
              <span>Search Nearby Stores</span>
            </button>
          </div>
  );
};

export default SearchControls;
