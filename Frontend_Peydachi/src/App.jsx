import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutUs from './Component/About us/AboutUs';
import Login from './Component/SignUp-SignIn/Login';
import LandingPage from './Component/landingPage/LandingPage';
import Footer from './Component/landingPage/footer';
import MenuBar from './Component/Navbar/Navbar';
import ErrorPage from './Component/Error/Error';
import UserInfo from './Component/UserInfo/UserInfo';
import { AuthProvider } from './Component/AuthContext/AuthContext';
import PrivateRoute from './Component/PrivateRoute';
import UnauthorizedPage from './Component/Error/UnauthorizedPage';
import AdminPage from './Component/Admin/Admin';
function App() {


  return (
    <AuthProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/footer" element={<Footer />} />
            <Route path="/m" element={<MenuBar />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/userInfo" element={<UserInfo />} />
            <Route path="/Admin" element={<AdminPage/>} />
            {/* مسیرهای محافظت شده */}
            {/* <Route element={<PrivateRoute allowedRoles={['user', 'admin', 'seller', 'superadmin']} />}>
              <Route path="/userInfo" element={<UserInfo />} />
            </Route> */}

          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
