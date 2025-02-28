import React from 'react';
import Input from '../utils/Input';
import Form from '../utils/Form';
import Button from '../utils/Button';
import { toast, ToastContainer } from 'react-toastify';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const loginRequest = await axios.post('', data);
      const token = loginRequest.data.access; // Access the "access" token
      if (token) {
        localStorage.setItem('access', token); // Store the access token in localStorage
        setToken(true); // Update the authentication state in the parent component
        toast.success('Login Successful');
        navigate('/home'); // Redirect to the home page
      } else {
        toast.error('Wrong credentials');
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || 'Login failed');
        console.error('Server error:', error.response);
      } else if (error.request) {
        toast.error('No response from the server');
      } else {
        toast.error('Something went wrong');
      }
    }
  };

  return (
    <div className="main">
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="auth-container">
        <h1>Login</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            name="username"
            placeholder="Enter the user name"
            register={register('username', {
              required: { value: true, message: 'The field is required' },
              minLength: { value: 4, message: 'Username min length is 4' },
              maxLength: { value: 20, message: 'Username max length is 20' },
            })}
            error={errors.username}
          />
          <Input
            type="password"
            placeholder="Enter the password"
            name="password"
            register={register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: "Password must be at least 6 characters" },
              maxLength: { value: 16, message: "Password cannot exceed 16 characters" },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                message:
                  'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)',
              },
            })}
            error={errors.password}
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Logging In...' : 'Log In'}
          </Button>
          <h2>Don't have an account?</h2> <Link to="/signup">Create new account</Link>
        </Form>
      </div>
    </div>
  );
};

export default Login;