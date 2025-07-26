// useSearchStore.js
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../axiosInstance';
import Swal from "sweetalert2";  
import showErrorToast from '../../../utils/showErrorToast';
const useSearchStore = () => {
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

  // Navigate to detail
  useEffect(() => {
    if (showDetail && selectedItem) {
      navigate(`/storeDetail/${selectedItem.id}`);
    }
  }, [showDetail, selectedItem]);

  // Load all cities
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
      } catch (error) {
        showErrorToast(error);
      } 
    };
    handleAllCities();
  }, []);

  const handleCityInput = (e) => {
    const value = e.target.value;
    setCity(value);
    setShowDetail(false);
    setFilteredCities(allCities.filter((w) =>
      w.name.toLowerCase().includes(value.toLowerCase())
    ).slice(0, 8));
    setCityIndex(-1);
    const matched = allCities.find(c => c.name === value.trim());
    setSelectedCity(
      matched ? { city_id: matched.id, name: matched.name } : null
    );
    setShowCityDropdown(!matched);
  };

  const HandleCityItems = () => {
    setFilteredCities(allCities);
  };

  const handleCitySelect = (city) => {
    setSelectedCity({ city_id: city.id, name: city.name });
    setCity(city.name);
    setShowCityDropdown(false);
    setShowDetail(false);
  };

  const handleKeywordClick = (keyword) => {
    setSearchQuery(keyword);
    setShowDetail(false);
  };

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
      setSearchResults([]); 
      try {
        let response;
        if (query && city) {
          response = await axiosInstance.post('/store/search_all_stores_of_city', {
            city_id: Number(city.city_id),
            name: String(query),
          });
        } else if (query) {
          response = await axiosInstance.post('/store/search_active_stores', {
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
          setIsLoading(true);
        } 
        showErrorToast(error);
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

  const clearSearch = () => {
    setCity('');
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

  return {
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
    setSearchQuery
  };
};

export default useSearchStore;
