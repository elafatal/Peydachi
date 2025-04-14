import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutUs from './Component/About us/AboutUs';
import Signin from './Component/SignUp-SignIn/SignIn/SignIn';
import Login from './Component/SignUp-SignIn/Login';
function App() {


  return (
    <Router>
    <div >
      <Routes>
        <Route path="/aboutUs" element={<AboutUs/>} />
        <Route path="/Login" element={<Login/>} />

      </Routes>
    </div>
  </Router>
  )
}

export default App
