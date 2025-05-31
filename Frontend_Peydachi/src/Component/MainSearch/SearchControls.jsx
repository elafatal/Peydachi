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
  handleSearch
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
        <div className="relative">
          <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Your Location</label>
        <div className="relative">
          <FaMapMarkerAlt className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
            placeholder="Enter coordinates or name"
          />
          <div className="absolute right-3 top-2.5">
            <FaCrosshairs className="text-blue-500 cursor-pointer" onClick={handleSearchLocation} />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Search Range: {range} km</label>
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

      <button
        onClick={handleSearch}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm flex items-center justify-center space-x-2"
      >
        <FaSearch />
        <span>Search Nearby Stores</span>
      </button>
    </div>
  );
};

export default SearchControls;
