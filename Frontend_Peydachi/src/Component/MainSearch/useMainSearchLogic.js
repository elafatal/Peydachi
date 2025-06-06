import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

const useMainSearchLogic = () => {
  const [searchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [mapCenter, setMapCenter] = useState(null);
  const [locationQuery, setLocationQuery] = useState('');
  const [range, setRange] = useState(5);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stores] = useState([
    {
      "store": {
        "name": "string",
        "owner_id": 0,
        "contact_info": {
          "additionalProp1": {}
        },
        "description": "string",
        "location_longitude": "string",
        "location_latitude": "string",
        "city_id": 0,
        "id": 0,
        "average_rating":4.5 ,
        "average_product_rating": 0,
        "is_banned": true
      },
      "product": {
        "id": 0,
        "name": "string",
        "description": "string",
        "quantity": 0,
        "date_added": "2025-06-06T14:02:39.982Z",
        "city_id": 0,
        "pic_url": "string",
        "average_rating": 0
      },
      "distance": 0
    }
  ]);
  const [cityName, setCityName] = useState(searchParams.get('city_name') || '');

  const cityRef = useRef(cityName);
  useEffect(() => {
    cityRef.current = cityName;
  }, [cityName]);

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

  const handleSearch = () => {
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

  useEffect(() => {
    const initialize = async () => {
      const initialCity = searchParams.get('city_name');
      const query = searchParams.get('Query');
      if (query) setSearchTerm(query);

      if (initialCity) {
        const coords = await geocodeLocation(initialCity);
        if (coords) {
          setMapCenter([coords.lat, coords.lng]);
          setLocation(`${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`);
        }
      }
    };
    initialize();
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
  };
};

export default useMainSearchLogic;
