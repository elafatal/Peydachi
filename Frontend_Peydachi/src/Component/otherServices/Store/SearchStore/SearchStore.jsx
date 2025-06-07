import React, { useState, useEffect, useCallback } from 'react';
import {FaSearch, FaTimes} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../axiosInstance';
import { motion, AnimatePresence } from 'framer-motion';
import SearchResults from './SearchResults'; 
import useSearchStore from './useSearchStore';

const SearchStore = () => { 
  const navigate = useNavigate();
  const {
    searchQuery,
    City,
    searchResults,
    isLoading,
    error,
    selectedCity,
    selectedItem,
    showDetail,
    allCities,
    showCityDropdown,
    filteredCities,
    cityIndex,
    setSearchQuery,
    setShowCityDropdown,
    handleCityInput,
    handleCitySelect,
    handleSearchChange,
    handleItemClick,
    handleKeywordClick,
    handleBackToResults,
    clearSearch,
    handleCityKeyDown,
    HandleCityItems,
  } = useSearchStore();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white" dir='ltr'>
      <div className=" container mx-auto px-4 py-8">
        <header className="mb-8 w-10/12 mx-auto">
          
          <div className="flex justify-between" dir='rtl'>
            <h1 className="sm:text-2xl sm:font-bold sm:text-blue-600 sm:mt-3 sm:block hidden">جستجو در فروشگاه‌ها</h1>
            <div className="relative">
                <input dir='rtl' className="scrollIntoView w-full md:w-auto bg-white px-6 py-4 rounded-4xl shadow-md flex items-center justify-between cursor-pointer hover:bg-gray-50"
                  placeholder="شهر فروشگاه(اختیاری)"
                  value={City}
                  onClick={() => setShowCityDropdown(!showCityDropdown)}
                  onChange={(e) =>handleCityInput(e)}
                  onFocus={() => HandleCityItems()}
                  onKeyDown={handleCityKeyDown}/>
            <AnimatePresence>
            {showCityDropdown && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto origin-top"
              >
                 {filteredCities.map((city, idx) => (
                  <div
                    key={city.id}
                    className={`px-4 py-3 cursor-pointer ${
                      idx === cityIndex ? 'bg-blue-50' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => handleCitySelect(city)}
                  >
                    {city.name}
                  </div>
                ))}

                </motion.div>
              )}
            </AnimatePresence>

              </div>
            
          </div>
          <div className="flex flex-col md:flex-row gap-4 mt-6 w-11/12 m-auto">
            <div  dir='rtl' className="relative flex-1">
              <div className="flex items-center bg-white rounded-4xl shadow-md overflow-hidden">
                <div className="pr-5 text-gray-500"><FaSearch className='text-xl text-blue-500' /></div>
                <input id='search_store' type="text" className="w-full py-4 px-4 text-gray-700 focus:outline-none border-none text-lg" placeholder="جستجو در فروشگاه‌ها" value={searchQuery} onChange={handleSearchChange} />
                {searchQuery && <button className="px-4 text-gray-500 hover:text-gray-700" onClick={() => setSearchQuery('')}><FaTimes /></button>}
              </div>
            </div>
           
            {(searchQuery || selectedCity) && (
              <button className="bg-blue-200 hover:bg-blue-300 transition-all duration-300 text-gray-900 px-5 py-3 rounded-full" onClick={clearSearch}>
                پاک کردن جستجو
              </button>
            )}
          </div>
        </header>
       <main className='w-10/12 mx-auto'>
  <SearchResults
    isLoading={isLoading}
    error={error}
    searchQuery={searchQuery}
    selectedCity={selectedCity}
    searchResults={searchResults}
    allCities={allCities}
    handleItemClick={handleItemClick}
    clearSearch={clearSearch}
    onKeywordClick={handleKeywordClick}
  />
</main>

      </div>
    </div>
  );
};

export default SearchStore;