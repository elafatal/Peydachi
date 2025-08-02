import React, { useState,useEffect,useRef  } from 'react';
import showErrorToast from '../../utils/showErrorToast';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import FlyToLocation from './FlyToLocation';
import axiosInstance from '../../axiosInstance';
import L from 'leaflet';
import { FaUserShield, FaUserCircle , FaUserTie } from 'react-icons/fa';
import { FaClipboardUser } from "react-icons/fa6";
import { useCityContext } from '../../Context/CityContext';

import { AnimatePresence, motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
const AddStoreModal = ({ isOpen, onClose, onAddStore, users = [] }) => {
  const initialStore = {
    name: '',
    owner_id: 0,
    description: '',
    location_longitude: '',
    location_latitude: '',
    city_id: 0,
  };
  const { cities} = useCityContext();

  const mapRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);
  const [pendingCoords, setPendingCoords] = useState(null);
  const cityRef = useRef(null);
  const [cityInput, setCityInput] = useState('');
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [filteredCities, setFilteredCities] = useState(cities);
  const [cityIndex, setCityIndex] = useState(-1);
  const handleCityInput = (e) => {
    const value = e.target.value;
    setCityInput(value);
    const filtered = cities.filter((city) =>
      city.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCities(filtered);
    setShowCityDropdown(true);
    setCityIndex(-1);
  };
  const geocodeCity = async (cityName) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}`
    );
    const data = await response.json();
    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      return [parseFloat(lat), parseFloat(lon)];
    }
    return null;
  };
  
  const handleCitySelect = async (city) => {
    setCityInput(city.name);
    setNewStore((prev) => ({ ...prev, city_id: city.id }));
    setShowCityDropdown(false);
  
    const coords = await geocodeCity(city.name);
    console.log('Coords for city:', city.name, coords);
  
    if (coords) {
      setMapCenter(coords); 
    }
  };
  
  useEffect(() => {
    if (mapReady && pendingCoords && mapRef.current) {
      console.log('Fly to pendingCoords:', pendingCoords);
      mapRef.current.flyTo(pendingCoords, 13);
      setPendingCoords(null);
    }
  }, [mapReady, pendingCoords]);
  
  
  const handleCityKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setCityIndex((prev) => (prev < filteredCities.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      setCityIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter' && filteredCities[cityIndex]) {
      handleCitySelect(filteredCities[cityIndex]);
    }
  };
  
  const handleCityFocus = () => {
    setFilteredCities(cities);
    setShowCityDropdown(true);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cityRef.current && !cityRef.current.contains(event.target)) {
        setShowCityDropdown(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const [newStore, setNewStore] = useState(initialStore);
  const [contactProperties, setContactProperties] = useState([
    { id: uuidv4(), key: '', value: '' }
  ]);
   /*------------------------owner--------------------------*/
   const [userQuery, setUserQuery] = useState('');
   const [selectedUserId, setSelectedUserId] = useState(0)
   const [searchResult,setSearchResult]=useState([])
   
  useEffect(() => {
    const searchUsers = async()=>{
        if (userQuery != '') {
          try {
            const response = await axiosInstance.post('/admin/user/search_users', {
              username: userQuery
            });
            console.log(response.data);
            setSearchResult(response.data)
          } catch (error) {
            showErrorToast(error);
          }
        }
     }
      searchUsers();
   }, [userQuery]);

   useEffect(() => {
console.log(newStore);

   }, [selectedUserId]);


  /* ------------------------- map ------------------------- */
  const [mapCenter, setMapCenter] = useState([35.6892, 51.3890]); 
  const [markerPos, setMarkerPos]   = useState(null);
  const LocationSelector = ({ onSelect }) => {
    useMapEvents({
      click(e) {
        onSelect(e.latlng);
      },
    });
    return null;
  };
  const handleMapClick = (latlng) => {
    const { lat, lng } = latlng;
    setMarkerPos([lat, lng]);
    setNewStore((prev) => ({
      ...prev,
      location_latitude:  lat.toFixed(6),
      location_longitude: lng.toFixed(6),
    }));
  };

  /* ------------------------- contact helpers ------------------------- */
  // افزودن
  const handleAddContactProperty = () => {
    setContactProperties([...contactProperties, { id: uuidv4(), key: '', value: '' }]);
  };
  
  // حذف
  const handleRemoveContactProperty = (id) => {
    const updated = contactProperties.filter(p => p.id !== id);
    setContactProperties(updated);
  };
  const handleContactPropertyChange = (id, field, value) => {
    setContactProperties((prev) =>
      prev.map((prop) =>
        prop.id === id ? { ...prop, [field]: value } : prop
      )
    );
  };
  /* ------------------------- submit handler -------------------------- */
  const handleSubmit = () => {
    const contact_info = {};
    contactProperties.forEach((p) => {
      if (p.key.trim() !== '') contact_info[p.key] = p.value;
    });

    onAddStore({ ...newStore, contact_info });
    // reset form
    setMarkerPos(null);
    setMapCenter([35.6892, 51.3890]);
    setNewStore(initialStore);
    setContactProperties([{ id: uuidv4(), key: '', value: '' }]);
    onClose();
  };


  return (
    <div className={`${isOpen ? '' : 'hidden'}`}>
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0  opacity-75" />
          </div>

      <div className="relative w-full max-w-3xl max-h-screen overflow-y-auto rounded-lg shadow-xl  bg-white">
      {/* Body */}
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4" dir='rtl'>
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">افزودن فروشگاه</h3>

          {/* ---- form ---- */}
          <div className="flex flex-col md:flex-row gap-6" >
            <div className="flex-1 space-y-4" >
                    {/* name */}
                    <div dir='rtl'>
                    <label htmlFor="store-name" className="text-start block text-sm font-medium text-gray-700">نام فروشگاه</label>
                    <input 
                        id="store-name"
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={newStore.name}
                        onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
                    />
                    </div>

                    {/* owner */}
                    <div>
                    <label htmlFor="owner-id" className="text-start block text-sm font-medium text-gray-700">فروشنده</label>
                    <input  
                        onChange={(e) => setUserQuery(e.target.value)}
                        className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'></input>
                      {searchResult.length !=0 ?
                        <div  className="mt-1 max-h-52 overflow-scroll z-50 block w-full  border border-gray-300 rounded-md shadow-sm py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                            {searchResult.map(user => (
                                        <span 
                                            onClick={() => setSelectedUserId(user.id)} 
                                            className={`cursor-pointer block p-2 hover:bg-blue-100 transition-all duration-300 ${selectedUserId === user.id ? 'bg-blue-200 border-l-4 border-blue-500' : ''}`} 
                                            key={user.id}
                                          >                 {user.username} {user.is_super_admin ? <FaUserTie title='سوپر ادمین' className='text-indigo-800 inline' /> 
                                          : user.is_admin ? <FaUserShield title='ادمین' className='inline text-indigo-700'/> 
                                          : user.is_seller ? <FaClipboardUser title='فروشنده' className='inline text-indigo-400' />
                                          :  <FaUserCircle title='کاربر' className='inline text-indigo-300' />}
                                      </span>
                              ))}
                                       
                      </div> : null}
                    </div>

                    {/* description */}
                    <div>
                    <label htmlFor="description" className="text-start block text-sm font-medium text-gray-700">توضیحات</label>
                    <textarea
                        id="description"
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={newStore.description}
                        onChange={(e) => setNewStore({ ...newStore, description: e.target.value })}
                    />
                    </div>
                    {/* city */}
                    <div className="relative" ref={cityRef}>
                      <label htmlFor="city-id" className="text-start block text-sm font-medium text-gray-700">شهر</label>
                      <input
                        dir="rtl"
                        className="w-full bg-white px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="نام شهر را وارد کنید"
                        value={cityInput}
                        onClick={(e) => {
                          e.stopPropagation(); 
                          setShowCityDropdown((prev) => !prev);
                        }}
                        onChange={handleCityInput}
                        onFocus={handleCityFocus}
                        onKeyDown={handleCityKeyDown}
                      />
                      <AnimatePresence>
                        {showCityDropdown && filteredCities.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute z-10 w-full bg-white rounded-md shadow-md mt-1 max-h-30 overflow-y-auto border border-gray-200"
                          >
                            {filteredCities.map((city, idx) => (
                              <div
                                key={city.id}
                                className={`px-4 py-2 cursor-pointer text-start ${
                                  idx === cityIndex ? 'bg-blue-100' : 'hover:bg-gray-100'
                                }`}
                                onClick={() => handleCitySelect(city)}
                              >
                                {city.name}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>



                    {/* contact */}
                    <div>
                    <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium text-gray-700">اطلاعات تماس</label>
                        <button
                        type="button"
                        className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                        onClick={handleAddContactProperty}
                        >
                        <FaPlus className="text-xs" />
                        </button>
                    </div>

                    <div className="mt-2 space-y-3">
                    {contactProperties.map((prop) => (
                        <div key={prop.id} className="flex space-x-2">
                            <input
                            type="text"
                            className="flex-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="عنوان فیلد"
                            value={prop.key}
                            onChange={(e) => handleContactPropertyChange(prop.id, 'key', e.target.value)}
                            />
                            <input
                            type="text"
                            className="flex-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="مقدار"
                            value={prop.value}
                            onChange={(e) => handleContactPropertyChange(prop.id, 'value', e.target.value)}
                            />
                            {contactProperties.length > 1 && (
                            <button
                            className="inline-flex items-center p-2 border border-transparent rounded-md text-red-600 hover:text-red-900 focus:outline-none cursor-pointer"
                            onClick={() => handleRemoveContactProperty(prop.id)}>
                                <FaTimes />
                            </button>
                            )}
                        </div>
                        ))}
                    </div>
                    </div>
                </div>
                <div className="md:w-1/2 w-full">
                            {/* lat / long */}
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        انتخاب موقعیت روی نقشه
                    </label>

                    <div className="w-full h-64 rounded-md overflow-hidden border border-gray-300">
                    <MapContainer
                        center={mapCenter}
                        zoom={15}
                        style={{ height: '100%', width: '100%' }}
                        whenCreated={(mapInstance) => {
                          mapRef.current = mapInstance;
                          setMapReady(true);
                        }}
                        scrollWheelZoom={true}
                      >
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution="&copy; OpenStreetMap contributors"
                        />

                        <LocationSelector onSelect={handleMapClick} />

                        <FlyToLocation center={mapCenter} />

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

                    <p className="text-xs text-gray-500 mt-1">
                        روی نقشه بزن تا مختصات در فیلدها پر شود.
                    </p>
                    </div>
                </div>
            

    


  
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-900 text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm whitespace-nowrap cursor-pointer"
            onClick={handleSubmit}
          >
            اضافه کردن
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm whitespace-nowrap cursor-pointer"
            onClick={onClose}
          >
            لغو
          </button>
        </div>
      </div>
    </div>
</div>

    
  );
};

export default AddStoreModal;
