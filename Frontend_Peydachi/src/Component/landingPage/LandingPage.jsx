import React, { useState } from 'react';
import FirstSection from './firstSection';
import HowItWorks from './secondSection';
import Features from './lastSection';


const LandingPage = () => {
 
  return (
    <div className=" bg-white" dir='ltr'>

      <FirstSection/>
      <HowItWorks/>
      <Features/>


    </div>
  );
};

export default LandingPage;
