import React, { useState } from 'react';
import FirstSection from './firstSection';
import MenuBar from '../Navbar/Navbar';
import Navbar from './navbar';
import Footer from './footer';
import HowItWorks from './secondSection';
import Features from './lastSection';


const LandingPage = () => {
 
  return (
    <div className="min-h-screen bg-white" dir='ltr'>
      {/* Header */}
      <Navbar/>

      {/* Hero Section */}
      <FirstSection/>


      {/* How It Works Section */}
      <HowItWorks/>


      {/* Features Section */}
    <Features/>

      {/* CTA Section */}
      {/* <div className="bg-blue-600 py-24">
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
      </div> */}

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default LandingPage;
