// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useRef, ChangeEvent } from 'react';

const SelfStore = () => {
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
    // Clear error when user types
    if (errors) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
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
  
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // File validation
    if (!file.type.match('image.*')) {
      setErrors({
        ...errors,
        pic_url: 'Please upload an image file (JPEG, PNG, etc.)',
      });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors({
        ...errors,
        pic_url: 'File size should be less than 5MB',
      });
      return;
    }
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewImage(reader.result);
          setFormData({
            ...formData,
            pic_url: 'uploaded_image_url.jpg', // This would be the actual URL from server
          });
          setErrors({
            ...errors,
            pic_url: '',
          });
        };
        reader.readAsDataURL(file);
      }
    }, 200);
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
      newErrors.name = 'Product name is required';
      isValid = false;
    } else if (formData.name.length > 100) {
      newErrors.name = 'Product name must be less than 100 characters';
      isValid = false;
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Product description is required';
      isValid = false;
    }
    if (formData.quantity < 1) {
      newErrors.quantity = 'Quantity must be at least 1';
      isValid = false;
    }
    if (!formData.pic_url) {
      newErrors.pic_url = 'Product image is required';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      // Reset form after success
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({
          name: '',
          description: '',
          quantity: 0,
          pic_url: '',
        });
        setPreviewImage('');
        setUploadProgress(0);
      }, 3000);
    }, 1500);
  };
  
  const handleSaveDraft = () => {
    // Implement save draft functionality
    alert('Draft saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" dir='ltr'>
      {/* Header */}
      {/* <header className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white shadow-xl overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://readdy.ai/api/search-image?query=vibrant%20cosmic%20nebula%20with%20swirling%20clouds%20of%20purple%2C%20blue%20and%20pink%20cosmic%20dust%2C%20with%20glowing%20stars%20and%20ethereal%20light%20beams%20creating%20a%20magical%20and%20inspiring%20atmosphere%2C%20perfect%20for%20a%20creative%20product%20dashboard%20header&width=1440&height=240&seq=header3&orientation=landscape" 
            className="w-full h-full object-cover mix-blend-overlay opacity-70" 
            alt="cosmic nebula" 
          />
        </div>
        <div className="container mx-auto px-6 py-10 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="hover:bg-white/20 p-3 rounded-full transition-all duration-300 cursor-pointer backdrop-blur-sm">
                <i className="fas fa-arrow-left"></i>
              </button>
              <div>
                <h1 className="text-4xl font-bold mb-2 tracking-tight">Create Masterpiece</h1>
                <p className="text-blue-100 text-lg">Bring your product vision to life</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full transition-all duration-300 cursor-pointer !rounded-button whitespace-nowrap">
                <i className="fas fa-question-circle mr-2"></i>
                Get Help
              </button>
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full transition-all duration-300 cursor-pointer !rounded-button whitespace-nowrap">
                <i className="fas fa-magic mr-2"></i>
                Auto-Fill
              </button>
            </div>
          </div>
          <div className="mt-8 flex items-center space-x-4">
            <div className="flex-1">
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: '25%' }}></div>
              </div>
            </div>
            <span className="text-white/80 text-sm font-medium">Step 1 of 4</span>
          </div>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-200 rounded-full opacity-20 blur-3xl -z-10"></div>
        
        {showSuccess && (
          <div className="mb-8 bg-gradient-to-r from-emerald-400/90 to-teal-400/90 backdrop-blur-sm border border-emerald-200 text-white p-6 rounded-2xl shadow-lg animate-fade-in">
            <div className="flex items-center">
              <div className="bg-white/30 rounded-full p-3 mr-4 backdrop-blur-sm">
                <i className="fas fa-check text-white text-xl"></i>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Product Added Successfully!</h3>
                <p className="text-emerald-50">Your product is now live. Product ID: #12345</p>
              </div>
              <button className="ml-auto bg-white/20 hover:bg-white/30 p-2 rounded-full transition-all duration-300 cursor-pointer">
                <i className="fas fa-external-link-alt text-white"></i>
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
                    <i className="fas fa-sparkles text-blue-500 mr-3"></i>
                    Product Details
                  </h2>
                </div>
                
                {/* Product Name */}
                <div className="group">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
                    Product Name <span className="text-pink-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white/80 backdrop-blur-sm`}
                      placeholder="What's your product called?"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <i className="fas fa-tag"></i>
                    </div>
                  </div>
                  {errors.name ? (
                    <p className="mt-2 text-sm text-red-500 flex items-center">
                      <i className="fas fa-exclamation-circle mr-1"></i>
                      {errors.name}
                    </p>
                  ) : (
                    <p className="mt-2 text-sm text-gray-500 flex items-center">
                      <i className="fas fa-info-circle mr-1"></i>
                      {formData.name.length}/100 characters
                    </p>
                  )}
                </div>
                
                {/* Product Description */}
                <div className="group">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
                    Description <span className="text-pink-500">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={5}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.description ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white/80 backdrop-blur-sm`}
                      placeholder="Tell the world what makes your product special..."
                    ></textarea>
                    <div className="absolute right-3 top-3 text-gray-400">
                      <i className="fas fa-align-left"></i>
                    </div>
                  </div>
                  {errors.description && (
                    <p className="mt-2 text-sm text-red-500 flex items-center">
                      <i className="fas fa-exclamation-circle mr-1"></i>
                      {errors.description}
                    </p>
                  )}
                </div>
                
                {/* Quantity */}
                <div className="group">
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
                    Quantity <span className="text-pink-500">*</span>
                  </label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={decrementQuantity}
                      className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-l-xl border border-gray-300 cursor-pointer whitespace-nowrap transition-colors"
                    >
                      <i className="fas fa-minus"></i>
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
                      type="button"
                      onClick={incrementQuantity}
                      className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-r-xl border border-gray-300 cursor-pointer whitespace-nowrap transition-colors"
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                    <div className="ml-4 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                      <i className="fas fa-box mr-1"></i>
                      Units
                    </div>
                  </div>
                  {errors.quantity && (
                    <p className="mt-2 text-sm text-red-500 flex items-center">
                      <i className="fas fa-exclamation-circle mr-1"></i>
                      {errors.quantity}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Right Column - Image Upload */}
              <div className="md:w-2/5">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <i className="fas fa-image text-blue-500 mr-3"></i>
                  Product Image
                </h2>
                
                <div
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
                            <i className="fas fa-camera text-3xl mb-3"></i>
                            <p className="text-sm font-medium">Click to change image</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="relative w-24 h-24 mx-auto">
                          <div className="absolute inset-0 bg-blue-100 rounded-full animate-pulse"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <i className="fas fa-cloud-upload-alt text-4xl text-blue-500"></i>
                          </div>
                        </div>
                        <div className="flex flex-col items-center space-y-3">
                          <p className="text-blue-600 font-medium text-lg">Showcase your product</p>
                          <p className="text-sm text-gray-500">Drag and drop your image here</p>
                          <button type="button" className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors cursor-pointer !rounded-button whitespace-nowrap">
                            Browse Files
                          </button>
                          <div className="flex items-center space-x-2 text-xs text-gray-400 mt-2">
                            <i className="fas fa-image"></i>
                            <span>PNG, JPG, GIF up to 5MB</span>
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
                />
                {errors.pic_url && (
                  <p className="mt-2 text-sm text-red-500 flex items-center">
                    <i className="fas fa-exclamation-circle mr-1"></i>
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
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Creating Magic...
                  </>
                ) : (
                  <>
                    <i className="fas fa-rocket mr-2"></i>
                    Launch Product
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleSaveDraft}
                className="flex-1 sm:flex-none bg-white hover:bg-gray-50 text-blue-600 font-medium py-4 px-8 rounded-xl border-2 border-blue-600 shadow-sm transition cursor-pointer !rounded-button whitespace-nowrap flex items-center justify-center"
              >
                <i className="fas fa-save mr-2"></i>
                Save Draft
              </button>
              <button
                type="button"
                className="flex-1 sm:flex-none bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-4 px-8 rounded-xl border border-gray-300 shadow-sm transition cursor-pointer !rounded-button whitespace-nowrap flex items-center justify-center"
              >
                <i className="fas fa-times mr-2"></i>
                Cancel
              </button>
            </div>
          </div>
        </form>
        
        <div className="max-w-4xl mx-auto mt-12 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100/50 shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full text-blue-600">
              <i className="fas fa-lightbulb"></i>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Pro Tip</h3>
              <p className="text-gray-600">High-quality images can increase your product sales by up to 40%</p>
            </div>
          </div>
        </div>
      </main>

    
    </div>
  );
};

export default SelfStore;
