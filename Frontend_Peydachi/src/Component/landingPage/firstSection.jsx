import React, { useState, useEffect } from "react";
import { FaAllergies, FaSearch } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { motion } from "framer-motion";
import Cookies from 'js-cookie';
import axios from 'axios';
import axiosInstance from '../axiosInstance';
import backgroundImage from '../../../public/backgroundImage.jpg' 
const FirstSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [city, setcity] = useState('');
  const [showLocationDropdown2, setShowLocationDropdown2] = useState(false);
  const [regions, setRegions] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [filteredRegions, setFilteredRegions] = useState([]);
  const [t,setT]=useState(0)
  const [c,setC]=useState(0)
  useEffect(() => {
    const handleRegions = async () => {
      try {
        const response = await axiosInstance.get('/region/get_all_regions', {
          headers: {
            Authorization: null,
            'Content-Type': 'multipart/form-data'
          }
        });
        setRegions(response.data);
        console.log(response);
        
      } catch (error) {
        console.log(error);
        
      } 
    };

    handleRegions();
  }, []);

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

  

  const handleLocationSelect = async(loc) => {
    try {
      const response = await axiosInstance.post('/city/get_cities_of_region', { region_id : loc.id}, {
        headers: {
          Authorization: null,
          'Content-Type': 'application/json'
        }
      });
      setAllCities(response.data);
      console.log(response);
      
      
    } catch (error) {
      console.log(error);
      
    } 
    setLocation(loc.name);
    setShowLocationDropdown(false);
  };

  const handleCloseOptions =(target)=>{
  if (target === 'region') {
    setShowLocationDropdown(prev => !prev);    
  if (!showLocationDropdown) setFilteredRegions(regions); 
    
  }else if(target === 'city'){
    setShowLocationDropdown2(!showLocationDropdown2)
    if (!showLocationDropdown2) setFilteredCities(allCities)
  }

  }

  const handleLocationSelect2 = (loc2) => {
    setcity(loc2.name);
    setShowLocationDropdown2(false);
  };
  
  const handleSearch = () => {
    console.log({ city, location, searchQuery });
    if (Cookies.get('auth_token') != 'undefined') {
      console.log(Cookies.get('auth_token'));
    }

    
  };
  const handleRegionsInput =(e)=>{
    setLocation(e.target.value);
    setFilteredRegions(regions.filter((w) => w.name.includes(e.target.value)).slice(0, 8));
  }

  const handleCityInput =(e)=>{
    setcity(e.target.value);
    setFilteredCities(allCities.filter((w) => w.name.includes(e.target.value)).slice(0, 8));
  }



const handleRegionKeyDown = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    if (filteredRegions.length > 0) {
      handleLocationSelect(filteredRegions[0]);  
    } else {
      setShowLocationDropdown(false);
    }
  } else if (e.key === 'Escape') {
    setShowLocationDropdown(false);
  }
};


const handleCityKeyDown = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    if (filteredCities.length > 0) {
      handleLocationSelect2(filteredCities[0]);  
    } else {
      setShowLocationDropdown2(false);
    }
  } else if (e.key === 'Escape') {
    setShowLocationDropdown2(false);
  }
};

  return (
    <div className=" relative ">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      ></div>

      {/* Overlay with content */}
      <div className="relative bg-gradient-to-r from-white/90 to-white/50" dir="rtl">
        <div className="max-w-8xl mx-auto px-6 lg:py-30">
          <div className="flex flex-col lg:flex-row items-center justify-center">
            {/*  Text & Title */}
            <div className="w-full lg:w-1/2 flex flex-col text-center">
             <motion.div initial={{ x: "7rem", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 2,
                  type: "spring",
                }}>
                   <h1 className="text-4xl font-bold text-gray-900 mb-3">
                محصول نزدیک خود را در چند ثانیه <span className="text-blue-600">پیدا</span> کنید
              </h1>
              <p className="text-l text-gray-600 mb-6">
                با در دسترس بودن محصول در زمان واقعی، در زمان صرفه جویی کنید و هوشمندتر خرید کنید
              </p>
                </motion.div>
             
              {/* Search Component */}
              <motion.div  initial={{ x: "-7rem", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 2,
                  type: "spring",
                }} className="bg-white p-6 rounded-xl shadow-xl max-w-3xl">
                <div className="flex flex-col gap-4">
                  {/* product input */}
                  <div className="relative">
                    <FaSearch className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="دنبال چی میگردی‌؟"
                      className="w-full px-12 py-3 border border-gray-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  {/* location inputs */}
                  <div className="relative">
                    <FaLocationDot className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="استان"

                      className="w-full px-12 py-3 border border-gray-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={location}
                      onClick={()=>handleCloseOptions('region')}
                      onChange={(e) =>handleRegionsInput(e)}
                      onFocus={() => setFilteredRegions(regions)}
                      onKeyDown={handleRegionKeyDown} 
                    />
                    {showLocationDropdown && (
                      <div className="absolute w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        <div className="p-2 max-h-44 overflow-y-scroll">
                          {filteredRegions.map((loc) => (
                            <button
                              key={loc.id}
                              className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded cursor-pointer whitespace-nowrap "
                              onClick={() => handleLocationSelect(loc)}
                            >
                              {loc.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* City */}
                  <div className="relative">
                    <FaLocationDot className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="شهر"
                      className="w-full px-12 py-3 border border-gray-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={city}
                      onClick={()=>handleCloseOptions('city')}
                      onChange={(e) =>handleCityInput(e)}
                      onFocus={() => setFilteredCities(allCities)}
                      onKeyDown={handleCityKeyDown}
                    />
                    {showLocationDropdown2 && (
                      <div className="absolute w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        <div className="p-2 max-h-44 overflow-y-scroll">
                          {filteredCities.map((loc2) => (
                            <button
                              key={loc2.id}
                              className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded cursor-pointer whitespace-nowrap"
                              onClick={() => handleLocationSelect2(loc2)}
                            >
                              {loc2.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                    className="w-1/2 bg-blue-600 text-xl text-white py-3 rounded-lg hover:bg-blue-700 cursor-pointer m-auto transition-colors duration-300"
                    onClick={handleSearch}
                  >
                    جستجو
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstSection;
