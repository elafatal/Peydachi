/* 
  The exported code uses Tailwind CSS and react-icons. 
  Make sure you have both libraries installed in your project:
    npm install -D tailwindcss
    npm install react-icons
  Then follow Tailwind’s setup guide to include its styles.
*/

import React, { useEffect, useState, useRef } from 'react';
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
import ProductList from './ProductList';
import SearchControls from './SearchControls';

import useMainSearchLogic from './useMainSearchLogic';
const MainSearch = () => {
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
          setCityName={setCityName} />
        </div>

        {/* ----------------------------------------------------------------
         * Store list
         * -------------------------------------------------------------- */}
        <ProductList stores={stores}/>
      </div>
        {/* ////map */}
        {/* <MapSection  mapCenter={mapCenter}
                location={location}
                setLocation={setLocation}
                sidebarOpen={sidebarOpen}
                toggleSidebar={() => setSidebarOpen(prev => !prev)}
                zoom={zoom} /> */}

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
