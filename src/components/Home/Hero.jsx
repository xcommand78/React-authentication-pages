import React from 'react';
import Video from '../utils/Video';
import herovideo from '../../assets/videos/videoplayback.webm';

const Hero = () => {
  return (
    <div className="hero">
      <Video
        src={herovideo}
        className="video-container"
        autoPlay // Corrected prop name
        loop // Add loop if you want the video to loop // Add muted to autoplay in most browsers
        playsInline // Add playsInline for mobile browsers
      />
    </div>
  );
};

export default Hero;