// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';
import ReviewModal from './ReviewModal'; 
import SearchFilters from '../SearchFilters';
import StatsOverview from '../StatsOverview';
import StoreRequestCard from './StoreRequestCard'
const StoreRequest = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const [cities, setCities] = useState([]);
  const [storeRequests, setStoreRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    reviewed: 0,
    pending: 0
  });

  // Mock data for demonstration
  useEffect(() => {
    // Simulate API call to get cities
    setTimeout(() => {
      const mockCities= [
        { id: 1, region_id: 1, name: "New York" },
        { id: 2, region_id: 1, name: "Los Angeles" },
        { id: 3, region_id: 2, name: "Chicago" },
        { id: 4, region_id: 2, name: "Houston" },
        { id: 5, region_id: 3, name: "Phoenix" }
      ];
      setCities(mockCities);
    }, 500);

    // Simulate API call to get store requests
    setTimeout(() => {
      const mockRequests = [
        {
          id: 1,
          store_name: "Urban Outfitters",
          phone_number: "+1 (555) 123-4567",
          region_id: 1,
          city_id: 1,
          description: "A trendy clothing and lifestyle store focusing on urban fashion and home decor for young adults.",
          date_added: "2025-07-01T14:23:45.639Z",
          isReviewed: true
        },
        {
          id: 2,
          store_name: "Tech Haven",
          phone_number: "+1 (555) 987-6543",
          region_id: 1,
          city_id: 2,
          description: "Specialized electronics store offering the latest gadgets, computer hardware, and tech accessories.",
          date_added: "2025-07-02T09:15:30.639Z",
          isReviewed: false
        },
        {
          id: 3,
          store_name: "Green Grocers",
          phone_number: "+1 (555) 456-7890",
          region_id: 2,
          city_id: 3,
          description: "Organic grocery store with locally sourced produce, sustainable products, and zero-waste options.",
          date_added: "2025-07-02T16:45:10.639Z",
          isReviewed: false
        },
        {
          id: 4,
          store_name: "Bookworm Paradise",
          phone_number: "+1 (555) 234-5678",
          region_id: 2,
          city_id: 4,
          description: "Independent bookstore with a vast collection of fiction, non-fiction, and rare books. Includes a cozy reading café.",
          date_added: "2025-07-03T11:30:22.639Z",
          isReviewed: true
        },
        {
          id: 5,
          store_name: "Fitness First",
          phone_number: "+1 (555) 876-5432",
          region_id: 3,
          city_id: 5,
          description: "Fitness equipment and sportswear store with professional consultation services for home gym setup.",
          date_added: "2025-07-03T08:20:15.639Z",
          isReviewed: false
        },
        {
          id: 6,
          store_name: "Artisan Bakery",
          phone_number: "+1 (555) 345-6789",
          region_id: 1,
          city_id: 1,
          description: "Traditional bakery offering freshly baked bread, pastries, and cakes using time-honored recipes and techniques.",
          date_added: "2025-06-30T13:10:45.639Z",
          isReviewed: true
        }
      ];
      setStoreRequests(mockRequests);
      setIsLoading(false);
      
      // Update stats
      setStats({
        total: mockRequests.length,
        reviewed: mockRequests.filter(req => req.isReviewed).length,
        pending: mockRequests.filter(req => !req.isReviewed).length
      });
    }, 800);
  }, []);

  // Filter requests based on active tab, search term, and selected city
  const filteredRequests = storeRequests.filter(request => {
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'reviewed' && request.isReviewed) || 
      (activeTab === 'pending' && !request.isReviewed);
    
    const matchesSearch = 
      searchTerm === '' || 
      request.store_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCity = 
      selectedCity === null || 
      request.city_id === selectedCity;
    
    return matchesTab && matchesSearch && matchesCity;
  });

  // Format date to a more readable format
  const formatDate = (dateString) => {
    const now = new Date();
    const addedDate = new Date(dateString);
    
    const diffInMilliseconds = now - addedDate;
    const seconds = Math.floor(diffInMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
  
    if (seconds < 60) return 'لحظاتی پیش';
    if (minutes < 60) return `${minutes} دقیقه قبل`;
    if (hours < 24) return `${hours} ساعت قبل`;
    if (days < 7) return `${days} روز قبل`;
    if (weeks < 4) return `${weeks} هفته قبل`;
    if (months < 12) return `${months} ماه قبل`;
    return `${years} سال${years > 1 ? 's' : ''} گذشته`;
  };

  // Get city name by ID
  const getCityName = (cityId) => {
    const city = cities.find(city => city.id === cityId);
    return city ? city.name : 'Unknown';
  };

  // Handle review action
  const handleReview = (request) => {
    setSelectedRequest(request);
    setShowReviewModal(true);
  };

  // Handle confirm review
  const handleConfirmReview = () => {
    if (selectedRequest) {
      // In a real app, this would be an API call
      const updatedRequests = storeRequests.map(req => 
        req.id === selectedRequest.id ? { ...req, isReviewed: true } : req
      );
      setStoreRequests(updatedRequests);
      setStats({
        total: stats.total,
        reviewed: stats.reviewed + 1,
        pending: stats.pending - 1
      });
      setShowReviewModal(false);
      setSelectedRequest(null);
    }
  };

  // Handle remove action
  const handleRemove = (requestId) => {
    // In a real app, this would be an API call
    const requestToRemove = storeRequests.find(req => req.id === requestId);
    const updatedRequests = storeRequests.filter(req => req.id !== requestId);
    setStoreRequests(updatedRequests);
    
    if (requestToRemove) {
      setStats({
        total: stats.total - 1,
        reviewed: requestToRemove.isReviewed ? stats.reviewed - 1 : stats.reviewed,
        pending: !requestToRemove.isReviewed ? stats.pending - 1 : stats.pending
      });
    }
  };

  // Handle remove all reviewed
  const handleRemoveAllReviewed = () => {
    // In a real app, this would be an API call
    const updatedRequests = storeRequests.filter(req => !req.isReviewed);
    setStoreRequests(updatedRequests);
    setStats({
      total: updatedRequests.length,
      reviewed: 0,
      pending: updatedRequests.length
    });
  };

  return (
    <div className="min-h-screen bg-gray-50" dir='ltr'>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">


        {/* Search and Filters */}
        <SearchFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cities={cities}
        />

        {/* View Toggle and Actions */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
           
          </div>
          
          <div className="flex items-center">
            <button
              className="flex items-center bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg shadow-md transition-colors !rounded-button whitespace-nowrap cursor-pointer"
              onClick={handleRemoveAllReviewed}
              disabled={stats.reviewed === 0}
            >
              <i className="fas fa-trash-alt mr-2"></i>
              Remove All Reviewed
            </button>
          </div>
        </div>

        {/* Store Requests */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" dir='rtl'>
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
 
                <div className="flex justify-between">
                  <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-100 p-6 rounded-full">
                <i className="fas fa-search text-blue-500 text-4xl"></i>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">هیچ درخواستی یافت نشد</h3>
            <p className="text-gray-500 max-w-md mx-auto">
            هیچ درخواستی مطابق با فیلترهای فعلی شما وجود ندارد. معیارهای جستجوی خود را تنظیم کنید یا فیلترها را پاک کنید.
            </p>
          </div>
        ) :(
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRequests.map(request => (
            <StoreRequestCard
                key={request.id}
                request={request}
                onReview={handleReview}
                onRemove={handleRemove}
                getCityName={getCityName}
                formatDate={formatDate}
            />
            ))}
          </div>
        ) }

      </main>

      <ReviewModal
        show={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        onConfirm={handleConfirmReview}
        request={selectedRequest}
        getCityName={getCityName}
        formatDate={formatDate}
        />

      {/* Mobile Action Button */}
      <div className="md:hidden fixed bottom-6 right-6">
        <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg !rounded-button whitespace-nowrap cursor-pointer">
          <i className="fas fa-ellipsis-h"></i>
        </button>
      </div>
    </div>
  );
};

export default StoreRequest;
