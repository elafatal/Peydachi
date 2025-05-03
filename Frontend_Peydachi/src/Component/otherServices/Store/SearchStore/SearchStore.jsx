import React, { useState, useEffect, useCallback } from 'react';
import {
  FaSearch, FaTimes, FaCity, FaChevronDown, FaChevronUp,
  FaStar, FaStarHalfAlt, FaRegStar, FaMapMarkerAlt, FaArrowLeft
} from 'react-icons/fa';
import {  FaGlobeAmericas, FaPhone, FaEnvelope } from 'react-icons/fa';
import axiosInstance from '../../../axiosInstance';
import StoresCard from '../../../SkeletionLoading/StoresCards'
import { motion, AnimatePresence } from 'framer-motion';
import SearchResults from './SearchResults'; // adjust the path if needed
import StoreDetail from './StoreDetail'; // مسیر را مطابق ساختار پروژه تنظیم کن

const SearchStore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [City, setCity] = useState('');
  const [showCityDropdown, setShowCityDropdown] = useState(false);
   const [allCities, setAllCities] = useState([]);
   const [filteredCities, setFilteredCities] = useState([]);

   const handleCityInput =(e)=>{
    setSelectedCity(e.target.value);
    setFilteredCities(allCities.filter((w) => w.name.includes(e.target.value)).slice(0, 8));
    setCity(e.target.value)
    setShowDetail(false)
    console.log(selectedCity);
    
  }
  const HandleCityItems=()=>{
    setFilteredCities(allCities)
  }
  const handleKeywordClick = (keyword) => {
    setSearchQuery(keyword);
    setShowDetail(false);
  };
  
   useEffect(() => {
    const handleAllCities = async () => {
      try {
        const response = await axiosInstance.get('/city/get_all_cities', {
          headers: {
            Authorization: null,
            'Content-Type': 'multipart/form-data'
          }
        });
        setAllCities(response.data);
        console.log(response);
      } catch (error) {
        console.log(error); 
      } 
    };
    handleAllCities();
  }, []);


  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const performSearch = useCallback(
    debounce(async (query, city) => {
      setIsLoading(true);
      setError(null);
      setSearchResults([]); // Clear old results immediately
      try {
        let response;
        if (query && city) {
          response = await axiosInstance.post('/store/search_all_stores_of_city', {
            city_id: Number(city.city_id),
            name: String(query),
          });
        } else if (query) {
          response = await axiosInstance.post('/store/search_store', {
            name: String(query),
          });
        } else if (city) {
          response = await axiosInstance.post('/store/get_all_stores_of_city', {
            city_id: Number(city.city_id),
          });
        } else {
          setSearchResults([]);
          setIsLoading(false);
          return;
        }
  
        setSearchResults(response.data || []);
      } catch (err) {
        if (err.status === 404) {
            setIsLoading(true)
        }else{
            setError('Failed to fetch results. Please try again.');
        }
        console.log("Search error:", err);
        
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );
  
  
  useEffect(() => {
    performSearch(searchQuery, selectedCity);
  }, [searchQuery, selectedCity, performSearch]);
  

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleCitySelect = (city) => {
    setSelectedCity({ city_id: city.id, name: city.name });
    setCity(city.name)
    setShowCityDropdown(false);
    setShowDetail(false);
  };
  const clearSearch = () => {
    setCity('')
    setSearchQuery('');
    setSelectedCity(null);
    setSearchResults([]);
    setShowDetail(false);
  };
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowDetail(false);
    setShowDetail(true);
  };
  const handleBackToResults = () => {
    setShowDetail(false);
    setSelectedItem(null);
  };


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
    <div className="min-h-screen bg-gray-50" dir='ltr'>
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 w-10/12 mx-auto">
          {/* <h1 className="text-3xl font-bold text-gray-800 mb-6"></h1> */}
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <div  dir='rtl' className="relative flex-1">
              <div className="flex items-center bg-white rounded-4xl shadow-md overflow-hidden">
                <div className="pr-5 text-gray-500"><FaSearch className='text-xl' /></div>
                <input type="text" className="w-full py-4 px-4 text-gray-700 focus:outline-none border-none text-lg" placeholder="جستجو در فروشگاه‌ها" value={searchQuery} onChange={handleSearchChange} />
                {searchQuery && <button className="px-4 text-gray-500 hover:text-gray-700" onClick={() => setSearchQuery('')}><FaTimes /></button>}
              </div>
            </div>
            <div className="relative">
              <input dir='rtl' className="w-full md:w-auto bg-white px-6 py-4 rounded-4xl shadow-md flex items-center justify-between cursor-pointer hover:bg-gray-50"
                placeholder="شهر فروشگاه(اختیاری)"
                value={City}
               onClick={() => setShowCityDropdown(!showCityDropdown)}
               onChange={(e) =>handleCityInput(e)}
               onFocus={() => HandleCityItems()}/>
          <AnimatePresence>
  {showCityDropdown && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto origin-top"
    >
      {filteredCities.map(city => (
        <div
          key={city.id}
          className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
          onClick={() => handleCitySelect(city)}
        >
          <div className="font-medium text-gray-800">{city.name}</div>
        </div>
      ))}
    </motion.div>
  )}
</AnimatePresence>

            </div>
            {(searchQuery || selectedCity) && (
              <button className="bg-gray-200 hover:bg-gray-300 transition-all duration-300 text-gray-900 px-5 py-3 rounded-full" onClick={clearSearch}>
                Clear All
              </button>
            )}
          </div>
        </header>
        <main className='w-11/12 mx-auto'>
          {showDetail ?  <StoreDetail
                        selectedItem={selectedItem}
                        filteredCities={filteredCities}
                        handleBackToResults={handleBackToResults}
                        /> :            <SearchResults
                                            isLoading={isLoading}
                                            error={error}
                                            searchQuery={searchQuery}
                                            selectedCity={selectedCity}
                                            searchResults={searchResults}
                                            allCities={allCities}
                                            handleItemClick={handleItemClick}
                                            clearSearch={clearSearch}
                                            onKeywordClick={handleKeywordClick} // ✅ اضافه شده
                                            />

                                            }
        </main>
      </div>
    </div>
  );
};

export default SearchStore;