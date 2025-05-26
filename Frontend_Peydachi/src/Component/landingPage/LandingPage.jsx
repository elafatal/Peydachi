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
      {/* <Navbar/> */}
      {/* Hero Section */}
      <FirstSection/>
      {/* How It Works Section */}
      <HowItWorks/>

      {/* Features Section */}
    <Features/>

      {/* Footer */}
      {/* <Footer/> */}
    </div>
  );
};

export default LandingPage;
