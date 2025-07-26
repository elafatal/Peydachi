import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';
import showErrorToast from '../utils/showErrorToast';
const useMainSearchLogic = () => {
  const cityDebounceTimeout = useRef(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [mapCenter, setMapCenter] = useState(null);
  const [locationQuery, setLocationQuery] = useState('');
  const [range, setRange] = useState(5);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedStoreLocation, setSelectedStoreLocation] = useState(null);
  const [searchPayload, setSearchPayload] = useState({
    name: '',
    city_id: null,
    location_latitude: '',
    location_longitude: '',
    range_km: 5
  });

  const [cities, setCities] = useState([]);
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axiosInstance.get('/city/get_all_cities');
        setCities(res.data);
      } catch (err) {
        showErrorToast(err);
      }
    };
  
    fetchCities();
  }, []);
  
  const [stores,setStores] = useState([]);
  const [cityId, setCityId] = useState(searchParams.get('city_id') || '');
  const [cityName, setCityName] = useState(searchParams.get('city_name') || '');
  const firstLoad = useRef(true);
  const cityRef = useRef(cityName);
  useEffect(() => {
    cityRef.current = cityName;
  }, [cityName]);
  useEffect(() => {
    const saved = sessionStorage.getItem('mainSearchState');
    const hasParams = searchParams.get('city_name') || searchParams.get('city_id') || searchParams.get('Query');
      if (!hasParams && saved) {
      const parsed = JSON.parse(saved);
      setSearchTerm(parsed.searchTerm || '');
      setRange(parsed.range || 10);
      setCityName(parsed.cityName || '');
      setLocation(parsed.location || null);
      setMapCenter(parsed.mapCenter || null);
      if (parsed.selectedStoreLocation) {
        setSelectedStoreLocation(parsed.selectedStoreLocation);
      }
    }
  }, []);
  useEffect(() => {
    const shouldSave = searchTerm && cityName && location && mapCenter;
    if (!shouldSave) return;
  
    const stateToSave = {
      searchTerm,
      range,
      cityName,
      location,
      mapCenter,
      selectedStoreLocation,
    };
    sessionStorage.setItem('mainSearchState', JSON.stringify(stateToSave));
  }, [searchTerm, range, cityName, location, mapCenter, selectedStoreLocation]);
  
  
  useEffect(() => {
    setSearchPayload(prev => ({
      ...prev,
      name: searchTerm,
      range_km: range,
      city_id: /^\d+$/.test(cityId) ? parseInt(cityId) : null
    }));
  }, [searchTerm, range, cityId]);
  
  useEffect(() => {
    const [lat, lng] = location.split(',').map(parseFloat);
    if (!isNaN(lat) && !isNaN(lng)) {
      setSearchPayload(prev => ({
        ...prev,
        location_latitude: lat.toString(),
        location_longitude: lng.toString()
      }));
    }
  }, [location]);
  useEffect(() => {
    const stateToSave = {
      searchTerm,
      range,
      cityName,
      location,
      mapCenter,
      selectedStoreLocation,
    };
    sessionStorage.setItem('mainSearchState', JSON.stringify(stateToSave));
  }, [searchTerm, range, cityName, location, mapCenter, selectedStoreLocation]);
  
  const geocodeLocation = async (query, city = '') => {
    const fullQuery = city ? `${query}, ${city}` : query;
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullQuery)}`
    );
    const data = await response.json();
    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      return { lat: parseFloat(lat), lng: parseFloat(lon) };
    }
    return null;
  };

  useEffect(() => {
    const { name, city_id, location_latitude, location_longitude, range_km } = searchPayload;
    const allReady = name && city_id && location_latitude && location_longitude && range_km;
  
    if (allReady) {
      // فقط بار اول به‌صورت خودکار سرچ کن
      if (firstLoad.current) {
        firstLoad.current = false;
        handleSearch();
      }
    }
  }, [searchPayload]);
  
  useEffect(() => {
    const cityIdFromParams = searchParams.get('city_id');
    const cityNameFromParams = searchParams.get('city_name');
    const query = searchParams.get('Query');
    const rangeFromParams = searchParams.get('range');
  
    if (cityIdFromParams !== cityId) setCityId(cityIdFromParams);
    if (cityNameFromParams !== cityName) setCityName(cityNameFromParams);
    if (query !== searchTerm) setSearchTerm(query);
    if (rangeFromParams && Number(rangeFromParams) !== range) {
      setRange(Number(rangeFromParams));
    }
  
    const targetCity = cityNameFromParams || 'تهران';
    geocodeLocation(targetCity).then((coords) => {
      if (coords) {
        const newLocation = `${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`;
        setMapCenter([coords.lat, coords.lng]);
        setLocation(newLocation);
      } else {
        console.warn('❌ نتوانستیم مختصات مکان پیش‌فرض را بگیریم.');
      }
    });
  }, [searchParams]);
  
  
  useEffect(() => {
    if (!cityName) return;
  
    geocodeLocation(cityName).then((coords) => {
      if (coords) {
        setMapCenter([coords.lat, coords.lng]);
        setLocation(`${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`);
      }
    });
  }, [cityName]);
    
  const handleSearch = async() => {
  
    const queryParams = new URLSearchParams();
    queryParams.set('city_id', cityId); // ← اضافه کن
    queryParams.set('Query', searchTerm);
    queryParams.set('range', range);
    queryParams.set('city_name', cityName);
    navigate(`/search?${queryParams.toString()}`, { replace: true });
    console.log("📦 Payload being sent:", searchPayload);
   console.log(searchPayload);
   try {
    const response = await axiosInstance.post('/product/search_near_products', 
        searchPayload, 
        {
          headers: {
            Authorization: null,
            'Content-Type': 'application/json',
          }
        }
      );
    setStores(response.data)
  } catch (error) {
    if (error.response && error.response.status === 404) {
      setStores([])
    }
    showErrorToast(error);
  }
    console.log('🔍 Searching for:', searchTerm);
    console.log('📍 Location:', location);
    console.log('📏 Range:', range, 'km');
  };
  useEffect(() => {
    if (!cityName || cities.length === 0) return;
  
    // اگر تایمر قبلی هنوز فعال بود، پاکش کن
    if (cityDebounceTimeout.current) {
      clearTimeout(cityDebounceTimeout.current);
    }
  
    // یه تایمر جدید راه بنداز که بعد از 700 میلی‌ثانیه اجرا شه
    cityDebounceTimeout.current = setTimeout(() => {
      const matchedCity = cities.find(c => c.name.trim() === cityName.trim());
      if (matchedCity) {
        setCityId(matchedCity.id);
  
        geocodeLocation(cityName).then((coords) => {
          if (coords) {
            const newLocation = `${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`;
            setMapCenter([coords.lat, coords.lng]);
            setLocation(newLocation);
          }
        });
      } else {
        setCityId(null);
      }
    }, 700); // ← اجرا فقط وقتی کاربر تایپش متوقف شد
  
    // اگر cityName عوض شد قبل از اجرا، این cleanup اجرا میشه
    return () => {
      clearTimeout(cityDebounceTimeout.current);
    };
  }, [cityName, cities]);
  
  
  const handleSearchLocation = async () => {
    const normalize = (text) => text.trim().replace(/\s+/g, ' ');

    const tryGeocode = async (query) => {
      const coords = await geocodeLocation(query, cityRef.current);
      if (coords) {
        const newLoc = `${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`;
        setMapCenter([coords.lat, coords.lng]);
        setLocation(newLoc);
        return true;
      }
      return false;
    };

    const normalizedQuery = normalize(locationQuery);
    if (await tryGeocode(normalizedQuery)) return;

    const words = normalizedQuery.split(' ').filter((w) => w.length > 1);
    for (let word of words) {
      if (await tryGeocode(word)) return;
    }

    for (let windowSize = 2; windowSize <= Math.min(3, words.length); windowSize++) {
      for (let i = 0; i <= words.length - windowSize; i++) {
        const phrase = words.slice(i, i + windowSize).join(' ');
        if (await tryGeocode(phrase)) return;
      }
    }

    alert('مکان مورد نظر پیدا نشد.');
  };

const handleSearchLocation2 = async () => {
  if (!cityName || cityName.trim().length < 2) {
    alert('نام شهر را کامل وارد کنید.');
    return;
  }

  const matchedCity = cities.find(c => c.name.trim() === cityName.trim());
  if (!matchedCity) {
    alert('شهر مورد نظر در لیست وجود ندارد.');
    return;
  }

  setLocationQuery('');
  const coords = await geocodeLocation(cityName);
  if (coords) {
    const newLoc = `${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`;
    setMapCenter([coords.lat, coords.lng]);
    setLocation(newLoc);
    setCityId(matchedCity.id); 
  } else {
    alert('مکان شهر پیدا نشد.');
  }
};

  

  return {
    searchTerm,
    setSearchTerm,
    location,
    setLocation,
    mapCenter,
    setMapCenter,
    locationQuery,
    setLocationQuery,
    handleSearchLocation,
    handleSearch,
    range,
    setRange,
    sidebarOpen,
    setSidebarOpen,
    stores,
    cityName,
    setCityName,
    handleSearchLocation2,
    selectedStoreLocation, setSelectedStoreLocation
  };
};

export default useMainSearchLogic;
