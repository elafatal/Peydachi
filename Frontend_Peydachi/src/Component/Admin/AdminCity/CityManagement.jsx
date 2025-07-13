// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from 'react';
import { FaTimesCircle , FaCheck , FaChevronDown ,FaCity ,FaBuilding } from "react-icons/fa";
import axiosInstance from '../../axiosInstance';
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
const CityManagement = () => {
// State for regions and cities
const [regions, setRegions] = useState([]);
const [cities, setCities] = useState([]);
// State for form inputs
const [newRegionName, setNewRegionName] = useState('');
const [newCityName, setNewCityName] = useState('');
const [selectedRegionId, setSelectedRegionId] = useState(null);
const [selectedRegionForCities, setSelectedRegionForCities] = useState(null);
// State for editing
const [editingRegionId, setEditingRegionId] = useState(null);
const [editingRegionName, setEditingRegionName] = useState('');
const [editingCityId, setEditingCityId] = useState(null);
const [editingCityName, setEditingCityName] = useState('');
const [editingCityRegionId, setEditingCityRegionId] = useState(null);
// State for notifications
const [notification, setNotification] = useState(null);

useEffect(() => {
    const handleRegions = async () => {
      try {
        const response = await axiosInstance.get('/region/get_all_regions', {
          headers: {
            Authorization: null,
            'Content-Type': 'multipart/form-data'
          }
        });
        setRegions(response.data);
        console.log(response);
        
      } catch (error) {
        console.log(error);
        
      } 
    };
    handleRegions();
  }, []);

  useEffect(() => {
    const handleAllCities = async () => {
      try {
        const response = await axiosInstance.get('/city/get_all_cities', {
          headers: {
            Authorization: null,
            'Content-Type': 'multipart/form-data'
          }
        });
        setCities(response.data);
        console.log(response);
        
      } catch (error) {
        console.log(error);
        
      } 
    };
    handleAllCities();
  }, []);


    const filteredCities = selectedRegionForCities
    ? cities.filter(city => city.region_id === selectedRegionForCities)
    : cities;

    const handleAddRegion = async() => {
        if (!newRegionName.trim()) {
        showNotification('نام استان را وارد کنید', 'error');
        return;
        }else{
            try {
                const response = await axiosInstance.post('/admin/region/add_region', {
                  name: newRegionName
                });
                console.log(response.data);
               if (response.status === 200 ) {
                    const newRegion = {
                        id: Math.max(0, ...regions.map(r => r.id)) + 1,
                        name: newRegionName.trim()
                        };
                        setRegions([...regions, newRegion]);
                        setNewRegionName('');
                        showNotification('استان اضافه شد', 'success');
               }
              } catch (error) {
                console.log('add region error:', error);
              }
        }
    };
      
        const handleUpdateRegion = async(regionID) => {
        if (!editingRegionName.trim() || editingRegionId === null) {
        showNotification('اسم استان نمیتواند خالی باشد', 'error');
        return;
        }else{
            try {
                const response = await axiosInstance.put('/admin/region/update_region', {
                    id: regionID ,
                  name: editingRegionName
                });
                console.log(response.data);
               if (response.status === 200 ) {
                setRegions(regions.map(region =>
                    region.id === editingRegionId
                    ? { ...region, name: editingRegionName.trim() }
                    : region
                    ));
                    setEditingRegionId(null);
                    setEditingRegionName('');
                    showNotification('تغییرات اعمال شد', 'success');
               }
              } catch (error) {
                console.log('update region error:', error);
              }
        }
       
        };

        const handleDeleteRegion = async(id) => {
        if (window.confirm('از حذف استان اطمینان دارید؟‌ تمام شهر‌های مربوطه نیز حذف خواهند شد')) {
            try {
                const response = await axiosInstance.delete('/admin/region/delete_region',{data:  {id: Number(id)}});
                console.log(response);
               if (response.status === 200 ) {
                    setRegions(regions.filter(region => region.id !== id));
                    setCities(cities.filter(city => city.region_id !== id));
                    showNotification('حذف با موفقیت انجام شد', 'success');
               }
              } catch (error) {
                console.log('DELETE region error:', error);
              }
       
        }
        };

        const handleAddCity = async() => {
        if (!newCityName.trim() || selectedRegionId === null) {
        showNotification('شهر و استان را انتخاب کنید', 'error');
        return;
        }else{
            try {
                const response = await axiosInstance.post('/admin/city/add_city', {
                  name: newCityName,
                  region_id : selectedRegionId
                });
                console.log(response);
               if (response.status === 201 ) {
                setNewCityName('');
                showNotification('City added successfully', 'success');
               }
              } catch (error) {
                console.log('add region error:', error);
              }
        }
        };
    const handleUpdateCity = async(cityID) => {
    if (!editingCityName.trim() || editingCityId === null || editingCityRegionId === null) {
    showNotification('شهر مورد نظر را انتخاب کنید', 'error');
    return;
    }
    try {
        const response = await axiosInstance.put('/admin/city/update_city', {
            city_id: cityID ,
            region_id: editingCityRegionId,
            name: editingCityName
        });
        console.log(response.data);
       if (response.status === 200 ) {
            setCities(cities.map(city =>
            city.id === editingCityId
            ? { ...city, name: editingCityName.trim(), region_id: editingCityRegionId }
            : city
            ));
            setEditingCityId(null);
            setEditingCityName('');
            setEditingCityRegionId(null);
            showNotification('شهر با موفقیت به روزرسانی شد', 'success');
       }
      } catch (error) {
        console.log('update region error:', error);
      }

    };
  // Handle deleting a city
  const handleDeleteCity = async(id) => {
  if (window.confirm('از حذف شهر اطمینان دارید؟')) {
    try {
      const response = await axiosInstance.delete('/admin/city/delete_city',{data: {city_id: id }});
      console.log(response.data);
     if (response.status === 200 ) {
      setCities(cities.filter(city => city.id !== id));
      showNotification('City deleted successfully', 'success');
     }
    } catch (error) {
      console.log('delete city error:', error);
    }

  }
};
// Show notification
const showNotification = (message, type) => {
setNotification({ message, type });
setTimeout(() => setNotification(null), 3000);
};
// Get region name by ID
const getRegionName = (regionId) => {
const region = regions.find(r => r.id === regionId);
return region ? region.name : 'Unknown Region';
};
// Set initial selected region for cities view if regions exist
useEffect(() => {
if (regions.length > 0 && selectedRegionForCities === null) {
setSelectedRegionForCities(regions[0].id);
}
}, [regions, selectedRegionForCities]);
return (
      <div className=" bg-gray-50 p-4 md:p-4" >
        {/* Notification */}
        {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform translate-x-0 ${
        notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
        <p className="font-medium">{notification.message}</p>
        </div>
        )}
        <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Region Management Panel */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-blue-800 text-white p-3">
        <h2 className="text-xl font-semibold">مدیریت استان‌ها</h2>
        </div>
        <div className="p-4">
        <div className="mb-4">
            <div className="flex" >
            <input
            type="text"
            value={newRegionName}
            onChange={(e) => setNewRegionName(e.target.value)}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-800 text-sm"
            placeholder="اسم استان را وارد کنید"
            />
            <button
            onClick={handleAddRegion}
            className="bg-blue-800 text-white px-4 py-2 rounded-l-lg hover:bg-opacity-90 transition-colors !rounded-button whitespace-nowrap cursor-pointer"
            >
            <FaCirclePlus  className="inline ml-2"/>
            افزودن
            </button>
            </div>
        </div>
            <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">استان‌ها</h3>
            <div className="max-h-80 overflow-y-auto pr-2">
            {regions.length === 0 ? (
            <p className="text-gray-500 text-sm italic">استانی پیدا نشد</p>
            ) : (
            <ul className="space-y-2">
            {regions.map(region => (
            <li key={region.id} className="border border-gray-200 rounded-lg p-2 bg-gray-50">
            {editingRegionId === region.id ? (
            <div className="flex items-center">
            <input
            type="text"
            value={editingRegionName}
            onChange={(e) => setEditingRegionName(e.target.value)}
            className="flex-grow px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 text-sm"
            />
            <div className="flex ml-2">
            <button
            onClick={()=>handleUpdateRegion(region.id)}
            className="text-green-600 hover:text-green-800 p-1 cursor-pointer !rounded-button whitespace-nowrap"
            >
            <FaCheck  className="fas fa-check"/>
            </button>
            <button
            onClick={() => setEditingRegionId(null)}
            className="text-red-600 hover:text-red-800 p-1 cursor-pointer !rounded-button whitespace-nowrap"
            >
            <FaTimesCircle />
            </button>
            </div>
            </div>
            ) : (
            <div className="flex items-center justify-between">
            <span className="font-medium">{region.name}</span>
        
            <div className="flex space-x-2">
          
                <button
                onClick={() => {
                setEditingRegionId(region.id);
                setEditingRegionName(region.name);
                }}
                className="text-blue-600 hover:text-blue-800 cursor-pointer !rounded-button whitespace-nowrap"
                >
                <FaEdit />
                </button>
                <button
                onClick={() => handleDeleteRegion(region.id)}
                className="text-red-600 hover:text-red-800 cursor-pointer !rounded-button whitespace-nowrap"
                >
            <FaRegTrashAlt/>
                </button>
            </div>
            </div>
            )}
            </li>
            ))}
            </ul>
            )}
            </div>
            </div>
        </div>
        </div>
        {/* City Management Panel */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-blue-800 text-white p-3">
        <h2 className="text-xl font-semibold">مدیریت شهرها</h2>
        </div>
        <div className="p-4">
        <div className="mb-4">
        <div className="space-y-3">
        <input
        type="text"
        value={newCityName}
        onChange={(e) => setNewCityName(e.target.value)}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 text-sm"
        placeholder="اسم شهر را وارد کنید"
        />
        <div className="relative">
        <input
        type="text"
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 text-sm"
        placeholder="استان شهر مربوطه را وارد کنید"
        onFocus={() => document.getElementById('region-dropdown')?.classList.remove('hidden')}
        onChange={(e) => {
        const searchBox = e.target;
        const dropdown = document.getElementById('region-dropdown');
        const items = dropdown?.getElementsByTagName('li');   
        if (items) {
          Array.from(items).forEach(item => {
            if (item.textContent?.toLowerCase().includes(searchBox.value.toLowerCase())) {
              item.style.display = '';
            } else {
              item.style.display = 'none';
            }
          });
        }
        }}
        value={selectedRegionId ? getRegionName(selectedRegionId) : ''}
        />
        <div id="region-dropdown" className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg hidden">
        <ul className="py-1 max-h-60 overflow-y-auto">
        {regions.map(region => (
        <li
        key={region.id}
        onClick={(e) => {
        setSelectedRegionId(region.id);
        const input = e.currentTarget.parentElement?.parentElement?.previousElementSibling;
        if (input) {
          input.value = region.name;
        }
        document.getElementById('region-dropdown')?.classList.add('hidden');
        }}
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
        {region.name}
        </li>
        ))}
        </ul>
        </div>
        </div>
        <button
        onClick={handleAddCity}
        className="w-full bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors !rounded-button whitespace-nowrap cursor-pointer"
        >
        <FaCirclePlus className="ml-2 inline"/>
        افزودن شهر
        </button>
        </div>
        </div>
        <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">شهرها</h3>
        <div className="max-h-80 overflow-y-auto pr-2">
        {cities.length === 0 ? (
        <p className="text-gray-500 text-sm italic">شهری پیدا نشد</p>
        ) : (
        <ul className="space-y-2">
            {cities.map(city => (
            <li key={city.id} className="border border-gray-200 rounded-lg p-2 bg-gray-50">
            {editingCityId === city.id ? (
            <div className="space-y-2">
            <input
            type="text"
            value={editingCityName}
            onChange={(e) => setEditingCityName(e.target.value)}
            className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 text-sm"
            />
            <div className="relative">
            <button
            className="w-full px-3 py-1 border border-gray-300 rounded-lg bg-white text-left text-sm flex items-center justify-between cursor-pointer !rounded-button whitespace-nowrap"
            onClick={() => document.getElementById(`edit-region-dropdown-${city.id}`)?.classList.toggle('hidden')}
            >
            <span>{editingCityRegionId ? getRegionName(editingCityRegionId) : 'استان را انتخاب کنید'}</span>
            <FaChevronDown  className=" text-gray-500"/>
            </button>
            <div id={`edit-region-dropdown-${city.id}`} className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg hidden">
            <ul className="py-1 max-h-40 overflow-y-auto">
            {regions.map(region => (
            <li
            key={region.id}
            onClick={() => {
            setEditingCityRegionId(region.id);
            document.getElementById(`edit-region-dropdown-${city.id}`)?.classList.add('hidden');
            }}
            className="px-3 py-1 hover:bg-gray-100 cursor-pointer text-sm"
            >
            {region.name}
            </li>
            ))}
            </ul>
            </div>
            </div>
            <div className="flex justify-end space-x-2">
            <button
            onClick={()=>handleUpdateCity(city.id )}
            className="text-green-600 hover:text-green-800 p-1 cursor-pointer !rounded-button whitespace-nowrap"
            >
            <FaCheck/>
            </button>
            <button
            onClick={() => setEditingCityId(null)}
            className="text-red-600 hover:text-red-800 p-1 cursor-pointer !rounded-button whitespace-nowrap"
            >
            <FaTimesCircle />
            </button>
            </div>
            </div>
            ) : (
            <div className="flex flex-col">
            <div className="flex items-center justify-between">
            <span className="font-medium">{city.name}</span>
            <div className="flex space-x-2">
            <button
            onClick={() => {
            setEditingCityId(city.id);
            setEditingCityName(city.name);
            setEditingCityRegionId(city.region_id);
            }}
            className="text-blue-600 hover:text-blue-800 cursor-pointer !rounded-button whitespace-nowrap"
            >
            <FaEdit />
            </button>
            <button
            onClick={() => handleDeleteCity(city.id)}
            className="text-red-600 hover:text-red-800 cursor-pointer !rounded-button whitespace-nowrap"
            >
            <FaRegTrashAlt/>
            </button>
            </div>
            </div>
            <span className="text-xs text-gray-500">استان: {getRegionName(city.region_id)}</span>
            </div>
            )}
            </li>
            ))}
        </ul>
        )}
        </div>
        </div>
        </div>
        </div>
        {/* Cities Overview Panel */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-blue-800 text-white p-3">
        <h2 className="text-xl font-semibold">شهر بر اساس استان</h2>
        </div>
        <div className="p-4">
        <div className="mb-4">
        <div className="relative">
            <button
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-left text-sm flex items-center justify-between cursor-pointer !rounded-button whitespace-nowrap"
            onClick={() => document.getElementById('overview-region-dropdown')?.classList.toggle('hidden')}
            >
                <span>{selectedRegionForCities ? getRegionName(selectedRegionForCities) : 'تمام استان‌ها'}</span>
                <FaChevronDown  className="fas fa-chevron-down text-gray-500" />
            </button>
        <div id="overview-region-dropdown" className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg hidden">
            <ul className="py-1 max-h-60 overflow-y-auto">
                {regions.map(region => (
                    <li
                    key={region.id}
                    onClick={() => {
                    setSelectedRegionForCities(region.id);
                    document.getElementById('overview-region-dropdown')?.classList.add('hidden');
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                    {region.name}
                    </li>
                ))}
            </ul>
        </div>
        </div>
        </div>
            <div className="max-h-96 overflow-y-auto pr-2">
            {filteredCities.length === 0 ? (
            <div className="text-center py-8">
            <FaCity  className="inline text-gray-300 text-4xl mb-2" />
            <p className="text-gray-500">شهری برای این استان ثبت نشده</p>
            </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-2">
                    {filteredCities.map(city => (
                        <div
                        key={city.id}
                        className="border border-gray-200 rounded-lg p-3 bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center">
                                <FaBuilding className="inline text-blue-800 ml-2"/>
                                <h3 className="font-medium">{city.name}</h3>
                            </div>
                        
                        </div>
                        ))}
                </div>
            )}
            </div>
            <div className="mt-4 text-sm text-gray-500 flex items-center justify-between">
            <span> تعداد شهرها: {filteredCities.length} </span>
            </div>
        </div>
        </div>
        </div>
        </div>
      </div>
      );
};
export default CityManagement