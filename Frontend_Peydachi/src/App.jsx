import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutUs from './Component/About us/AboutUs';
import Login from './Component/SignUp-SignIn/Login';
import LandingPage from './Component/landingPage/LandingPage';
import L2 from './Component/landingPage/l2';
import L3 from './Component/landingPage/l3';
import Footer from './Component/landingPage/footer/footer';
import MenuBar from './Component/Navbar/Navbar';
function App() {


  return (
    <Router>
    <div >
      <Routes>
      <Route path="/Land2" element={<L2/> } />
      <Route path="/Land3" element={<L3/> } />
      <Route path="/" element={<LandingPage/> } />
        <Route path="/aboutUs" element={<AboutUs/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/footer" element={<Footer/> } />
        <Route path="/m" element={<MenuBar/> } />


      </Routes>
    </div>
  </Router>
  )
}

export default App
