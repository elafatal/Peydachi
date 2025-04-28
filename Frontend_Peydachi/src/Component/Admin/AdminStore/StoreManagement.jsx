import React, { useState } from 'react';
import StoreTable from './StoreTable';


const StoreManagement = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const stores = [
    { id: 1, name: 'Tech Galaxy', location: 'New York, NY', contact: '+1 212-555-0123', status: 'active', updated: 'Apr 10, 2025' },
    { id: 2, name: 'Fashion Hub', location: 'Los Angeles, CA', contact: '+1 310-555-0124', status: 'active', updated: 'Apr 9, 2025' },
    { id: 3, name: 'Coffee Shop', location: 'Chicago, IL', contact: '+1 312-555-0125', status: 'inactive', updated: 'Apr 8, 2025' },
    { id: 4, name: 'Organic Market', location: 'Miami, FL', contact: '+1 305-555-0126', status: 'active', updated: 'Apr 7, 2025' },
    { id: 5, name: 'Sports Center', location: 'Boston, MA', contact: '+1 617-555-0127', status: 'active', updated: 'Apr 6, 2025' },
    { id: 6, name: 'Book Store', location: 'Seattle, WA', contact: '+1 206-555-0128', status: 'inactive', updated: 'Apr 5, 2025' },
    { id: 7, name: 'Electronics Shop', location: 'San Francisco, CA', contact: '+1 415-555-0129', status: 'active', updated: 'Apr 4, 2025' },
    { id: 8, name: 'Tech Galaxy', location: 'New York, NY', contact: '+1 212-555-0123', status: 'active', updated: 'Apr 10, 2025' },
    { id: 9, name: 'Fashion Hub', location: 'Los Angeles, CA', contact: '+1 310-555-0124', status: 'active', updated: 'Apr 9, 2025' },
    { id: 10, name: 'Coffee Shop', location: 'Chicago, IL', contact: '+1 312-555-0125', status: 'inactive', updated: 'Apr 8, 2025' },
    { id: 11, name: 'Organic Market', location: 'Miami, FL', contact: '+1 305-555-0126', status: 'active', updated: 'Apr 7, 2025' },
    { id: 12, name: 'Sports Center', location: 'Boston, MA', contact: '+1 617-555-0127', status: 'active', updated: 'Apr 6, 2025' },
    { id: 13, name: 'Book Store', location: 'Seattle, WA', contact: '+1 206-555-0128', status: 'inactive', updated: 'Apr 5, 2025' },
    { id: 14, name: 'Electronics Shop', location: 'San Francisco, CA', contact: '+1 415-555-0129', status: 'active', updated: 'Apr 4, 2025' },
  ];

  // Filter the stores based on search and filters
  const filteredStores = stores.filter((store) => {
    const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = filterCity ? store.location.toLowerCase().includes(filterCity.toLowerCase()) : true;
    const matchesStatus = filterStatus ? store.status === filterStatus : true;
    const matchesCategory = filterCategory ? store.category === filterCategory : true; // (Assumes each store has category property)
    return matchesSearch && matchesCity && matchesStatus && matchesCategory;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Store Management</h2>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center cursor-pointer whitespace-nowrap">
          <i className="fas fa-plus mr-2"></i>
          Add New Store
        </button>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <i className="fas fa-search text-gray-400"></i>
              </span>
              <input
                id="search"
                type="text"
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                placeholder="Search stores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <select
              id="city"
              className="appearance-none pl-4 pr-10 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
            >
              <option value="">All Cities</option>
              <option value="new york">New York</option>
              <option value="los angeles">Los Angeles</option>
              <option value="chicago">Chicago</option>
              <option value="miami">Miami</option>
              <option value="boston">Boston</option>
            </select>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              id="status"
              className="appearance-none pl-4 pr-10 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              id="category"
              className="appearance-none pl-4 pr-10 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="food">Food & Beverages</option>
              <option value="books">Books & Media</option>
              <option value="sports">Sports & Outdoors</option>
            </select>
          </div>
        </div>
      </div>

      {/* Store Table Section */}
      <StoreTable stores={filteredStores} />
    </div>
  );
};

export default StoreManagement;
