import React, { useState, useEffect, useCallback } from 'react';
import {
  FaSearch, FaTimes, FaCity, FaChevronDown, FaChevronUp,
  FaStar, FaStarHalfAlt, FaRegStar, FaMapMarkerAlt, FaArrowLeft
} from 'react-icons/fa';
import {  FaGlobeAmericas, FaPhone, FaEnvelope } from 'react-icons/fa';
import axiosInstance from '../../../axiosInstance';
import StoresCard from '../../../SkeletionLoading/StoresCards'
import { motion, AnimatePresence } from 'framer-motion';


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

  const mockStores = [
    { id: 1, name: "Fashion Boutique", description: "A trendy fashion store with the latest styles and accessories for all seasons.", average_rating: 4.5, city_id: 1, location_latitude: "34.0522", location_longitude: "-118.2437", is_banned: false },
    { id: 2, name: "Fashion Haven", description: "Your ultimate fashion destination with designer brands and unique styles.", average_rating: 4.2, city_id: 2, location_latitude: "37.7749", location_longitude: "-122.4194", is_banned: false },
    { id: 3, name: "Fashion Gallery", description: "Curated fashion collections from around the world.", average_rating: 4.8, city_id: 3, location_latitude: "40.7128", location_longitude: "-74.0060", is_banned: false },
    { id: 4, name: "Tech Store", description: "A modern tech store with the latest gadgets and accessories.", average_rating: 4.7, city_id: 1, location_latitude: "34.0522", location_longitude: "-118.2437", is_banned: false },
    { id: 5, name: "Tech World", description: "Your one-stop destination for all things technology.", average_rating: 4.6, city_id: 2, location_latitude: "37.7749", location_longitude: "-122.4194", is_banned: false },
    { id: 6, name: "Green Market", description: "Fresh organic produce and local goods sourced from sustainable farms.", average_rating: 4.8, city_id: 3, location_latitude: "40.7128", location_longitude: "-74.0060", is_banned: false }
  ];

  const mockCities = [
    { id: 1, name: "Los Angeles", description: "The entertainment capital of the world with beautiful beaches and vibrant culture.", average_rating: 4.3, location_latitude: "34.0522", location_longitude: "-118.2437", is_banned: false },
    { id: 2, name: "San Francisco", description: "A picturesque city known for its iconic Golden Gate Bridge and tech innovation.", average_rating: 4.6, location_latitude: "37.7749", location_longitude: "-122.4194", is_banned: false },
    { id: 3, name: "New York", description: "The city that never sleeps, featuring world-class dining, shopping, and entertainment.", average_rating: 4.4, location_latitude: "40.7128", location_longitude: "-74.0060", is_banned: false },
    { id: 4, name: "New Orleans", description: "A city rich in history, music, and unique cultural heritage.", average_rating: 4.5, location_latitude: "29.9511", location_longitude: "-90.0715", is_banned: false },
    { id: 5, name: "New Haven", description: "Historic city known for education and cultural attractions.", average_rating: 4.2, location_latitude: "41.3083", location_longitude: "-72.9279", is_banned: false }
  ];

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
  

  const renderSearchResults = () => {
    if (isLoading) return <StoresCard/>
    if (error) return <div className="text-red-500 text-center py-6">{error}</div>;
    if ((searchQuery || selectedCity) && searchResults.length === 0) {
        return (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-gray-500 text-xl mb-2">
              <i className="fas fa-search mr-2"></i>
              No results found
            </div>
            <p className="text-gray-500 mb-4">Try adjusting your search or explore popular options below</p>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-button whitespace-nowrap cursor-pointer transition-colors"
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
            <div className="text-gray-700 text-xl mb-4">
              <i className="fas fa-compass mr-2"></i>
              Start searching to discover stores
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {['داروخانه', 'سوپر مارکت', 'رستوران'].map(suggestion => (
                <button
                  key={suggestion}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-button whitespace-nowrap cursor-pointer transition-colors"
                  onClick={() => setSearchQuery(suggestion)}
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
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg" onClick={() => handleItemClick(item)}>
            <div className="h-48 bg-gray-200">
              <img src={`https://readdy.ai/api/search-image?query=Professional%20store&width=600&height=400&seq=${item.id}`} alt={item.name} className="w-full h-full object-cover object-top" />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-1">{item.name}</h3>
              {renderStars(item.average_rating)}
              <p className="text-gray-600 mt-2 line-clamp-2">{item.description}</p>
              <div className="mt-3 flex items-center text-gray-500">
                <FaMapMarkerAlt className="mr-1" />
                <span>{allCities.find(city => city.id === item.city_id)?.name || 'Unknown'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
   
  };



const renderItemDetail = () => {
    if (!selectedItem) return null;
  
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-1/5 md:h-1/5">
          {/* <img ... /> */}
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
            <div className="mt-2 md:mt-0">
              {renderStars(selectedItem.average_rating)}
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">About</h2>
            <p className="text-gray-600">{selectedItem.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Location</h2>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <FaMapMarkerAlt className="text-red-500 mr-2" />
                  <span className="text-gray-700">
                    {mockCities.find(city => city.id === selectedItem.city_id)?.name || 'Unknown Location'}
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
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-button whitespace-nowrap cursor-pointer transition-colors">
              Visit Store
            </button>
          </div>
        </div>
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
          {showDetail ? renderItemDetail() : renderSearchResults()}
        </main>
      </div>
    </div>
  );
};

export default SearchStore;