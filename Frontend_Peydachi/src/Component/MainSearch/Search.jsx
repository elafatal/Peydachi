import React, { useEffect, useState, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useSearchParams } from 'react-router-dom';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import {
  FaChevronLeft,
  FaChevronRight,
  FaMap,
  FaList,
  FaMapMarkedAlt,
} from 'react-icons/fa';
import { Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import FlyToLocation from './FlyToLocation';
import ProductList from './ProductList';
import SearchControls from './SearchControls';
import RoutePath from './RoutePath';

import useMainSearchLogic from './useMainSearchLogic';
import MapProvider from './MapProvider';
const MainSearch = () => {
  const [mapInstance, setMapInstance] = useState(null);

  const {
    searchTerm, setSearchTerm,
    location, setLocation,
    mapCenter, setMapCenter,
    locationQuery, setLocationQuery,
    handleSearchLocation,
    handleSearch,
    range, setRange,
    sidebarOpen, setSidebarOpen,
    stores,
    cityName, setCityName,
    handleSearchLocation2,
    selectedStoreLocation, setSelectedStoreLocation
  } = useMainSearchLogic();
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const LocationSelector = ({ onSelect }) => {
    useMapEvents({
      click(e) {
        onSelect(e.latlng);
      },
    });
    return null;
  };
  useEffect(() => {
    return () => {
      sessionStorage.removeItem('mainSearchState');
    };
  }, []);
  
  /* -------------------------------------------------------------------
   * JSX
   * ----------------------------------------------------------------- */
  return (
    <div className="flex flex-col md:flex-row max-h-screen bg-gray-50 " dir='ltr' >
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
          {/* Search + filters */}
          <SearchControls  searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          location={location}
          locationQuery={locationQuery}
          setLocationQuery={setLocationQuery}
          handleSearchLocation={handleSearchLocation}
          range={range}
          setRange={setRange}
          handleSearch={handleSearch}
          cityName={cityName}
          setCityName={setCityName}
          handleSearchLocation2={handleSearchLocation2} />
        </div>

        {/* ----------------------------------------------------------------
         * Store list
         * -------------------------------------------------------------- */}
<ProductList
  stores={stores}
  onStoreClick={(store) => {
    console.log('📍 Store clicked:', store);
    setSelectedStoreLocation(store); 
  }}
/>

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
            <MapProvider setMap={setMapInstance}/>

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
            
        <RoutePath
          map={mapInstance}
          from={location ? location.split(',').map(parseFloat) : null}
          to={
            selectedStoreLocation
              ? [
                  parseFloat(selectedStoreLocation.location_latitude),
                  parseFloat(selectedStoreLocation.location_longitude),
                ]
              : null
          }
        />
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
            <span className="text-xs mt-1">لیست</span>
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
