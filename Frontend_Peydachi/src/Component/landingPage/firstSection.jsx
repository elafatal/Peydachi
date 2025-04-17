import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaLocationCrosshairs } from "react-icons/fa6";
import Cookies from 'js-cookie';
const FirstSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [city, setcity] = useState('');
  const [showLocationDropdown2, setShowLocationDropdown2] = useState(false);

  const popularLocations = [
    'New York, USA',
    'London, UK',
    'Tokyo, Japan',
    'Paris, France',
    'New York, USA',
    'London, UK',
    'Tokyo, Japan',
    'Paris, France',
    'New York, USA',
    'London, UK',
    'Tokyo, Japan',
    'Paris, France',
    'New York, USA',
    'London, UK',
    'Tokyo, Japan',
    'Paris, France',
    'Sydney, Australia'
  ];

  const handleLocationSelect = (loc) => {
    setLocation(loc);
    setShowLocationDropdown(false);
  };
  
  const handleLocationSelect2 = (loc2) => {
    setcity(loc2);
    setShowLocationDropdown2(false);
  };
  
  const handleSearch = () => {
    console.log({ city, location, searchQuery });
    if (Cookies.get('auth_token') != 'undefined') {
      console.log(Cookies.get('auth_token'));
    }

    
  };

  return (
    <div className="pt-12 relative lg:pt-10">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://public.readdy.ai/ai/img_res/5353bf8ba762d5ae3f88348ce1474221.jpg')`,
        }}
      ></div>

      {/* Overlay with content */}
      <div className="relative bg-gradient-to-r from-white/90 to-white/50" dir="rtl">
        <div className="max-w-8xl mx-auto px-6 lg:py-0">
          <div className="flex flex-col lg:flex-row items-center gap-12 h-full justify-center">
            {/*  Text & Title */}
            <div className="w-full lg:w-1/2 flex flex-col text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                محصول نزدیک خود را در چند ثانیه <span className="text-blue-600">پیدا</span> کنید
              </h1>
              <p className="text-l text-gray-600 mb-6">
                با در دسترس بودن محصول در زمان واقعی، در زمان صرفه جویی کنید و هوشمندتر خرید کنید
              </p>
              {/* Search Component */}
              <div className="bg-white p-6 rounded-xl shadow-xl max-w-3xl">
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
                      onChange={(e) => setLocation(e.target.value)}
                      onFocus={() => setShowLocationDropdown(true)}
                    />
                    {showLocationDropdown && (
                      <div className="absolute w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        <div className="p-2 max-h-44 overflow-y-scroll">
                          {popularLocations.map((loc) => (
                            <button
                              key={loc}
                              className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded cursor-pointer whitespace-nowrap "
                              onClick={() => handleLocationSelect(loc)}
                            >
                              {loc}
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
                      onChange={(e) => setcity(e.target.value)}
                      onFocus={() => setShowLocationDropdown2(true)}
                    />
                    {showLocationDropdown2 && (
                      <div className="absolute w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        <div className="p-2 max-h-44 overflow-y-scroll">
                          {popularLocations.map((loc2) => (
                            <button
                              key={loc2}
                              className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded cursor-pointer whitespace-nowrap"
                              onClick={() => handleLocationSelect2(loc2)}
                            >
                              {loc2}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstSection;
