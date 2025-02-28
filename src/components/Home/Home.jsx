import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from './Hero';
import MostPlayes from './MostPlayes';
import Best from './Best';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      let token = localStorage.getItem('access'); // Corrected typo here
      if (!token) {
        navigate('/login');
      }
    };

    checkToken();
  }, []); // Added dependency array

  return (
    <div className="home">
      <Hero />
      <MostPlayes />
      <Best />
    </div>
  );
};

export default Home;