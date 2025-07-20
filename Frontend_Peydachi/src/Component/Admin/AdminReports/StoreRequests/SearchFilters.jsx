
import { FaTimes,FaSearch } from 'react-icons/fa';
import React, { useState, useEffect, useRef } from 'react';

const SearchFilters = ({
  searchTerm,
  setSearchTerm,
  selectedCity,
  setSelectedCity,
  activeTab,
  setActiveTab,
  cities
}) => {
  const [cityInput, setCityInput] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();
  useEffect(() => {
    if (cityInput.trim()) {
      const filtered = cities.filter(city =>
        city.name.toLowerCase().includes(cityInput.toLowerCase())
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities(cities); 
    }
  }, [cityInput, cities]);


  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (selectedCity) {
      const selected = cities.find(c => c.id === selectedCity);
      setCityInput(selected?.name || '');
    } else {
      setCityInput('');
    }
  }, [selectedCity, cities]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8" dir="rtl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="جستجوی درخواست های فروشگاه..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <FaSearch className="inline" />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          {/* شهرها */}
{/* شهرها */}
<div className="relative" ref={dropdownRef}>
  <input
    type="text"
    placeholder="انتخاب شهر"
    className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[200px]"
    value={cityInput}
    onChange={(e) => setCityInput(e.target.value)}
    onFocus={() => {
      setFilteredCities(cities); // نمایش همه در ابتدا
      setShowDropdown(true);
    }}
  />
  {showDropdown && (
    <ul className="absolute z-10 bg-white border border-gray-300 mt-1 max-h-40 overflow-y-auto rounded-lg shadow w-full">
      {filteredCities.length ? (
        filteredCities.map(city => (
          <li
            key={city.id}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setSelectedCity(city.id);
              setCityInput(city.name);
              setShowDropdown(false);
            }}
          >
            {city.name}
          </li>
        ))
      ) : (
        <li className="px-4 py-2 text-gray-400">شهری یافت نشد</li>
      )}
    </ul>
  )}
</div>


          {/* فیلتر وضعیت */}
          <div>
            <select
              className="bg-white border border-gray-300 text-gray-700 py-2 px-4 pl-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
            >
              <option value="all">همه درخواست‌ها</option>
              <option value="reviewed">بررسی‌شده</option>
              <option value="pending">در انتظار بررسی</option>
            </select>
          </div>

          {/* پاکسازی فیلترها */}
          {(searchTerm || selectedCity || activeTab !== 'all') && (
            <button
              className="py-2 px-4 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 whitespace-nowrap"
              onClick={() => {
                setSearchTerm('');
                setSelectedCity(null);
                setActiveTab('all');
              }}
            >
              <FaTimes className="ml-2 inline" />
              پاک‌سازی فیلترها
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
