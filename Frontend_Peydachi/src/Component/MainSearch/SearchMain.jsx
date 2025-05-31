import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import MapSection from './MapSection';

const SearchMain = () => {
  const [searchParams] = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [mapCenter, setMapCenter] = useState(null);
  const [locationQuery, setLocationQuery] = useState('');
  const [zoom, setZoom] = useState(14);
  const [range, setRange] = useState(5);
  const [stores] = useState([]);

  const cityName = searchParams.get('city_name');
  const query = searchParams.get('Query');

  const geocodeLocation = async (query, city = '') => {
    const fullQuery = city ? `${query}, ${city}` : query;
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullQuery)}`);
    const data = await response.json();
    if (data?.length > 0) {
      const { lat, lon } = data[0];
      return { lat: parseFloat(lat), lng: parseFloat(lon) };
    }
    return null;
  };

  useEffect(() => {
    if (query) setSearchTerm(query);
  }, [query]);

  useEffect(() => {
    const fetchCityCoordinates = async () => {
      if (cityName) {
        const coords = await geocodeLocation(cityName);
        if (coords) {
          setMapCenter([coords.lat, coords.lng]);
          setLocation(`${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`);
        }
      }
    };
    fetchCityCoordinates();
  }, [cityName]);

  const handleSearchLocation = async () => {
    const coords = await geocodeLocation(locationQuery, cityName);
    if (coords) {
      const newLoc = `${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`;
      setMapCenter([coords.lat, coords.lng]);
      setLocation(newLoc);
    } else {
      alert('مکان مورد نظر پیدا نشد.');
    }
  };

  const handleSearch = () => {
    console.log('Search:', { searchTerm, location, range });
    console.log('Searching for:', searchTerm);
    console.log('Location:', location);
    console.log('Range:', range, 'km');
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 font-sans" dir="ltr">
      <Sidebar
        sidebarOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(prev => !prev)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        location={location}
        locationQuery={locationQuery}
        setLocationQuery={setLocationQuery}
        handleSearchLocation={handleSearchLocation}
        range={range}
        setRange={setRange}
        handleSearch={handleSearch}
        stores={stores}
      />

      <MapSection
        mapCenter={mapCenter}
        location={location}
        setLocation={setLocation}
        sidebarOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(prev => !prev)}
        zoom={zoom}
      />
    </div>
  );
};

export default SearchMain;
