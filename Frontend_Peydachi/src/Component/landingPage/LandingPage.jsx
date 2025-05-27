import React, { useState } from 'react';
import FirstSection from './firstSection';
import MenuBar from '../Navbar/Navbar';
import Navbar from './navbar';
import Footer from './footer';
import HowItWorks from './secondSection';
import Features from './lastSection';


const LandingPage = () => {
 
  return (
    <div className=" bg-white" dir='ltr'>
      {/* Hero Section */}
      <FirstSection/>
      {/* How It Works Section */}
      <HowItWorks/>

      {/* Features Section */}
    <Features/>


    </div>
  );
};

export default LandingPage;
