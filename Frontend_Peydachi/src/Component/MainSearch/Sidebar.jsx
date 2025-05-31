import React from 'react';
import { FaChevronLeft, FaMap } from 'react-icons/fa';
import SearchControls from './SearchControls';
import ProductList from './ProductList';

const Sidebar = ({
  sidebarOpen,
  toggleSidebar,
  searchTerm,
  setSearchTerm,
  location,
  locationQuery,
  setLocationQuery,
  handleSearchLocation,
  range,
  setRange,
  handleSearch,
  stores
}) => {
  return (
    <div className={`bg-white shadow-lg transition-all duration-300 flex flex-col ${sidebarOpen ? 'w-full md:w-1/3' : 'w-0 overflow-hidden'}`}>
      <div className="p-4 md:p-6 border-b border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Find Products Nearby</h1>
          <button onClick={toggleSidebar} className="hidden md:block text-gray-500 hover:text-gray-700">
            <FaChevronLeft />
          </button>
          <button onClick={toggleSidebar} className="md:hidden block text-gray-500 hover:text-gray-700">
            <FaMap />
          </button>
        </div>

        <SearchControls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          location={location}
          locationQuery={locationQuery}
          setLocationQuery={setLocationQuery}
          handleSearchLocation={handleSearchLocation}
          range={range}
          setRange={setRange}
          handleSearch={handleSearch}
        />
      </div>

      <ProductList stores={stores} />
    </div>
  );
};

export default Sidebar;
