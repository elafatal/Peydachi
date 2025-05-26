import React, { useState, useEffect, useCallback } from 'react';
import {
  FaSearch, FaTimes, FaCity, FaChevronDown, FaChevronUp,
  FaStar, FaStarHalfAlt, FaRegStar, FaMapMarkerAlt, FaArrowLeft
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../axiosInstance';
import { motion, AnimatePresence } from 'framer-motion';
import SearchResults from './SearchResults'; 


const SearchStore = () => {
  const navigate = useNavigate();
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
  const [cityIndex, setCityIndex] = useState(-1);       

   useEffect(() => {
    if (showDetail && selectedItem) {
      navigate(`/storeDetail/${selectedItem.id}`);
    }
  }, [showDetail, selectedItem]);
  
  //  const handleCityInput =(e)=>{
  //   setSelectedCity(e.target.value);
  //   setFilteredCities(allCities.filter((w) => w.name.includes(e.target.value)).slice(0, 8));
  //   setCity(e.target.value)
  //   setShowDetail(false)
  //   console.log(selectedCity);
    
  // }

const handleCityInput = (e) => {
  const value = e.target.value;
  setCity(value);                 // متن خود اینپوت
  setShowDetail(false);
  setFilteredCities(allCities.filter((w) => w.name.toLowerCase().includes(value.toLowerCase())).slice(0, 8));
  
  setCityIndex(-1);
  // اگر دقیقاً شهرى با همین نام داریم، آن را انتخاب کن
  const matched = allCities.find(c => c.name === value.trim());
setSelectedCity(
  matched ? { city_id: matched.id, name: matched.name } : null
);
setShowCityDropdown(!matched);
 
};

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

const handleCityKeyDown = (e) => {
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (!showCityDropdown) setShowCityDropdown(true);
    setCityIndex((prev) =>
      prev < filteredCities.length - 1 ? prev + 1 : 0 
    );
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (!showCityDropdown) setShowCityDropdown(true);
    setCityIndex((prev) =>
      prev > 0 ? prev - 1 : filteredCities.length - 1
    );
  } else if (e.key === 'Enter') {
    if (showCityDropdown && cityIndex >= 0) {
      e.preventDefault();
      handleCitySelect(filteredCities[cityIndex]);
    }
  } else if (e.key === 'Escape') {
    setShowCityDropdown(false);
  }
};


  const performSearch = useCallback(
    debounce(async (query, city) => {
      console.log(searchQuery);
      setIsLoading(true);
      setError(null);
      setSearchResults([]); 
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



  

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white" dir='ltr'>
      <div className="container mx-auto px-4 py-8">
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