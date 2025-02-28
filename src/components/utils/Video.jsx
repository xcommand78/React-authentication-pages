import React from 'react';

const Video = ({ src, ...rest }) => {
    
  return(
  <div>
    <video src={src} {...rest} />
    </div>
 
 
 )
  ;
};

export default Video;