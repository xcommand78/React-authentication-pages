import React from 'react';
import SignUp from './components/Login/SignUp';
import Login from './components/Login/Login';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Navbar from './components/utils/Navbar';
import Home from './components/Home/Home';
import { useState } from 'react';
const App = () => {
  const [isToken, setToken] = useState(localStorage.getItem('access') !== null);

  return (
    <div>
      <BrowserRouter>
      <Navbar isToken={isToken} setToken={setToken}/>
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;