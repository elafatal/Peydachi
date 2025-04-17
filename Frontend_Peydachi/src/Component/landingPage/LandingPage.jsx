import React, { useState } from 'react';
import FirstSection from './firstSection';
import MenuBar from '../Navbar/Navbar';
import Navbar from './navbar';
import Footer from './footer';
import HowItWorks from './secondSection';


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
 
  return (
    <div className="min-h-screen bg-white" dir='ltr'>
      {/* Header */}
      <Navbar/>

      {/* Hero Section */}
      <FirstSection/>


      {/* How It Works Section */}
      <HowItWorks/>


      {/* Features Section */}
      <div className="py-24 bg-gray-50">
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
      <Footer/>
    </div>
  );
};

export default LandingPage;
