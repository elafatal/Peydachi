import AddStoreModal from './AddStoreModal';
import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";  
import showErrorToast from '../../utils/showErrorToast';
import { useNavigate } from 'react-router-dom';
import AddOwnerModal from './AddOwnerModal';
import axiosInstance from '../../axiosInstance';
import { useCityContext } from '../../Context/CityContext';
import {FaTrash, FaShieldAlt,FaBan ,FaUserPlus,FaStar,FaPlus,FaSearch ,FaTimes,FaComment   } from 'react-icons/fa';
import { FaUserSlash } from "react-icons/fa";
const StoreManagement= () => {
  const navigate = useNavigate();
  const { cities, getCityName } = useCityContext();
  const [stores, setStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddOwnerModal, setShowAddOwnerModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

const users=[{id:1 , username:'ali'}]

  const deleteOwner=async(store)=>{
    try {
      const response = await axiosInstance.put('/admin/store/remove_owner_from_store',{store_id: store.id});
      if (response.status === 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: " فروشنده حذف شد",
          showConfirmButton: false,
          timer: 1500,
          toast: true,
          customClass: {
            popup: 'text-sm flex items-center justify-center', 
            title: 'text-xs', 
            content: 'text-xs',
            icon : 'text-xs mb-2'
          }
      });      }
      handleSearch()
    } catch (error) {
      showErrorToast(error);
    }    
  }


  const handleAddStore = async (storeData) => {
     const {
       owner_id,
       location_longitude,
       location_latitude,
       ...rest           
     } = storeData;
  
     const payload = {
       ...rest,
       ...(owner_id ? { owner_id } : {}),
         ...(location_longitude && location_latitude
             ? { location_longitude, location_latitude }
             : {}),
       };
    
       try {
         const { data } = await axiosInstance.post(
           "/admin/store/create_store",
           payload
         );
         setStores((prev) => [...prev, data]);
         setShowAddModal(false);
       } catch (err) {
        showErrorToast(err);
       }
     };


  const handleAddOwner = async(userId) => {
    if (!selectedStore) return;
    try {
      const response = await axiosInstance.post('/admin/user/promote_user_to_seller', {
        user_id : userId
      });
      if (response.status === 200) {
          try {
          const response = await axiosInstance.put('/admin/store/add_owner_to_store', {
            store_id: selectedStore.id , user_id : userId
          });
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "فروشنده به فروشگاه اختصاص یافت",
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
          handleSearch()

        } catch (error) {
          showErrorToast(error);
        }
      }
    } catch (error) {
      showErrorToast(error);
    }
    setShowAddOwnerModal(false);
    setSelectedStore(null);
  };
  const handleSearch = async () => {
    setIsLoading(true);
  
    try {
      let apiUrl = '';
      let payload = {};
  
      if (filterStatus === 'banned') {
        if (!filterCity) {
          apiUrl = '/admin/store/search_in_banned_stores';
        payload = { name: searchTerm || '' };
        }
        if (filterCity) {
          apiUrl = '/admin/store/search_in_banned_stores_of_city';
          payload = {
            city_id: Number(filterCity),
            search: searchTerm || '',
          };
        }
      }
      else if (filterStatus === 'active') {
        if (!filterCity) {
          apiUrl = '/store/search_active_stores';
          payload = { name: searchTerm || '' };
        }
        if (filterCity) {
          apiUrl = '/admin/store/search_in_active_stores_of_city';
          payload = {
            city_id: Number(filterCity),
            search: searchTerm || '',
          };
        }
      }
      else if (filterCity) {
        apiUrl = '/admin/store/search_in_all_stores_of_city';
        payload = {
          city_id: Number(filterCity),
          search: searchTerm || '',
        };
      }
      else {
        apiUrl = '/admin/store/search_store';
        payload = { name: searchTerm || '' };
      }
  
      const response = await axiosInstance.post(apiUrl, payload);
      const result = response.data;
  
      const finalFiltered = filterStatus === 'active'
        ? result.filter(store => !store.is_banned)
        : result;
  
      setStores(finalFiltered);
    } catch (error) {
      showErrorToast(error);
      setStores([]);
    }
  
    setIsLoading(false);
  };

  useEffect(() => {
    if (searchTerm !== '') {
      handleSearch();
    }
  }, [filterCity, filterStatus]);
  
  const resetSearch = () => {
    setSearchTerm('');
    setFilterCity('');
    setFilterStatus('');
    setStores([]);
  };

  const handleDeleteStore = async (storeId) => {
    const result = await Swal.fire({
      title: 'حذف فروشگاه',
      text: 'آیا مطمئن هستید که می‌خواهید این فروشگاه را حذف کنید؟ این عمل قابل بازگشت نیست.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'بله، حذف کن',
      cancelButtonText: 'انصراف',
      reverseButtons: true,
      customClass: {
        title: 'text-sm',
        htmlContainer: 'text-sm',
        confirmButton: 'text-xs bg-red-600 hover:bg-red-700',
        cancelButton: 'text-xs bg-gray-300 hover:bg-gray-400 text-black',
      }
    });
  
    if (result.isConfirmed) {
      try {
        const response = await axiosInstance.delete('/admin/store/delete_store', {
          data: { store_id: storeId },
          headers: { 'Content-Type': 'application/json' }
        });
  
        if (response.status === 200) {
          setStores(prev => prev.filter(store => store.id !== storeId));
          Swal.fire({
            icon: 'success',
            title: 'فروشگاه با موفقیت حذف شد',
            toast: true,
            position: 'top-end',
            timer: 1500,
            showConfirmButton: false,
          });
        }
      } catch (error) {
        showErrorToast(error);
      }
    }
  };
  

  const handleToggleBan = async(store) => {
if (store.is_banned) {
  try {
    const response = await axiosInstance.put('/admin/store/unban_store', {
      store_id: store.id
    });
    console.log(response);
  } catch (error) {
    showErrorToast(error);
  }
}else if (!store.is_banned) {
  try {
    const response = await axiosInstance.put('/admin/store/ban_store', {
      store_id: store.id
    });
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
}

    const updatedStores = stores.map(s => 
      s.id === store.id ? { ...s, is_banned: !s.is_banned } : s
    );
    
    setStores(updatedStores);
  };



  return (    <div className="max-h-screen bg-gray-50" dir='ltr'>
    {/* Main Content */}
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Search and Filter Section */}
 <div className="bg-white rounded-lg shadow p-6 mb-6">
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {(searchTerm || filterCity || filterStatus) && (
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 whitespace-nowrap"
            onClick={resetSearch}
          >
            <FaTimes className="mr-2" />
            پاک کردن فیلتر
          </button>
        )}

        <button
          type="button"
          onClick={handleSearch}
          className="inline-flex items-center px-3 py-2 border border-blue-900 text-white bg-blue-900 hover:bg-blue-800 text-sm rounded-md"
        >
          <FaSearch className="mr-2" />
          جستجو
        </button>
      {/* فیلد جستجو */}
      <div className="w-full md:flex-1">
    
        <div className="relative" dir="rtl">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch onClick={handleSearch} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 sm:text-sm"
            placeholder="جستجوی فروشگاه‌ها بر اساس نام یا شناسه..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
      </div>
   </div>
        {/* فیلترها و دکمه */}
        <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-wrap gap-3 mt-3" dir='rtl'>
          <select
            className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 sm:text-sm text-right"
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
          >
            <option value="">همه‌ی شهرها</option>
            {cities.map(city => (
              <option key={city.id} value={city.id.toString()}>{city.name}</option>
            ))}
          </select>

          <select
            className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 sm:text-sm text-right"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">همه</option>
            <option value="active">فعال</option>
            <option value="banned">مسدود شده</option>
          </select>

          <button
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 whitespace-nowrap cursor-pointer"
            onClick={() => setShowAddModal(true)}
          >
            <FaPlus className="ml-2" />
            افزودن فروشگاه
          </button>

          </div>
</div>


      {/* Stores Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden" dir='rtl' >
        <div className="overflow-x-auto max-h-2/3 overflow-scroll">
        {isLoading && (
          <div className="flex justify-center items-center py-6">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            <span className="mr-3 text-blue-700 text-sm">در حال بارگذاری فروشگاه‌ها...</span>
          </div>
        )}


          <table className="min-w-full divide-y  divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
              <th scope="col" className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">شماره</th>
                <th scope="col" className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">نام فروشگاه</th>
                <th scope="col" className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">فروشنده</th>
                <th scope="col" className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">شهر</th>
                <th scope="col" className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">امتیاز</th>
                <th scope="col" className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">وضعیت</th>
                <th scope="col" className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">فعالیت‌ها</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stores.length > 0 ? (
                stores.map(store => (
                  <tr key={store.id} className="hover:bg-gray-50" onClick={()=>navigate(`/storeDetail/${store.id}`, { replace: false })}>
                    <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{store.id}</td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">{store.name}</td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">{store.owner_id}</td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">{getCityName(store.city_id)}</td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <span className="text-yellow-500 ml-1"><FaStar /></span>
                        {(store.average_rating ?? 0).toFixed(1)}
                      </div>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm">
                      {store.is_banned ? (
                        <span className="px-2 py-1.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          مسدود شده
                        </span>
                      ) : (
                        <span className="px-2 py-1.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          فعال
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-start space-x-3">
                        {!store.owner_id ?                           
                        <button
                          type="button"
                          className="text-blue-600 hover:text-blue-900 cursor-pointer"
                          title="افزودن فروشنده"
                          onClick={() => {
                            setSelectedStore(store);
                            setShowAddOwnerModal(true);
                          }}
                        >
                       <FaUserPlus />
                        </button> :                          
                         <button
                          type="button"
                          className="text-red-600 hover:text-red-900 cursor-pointer"
                          title="حذف فروشنده"
                          onClick={() => deleteOwner(store)
                          }
                        >
                        <FaUserSlash />
                        </button>}
                        <button
                          type="button"
                          className={`${store.is_banned ? 'text-green-600 hover:text-green-900' : 'text-red-600 hover:text-red-900'} cursor-pointer`}
                          title={store.is_banned ? "رفع مسدودیت" : "مسدود کردن "}
                          onClick={() => handleToggleBan(store)}
                        >
                         {store.is_banned ? <FaShieldAlt /> : <FaBan />}
                        </button>
                        <button
                          type="button"
                          className="text-red-600 hover:text-red-900 cursor-pointer"
                          title="پاک کردن فروشگاه"
                          onClick={() => handleDeleteStore(store.id)}
                        >
                          <FaTrash />
                        </button>
                        <button
                          type="button"
                          className="text-blue-600 hover:text-blue-900 cursor-pointer"
                          title="نظرات فروشگاه"
                          onClick={() => navigate(`/admin/storeComments/${store.id}`)}
                        >
                          <FaComment   />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                  هیچ فروشگاهی مطابق با معیارهای شما یافت نشد.
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
      <AddStoreModal
      isOpen={showAddModal}
      onClose={() => setShowAddModal(false)}
      onAddStore={handleAddStore}
      users={users}
      cities={cities}
      />
    )}

    {/* Add Owner Modal */}
    {showAddOwnerModal && selectedStore && (
      <AddOwnerModal
      isOpen={showAddOwnerModal}
      onClose={() => {
        setShowAddOwnerModal(false);
        setSelectedStore(null);
      }}
      store={selectedStore}
      onAddOwner={handleAddOwner}
      />
      )}
    </div> 
  );
};

export default StoreManagement;
