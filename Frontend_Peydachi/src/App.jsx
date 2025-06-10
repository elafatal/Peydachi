import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutUs from './Component/About us/AboutUs';
import Login from './Component/SignUp-SignIn/Login';
import LandingPage from './Component/landingPage/LandingPage';
import Footer from './Component/Footer/footer';

import ErrorPage from './Component/Error/Error';
import UserInfo from './Component/UserInfo/UserInfo';
import { AuthProvider } from './Component/AuthContext/AuthContext';
import UnauthorizedPage from './Component/Error/UnauthorizedPage';
import AdminPage from './Component/Admin/Admin';
import SearchStore from './Component/otherServices/Store/SearchStore/SearchStore';
import AddStore from './Component/otherServices/Store/AddStoreRequest/AddStoreRequest';
import UserComment from './Component/otherServices/UserComments/UserComment';
import StoreProfile from './Component/Store/StoreProfile';
import MainSearch from './Component/MainSearch/Search';
import SearchProduct from './Component/otherServices/Product/SearchProduct';
import AllNotifPage from './Component/Notification/AllNotifPage';
import Navbar from './Component/landingPage/navbar';
import ScrollToTop from './Component/ScrollToTop';
import AddProduct from './Component/Store/AddProduct';
import SelfStore from './Component/Store/selfStore';


function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop/>
        <div>
          <Navbar/>
          <div className="pt-[5rem]">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/footer" element={<Footer />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/userInfo" element={<UserInfo />} />
            <Route path="/Admin" element={<AdminPage/>} />
            <Route path="/AddStoreRequest" element={<AddStore/>} />
            <Route path="/UserCommentReport" element={<UserComment/>} />
            <Route path="/SearchStore" element={<SearchStore/>} />
            <Route path="/StoreDetail/:id" element={<StoreProfile />} />
            <Route path="/Search" element={<MainSearch/>} />
            <Route path="/SearchProduct" element={<SearchProduct/>} />
            <Route path="/AllNotification" element={<AllNotifPage/>} />
            <Route path="/AddProduct" element={<AddProduct/>} />
            <Route path="/SelfStore" element={<SelfStore/>} />
            {/* مسیرهای محافظت شده */}
            {/* <Route element={<PrivateRoute allowedRoles={['user', 'admin', 'seller', 'superadmin']} />}>
              <Route path="/userInfo" element={<UserInfo />} />
            </Route> */}

          </Routes>
          </div>     
           <Footer/>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
