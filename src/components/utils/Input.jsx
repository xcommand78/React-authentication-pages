import React from 'react';

const Input = ({ register, error, ...rest }) => {
  return (
    <div>
      <input {...register} {...rest} />
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
    </div>
  );
};

export default Input;   