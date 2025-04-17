import React, { useState } from 'react';
import FirstSection from './firstSection';


const LandingPage = () => {
 

  const features = [
    {
      icon: 'fa-solid fa-magnifying-glass',
      title: 'Smart Search',
      description: 'Find any product instantly with our intelligent search system'
    },
    {
      icon: 'fa-solid fa-location-dot',
      title: 'Real-time Location',
      description: 'Get accurate results based on your current location'
    },
    {
      icon: 'fa-solid fa-clock',
      title: 'Live Availability',
      description: 'Check real-time stock availability at nearby stores'
    },
    {
      icon: 'fa-solid fa-route',
      title: 'Route Planning',
      description: 'Get the best route to your desired store'
    }
  ];

  const steps = [
    {
      icon: 'fa-solid fa-search',
      title: 'Search Product',
      description: 'Enter the product you want to find'
    },
    {
      icon: 'fa-solid fa-map-pin',
      title: 'Set Location',
      description: 'Choose your location or use current position'
    },
    {
      icon: 'fa-solid fa-store',
      title: 'Find Stores',
      description: 'Discover nearest stores with your product'
    }
  ];

  return (
    <div className="min-h-screen bg-white" dir='ltr'>
      {/* Header */}
      <header className="fixed w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100" dir='rtl'>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-location-crosshairs text-blue-600 text-2xl"></i>
            <span className="text-2xl font-bold text-gray-800">پیداچی</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-gray-800 px-4 py-2 cursor-pointer whitespace-nowrap !rounded-button">
              ورود/ثبت نام
            </button>
            <button className="bg-blue-600 text-white px-6 py-2 hover:bg-blue-700 cursor-pointer whitespace-nowrap !rounded-button">
              نوتیف
            </button>
          </div>
        </div>
      </header>

   {/* Hero Section */}
   <FirstSection/>

      {/* How It Works Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <i className={`${step.icon} text-2xl text-blue-600`}></i>
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Features Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Why Choose FindNearby
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <i className={`${feature.icon} text-xl text-blue-600`}></i>
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Find Products Near You?
          </h2>
          <p className="text-xl text-blue-100 mb-12">
            Join thousands of smart shoppers who save time with FindNearby
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 cursor-pointer whitespace-nowrap !rounded-button">
            Get Started Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <i className="fa-solid fa-location-crosshairs text-white text-2xl"></i>
                <span className="text-xl font-bold text-white">FindNearby</span>
              </div>
              <p className="text-sm">
                Making local shopping smarter and more convenient for everyone.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white cursor-pointer">About Us</a></li>
                <li><a href="#" className="hover:text-white cursor-pointer">Careers</a></li>
                <li><a href="#" className="hover:text-white cursor-pointer">Press</a></li>
                <li><a href="#" className="hover:text-white cursor-pointer">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white cursor-pointer">Help Center</a></li>
                <li><a href="#" className="hover:text-white cursor-pointer">Contact Us</a></li>
                <li><a href="#" className="hover:text-white cursor-pointer">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white cursor-pointer">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Connect</h3>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white cursor-pointer">
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white cursor-pointer">
                  <i className="fab fa-facebook text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white cursor-pointer">
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white cursor-pointer">
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
              </div>

              </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
            © 2025 FindNearby. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
