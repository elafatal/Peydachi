import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
const useMainSearchLogic = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [mapCenter, setMapCenter] = useState(null);
  const [locationQuery, setLocationQuery] = useState('');
  const [range, setRange] = useState(5);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchPayload, setSearchPayload] = useState({
    name: '',
    city_id: null,
    location_latitude: '',
    location_longitude: '',
    range_km: 5
  });

  const [stores,setStores] = useState([]);
  const [cityId, setCityId] = useState(searchParams.get('city_id') || '');
  const [cityName, setCityName] = useState(searchParams.get('city_name') || '');

  const cityRef = useRef(cityName);
  useEffect(() => {
    cityRef.current = cityName;
  }, [cityName]);

  useEffect(() => {
    setSearchPayload(prev => ({
      ...prev,
      name: searchTerm,
      range_km: range,
      city_id: cityId ? parseInt(cityId) : null
    }));
  }, [searchTerm, range]);

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

  const handleSearch = async() => {
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
      console.log('محصول مورد نظر یافت نشد');
      setStores([])
    }
  }
    console.log('🔍 Searching for:', searchTerm);
    console.log('📍 Location:', location);
    console.log('📏 Range:', range, 'km');
  };

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
    setLocationQuery('')
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
    alert('شهر مورد نظر پیدا نشد.');
  };

  useEffect(() => {
    const cityIdFromParams = searchParams.get('city_id');
    const cityNameFromParams = searchParams.get('city_name');
    const query = searchParams.get('Query');
  
    if (cityIdFromParams) setCityId(cityIdFromParams);
    if (cityNameFromParams) setCityName(cityNameFromParams);
    if (query) setSearchTerm(query);
  
    if (cityNameFromParams) {
      geocodeLocation(cityNameFromParams).then((coords) => {
        if (coords) {
          setMapCenter([coords.lat, coords.lng]);
          setLocation(`${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`);
        }
      });
    }
  }, []);
  

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
    handleSearchLocation2
  };
};

export default useMainSearchLogic;
