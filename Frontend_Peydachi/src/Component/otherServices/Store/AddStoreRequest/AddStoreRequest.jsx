import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axiosInstance';
import Swal from "sweetalert2";  
import showErrorToast from '../../../utils/showErrorToast';
import { 
  FaPhone, FaChevronDown, FaCalendarAlt, 
  FaTimes, FaStore, FaExclamationCircle, FaSpinner 
} from 'react-icons/fa';

const AddStore = () => {
  const [formData, setFormData] = useState({
    store_name: '',
    phone_number: '',
    address: '', 
    region_id: 0,
    city_id: 0,
    description: '',
    id: 0,
    date_added: new Date().toISOString().split('T')[0],
  });
  

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formProgress, setFormProgress] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [regions, setRegions] = useState([
    { id: 1, name: ' ' },
  ]);
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
        
      } catch (error) {
        showErrorToast(error);
      } 
    };

    handleRegions();
  }, []);
  const [cities, setCities] = useState([
    { id: 1, name: 'New York', region_id: 1 },

  ]);
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
      } catch (error) {
        showErrorToast(error);
      } 
    };

    handleAllCities();
  }, []);

  const [filteredCities, setFilteredCities] = useState([]);

  useEffect(() => {
    if (formData.region_id > 0) {
      setFilteredCities(
        cities.filter(city => city.region_id === Number(formData.region_id))
      );
    } else {
      setFilteredCities([]);
    }
  }, [formData.region_id, cities]);

  useEffect(() => {
    const filled = ['store_name', 'phone_number', 'region_id', 'city_id', 'description'].filter(key => formData[key]);
    setFormProgress((filled.length / 5) * 100);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
    if (name === 'description') setCharacterCount(value.length);
  };

  const validate = () => {
    const errs = {};
    if (!formData.address) errs.address = 'این فیلد اجباری است';
    if (!formData.store_name) errs.store_name = 'این فیلد اجباری است';
    if (!formData.phone_number) errs.phone_number = 'این فیلد اجباری است';
    else if (!/^[0-9]+$/.test(formData.phone_number)) {
      errs.phone_number = 'شماره فقط باید شامل اعداد انگلیسی باشد';
    }
    if (!formData.description) errs.description = 'این فیلد اجباری است';
    else if (formData.description.length < 20) errs.description = 'حداقل 20 کاراکتر';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit =(e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setTimeout(async() => {
        try {
            const response = await axiosInstance.post('/add_store_request/send_add_store_request', 
                formData, 
                {
                  headers: {
                    Authorization: null,
                    'Content-Type': 'application/json',
                  }
                }
              );
            if (response.status === 201) {
                    Swal.fire({
                          position: "top-end",
                          icon: "success",
                          title: "درخواست ارسال شد ",
                          text: "در انتظار تایید ادمین...",
                          showConfirmButton: false,
                          timer: 1500,
                          toast: true,
                          customClass: {
                            popup: 'w-2 h-25 text-sm flex items-center justify-center', 
                            title: 'text-xs', 
                            content: 'text-xs',
                            icon : 'text-xs mb-2'
                          }
                      });
            }  
           handleReset()
          } catch (error) {
            showErrorToast(error);
          } 
      setIsSubmitting(false);
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      store_name: '',
      phone_number: '',
      address: '', 
      region_id: 0,
      city_id: 0,
      description: '',
      id: 0,
      date_added: new Date().toISOString().split('T')[0],
    });
    
    setErrors({});
    setCharacterCount(0);
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center py-10 px-4" dir='ltr'>
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <h1 className="mt-3 text-center text-3xl font-bold">ثبت فروشگاه</h1>
          <p className="text-center mt-1 text-sm text-blue-100">برای ثبت فروشگاه خود فرم را پر کنید</p>
          <div className="mt-4 h-2 bg-blue-200 rounded-full" dir='rtl'>
            <div
              className="h-2 bg-blue-400 rounded-full transition-all duration-300"
              style={{ width: `${formProgress}%` }}
            ></div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6" dir='rtl'>
          <div>
            <label className="block text-sm font-medium text-gray-700"> نام فروشگاه <span className="text-red-500">*</span>
            <span className=" text-xs text-gray-500 mt-1 mr-1">نام کامل فروشگاه</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="store_name"
                value={formData.store_name}
                onChange={handleChange}
                className={`mt-1 w-full rounded-lg border px-4 py-2 shadow-sm ${errors.store_name ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="نام فروشگاه"
              />
              {errors.store_name && (
                <div className="absolute inset-y-0 right-3 flex items-center">
                  <FaExclamationCircle className="text-red-500" />
                </div>
              )}
            </div>
            {errors.store_name && <p className="text-sm text-red-500 mt-1">{errors.store_name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">شماره موبایل <span className="text-red-500">*</span>
                        <span className="text-xs text-gray-500 mt-1 mr-1">شماره تماس در دسترس. ادمین ها با استفاده از این شماره تماس با شما ارتباط برقرار خواهند کرد</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaPhone className="text-gray-400" />
              </div>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className={`mt-1 w-full rounded-lg border px-4 py-2 pl-10 shadow-sm ${errors.phone_number ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="09123456789"
              />
              {errors.phone_number && (
                <div className="absolute inset-y-0 right-3 flex items-center">
                  <FaExclamationCircle className="text-red-500" />
                </div>
              )}
            </div>
            {errors.phone_number && <p className="text-sm text-red-500 mt-1">{errors.phone_number}</p>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">استان </label>
              <div className="relative" dir='ltr'>
                <select
                  name="region_id"
                  value={formData.region_id}
                  onChange={handleChange}
                  className={`mt-1 w-full rounded-lg border px-4 py-2 shadow-sm appearance-none ${errors.region_id ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value={0}>انتخاب استان</option>
                  {regions.map(region => (
                    <option key={region.id} value={region.id}>{region.name}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <FaChevronDown className="text-gray-400" />
                </div>
              </div>
              {errors.region_id && <p className="text-sm text-red-500 mt-1">{errors.region_id}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">شهر </label>
              <div className="relative" dir='ltr'>
                <select
                  name="city_id"
                  value={formData.city_id}
                  onChange={handleChange}
                  disabled={formData.region_id === 0}
                  className={`mt-1 w-full rounded-lg border px-4 py-2 shadow-sm appearance-none ${errors.city_id ? 'border-red-500' : 'border-gray-300'} ${formData.region_id === 0 ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                >
                  <option value={0}>انتخاب شهر </option>
                  {filteredCities.map(city => (
                    <option key={city.id} value={city.id}>{city.name}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <FaChevronDown className="text-gray-400" />
                </div>
              </div>
              {errors.city_id && <p className="text-sm text-red-500 mt-1">{errors.city_id}</p>}
            </div>
          </div>
          <div>
          <label className="block text-sm font-medium text-gray-700">آدرس فروشگاه <span className="text-red-500">*</span>
          <span className=" text-xs text-gray-500 mt-1 mr-1">اگر شهر یا استان شما تحت پوشش پیداچی نبود، نام آن را در بخش آدرس بنویسید</span>
          </label>
          <div className="relative">
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`mt-1 w-full rounded-lg border px-4 py-2 shadow-sm ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="آدرس دقیق فروشگاه"
            />
            {errors.address && (
              <div className="absolute inset-y-0 right-3 flex items-center">
                <FaExclamationCircle className="text-red-500" />
              </div>
            )}
          </div>
 
          {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}
        </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">توضیحات <span className="text-red-500">*</span></label>
            <textarea
              name="description"
              rows={4}
              maxLength={500}
              value={formData.description}
              onChange={handleChange}
              className={`mt-1 w-full rounded-lg border px-4 py-2 shadow-sm ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="درمورد فروشگاه خود بنویسید"
            ></textarea>
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>{characterCount}/500</span>
              <span>{characterCount < 20 ? `${20 - characterCount} کاراکتر دیگر مانده است ` : 'Looks good'}</span>
            </div>
            {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
          </div>
          {/* <div>
            <label className="block text-sm font-medium text-gray-700">زمان ثبت درخواست</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaCalendarAlt className="text-gray-400" />
              </div>
              <input
                type="date"
                name="date_added"
                value={formData.date_added}
                readOnly
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 pl-10 bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div> */}
          <div className="flex sm:flex-row justify-between flex-col gap-2 items-center pt-4">
     
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 inline-flex items-center ${isSubmitting ? 'opacity-75 cursor-wait' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin ml-2" />
                درحال پردازش
                </>
              ) : (
                <>
                  <FaStore className="ml-2 w-5 mb-1.5" />
                  ثبت درخواست
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 inline-flex items-center"
            >
              <FaTimes className="ml-2 " />
              پاک کردن فرم
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStore;
