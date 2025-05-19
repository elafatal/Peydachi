import React, { useState } from 'react';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
import loginLogo from '../../../public/loginLogo.jpg'
import SignUp from './SignUp/SignUp';
import SignIn from './SignIn/SignIn';
const Login= () => {
  // const location = useLocation();
  // const from = location.state?.from?.pathname || '/';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showComponent, setshowComponent] = useState("Signin");

  const handleSubmit = (e) => {
 
    e.preventDefault();
    console.log({ email, password, rememberMe });
  };

  const renderContent = () => {
    switch (showComponent) {
        case "Signin":
            return(<SignIn  showComponent={showComponent} setshowComponent={setshowComponent}/>)
            break;
        case "Signup":
            return(<SignUp showComponent={showComponent} setshowComponent={setshowComponent}/>)
            break;
        
        default:
            return(<SignUp showComponent={showComponent} setshowComponent={setshowComponent}/>)
            break;
    }
};



  return (
    
    <div className=" min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-11/12 max-w-4xl flex overflow-hidden" dir='ltr'>
        {/* Left side */}
        <div className="hidden md:block w-1/2 p-6 relative">
          <img
            src={loginLogo} 
            alt="Person searching for products"
            className="w-full h-full object-cover object-top"
          />
        </div>
       { /* right side */}
        {renderContent()}
        
      </div>
    </div>
  );
};

export default Login;
