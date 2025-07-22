import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import Swal from 'sweetalert2';
import React, { useState, useRef } from 'react';
import {FaLightbulb ,FaTimes,FaSave,FaRocket, FaSpinner,FaCloudUploadAlt, FaCamera,FaImage,FaBox,FaPlus,FaCheck , FaExternalLinkAlt, FaTag, FaExclamationCircle,FaInfoCircle, FaAlignLeft, FaMinus} from 'react-icons/fa';
import { LuSparkles } from 'react-icons/lu';
import { useEffect } from 'react'; 
const AddProduct = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null); // اضافه کن
  const [hasDraft, setHasDraft] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: 0,
    pic_url: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    description: '',
    quantity: '',
    pic_url: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewImage, setPreviewImage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef(null);

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
    
  };
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
   if (!file.type.match('image.*')) {
    setErrors({ ...errors, pic_url: 'لطفاً یک فایل تصویری (JPEG، PNG و غیره) آپلود کنید' });
    return;
}
  
    if (file.size > 5 * 1024 * 1024) {
      setErrors({ ...errors, pic_url: 'حجم فایل باید کمتر از ۵ مگابایت باشد' });
      return;
    }
  
    setSelectedFile(file); 
    setErrors({ ...errors, pic_url: '' });
  
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setFormData({
      ...formData,
      quantity: value < 0 ? 0 : value,
    });
  };
  
  const incrementQuantity = () => {
    setFormData({
      ...formData,
      quantity: formData.quantity + 1,
    });
  };
  
  const decrementQuantity = () => {
    if (formData.quantity > 0) {
      setFormData({
        ...formData,
        quantity: formData.quantity - 1,
      });
    }
  };
  

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const validateForm = () => {
    const newErrors = {
      name: '',
      description: '',
      quantity: '',
      pic_url: '',
    };
    let isValid = true;
    if (!formData.name.trim()) {
      newErrors.name = 'نام محصول الزامی‌ است';
      isValid = false;
    } else if (formData.name.length > 100) {
      newErrors.name = 'نام محصول باید کمتر از ۱۰۰ کاراکتر باشد';
      isValid = false;
    }
    if (!formData.description.trim()) {
      newErrors.description = 'توضیحات محصول الزامی است';
      isValid = false;
    }
    if (formData.quantity < 1) {
      newErrors.quantity = 'تعداد باید حداقل ۱ باشد';
      isValid = false;
    }
    if (!selectedFile) {
      newErrors.pic_url = 'تصویر محصول الزامی است';
      isValid = false;
    }    
    setErrors(newErrors);
    return isValid;
  };
  
  
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  if (!selectedFile) {
    setErrors((prev) => ({ ...prev, pic_url: 'تصویر محصول الزامی است' }));
    return;
  }

  setIsSubmitting(true);

  const formDataToSend = new FormData();
  formDataToSend.append('name', formData.name);
  formDataToSend.append('description', formData.description);
  formDataToSend.append('quantity', formData.quantity.toString());
  formDataToSend.append('pic', selectedFile); 


  try {
    const response = await axiosInstance.post('/seller/product/add_product', formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    if (response.data) {
      setShowSuccess(true);
      setFormData({
        name: '',
        description: '',
        quantity: 0,
        pic_url: '',
      });
      setSelectedFile(null);
      setPreviewImage('');
      setUploadProgress(0);
      console.log("yedddd");
      localStorage.removeItem('productDraft');
      setTimeout(() => setShowSuccess(false), 3000);
    }
  } catch (error) {
    console.error('Error submitting product:', error);
    alert('خطا در ارسال محصول');
  } finally {
    setIsSubmitting(false);
  }
};
const clearDraft = () => {
  localStorage.removeItem('productDraft');
  setFormData({
    name: '',
    description: '',
    quantity: 0,
    pic_url: '',
  });
  setHasDraft(false);
  setPreviewImage('');
  setSelectedFile(null);
  setUploadProgress(0);
  Swal.fire({
    icon: 'info',
    title: 'پیش‌نویس پاک شد',
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
  });
};

const handleSaveDraft = () => {
  const draftData = {
    formData,
    previewImage,
  };
  setHasDraft(true);
  localStorage.setItem('productDraft', JSON.stringify(draftData));
  
  Swal.fire({
    icon: 'success',
    title: 'پیش‌نویس ذخیره شد',
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
  });
};


useEffect(() => {
  const draft = localStorage.getItem('productDraft');
  if (draft) {
    const parsed = JSON.parse(draft);
    if (parsed.formData) {
      setFormData(parsed.formData);
    }
    if (parsed.previewImage) {
      setPreviewImage(parsed.previewImage);
    }
  }
}, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" >
    
      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-200 rounded-full opacity-20 blur-3xl -z-10"></div>
        
        {showSuccess && (
          <div className="mb-8 bg-gradient-to-r from-emerald-400/90 to-teal-400/90 backdrop-blur-sm border border-emerald-200 text-white p-6 rounded-2xl shadow-lg animate-fade-in">
            <div className="flex items-center">
              <div className="bg-white/30 rounded-full p-3 mr-4 backdrop-blur-sm">
              <FaCheck className="text-white text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">محصول با موفقیت اضافه شد!</h3>
                <p className="text-emerald-50">محصول شما اکنون در دسترس است.</p>
              </div>
              <button className="ml-auto bg-white/20 hover:bg-white/30 p-2 rounded-full transition-all duration-300 cursor-pointer">
              <FaExternalLinkAlt className="text-white" />
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-blue-100/50">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100/40 via-purple-100/40 to-pink-100/40 rounded-full -mr-48 -mt-48 blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-100/40 via-blue-100/40 to-cyan-100/40 rounded-full -ml-40 -mb-40 blur-3xl -z-10"></div>
          
          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-10">
              {/* Left Column - Form Fields */}
              <div className="flex-1 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <LuSparkles className="text-blue-500 ml-3" />
                    جزئیات محصول
                  </h2>
                </div>
                
                {/* Product Name */}
                <div dir='rtl' className="group">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
                    نام محصول <span className="text-pink-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white/80 backdrop-blur-sm`}
                      placeholder="محصول شما اسمش چیه؟"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                     
                    <FaTag />
                    </div>
                  </div>
                  {errors.name ? (
                    <p className="mt-2 text-sm text-red-500 flex items-center">
                      <FaExclamationCircle className="mr-1" />
                      {errors.name}
                    </p>
                  ) : (
                    <p className="mt-2 text-sm text-gray-500 flex items-center">
                     <FaInfoCircle className="ml-1" />
                      {formData.name.length}/100 کاراکتر
                    </p>
                  )}
                </div>
                
                {/* Product Description */}
                <div dir='rtl' className="group">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
                    توضیحات <span className="text-pink-500">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={5}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.description ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white/80 backdrop-blur-sm`}
                      placeholder="به دنیا بگویید چه چیزی محصول شما را خاص می‌کند..."
                    ></textarea>
                    <div className="absolute left-3 top-3 text-gray-400">
                    <FaAlignLeft />
                    </div>
                  </div>
                  {errors.description && (
                    <p className="mt-2 text-sm text-red-500 flex items-center">
                      <FaExclamationCircle className="mr-1" />
                      {errors.description}
                    </p>
                  )}
                </div>
                
                {/* Quantity */}
                <div className="group">
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
                    موجودی <span className="text-pink-500">*</span>
                  </label>
                  <div className="flex items-center">
                  <button
                    data-testid="increment-quantity"
                      type="button"
                      onClick={incrementQuantity}
                      className="px-4 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-r-xl border border-gray-300 cursor-pointer whitespace-nowrap transition-colors"
                    >
                     <FaPlus />
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleQuantityChange}
                      min="0"
                      className={`w-24 text-center py-3 border-y border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${errors.quantity ? 'border-red-500' : ''} bg-white/80 backdrop-blur-sm`}
                    />
                    <button
                    data-testid="decrement-quantity"
                      type="button"
                      onClick={decrementQuantity}
                      className="px-4 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-l-xl border border-gray-300 cursor-pointer whitespace-nowrap transition-colors"
                    >
                      <FaMinus />
                    </button>
                    <div className="mr-4 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                    <FaBox className="inline ml-1" />
                      تعداد
                    </div>
                  </div>
                  {errors.quantity && (
                    <p className="mt-2 text-sm text-red-500 flex items-center">
                      <FaExclamationCircle className="mr-1" />
                      {errors.quantity}
                    </p>
                  )}
                </div>
              </div>
  

              {/* Right Column - Image Upload */}
              <div dir='rtl' className="md:w-2/5">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FaImage className="text-blue-500 ml-3" />
                  عکس محصول
                </h2>
                
                <div
                data-testid="file-upload-container"
                  onClick={triggerFileInput}
                  className={`flex flex-col justify-center px-6 pt-5 pb-6 border-3 ${
                    errors.pic_url
                      ? 'border-red-500'
                      : previewImage
                        ? 'border-blue-500 bg-gradient-to-br from-blue-50/50 to-purple-50/50'
                        : 'border-dashed border-blue-300'
                  } rounded-2xl cursor-pointer hover:bg-gradient-to-br hover:from-blue-50/70 hover:to-purple-50/70 transition-all duration-300 group backdrop-blur-sm h-80`}
                >
                  <div className="space-y-4 text-center">
                    {previewImage ? (
                      <div className="relative">
                        <img
                          src={previewImage}
                          alt="Product preview"
                          className="mx-auto h-56 object-contain rounded-xl shadow-md"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-blue-600/60 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl backdrop-blur-sm">
                          <div className="text-white text-center">
                          <FaCamera className="text-3xl mb-3" />
                            <p className="text-sm font-medium">برای تغییر عکس کلیک کنید</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="relative w-24 h-24 mx-auto">
                          <div className="absolute inset-0 bg-blue-100 rounded-full animate-pulse"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                          <FaCloudUploadAlt className="text-4xl text-blue-500" />
                          </div>
                        </div>
                        <div className="flex flex-col items-center space-y-3">
                          <p className="text-blue-600 font-medium text-lg">محصول خود را به نمایش بگذارید</p>
                          <p className="text-sm text-gray-500">فایل خود را بکشید و اینجا وارد کنید</p>
                          <button type="button" className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors cursor-pointer !rounded-button whitespace-nowrap">
                          مرور فایل ها
                          </button>
                          <div className="flex items-center space-x-2 text-xs text-gray-400 mt-2">
                          <FaImage />
                            <span>PNG، JPG، GIF تا سقف ۵ مگابایت</span>
                          </div>
                        </div>
                      </>
                    )}
                    {uploadProgress > 0 && uploadProgress < 100 && (
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                        <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                      </div>
                    )}
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  id="pic_url"
                  name="pic_url"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  data-testid="file-input"
                />
                {errors.pic_url && (
                  <p className="mt-2 text-sm text-red-500 flex items-center">
                    <FaExclamationCircle className="mr-1" />
                    {errors.pic_url}
                  </p>
                )}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-10 mt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-4 px-8 rounded-xl shadow-lg transition cursor-pointer !rounded-button whitespace-nowrap flex items-center justify-center ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                   <FaSpinner className="animate-spin ml-2" />
                    درحال ذخیره‌سازی
                  </>
                ) : (
                  <>
                   <FaRocket className="ml-2" />
                    اضافه کردن محصول
                  </>
                )}
              </button>
              {hasDraft ? (
                <button
                  type="button"
                  onClick={clearDraft}
                  className="flex-1 sm:flex-none bg-red-50 hover:bg-red-100 text-red-600 font-medium py-4 px-8 rounded-xl border border-red-300 shadow-sm transition cursor-pointer !rounded-button whitespace-nowrap flex items-center justify-center"
                >
                  <FaTimes className="ml-2" />
                  پاکسازی پیش‌نویس
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="flex-1 sm:flex-none bg-white hover:bg-gray-50 text-blue-600 font-medium py-4 px-8 rounded-xl border-2 border-blue-600 shadow-sm transition cursor-pointer !rounded-button whitespace-nowrap flex items-center justify-center"
                >
                  <FaSave className="ml-2" />
                  ذخیره پیش‌نویس 
                </button>
              )}


              <button
              onClick={()=>navigate(-1)}
                type="button"
                className="flex-1 sm:flex-none bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-4 px-8 rounded-xl border border-gray-300 shadow-sm transition cursor-pointer !rounded-button whitespace-nowrap flex items-center justify-center"
              >
               <FaTimes className="ml-2" />
                بازگشت
              </button>
            </div>
          </div>
        </form>
        
        <div dir='rtl' className="max-w-4xl mx-auto mt-12 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100/50 shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full text-blue-600">
            <FaLightbulb />
            </div>
            <div >
              <h3 className="font-bold text-gray-800">نکته حرفه ای</h3>
              <p className="text-gray-600">تصاویر با کیفیت بالا می‌توانند فروش محصول شما را تا ۴۰٪ افزایش دهند.</p>
            </div>
          </div>
        </div>
      </main>

    
    </div>
  );
};

export default AddProduct;
