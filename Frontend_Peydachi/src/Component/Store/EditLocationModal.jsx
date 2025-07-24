// components/EditLocationModal.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { FaTimes } from 'react-icons/fa';

const EditLocationModal = ({ isOpen, onClose, currentLocation, onSave }) => {
    const [markerPos, setMarkerPos] = useState(
        currentLocation && currentLocation.lat && currentLocation.lng
          ? [currentLocation.lat, currentLocation.lng]
          : [35.6892, 51.3890]
      );
      
  useEffect(() => {
    if (isOpen && currentLocation) {
      setMarkerPos([currentLocation.lat, currentLocation.lng]);
    }
  }, [isOpen, currentLocation]);

  const LocationSelector = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMarkerPos([lat, lng]);
      }
    });
    return null;
  };

  const handleSave = () => {
    if (markerPos) {
      onSave({
        location_latitude: markerPos[0].toFixed(6),
        location_longitude: markerPos[1].toFixed(6),
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white/10 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
          <FaTimes />
        </button>

        <h3 className="text-lg font-semibold text-gray-800 my-4">انتخاب موقعیت جدید</h3>

        <div className="w-full h-64 rounded-md overflow-hidden border border-gray-300 mb-4">
          <MapContainer
            center={markerPos || [35.6892, 51.3890]}
            zoom={12}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <LocationSelector />
            {markerPos && (
              <Marker
                position={markerPos}
                icon={L.icon({
                  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
                  iconSize: [30, 30],
                  iconAnchor: [15, 30],
                })}
              />
            )}
          </MapContainer>
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
            لغو
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            ذخیره موقعیت
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditLocationModal;
