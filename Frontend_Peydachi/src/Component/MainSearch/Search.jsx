/* 
  The exported code uses Tailwind CSS and react-icons. 
  Make sure you have both libraries installed in your project:
    npm install -D tailwindcss
    npm install react-icons
  Then follow Tailwind’s setup guide to include its styles.
*/

import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useSearchParams } from 'react-router-dom';
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaSearch,
  FaMapMarkerAlt,
  FaCrosshairs,
  FaChevronLeft,
  FaChevronRight,
  FaMap,
  FaCheckCircle,
  FaList,
  FaMapMarkedAlt,
} from 'react-icons/fa';
import { Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import FlyToLocation from './FlyToLocation';

const MainSearch = () => {
  const [searchParams] = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('60.1596, 24.9385');
  const [mapCenter, setMapCenter] = useState(null); // تهران
  const [locationQuery, setLocationQuery] = useState('');
  const [zoom, setZoom] = useState(13); // مقدار پیش‌فرض

  const [range, setRange] = useState(5);
  const [stores] = useState([]);
  const Query = searchParams.get('Query')
  const cityId = searchParams.get('city_id');
  const cityName = searchParams.get('city_name');
    /* -------------------------------------------------------------------
   * search location in map
   * ----------------------------------------------------------------- */
    const geocodeLocation = async (query, city = '') => {
      const fullQuery = city ? `${query}, ${city}` : query;
    
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullQuery)}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        return { lat: parseFloat(lat), lng: parseFloat(lon) };
      } else {
        return null;
      }
    };
    useEffect(() => {
      const setCityLocationFromQuery =  () => {
        if (Query) {
         setSearchTerm(Query)
        }
      };
      setCityLocationFromQuery();
    }, [Query]);

  useEffect(() => {
    const setCityLocationFromQuery = async () => {
      if (cityName) {
        const coords = await geocodeLocation(cityName); 
        if (coords) {
          setMapCenter([coords.lat, coords.lng]);
          setLocation(`${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`);
        }
      }
    };
  
    setCityLocationFromQuery();
  }, [cityName]);
  
  /* -------------------------------------------------------------------
   * Event handlers
   * ----------------------------------------------------------------- */
  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
    console.log('Location:', location);
    console.log('Range:', range, 'km');
  };

  const handleSearchLocation = async () => {
    console.log('🔍 Searching for:', locationQuery);
  
    const coords = await geocodeLocation(locationQuery, cityName);
  
    if (coords) {
      const newLoc = `${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`;
      console.log('🧪 newLoc:', newLoc);
      setMapCenter([coords.lat, coords.lng]);
      setLocation(newLoc);
    } else {
      alert('مکان مورد نظر پیدا نشد.');
    }
  };
  
  
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  useEffect(() => {
    console.log('📍 Location updated:', location);
  }, [location]);
  
  /* -------------------------------------------------------------------
   * Helpers
   * ----------------------------------------------------------------- */
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const elements = [];
    
    
    for (let i = 0; i < fullStars; i++) {
      elements.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }
    if (halfStar) {
      elements.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      elements.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
    }
    return elements;
  };
  const LocationSelector = ({ onSelect }) => {
    useMapEvents({
      click(e) {
        onSelect(e.latlng); // latlng = { lat: ..., lng: ... }
      }
    });
    return null;
  };
  /* -------------------------------------------------------------------
   * JSX
   * ----------------------------------------------------------------- */
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 font-sans" dir='ltr' >
      {/* ----------------------------------------------------------------
       * Sidebar
       * -------------------------------------------------------------- */}
      <div
        className={`bg-white shadow-lg transition-all duration-300 flex flex-col ${
          sidebarOpen ? 'w-full md:w-1/3' : 'w-0 overflow-hidden'
        }`}
      >
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
              Find Products Nearby
            </h1>

            {/* Desktop – collapse */}
            <button
              onClick={toggleSidebar}
              className="hidden md:block text-gray-500 hover:text-gray-700"
            >
              <FaChevronLeft />
            </button>

            {/* Mobile – map icon */}
            <button
              onClick={toggleSidebar}
              className="md:hidden block text-gray-500 hover:text-gray-700"
            >
              <FaMap />
            </button>
          </div>

          {/* Search + filters */}
          <div className="space-y-4">
            {/* Product name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400 text-sm" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Search products"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Location
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <FaMapMarkerAlt className="text-gray-400 text-sm" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Enter coordinates"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaCrosshairs onClick={handleSearchLocation} />
                  </button>
                </div>
              </div>
            </div>

            {/* Range slider */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Search Range: {range} km
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">1 km</span>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={range}
                  onChange={(e) => setRange(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <span className="text-xs text-gray-500">20 km</span>
              </div>
            </div>

            {/* Search button */}
            <button
              onClick={handleSearch}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm transition duration-150 ease-in-out flex items-center justify-center space-x-2 !rounded-button whitespace-nowrap"
            >
              <FaSearch />
              <span>Search Nearby Stores</span>
            </button>
          </div>
        </div>

        {/* ----------------------------------------------------------------
         * Store list
         * -------------------------------------------------------------- */}
        <div className="flex-1 overflow-auto p-4">
          <div className="mb-4">
            <h2 className="text-lg font-medium text-gray-800">
              Found {stores.length} stores nearby
            </h2>
          </div>

          <div className="space-y-4">
            {stores.map((item, i) => (
              <div
                key={item.store.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="p-4">
                  <div className="flex items-start">
                    {/* Thumbnail */}
                    <div className="h-16 w-16 rounded-lg overflow-hidden bg-blue-100 flex-shrink-0 mr-4">
                      <img
                        src={`https://readdy.ai/api/search-image?query=Fresh%20organic%20grocery%20store%20with%20apples%20and%20fruits%2C%20clean%20modern%20interior%2C%20bright%20lighting%2C%20professional%20product%20display%2C%20minimalist%20design%2C%20high%20quality%20commercial%20photography&width=100&height=100&seq=${
                          i + 1
                        }&orientation=squarish`}
                        alt={item.store.name}
                        className="h-full w-full object-cover object-top"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-medium text-gray-800">
                          {item.store.name}
                        </h3>
                        <span className="text-sm font-medium text-blue-600">
                          {item.distance} km
                        </span>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center mt-1">
                        <div className="flex mr-1">{renderStars(item.store.average_rating)}</div>
                        <span className="text-sm text-gray-500">
                          ({item.store.average_rating.toFixed(1)})
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-600 mt-1">
                        {item.product.description}
                      </p>

                      {/* Stock badge */}
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <FaCheckCircle className="mr-1" />
                          In Stock: {item.product.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
        {/* ////map */}
        <div className={`relative ${sidebarOpen ? 'hidden md:block md:w-2/3' : 'w-full'}`}>
          {!sidebarOpen && (
            <button
              onClick={toggleSidebar}
              className="absolute top-4 left-4 z-10 bg-white p-2 rounded-full shadow-md text-gray-700 hover:text-blue-500"
            >
              <FaChevronRight />
            </button>
          )}
{mapCenter && (<MapContainer
        center={mapCenter}
          zoom={15}
          scrollWheelZoom={true}
          style={{ height: 'calc(100vh - 64px)', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <FlyToLocation center={mapCenter} />
          <LocationSelector
            onSelect={(latlng) => {
              const { lat, lng } = latlng;
              setLocation(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
            }}
          />

          {location && (
            <Marker
              position={location.split(',').map(parseFloat)}
              icon={L.icon({
                iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
                iconSize: [30, 30],
                iconAnchor: [15, 30],
              })}
            />
          )}
        </MapContainer>
 )}
        
        </div>


      {/* ----------------------------------------------------------------
       * Mobile bottom navigation
       * -------------------------------------------------------------- */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-10">
        <div className="flex justify-around items-center h-16">
          {/* List tab */}
          <button
            onClick={() => setSidebarOpen(true)}
            className={`flex flex-col items-center justify-center w-1/2 h-full ${
              sidebarOpen ? 'text-blue-500' : 'text-gray-500'
            }`}
          >
            <FaList className="text-lg" />
            <span className="text-xs mt-1">List</span>
          </button>

          {/* Map tab */}
          <button
            onClick={() => setSidebarOpen(false)}
            className={`flex flex-col items-center justify-center w-1/2 h-full ${
              !sidebarOpen ? 'text-blue-500' : 'text-gray-500'
            }`}
          >
            <FaMapMarkedAlt className="text-lg" />
            <span className="text-xs mt-1">Map</span>
          </button>
        </div>
      </div>
    
    </div>
    
  );
};

export default MainSearch;
