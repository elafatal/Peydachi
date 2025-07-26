// import React, { useState } from 'react';
// import { motion } from "framer-motion";
// import { useNavigate } from 'react-router-dom';
// import SignUp from './SignUp/SignUp';
// import SignIn from './SignIn/SignIn';
// import OTPVerification from './Verify/PasswordVerification';
// import PhoneVerification from './Verify/PhoneVerification';

// const Login= () => {

//   const [showComponent, setshowComponent] = useState("Signin");
// const [username, setusername] = useState('');
// const [phoneVerificationData, setPhoneVerificationData] = useState(null);
// const [rememberMe, setRememberMe] = useState(false);

//   const renderContent = () => {
//     switch (showComponent) {
//         case "Signin":
//             return(<SignIn  showComponent={showComponent} setshowComponent={setshowComponent} setRememberMe={setRememberMe} rememberMe={rememberMe} setusername={setusername} username={username} />)
//             break;
//         case "Signup":
//             return(<SignUp showComponent={showComponent} setshowComponent={setshowComponent} setRememberMe={setRememberMe} rememberMe={rememberMe} setPhoneVerificationData={setPhoneVerificationData} />)
//             break;
//         case "passVerify":
//             return(<OTPVerification  showComponent={showComponent} setshowComponent={setshowComponent} username={username}/> )
//             break;
//         case "phoneVerify":
//             return(<PhoneVerification showComponent={showComponent} setshowComponent={setshowComponent} rememberMe={rememberMe} verificationData={phoneVerificationData} /> )
//             break;
//         default:
//             return(
//               <SignUp 
//                 showComponent={showComponent} 
//                 setshowComponent={setshowComponent} 
//                 setRememberMe={setRememberMe} 
//                 rememberMe={rememberMe}
//                 setPhoneVerificationData={setPhoneVerificationData}
//               />
//             )
//     }
// };



//   return (
    
//     <div className=" py-8 bg-gray-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-xl shadow-lg w-11/12 max-w-4xl flex overflow-hidden" dir='ltr'>
//         {/* Left side */}
//         <div className="hidden md:block w-1/2 p-6 relative">
//           <img
//             src="/loginLogo.jpg"
//             alt="Person searching for products"
//             className="w-full h-full object-cover object-top"
//           />
//         </div>
//        { /* right side */}
//         {renderContent()}
        
//       </div>
//     </div>
//   );
// };

// export default Login;
import React from 'react';
import { Outlet } from 'react-router-dom';

const Login = () => {
  return (
    <div className="py-8 bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-11/12 max-w-4xl flex overflow-hidden" dir='ltr'>
        {/* Left side ثابت */}
        <div className="hidden md:block w-1/2 p-6 relative">
          <img
            src="/loginLogo.jpg"
            alt="Person searching for products"
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Right side = Outlet for routes */}
        <Outlet />
      </div>
    </div>
  );
};

export default Login;
