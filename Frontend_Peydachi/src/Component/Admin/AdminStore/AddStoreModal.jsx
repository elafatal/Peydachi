import React, { useState,useEffect } from 'react';
import Swal from "sweetalert2";  
import { FaPlus, FaTimes } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import axiosInstance from '../../axiosInstance';
import L from 'leaflet';
import { v4 as uuidv4 } from 'uuid';
const AddStoreModal = ({ isOpen, onClose, onAddStore, users = [], cities = [] }) => {
  const initialStore = {
    name: '',
    owner_id: 0,
    description: '',
    location_longitude: '',
    location_latitude: '',
    city_id: 0,
  };
 
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
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: error.response?.data?.message || error.response?.data?.detail || "خطای ناشناخته‌ای رخ داده است",
              showConfirmButton: false,
              timer: 2000,
              toast: true,
              customClass: {
                popup: 'w-60 h-18 text-sm flex items-center justify-center',
                title: 'text-xs',
                content: 'text-xs',
                icon: 'text-xs mb-2',
              },
            });
          }
        }
     }
      searchUsers();
   }, [userQuery]);

   useEffect(() => {
console.log(newStore);

   }, [selectedUserId]);

  const selectedOwner=(ownerId)=>{
    setSelectedUserId(ownerId)
    setNewStore((prev) => ({
      ...prev,
    owner_id : Number(ownerId)
    }));
    
  }
  /* ------------------------- map ------------------------- */
  const [mapCenter, setMapCenter] = useState([35.6892, 51.3890]); // پیش‌فرض: تهران
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

  if (!isOpen) return null;

  return (
    <div className="fixed bg-black/40 backdrop-blur-sm inset-0 flex items-center justify-center overflow-y-auto z-50 ">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0  opacity-75" />
      </div>

      <div className="relative inline-block align-bottom m-5 bg-white rounded-lg text-left overflow-scroll shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl w-full">
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
                        <div  className="mt-1 max-h-52 overflow-scroll z-50 block w-4/5  border border-gray-300 rounded-md shadow-sm py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                          {searchResult.map(user => (
                          <span onClick={()=>selectedOwner(user.id)} className='block p-2 hover:bg-blue-100 transition-all duration-300' key={user.id} > {user.username}
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
                    <div>
                    <label htmlFor="city-id" className="text-start block text-sm font-medium text-gray-700">شهر</label>
                    <select
                        id="city-id"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={newStore.city_id}
                        onChange={(e) => setNewStore({ ...newStore, city_id: Number(e.target.value) })}
                    >
                        <option value={0}>شهر را انتخاب کنید</option>
                        {cities.map((city) => (
                        <option key={city.id} value={city.id}>{city.name}</option>
                        ))}
                    </select>
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
                        zoom={12}
                        style={{ height: '100%', width: '100%' }}
                        whenCreated={(map) => setMapCenter(map.getCenter())}
                        scrollWheelZoom={true}
                        >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; OpenStreetMap contributors"
                        />

                        <LocationSelector onSelect={handleMapClick} />

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
  );
};

export default AddStoreModal;
