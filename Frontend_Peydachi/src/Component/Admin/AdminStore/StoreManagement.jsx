// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import AddStoreModal from './AddStoreModal';
import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";  
import AddOwnerModal from './AddOwnerModal';
import axiosInstance from '../../axiosInstance';
import {FaTrash, FaShieldAlt,FaBan ,FaUserPlus,FaStar,FaPlus,FaSearch ,FaTimes } from 'react-icons/fa';
import { FaUserSlash } from "react-icons/fa";
const StoreManagement= () => {
  // States for the application
  const [stores, setStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddOwnerModal, setShowAddOwnerModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  
const users=[{id:1 , username:'ali'}]
  useEffect(() => {
   const getAllStores = async()=>{
    try {
      const response = await axiosInstance.get('/store/get_all_stores');
      console.log(response.data);
      setStores(response.data)
    } catch (error) {
      console.log('all store error:', error);
    }
   }
    getAllStores();
  }, []);

  const deleteOwner=async(store)=>{
    try {
      const response = await axiosInstance.put('/admin/store/remove_owner_from_store',{store_id: store.id});
      console.log(response.data);
    } catch (error) {
      console.log('delete owner error:', error);
    }    
  }
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
         console.log("create_store error:", err);
       }
     };

  // Handler for adding an owner to a store
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
          if (response.data === 200) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: " درخواست انجام شد",
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
        } catch (error) {
          console.log('add owner error:', error);
        }
      }
    } catch (error) {
      console.log('promote to seller error:', error);
    }
    setShowAddOwnerModal(false);
    setSelectedStore(null);
  };
  

  const handleDeleteStore = (storeId) => {
    if (window.confirm("Are you sure you want to delete this store?")) {
      console.log("Deleting store with ID:", storeId);
      
      const updatedStores = stores.filter(store => store.id !== storeId);
      setStores(updatedStores);
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
    console.log('comment error:', error);
  }
}else if (!store.is_banned) {
  try {
    const response = await axiosInstance.put('/admin/store/ban_store', {
      store_id: store.id
    });
    console.log(response);
  } catch (error) {
    console.log('comment error:', error);
  }
}

    const updatedStores = stores.map(s => 
      s.id === store.id ? { ...s, is_banned: !s.is_banned } : s
    );
    
    setStores(updatedStores);
  };

  const [cities,setCities] = useState([]);
  useEffect(() => {
    const getAllStores = async()=>{
      try {
        const response = await axiosInstance.get('/city/get_all_cities');
        console.log(response.data);
        setCities(response.data)
      } catch (error) {
        console.log('comment error:', error);
      }
    }
     getAllStores();
   }, []);




  const getCityName = (cityId) => {
    const city = cities.find(c => c.id === cityId);
    return city ? city.name : 'Unknown';
  };


  return (
    <div className="max-h-screen bg-gray-50" dir='ltr'>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    
    {/* فیلد جستجو */}
    <div className="w-full md:flex-1">
      <div className="relative" dir="rtl">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 sm:text-sm"
          placeholder="جستجوی فروشگاه‌ها بر اساس نام یا شناسه..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>

      {/* فیلترها و دکمه */}
      <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-wrap gap-3">
        
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
          <FaPlus className="mr-2" />
          افزودن فروشگاه
        </button>

      </div>
    </div>
  </div>


        {/* Stores Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden" dir='rtl' >
          <div className="overflow-x-auto max-h-2/3 overflow-scroll">
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
                {filteredStores.length > 0 ? (
                  filteredStores.map(store => (
                    <tr key={store.id} className="hover:bg-gray-50">
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
                          </button> :                           <button
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
                            title={store.is_banned ? "Unban Store" : "Ban Store"}
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
