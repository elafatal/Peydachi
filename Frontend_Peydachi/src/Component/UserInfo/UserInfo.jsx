import React, { useState, useEffect } from 'react';

const UserInfo = () => {
  const [formData, setFormData] = useState({
   
    username: '',
    passwoard: '',
    ConfirmPasswoard: '',
    phoneNumber: '',
    email: 'user@example.com', // Pre-filled from signup
    province: '',
    city: '',
    addresses: []
  });

  const [errors, setErrors] = useState({});
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState('');

  const provinces = [
    "Alberta", "British Columbia", "Manitoba", "New Brunswick", 
    "Newfoundland and Labrador", "Nova Scotia", "Ontario", 
    "Prince Edward Island", "Quebec", "Saskatchewan"
  ];

  // Calculate form completion progress
//   useEffect(() => {
//     const requiredFields = ['passwoard', 'ConfirmPasswoard', 'username', 'phoneNumber', 'province', 'city'];
//     const filledFields = requiredFields.filter(field => formData[field]);
//     setProgress(Math.floor((filledFields.length / requiredFields.length) * 100));
//   }, [formData]);

  // Simulate username availability check
  useEffect(() => {
    if (formData.username.length > 0) {
      const timer = setTimeout(() => {
        setIsCheckingUsername(true);
        setTimeout(() => {
          // Mock API call to check username availability
          const isAvailable = !['admin', 'user', 'test'].includes(formData.username.toLowerCase());
          setUsernameAvailable(isAvailable);
          setIsCheckingUsername(false);
        }, 800);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setUsernameAvailable(null);
    }
  }, [formData.username]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Reset city if province changes
    if (name === 'province') {
      setFormData(prev => ({ ...prev, city: '' }));
    }
  };

  const addAddress = () => {
    if (newAddress.trim()) {
      setFormData(prev => ({
        ...prev,
        addresses: [...prev.addresses, { text: newAddress, isDefault: prev.addresses.length === 0 }]
      }));
      setNewAddress('');
      setShowAddAddress(false);
    }
  };

  const setDefaultAddress = (index) => {
    setFormData(prev => ({
      ...prev,
      addresses: prev.addresses.map((addr, i) => ({
        ...addr,
        isDefault: i === index
      }))
    }));
  };

  const removeAddress = (index) => {
    setFormData(prev => {
      const newAddresses = [...prev.addresses];
      const wasDefault = newAddresses[index].isDefault;
      newAddresses.splice(index, 1);

      // If we removed the default address and there are other addresses, set a new default
      if (wasDefault && newAddresses.length > 0) {
        newAddresses[0].isDefault = true;
      }

      return { ...prev, addresses: newAddresses };
    });
  };

  const validateForm = () => {
    const newErrors = {};

    // if (!formData.passwoard.trim()) newErrors.passwoard = 'Password is required';
    if (formData.ConfirmPasswoard != formData.passwoard) newErrors.ConfirmPasswoard = 'پسورد تایید شده با پسورد اولیه یکسان نیست';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    else if (!usernameAvailable) newErrors.username = 'Username is not available';

    // if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }

    // if (!formData.province) newErrors.province = 'Province is required';
    // if (!formData.city.trim()) newErrors.city = 'City is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Submit form data to backend
      console.log('Form submitted:', formData);
      alert('Profile completed successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12" dir='ltr'>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Profile</h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Help us personalize your PeydaChi experience by providing some additional information.
          </p>

          {/* Progress bar */}
          <div className="mt-6 w-full bg-gray-200 rounded-full h-2.5 mb-4 max-w-md mx-auto">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500">{progress}% Complete</p>
        </div>

        {/* Main Form */}
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8">
            <div className="space-y-8">
              {/* Personal Information Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Password */}
                  <div>
                    <label htmlFor="passwoard" className="block text-sm font-medium text-gray-700 mb-1">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="passwoard"
                      name="passwoard"
                      value={formData.passwoard}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="Enter your Password"
                    />
                    {errors.passwoard && (
                      <p className="mt-1 text-sm text-red-600">{errors.passwoard}</p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label htmlFor="ConfirmPasswoard" className="block text-sm font-medium text-gray-700 mb-1">
                      تایید پسورد <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="ConfirmPasswoard"
                      name="ConfirmPasswoard"
                      value={formData.ConfirmPasswoard}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="Enter your Confirm Password"
                    />
                    {errors.ConfirmPasswoard && (
                      <p className="mt-1 text-sm text-red-600">{errors.ConfirmPasswoard}</p>
                    )}
                  </div>
                </div>

                {/* Username */}
                <div className="mt-6">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="Choose a unique username"
                    />
                    {isCheckingUsername && (
                      <div className="absolute right-3 top-2.5">
                        <i className="fas fa-circle-notch fa-spin text-gray-400"></i>
                      </div>
                    )}
                    {!isCheckingUsername && usernameAvailable === true && formData.username && (
                      <div className="absolute right-3 top-2.5 text-green-500">
                        <i className="fas fa-check-circle"></i>
                      </div>
                    )}
                    {!isCheckingUsername && usernameAvailable === false && (
                      <div className="absolute right-3 top-2.5 text-red-500">
                        <i className="fas fa-times-circle"></i>
                      </div>
                    )}
                  </div>
                  {errors.username && (
                    <p className="mt-1 text-sm text-red-600">{errors.username}</p>
                  )}
                  {!errors.username && usernameAvailable === false && (
                    <p className="mt-1 text-sm text-red-600">This username is already taken</p>
                  )}
                  {!errors.username && usernameAvailable === true && formData.username && (
                    <p className="mt-1 text-sm text-green-600">Username is available</p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="mt-6">
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <select className="h-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-l-lg text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500">
                        <option>+98</option>
                        <option>+44</option>
                        <option>+91</option>
                      </select>
                    </div>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="flex-1 min-w-0 block w-full px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                  {errors.phoneNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
                  )}
                </div>

                {/* Email (pre-filled) */}
                <div className="mt-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 text-sm cursor-not-allowed"
                  />
                  <p className="mt-1 text-xs text-gray-500">Email address from your sign up</p>
                </div>
              </div>

              {/* Location Information Section */}
              <div className="pt-6 border-t border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Location Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Province */}
                  <div>
                    <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">
                      Province <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="province"
                      name="province"
                      value={formData.province}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                      <option value="">Select a province</option>
                      {provinces.map((province) => (
                        <option key={province} value={province}>{province}</option>
                      ))}
                    </select>
                    {errors.province && (
                      <p className="mt-1 text-sm text-red-600">{errors.province}</p>
                    )}
                  </div>

                  {/* City */}
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="Enter your city"
                      disabled={!formData.province}
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                    )}
                  </div>
                </div>

                {/* Saved Addresses */}
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-sm font-medium text-gray-700">Saved Addresses</label>
                    <button 
                      type="button" 
                      onClick={() => setShowAddAddress(true)}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                    >
                      <i className="fas fa-plus mr-1"></i> Add New Address
                    </button>
                  </div>

                  {formData.addresses.length === 0 && !showAddAddress && (
                    <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                      <i className="fas fa-home text-gray-400 text-3xl mb-2"></i>
                      <p className="text-gray-500">No addresses saved yet</p>
                      <button 
                        type="button"
                        onClick={() => setShowAddAddress(true)}
                        className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer"
                      >
                        Add your first address
                      </button>
                    </div>
                  )}

                  {/* Address list */}
                  {formData.addresses.length > 0 && (
                    <div className="space-y-3 mb-4">
                      {formData.addresses.map((address, index) => (
                        <div key={index} className="flex items-start p-3 border rounded-lg bg-gray-50">
                          <div className="flex-1">
                            <p className="text-gray-800">{address.text}</p>
                            {address.isDefault && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                                Default
                              </span>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            {!address.isDefault && (
                              <button 
                                type="button"
                                onClick={() => setDefaultAddress(index)}
                                className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer"
                              >
                                Set as default
                              </button>
                            )}
                            <button 
                              type="button"
                              onClick={() => removeAddress(index)}
                              className="text-sm text-red-600 hover:text-red-800 cursor-pointer"
                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add new address form */}
                  {showAddAddress && (
                    <div className="mt-3 p-4 border rounded-lg bg-gray-50">
                      <div className="mb-3">
                        <label htmlFor="newAddress" className="block text-sm font-medium text-gray-700 mb-1">
                          New Address
                        </label>
                        <input
                          type="text"
                          id="newAddress"
                          value={newAddress}
                          onChange={(e) => setNewAddress(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                          placeholder="Enter your address"
                        />
                      </div>
                      <div className="flex justify-end space-x-3">
                        <button 
                          type="button"
                          onClick={() => setShowAddAddress(false)}
                          className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100"
                        >
                          Cancel
                        </button>
                        <button 
                          type="button"
                          onClick={addAddress}
                          className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                        >
                          Save Address
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col items-center">
              <button 
                type="submit"
                className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white text-base font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Complete Profile
              </button>
              <button 
                type="button"
                className="mt-3 text-sm text-gray-600 hover:text-gray-800"
              >
                Skip for now
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Need help? <a href="#" className="text-blue-600 hover:text-blue-800">Contact Support</a></p>
          <p className="mt-2">PeydaChi © 2025 - Find what you need, nearby</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
