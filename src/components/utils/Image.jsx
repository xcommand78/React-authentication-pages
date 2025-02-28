import React from 'react';

const Image = ({ src, alt, ...rest }) => {
  return <img src={src} alt={alt} {...rest}/>;
};

export default Image;