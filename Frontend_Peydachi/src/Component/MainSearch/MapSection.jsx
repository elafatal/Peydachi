import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { FaChevronRight } from 'react-icons/fa';
import L from 'leaflet';
import FlyToLocation from './FlyToLocation';
import LocationSelector from './LocationSelector';

const MapSection = ({ mapCenter, location, setLocation, sidebarOpen, toggleSidebar, zoom }) => {
  if (!mapCenter) return null;

  return (
    <div className={`relative ${sidebarOpen ? 'hidden md:block md:w-2/3' : 'w-full'}`}>
      {!sidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="absolute top-4 left-4 z-10 bg-white p-2 rounded-full shadow-md text-gray-700 hover:text-blue-500"
        >
          <FaChevronRight />
        </button>
      )}

      <MapContainer center={mapCenter} zoom={zoom} scrollWheelZoom style={{ height: 'calc(100vh - 64px)', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <FlyToLocation center={mapCenter} />
        <LocationSelector onSelect={(latlng) => {
          const { lat, lng } = latlng;
          setLocation(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
        }} />
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
    </div>
  );
};

export default MapSection;
