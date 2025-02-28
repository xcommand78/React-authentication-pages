import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isToken, setToken}) => {
  const naviagte= useNavigate();
  // Initialize state with the token from localStorage

  // Update state when the token changes (e.g., after login/logout)
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('access') !== null);
    };

    // Listen for changes to localStorage
    window.addEventListener('storage', handleStorageChange);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Logout function
  const logOut = () => {
    localStorage.removeItem('access');
    setToken(false); // Update state to reflect logout
    naviagte('/login')
  };

  return (
    <div className="navbar right-nav">
      <nav>
        <ul>
          <li>
            <Link to="/home" className='a' id='a1'>Home</Link>
          </li>
          <li>
            <Link to="/studio" className='a' id='a2'>Studio</Link>
          </li>
          <li>
            <Link to="/best-titles" className='a' id='a3'>Best Titles</Link>
          </li>
          <li>
            {isToken ? (
              <Button onClick={logOut} id="logout-btn">LogOut</Button>
            ) : (
              <Link to="/login" className='a' id='a4'>Login</Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;