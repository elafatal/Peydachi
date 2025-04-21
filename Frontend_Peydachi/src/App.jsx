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
function App() {


  return (
    <Router>
    <div >
      <Routes>
      <Route path="/" element={<LandingPage/> } />
        <Route path="/aboutUs" element={<AboutUs/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/userInfo" element={<UserInfo/>} />
        <Route path="/footer" element={<Footer/> } />
        <Route path="/m" element={<MenuBar/> } />
        <Route path="*" element={<ErrorPage/>} />

      </Routes>
    </div>
  </Router>
  )
}

export default App
