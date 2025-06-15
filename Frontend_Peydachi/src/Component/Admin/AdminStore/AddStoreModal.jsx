import React, { useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';


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
  const [contactProperties, setContactProperties] = useState([{ key: '', value: '' }]);

  /* ------------------------- contact helpers ------------------------- */
  const handleAddContactProperty = () => {
    setContactProperties([...contactProperties, { key: '', value: '' }]);
  };

  const handleRemoveContactProperty = (index) => {
    const updated = [...contactProperties];
    updated.splice(index, 1);
    setContactProperties(updated);
  };

  const handleContactPropertyChange = (index, field, value) => {
    setContactProperties((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  /* ------------------------- submit handler -------------------------- */
  const handleSubmit = () => {
    const contact_info = {};
    contactProperties.forEach((p) => {
      if (p.key.trim() !== '') contact_info[p.key] = p.value;
    });

    onAddStore({ ...newStore, contact_info });
    // reset form
    setNewStore(initialStore);
    setContactProperties([{ key: '', value: '' }]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bg-black/40 backdrop-blur-sm inset-0 flex items-center justify-center overflow-y-auto z-50">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0  opacity-75" />
      </div>

      <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
        {/* Body */}
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Add New Store</h3>

          {/* ---- form ---- */}
          <div className="space-y-4">
            {/* name */}
            <div>
              <label htmlFor="store-name" className="block text-sm font-medium text-gray-700">نام فروشگاه</label>
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
              <label htmlFor="owner-id" className="block text-sm font-medium text-gray-700">فروشنده</label>
              <select
                id="owner-id"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={newStore.owner_id}
                onChange={(e) => setNewStore({ ...newStore, owner_id: Number(e.target.value) })}
              >
                <option value={0}>Select an owner</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
            </div>

            {/* description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">توضیحات</label>
              <textarea
                id="description"
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={newStore.description}
                onChange={(e) => setNewStore({ ...newStore, description: e.target.value })}
              />
            </div>

            {/* lat / long */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">Longitude</label>
                <input
                  id="longitude"
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={newStore.location_longitude}
                  onChange={(e) => setNewStore({ ...newStore, location_longitude: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">Latitude</label>
                <input
                  id="latitude"
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={newStore.location_latitude}
                  onChange={(e) => setNewStore({ ...newStore, location_latitude: e.target.value })}
                />
              </div>
            </div>

            {/* city */}
            <div>
              <label htmlFor="city-id" className="block text-sm font-medium text-gray-700">City</label>
              <select
                id="city-id"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={newStore.city_id}
                onChange={(e) => setNewStore({ ...newStore, city_id: Number(e.target.value) })}
              >
                <option value={0}>Select a city</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>{city.name}</option>
                ))}
              </select>
            </div>

            {/* contact */}
            <div>
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">Contact Information</label>
                <button
                  type="button"
                  className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                  onClick={handleAddContactProperty}
                >
                  <FaPlus className="text-xs" />
                </button>
              </div>

              <div className="mt-2 space-y-3">
                {contactProperties.map((prop, idx) => (
                  <div key={idx} className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Property Name"
                      className="flex-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={prop.key}
                      onChange={(e) => handleContactPropertyChange(idx, 'key', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Value"
                      className="flex-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={prop.value}
                      onChange={(e) => handleContactPropertyChange(idx, 'value', e.target.value)}
                    />
                    {contactProperties.length > 1 && (
                      <button
                        type="button"
                        className="inline-flex items-center p-2 border border-transparent rounded-md text-red-600 hover:text-red-900 focus:outline-none cursor-pointer"
                        onClick={() => handleRemoveContactProperty(idx)}
                      >
                        <FaTimes />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-button border border-transparent shadow-sm px-4 py-2 bg-blue-900 text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm whitespace-nowrap cursor-pointer"
            onClick={handleSubmit}
          >
            Add Store
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-button border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm whitespace-nowrap cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStoreModal;
