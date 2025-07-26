import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";  
import { useAuth } from '../../../Context/AuthContext';
import { useAdminStats } from '../../../Context/AdminStatsContext';
import axiosInstance from '../../../axiosInstance';
import ReviewModal from './ReviewModal'; 
import SearchFilters from './SearchFilters';
import StoreRequestCard from './StoreRequestCard'
const StoreRequest = () => {
  const { role } = useAuth(); 
  const { refreshStats } = useAdminStats();
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const [cities, setCities] = useState([]);
  const [storeRequests, setStoreRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const { stats } = useAdminStats();
  useEffect(() => {
    const fetchRequests = async () => {
      setIsLoading(true);
      try {
        let response;
        const searchActive = searchTerm.trim() !== '';
        const citySelected = selectedCity !== null;
  
        if (searchActive && citySelected) {
          const searchPayload = { request_text: searchTerm };
          if (activeTab === 'reviewed') {
            response = await axiosInstance.post('/admin/add_store_request/search_reviewed_add_store_requests', searchPayload);
          } else if (activeTab === 'pending') {
            response = await axiosInstance.post('/admin/add_store_request/search_not_reviewed_add_store_requests', searchPayload);
          } else {
            response = await axiosInstance.post('/admin/add_store_request/search_add_store_requests', searchPayload);
          }
        } else if (!searchActive && citySelected) {
          const cityPayload = { city_id: selectedCity };
          if (activeTab === 'reviewed') {
            response = await axiosInstance.post('/admin/add_store_request/get_all_reviewed_add_store_requests_of_city', cityPayload);
          } else if (activeTab === 'pending') {
            response = await axiosInstance.post('/admin/add_store_request/get_all_add_store_requests_of_city_to_review', cityPayload);
          } else {
            response = await axiosInstance.post('/admin/add_store_request/get_all_add_store_requests_of_city', cityPayload);
          }
        } else if (!searchActive && !citySelected) {
          if (activeTab === 'reviewed') {
            response = await axiosInstance.get('/admin/add_store_request/get_all_reviewed_add_store_requests');
          } else if (activeTab === 'pending') {
            response = await axiosInstance.get('/admin/add_store_request/get_requests_to_review');
          } else {
            response = await axiosInstance.get('/admin/add_store_request/get_all_add_store_requests');
          }
        } else {
          const searchPayload = { request_text: searchTerm };
          if (activeTab === 'reviewed') {
            response = await axiosInstance.post('/admin/add_store_request/search_reviewed_add_store_requests', searchPayload);
          } else if (activeTab === 'pending') {
            response = await axiosInstance.post('/admin/add_store_request/search_not_reviewed_add_store_requests', searchPayload);
          } else {
            response = await axiosInstance.post('/admin/add_store_request/search_add_store_requests', searchPayload);
          }
        }
  
        setStoreRequests(response.data);
      } catch (error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.response?.data?.message || error.response?.data?.detail || "خطای ناشناخته‌ای رخ داده است",
          showConfirmButton: false,
          timer: 2000,
          toast: true,
          customClass: {
            popup: 'text-sm flex items-center justify-center',
            title: 'text-xs',
            content: 'text-xs',
            icon: 'text-xs mb-2',
          },
        });      } finally {
        setIsLoading(false);
      }
    };
  
    fetchRequests();
  }, [searchTerm, selectedCity, activeTab]);
  

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axiosInstance.get('/city/get_all_cities', {
          headers: {
            Authorization: null,
            'Content-Type': 'multipart/form-data',
          },
        });
        setCities(response.data);
        console.log(response);
      } catch (error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.response?.data?.message || error.response?.data?.detail || "خطای ناشناخته‌ای رخ داده است",
          showConfirmButton: false,
          timer: 2000,
          toast: true,
          customClass: {
            popup: 'text-sm flex items-center justify-center',
            title: 'text-xs',
            content: 'text-xs',
            icon: 'text-xs mb-2',
          },
        });
      }

      try {
        const response = await axiosInstance.get('/admin/add_store_request/get_requests_to_review', {
          headers: {
            Authorization: null,
            'Content-Type': 'multipart/form-data'
          }
        });
        setStoreRequests(response.data)
        console.log(response);
        setIsLoading(false)
      } catch (error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.response?.data?.message || error.response?.data?.detail || "خطای ناشناخته‌ای رخ داده است",
          showConfirmButton: false,
          timer: 2000,
          toast: true,
          customClass: {
            popup: 'text-sm flex items-center justify-center',
            title: 'text-xs',
            content: 'text-xs',
            icon: 'text-xs mb-2',
          },
        });
      } 
    };
  
    fetchCities();

  }, []);

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
    return `${years} سال گذشته`;
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

  const handleConfirmReview = async () => {
    if (!selectedRequest) return;
  
    try {
      const response = await axiosInstance.put('/admin/add_store_request/review_add_store_request', {
        request_id: selectedRequest.id,
      });
  
      if (response.status === 200) {
        const updatedRequests = storeRequests.map(req =>
          req.id === selectedRequest.id ? { ...req, is_reviewed: true } : req
        );
        setStoreRequests(updatedRequests);
        await refreshStats();
        setShowReviewModal(false);
        setSelectedRequest(null);
  
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "درخواست با موفقیت بررسی شد",
          showConfirmButton: false,
          timer: 1500,
          toast: true,
          customClass: {
            popup: 'w-2 h-15 text-sm flex items-center justify-center', 
            title: 'text-xs', 
            content: 'text-xs',
            icon : 'text-xs mb-2'
          }
        });
      }
    } catch (err) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: err.response?.data?.message || err.response?.data?.detail || "خطای ناشناخته‌ای رخ داده است",
        showConfirmButton: false,
        timer: 2000,
        toast: true,
        customClass: {
          popup: 'text-sm flex items-center justify-center',
          title: 'text-xs',
          content: 'text-xs',
          icon: 'text-xs mb-2',
        },
      });
    }
  };
  
  // Handle remove action
  const handleRemove = async (requestId) => {
    try {
      const response = await axiosInstance.delete('/admin/add_store_request/remove_add_store_request', {
        data: { request_id: requestId },
      });
  
      if (response.status === 200) {
        setStoreRequests((prev) => prev.filter(req => req.id !== requestId));
         Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "درخواست حذف شد ",
                        showConfirmButton: false,
                        timer: 1500,
                        toast: true,
                        customClass: {
                          popup: 'w-2 h-15 text-sm flex items-center justify-center', 
                          title: 'text-xs', 
                          content: 'text-xs',
                          icon : 'text-xs mb-2'
                        }
                    });
        await refreshStats();
      }
    } catch (err) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: err.response?.data?.message || err.response?.data?.detail || "خطای ناشناخته‌ای رخ داده است",
        showConfirmButton: false,
        timer: 2000,
        toast: true,
        customClass: {
          popup: 'text-sm flex items-center justify-center',
          title: 'text-xs',
          content: 'text-xs',
          icon: 'text-xs mb-2',
        },
      });
    }
  };
  

  // Handle remove all reviewed
  const handleRemoveAllReviewed = async () => {
    try {
      const response = await axiosInstance.delete('/super_admin/add_store_request/remove_all_reviewed_add_store_requests');
      
      if (response.status === 200) {
        const updatedRequests = storeRequests.filter(req => !req.is_reviewed);
        setStoreRequests(updatedRequests);
        await refreshStats();
  
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "درخواست‌ها با موفقیت حذف شدند",
          showConfirmButton: false,
          timer: 1500,
          toast: true,
          customClass: {
            popup: ' text-sm flex items-center justify-center', 
            title: 'text-xs', 
            content: 'text-xs',
            icon : 'text-xs mb-2'
          }
        });
      }
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error.response?.data?.message || error.response?.data?.detail || "خطای ناشناخته‌ای رخ داده است",
        showConfirmButton: false,
        timer: 2000,
        toast: true,
        customClass: {
          popup: 'text-sm flex items-center justify-center',
          title: 'text-xs',
          content: 'text-xs',
          icon: 'text-xs mb-2',
        },
      });
    }
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
          { role=== 'superadmin' ? ( <div className="flex items-center">
            <button
              className="flex items-center bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg shadow-md transition-colors !rounded-button whitespace-nowrap cursor-pointer"
              onClick={handleRemoveAllReviewed}
            >
              <i className="fas fa-trash-alt mr-2"></i>
             پاک کردن درخواست‌های بررسی شده
            </button>
          </div>) : (<> </>)}
         
        </div>

        {/* Store Requests */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" dir='rtl'>
            {Array.from({ length: stats?.requests || 6 }).map((_, index) => (
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
        ) : storeRequests.length === 0 ? (
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
          {storeRequests.map(request => (
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
