import React, { useState, useEffect } from 'react';
import { FaUniversity } from "react-icons/fa";
import { FaBars, FaTimes } from 'react-icons/fa';
// import * as echarts from 'echarts';

const Admin = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const stats = {
    totalStores: 1248,
    activeProducts: 8765,
    citiesCovered: 42,
    pendingReports: 17,
  };

  const recentActivity = [
    { id: 1, type: 'store_added', name: 'Tech Galaxy', city: 'New York', time: '2 hours ago' },
    { id: 2, type: 'store_updated', name: 'Fashion Hub', city: 'Los Angeles', time: '4 hours ago' },
    { id: 3, type: 'product_updated', name: 'Coffee Shop', city: 'Chicago', time: '6 hours ago' },
    { id: 4, type: 'store_added', name: 'Organic Market', city: 'Miami', time: '1 day ago' },
    { id: 5, type: 'report_resolved', name: 'Sports Center', city: 'Boston', time: '1 day ago' },
  ];

  const stores = [
    { id: 1, name: 'Tech Galaxy', location: 'New York, NY', contact: '+1 212-555-0123', status: 'active', updated: 'Apr 10, 2025' },
    { id: 2, name: 'Fashion Hub', location: 'Los Angeles, CA', contact: '+1 310-555-0124', status: 'active', updated: 'Apr 9, 2025' },
    { id: 3, name: 'Coffee Shop', location: 'Chicago, IL', contact: '+1 312-555-0125', status: 'inactive', updated: 'Apr 8, 2025' },
    { id: 4, name: 'Organic Market', location: 'Miami, FL', contact: '+1 305-555-0126', status: 'active', updated: 'Apr 7, 2025' },
    { id: 5, name: 'Sports Center', location: 'Boston, MA', contact: '+1 617-555-0127', status: 'active', updated: 'Apr 6, 2025' },
    { id: 6, name: 'Book Store', location: 'Seattle, WA', contact: '+1 206-555-0128', status: 'inactive', updated: 'Apr 5, 2025' },
    { id: 7, name: 'Electronics Shop', location: 'San Francisco, CA', contact: '+1 415-555-0129', status: 'active', updated: 'Apr 4, 2025' },
  ];


  return (
    <div className="flex h-screen bg-gray-50" dir='ltr'>
      {/* Sidebar */}
      <div className="flex">
  {/* Sidebar/Navigation */}
  <div className="flex">
  {/* Mobile menu button - fixed position for mobile */}
  <div className="sm:hidden fixed top-4 left-4 z-50">
    <button 
      onClick={toggleMenu}
      className="text-gray-500  p-2 rounded-md focus:outline-none"
    >
      {isMenuOpen ? (
        <FaTimes className="h-4 w-4" />
      ) : (
        <FaBars className="h-4 w-4" />
      )}
    </button>
  </div>

  {/* Sidebar/Navigation */}
  <div className={`fixed sm:relative z-40 w-64 bg-gray-900 text-white h-screen transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}>
    {/* Brand/Logo section */}
    <div className="p-4 flex items-center space-x-2">
      <i className="fas fa-store text-xl"></i>
      <h1 className="text-xl font-bold"></h1>
    </div>
    
    {/* Navigation items */}
    <nav className='mt-6'>
      <ul>
        <li
          className={`flex items-center px-4 py-3 cursor-pointer ${activeTab === 'dashboard' ? 'bg-gray-800 border-l-4 border-indigo-500' : 'hover:bg-gray-800'}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <i className="fas fa-tachometer-alt w-6"></i>
          <span className="mx-3">Dashboard</span>
        </li>
        <li
          className={`flex items-center px-4 py-3 cursor-pointer ${activeTab === 'stores' ? 'bg-gray-800 border-l-4 border-indigo-500' : 'hover:bg-gray-800'}`}
          onClick={() => setActiveTab('stores')}
        >
          <i className="fas fa-store w-6"></i>
          <span className="mx-3">Store Management</span>
        </li>
        <li
            className={`flex items-center px-4 py-3 cursor-pointer ${activeTab === 'cities' ? 'bg-gray-800 border-l-4 border-indigo-500' : 'hover:bg-gray-800'}`}
            onClick={() => setActiveTab('cities')}
          >
            <i className="fas fa-city w-6"></i>
            <span className="mx-3">City Management</span>
          </li>
          <li
            className={`flex items-center px-4 py-3 cursor-pointer ${activeTab === 'reports' ? 'bg-gray-800 border-l-4 border-indigo-500' : 'hover:bg-gray-800'}`}
            onClick={() => setActiveTab('reports')}
          >
            <i className="fas fa-flag w-6"></i>
            <span className="mx-3">Report Management</span>
          </li>
          <li
            className={`flex items-center px-4 py-3 cursor-pointer ${activeTab === 'settings' ? 'bg-gray-800 border-l-4 border-indigo-500' : 'hover:bg-gray-800'}`}
            onClick={() => setActiveTab('settings')}
          >
            <i className="fas fa-cog w-6"></i>
            <span className="mx-3">Settings</span>
          </li>
      </ul>
    </nav>
  </div>

  {/* Main content area - add padding to account for mobile menu button */}
  <div className="flex-1 pt-16 sm:pt-0">
    {/* Your page content goes here */}
  </div>
</div>

  {/* Main content area */}
  <div className="flex-1">
    {/* Your page content goes here */}
  </div>
</div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
       
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 focus:outline-none">
                <i className="fas fa-bars"></i>
              </button>
              {/* <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <i className="fas fa-search text-gray-400"></i>
                </span>
                <input
                  className="pl-10 pr-4 m-auto py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div> */}
            </div>
            <div className="relative">
              <div className="flex items-center space-x-4">
                <button className="text-gray-500 focus:outline-none relative !rounded-button cursor-pointer whitespace-nowrap">
                  <i className="fas fa-bell"></i>
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">3</span>
                </button>
                <div className="relative">
                  <button
                    className="flex items-center space-x-2 focus:outline-none cursor-pointer whitespace-nowrap"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <img
                      src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20male%20administrator%20with%20short%20dark%20hair%20wearing%20a%20business%20casual%20outfit%2C%20studio%20lighting%2C%20neutral%20background%2C%20high%20quality%20portrait&width=40&height=40&seq=admin-avatar&orientation=squarish"
                      alt="Admin"
                      className="w-8 h-8 rounded-full object-cover object-top"
                    />
                    <span className="text-gray-700">Admin User</span>
                    <i className={`fas fa-chevron-down text-gray-500 text-xs transition-transform ${showDropdown ? 'transform rotate-180' : ''}`}></i>
                  </button>
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
                      <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                      <a href="#logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
        {activeTab === 'dashboard' && (
  <div>
    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard Overview</h2>

    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {Object.entries(stats).map(([key, value]) => (
        <div key={key} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-500">
              <i className="fas fa-store text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500 font-medium">{key.replace(/([A-Z])/g, ' $1')}</p>
              <p className="text-2xl font-semibold text-gray-800">{value}</p>
            </div>
          </div>
          <div className="mt-4 text-sm text-green-500 flex items-center">
            <i className="fas fa-arrow-up mr-1"></i>
            <span>12% from last month</span>
          </div>
        </div>
      ))}
    </div>

    {/* Remove the charts section */}
    {/* Charts and Activity */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Analytics Overview</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-4">Store Distribution by City</h4>
                {/* You can replace this with a static message or a placeholder */}
                <p>No chart available.</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-4">Product Availability by Category</h4>
                {/* Replace this with a static message or a placeholder */}
                <p>No chart available.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
          <button className="text-sm text-indigo-600 hover:text-indigo-800 !rounded-button cursor-pointer whitespace-nowrap">View All</button>
        </div>
        <div className="p-6">
          <ul className="divide-y divide-gray-200">
            {recentActivity.map((activity) => (
              <li key={activity.id} className="py-3">
                <div className="flex items-start">
                  <div className={`p-2 rounded-full ${activity.type === 'store_added' ? 'bg-green-100 text-green-500' : 'bg-blue-100 text-blue-500'}`}>
                    <i className={`fas ${activity.type === 'store_added' ? 'fa-plus' : 'fa-edit'}`}></i>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-800">
                      {activity.type === 'store_added' ? 'New store added: ' : 'Store updated: '} {activity.name}
                    </p>
                    <p className="text-xs text-gray-500">{activity.city} • {activity.time}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
)}


          {activeTab === 'stores' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Store Management</h2>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center !rounded-button cursor-pointer whitespace-nowrap">
                  <i className="fas fa-plus mr-2"></i>
                  Add New Store
                </button>
              </div>

              {/* Filters */}
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
                    <div className="relative">
                      <select
                        id="city"
                        className="appearance-none pl-4 pr-10 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                        value={filterCity}
                        onChange={(e) => setFilterCity(e.target.value)}
                      >
                        <option value="">All Cities</option>
                        <option value="new-york">New York</option>
                        <option value="los-angeles">Los Angeles</option>
                        <option value="chicago">Chicago</option>
                        <option value="miami">Miami</option>
                        <option value="boston">Boston</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <i className="fas fa-chevron-down text-gray-400"></i>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <div className="relative">
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
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <i className="fas fa-chevron-down text-gray-400"></i>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <div className="relative">
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
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <i className="fas fa-chevron-down text-gray-400"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stores Table */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Store
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Location
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Contact
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Last Updated
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {stores.map((store) => (
                      <tr key={store.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-full overflow-hidden">
                              <img
                                src={`https://readdy.ai/api/search-image?query=storefront%20of%20a%20${
                                  store.name.toLowerCase()
                                }%20with%20clean%20modern%20design%2C%20high%20quality%20commercial%20photography%2C%20professional%20lighting&width=40&height=40&seq=store-${store.id}&orientation=squarish`}
                                alt={store.name}
                                className="h-10 w-10 object-cover object-top"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{store.name}</div>
                              <div className="text-sm text-gray-500">ID: #{store.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{store.location}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{store.contact}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              store.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {store.status.charAt(0).toUpperCase() + store.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{store.updated}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-indigo-600 hover:text-indigo-900 mr-3 !rounded-button cursor-pointer whitespace-nowrap">
                            <i className="fas fa-edit"></i>
                          </button>
                          <button className="text-red-600 hover:text-red-900 !rounded-button cursor-pointer whitespace-nowrap">
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 flex justify-between sm:hidden">
                      <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 !rounded-button cursor-pointer whitespace-nowrap">
                        Previous
                      </button>
                      <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 !rounded-button cursor-pointer whitespace-nowrap">
                        Next
                      </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          Showing <span className="font-medium">1</span> to <span className="font-medium">7</span> of <span className="font-medium">42</span> results
                        </p>
                      </div>
                      <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                          <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 !rounded-button cursor-pointer whitespace-nowrap">
                            <span className="sr-only">Previous</span>
                            <i className="fas fa-chevron-left text-xs"></i>
                          </button>
                          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 !rounded-button cursor-pointer whitespace-nowrap">
                            1
                          </button>
                          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-indigo-50 text-sm font-medium text-indigo-600 hover:bg-gray-50 !rounded-button cursor-pointer whitespace-nowrap">
                            2
                          </button>
                          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 !rounded-button cursor-pointer whitespace-nowrap">
                            3
                          </button>
                          <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                            ...
                          </span>
                          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 !rounded-button cursor-pointer whitespace-nowrap">
                            8
                          </button>
                          <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 !rounded-button cursor-pointer whitespace-nowrap">
                            <span className="sr-only">Next</span>
                            <i className="fas fa-chevron-right text-xs"></i>
                          </button>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;
