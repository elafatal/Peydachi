// useCitySelector.js
import { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';

const useCitySelector = () => {
  const [cityInput, setCityInput] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const [allCities, setAllCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [cityIndex, setCityIndex] = useState(-1);
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axiosInstance.get('/city/get_all_cities');
        setAllCities(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCities();
  }, []);

  const handleCityInput = (e) => {
    const value = e.target.value;
    setCityInput(value);
    setFilteredCities(allCities.filter(c => c.name.toLowerCase().includes(value.toLowerCase())).slice(0, 8));
    const matched = allCities.find(c => c.name === value.trim());
    setSelectedCity(matched ? { city_id: matched.id, name: matched.name } : null);
    setShowCityDropdown(!matched);
    setCityIndex(-1);
  };

  const handleCityKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!showCityDropdown) setShowCityDropdown(true);
      setCityIndex((prev) => prev < filteredCities.length - 1 ? prev + 1 : 0);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!showCityDropdown) setShowCityDropdown(true);
      setCityIndex((prev) => prev > 0 ? prev - 1 : filteredCities.length - 1);
    } else if (e.key === 'Enter') {
      if (showCityDropdown && cityIndex >= 0) {
        e.preventDefault();
        handleCitySelect(filteredCities[cityIndex]);
      }
    } else if (e.key === 'Escape') {
      setShowCityDropdown(false);
    }
  };

  const handleCitySelect = (city) => {
    setSelectedCity({ city_id: city.id, name: city.name });
    setCityInput(city.name);
    setShowCityDropdown(false);
  };

  return {
    cityInput,
    selectedCity,
    allCities,
    filteredCities,
    showCityDropdown,
    cityIndex,

    setSelectedCity,
    setShowCityDropdown,
    handleCityInput,
    handleCityKeyDown,
    handleCitySelect,
  };
};

export default useCitySelector;
