// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect } from 'react';
import {FaTrash, FaShieldAlt,FaBan ,FaUserPlus,FaStar,FaPlus,FaSearch ,FaTimes } from 'react-icons/fa';
const Test= () => {
  // States for the application
  const [stores, setStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddOwnerModal, setShowAddOwnerModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  
  // New store form state
  const [newStore, setNewStore] = useState({
    name: '',
    owner_id: 0,
    contact_info: {},
    description: '',
    location_longitude: '',
    location_latitude: '',
    city_id: 0
  });
  
  // Contact info properties state
  const [contactProperties, setContactProperties] = useState([
    { key: '', value: '' }
  ]);
  
  // Add owner form state
  const [newOwner, setNewOwner] = useState({
    store_id: 0,
    user_id: 0
  });

  // Mock data for demonstration
  useEffect(() => {
    // Simulating API fetch
    const mockStores = [
      { id: 1, name: "Grocery Store", owner_id: 101, city_id: 1, average_rating: 4.5, average_product_rating: 4.2, is_banned: false, description: "Local grocery store with fresh produce", location_longitude: "34.0522", location_latitude: "118.2437", contact_info: { phone: "123-456-7890", email: "grocery@example.com" } },
      { id: 2, name: "Fashion Boutique", owner_id: 102, city_id: 2, average_rating: 4.8, average_product_rating: 4.7, is_banned: false, description: "Trendy fashion boutique", location_longitude: "40.7128", location_latitude: "74.0060", contact_info: { phone: "987-654-3210", website: "www.fashionboutique.com" } },
      { id: 3, name: "Electronics Shop", owner_id: 103, city_id: 1, average_rating: 3.9, average_product_rating: 4.0, is_banned: true, description: "Electronics and gadgets store", location_longitude: "51.5074", location_latitude: "0.1278", contact_info: { phone: "555-123-4567", email: "tech@example.com" } },
      { id: 4, name: "Bookstore", owner_id: 104, city_id: 3, average_rating: 4.2, average_product_rating: 4.3, is_banned: false, description: "Books and stationery", location_longitude: "48.8566", location_latitude: "2.3522", contact_info: { phone: "222-333-4444", email: "books@example.com" } },
      { id: 5, name: "Coffee Shop", owner_id: 105, city_id: 2, average_rating: 4.6, average_product_rating: 4.5, is_banned: false, description: "Cozy coffee shop with pastries", location_longitude: "35.6762", location_latitude: "139.6503", contact_info: { phone: "111-222-3333", website: "www.coffeeshop.com" } },
    ];
    
    setStores(mockStores);
  }, []);

  // Mock city data
  const cities = [
    { id: 1, name: "Los Angeles" },
    { id: 2, name: "New York" },
    { id: 3, name: "Paris" },
    { id: 4, name: "Tokyo" },
    { id: 5, name: "London" }
  ];

  // Mock users data
  const users = [
    { id: 101, name: "John Doe" },
    { id: 102, name: "Jane Smith" },
    { id: 103, name: "Robert Johnson" },
    { id: 104, name: "Emily Davis" },
    { id: 105, name: "Michael Brown" },
    { id: 106, name: "Sarah Wilson" },
  ];

  // Filter stores based on search term and filters
  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          store.id.toString().includes(searchTerm);
    
    const matchesCity = filterCity ? store.city_id.toString() === filterCity : true;
    
    const matchesStatus = filterStatus === 'banned' ? store.is_banned : 
                          filterStatus === 'active' ? !store.is_banned : 
                          true;
    
    return matchesSearch && matchesCity && matchesStatus;
  });

  // Handler for adding a new store
  const handleAddStore = () => {
    // Convert contact properties to contact_info object
    const contactInfo = {};
    contactProperties.forEach(prop => {
      if (prop.key.trim() !== '') {
        contactInfo[prop.key] = prop.value;
      }
    });

    const storeData = {
      ...newStore,
      contact_info: contactInfo
    };

    // In a real app, this would be an API call
    console.log("Creating store with data:", storeData);
    
    // Mock response
    const newStoreWithId = {
      ...storeData,
      id: stores.length + 1,
      average_rating: 0,
      average_product_rating: 0,
      is_banned: false
    };
    
    setStores([...stores, newStoreWithId]);
    setShowAddModal(false);
    resetNewStoreForm();
  };

  // Handler for adding an owner to a store
  const handleAddOwner = () => {
    // In a real app, this would be an API call
    console.log("Adding owner with data:", newOwner);
    
    // Update the store with the new owner
    const updatedStores = stores.map(store => 
      store.id === newOwner.store_id ? { ...store, owner_id: newOwner.user_id } : store
    );
    
    setStores(updatedStores);
    setShowAddOwnerModal(false);
    setNewOwner({ store_id: 0, user_id: 0 });
  };

  // Handler for deleting a store
  const handleDeleteStore = (storeId) => {
    if (window.confirm("Are you sure you want to delete this store?")) {
      // In a real app, this would be an API call
      console.log("Deleting store with ID:", storeId);
      
      // Remove the store from the list
      const updatedStores = stores.filter(store => store.id !== storeId);
      setStores(updatedStores);
    }
  };

  // Handler for banning/unbanning a store
  const handleToggleBan = (store) => {
    // In a real app, this would be an API call
    console.log(`${store.is_banned ? "Unbanning" : "Banning"} store with ID:`, store.id);
    
    // Update the store's ban status
    const updatedStores = stores.map(s => 
      s.id === store.id ? { ...s, is_banned: !s.is_banned } : s
    );
    
    setStores(updatedStores);
  };

  // Handler for adding a new contact property field
  const handleAddContactProperty = () => {
    setContactProperties([...contactProperties, { key: '', value: '' }]);
  };

  // Handler for removing a contact property field
  const handleRemoveContactProperty = (index) => {
    const updatedProperties = [...contactProperties];
    updatedProperties.splice(index, 1);
    setContactProperties(updatedProperties);
  };

  // Handler for updating a contact property
  const handleContactPropertyChange = (index, field, value) => {
    const updatedProperties = [...contactProperties];
    updatedProperties[index][field] = value;
    setContactProperties(updatedProperties);
  };

  // Reset the new store form
  const resetNewStoreForm = () => {
    setNewStore({
      name: '',
      owner_id: 0,
      contact_info: {},
      description: '',
      location_longitude: '',
      location_latitude: '',
      city_id: 0
    });
    setContactProperties([{ key: '', value: '' }]);
  };

  // Get city name by ID
  const getCityName = (cityId) => {
    const city = cities.find(c => c.id === cityId);
    return city ? city.name : 'Unknown';
  };

  // Get owner name by ID
  const getOwnerName = (ownerId) => {
    const user = users.find(u => u.id === ownerId);
    return user ? user.name : 'Unknown';
  };

  return (
    <div className="min-h-screen bg-gray-50" dir='ltr'>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 sm:text-sm"
                  placeholder="Search stores by name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <select
                className="block w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 sm:text-sm"
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
              >
                <option value="">All Cities</option>
                {cities.map(city => (
                  <option key={city.id} value={city.id.toString()}>{city.name}</option>
                ))}
              </select>
              
              <select
                className="block w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 sm:text-sm"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="banned">Banned</option>
              </select>
              
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-button shadow-sm text-white bg-indigo-900 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-900 whitespace-nowrap cursor-pointer"
                onClick={() => setShowAddModal(true)}
              >
                <FaPlus className="mr-2" />
                Add Store
              </button>
            </div>
          </div>
        </div>

        {/* Stores Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">شماره</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">نام فروشگاه</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">فروشنده</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">شهر</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">امتیاز</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">وضعیت</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">فعالیت‌ها</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStores.length > 0 ? (
                  filteredStores.map(store => (
                    <tr key={store.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{store.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{store.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getOwnerName(store.owner_id)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getCityName(store.city_id)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <span className="text-yellow-500 mr-1"><FaStar /></span>
                          {store.average_rating.toFixed(1)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {store.is_banned ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Banned
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-3">
                          <button
                            type="button"
                            className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                            title="Add Owner"
                            onClick={() => {
                              setSelectedStore(store);
                              setNewOwner({ store_id: store.id, user_id: 0 });
                              setShowAddOwnerModal(true);
                            }}
                          >
                         <FaUserPlus />
                          </button>
                          
                          <button
                            type="button"
                            className={`${store.is_banned ? 'text-green-600 hover:text-green-900' : 'text-red-600 hover:text-red-900'} cursor-pointer`}
                            title={store.is_banned ? "Unban Store" : "Ban Store"}
                            onClick={() => handleToggleBan(store)}
                          >
                           {store.is_banned ? <FaShieldAlt /> : <FaBan />}
                          </button>
                          
                          <button
                            type="button"
                            className="text-red-600 hover:text-red-900 cursor-pointer"
                            title="Delete Store"
                            onClick={() => handleDeleteStore(store.id)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                      No stores found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add Store Modal */}
      {showAddModal && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Add New Store
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="store-name" className="block text-sm font-medium text-gray-700">Store Name</label>
                        <input
                          type="text"
                          id="store-name"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          value={newStore.name}
                          onChange={(e) => setNewStore({...newStore, name: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="owner-id" className="block text-sm font-medium text-gray-700">Owner</label>
                        <select
                          id="owner-id"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          value={newStore.owner_id}
                          onChange={(e) => setNewStore({...newStore, owner_id: Number(e.target.value)})}
                        >
                          <option value={0}>Select an owner</option>
                          {users.map(user => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                          id="description"
                          rows={3}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          value={newStore.description}
                          onChange={(e) => setNewStore({...newStore, description: e.target.value})}
                        ></textarea>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">Longitude</label>
                          <input
                            type="text"
                            id="longitude"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={newStore.location_longitude}
                            onChange={(e) => setNewStore({...newStore, location_longitude: e.target.value})}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">Latitude</label>
                          <input
                            type="text"
                            id="latitude"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={newStore.location_latitude}
                            onChange={(e) => setNewStore({...newStore, location_latitude: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="city-id" className="block text-sm font-medium text-gray-700">City</label>
                        <select
                          id="city-id"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          value={newStore.city_id}
                          onChange={(e) => setNewStore({...newStore, city_id: Number(e.target.value)})}
                        >
                          <option value={0}>Select a city</option>
                          {cities.map(city => (
                            <option key={city.id} value={city.id}>{city.name}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center">
                          <label className="block text-sm font-medium text-gray-700">Contact Information</label>
                          <button
                            type="button"
                            className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-900 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                            onClick={handleAddContactProperty}
                          >
                           <FaPlus className="text-xs" />
                          </button>
                        </div>
                        
                        <div className="mt-2 space-y-3">
                          {contactProperties.map((prop, index) => (
                            <div key={index} className="flex space-x-2">
                              <input
                                type="text"
                                placeholder="Property Name"
                                className="flex-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={prop.key}
                                onChange={(e) => handleContactPropertyChange(index, 'key', e.target.value)}
                              />
                              <input
                                type="text"
                                placeholder="Value"
                                className="flex-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={prop.value}
                                onChange={(e) => handleContactPropertyChange(index, 'value', e.target.value)}
                              />
                              {contactProperties.length > 1 && (
                                <button
                                  type="button"
                                  className="inline-flex items-center p-2 border border-transparent rounded-md text-red-600 hover:text-red-900 focus:outline-none cursor-pointer"
                                  onClick={() => handleRemoveContactProperty(index)}
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
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-button border border-transparent shadow-sm px-4 py-2 bg-indigo-900 text-base font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm whitespace-nowrap cursor-pointer"
                  onClick={handleAddStore}
                >
                  Add Store
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-button border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm whitespace-nowrap cursor-pointer"
                  onClick={() => {
                    setShowAddModal(false);
                    resetNewStoreForm();
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Owner Modal */}
      {showAddOwnerModal && selectedStore && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Add Owner to {selectedStore.name}
                    </h3>
                    <div className="mt-4">
                      <label htmlFor="new-owner" className="block text-sm font-medium text-gray-700">Select User</label>
                      <select
                        id="new-owner"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={newOwner.user_id}
                        onChange={(e) => setNewOwner({...newOwner, user_id: Number(e.target.value)})}
                      >
                        <option value={0}>Select a user</option>
                        {users.map(user => (
                          <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-button border border-transparent shadow-sm px-4 py-2 bg-indigo-900 text-base font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm whitespace-nowrap cursor-pointer"
                  onClick={handleAddOwner}
                >
                  Add Owner
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-button border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm whitespace-nowrap cursor-pointer"
                  onClick={() => setShowAddOwnerModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Test;
