import React, { useState } from 'react';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import SignUp from './SignUp/SignUp';
import SignIn from './SignIn/SignIn';
const Login= () => {
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
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
            return(<SignIn  showComponent={showComponent} setshowComponent={setshowComponent} from={from}/>)
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
            src="https://readdy.ai/api/search-image?query=A%20young%20person%20sitting%20comfortably%20in%20a%20modern%20chair%20with%20a%20laptop%2C%20wearing%20blue%20casual%20clothes.%20The%20scene%20is%20surrounded%20by%20lush%20green%20plants%20in%20decorative%20pots.%20The%20background%20is%20clean%20and%20minimal%20with%20soft%20lighting%2C%20creating%20a%20cozy%20atmosphere%20for%20online%20shopping%20or%20browsing.%20Digital%20illustration%20style%20with%20soft%20shadows%20and%20depth.&width=600&height=800&seq=1234&orientation=portrait"
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
