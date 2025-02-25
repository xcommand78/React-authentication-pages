import React from 'react';
import Input from '../utils/Input';
import Form from '../utils/Form';
import Button from '../utils/Button';
import { toast, ToastContainer } from 'react-toastify';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting},
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const loginRequest = await axios.post('api/auth/login', data);
      const token = loginRequest.data.token;
      if (token) {
        localStorage.setItem('userToken', token);
        toast.success('Login Successful');
        navigate('/dashboard'); // Redirect to dashboard
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
    <>
    <div className='auth-container'>
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
      <h1>Login</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          name="user_name"
          placeholder="Enter the user name"
          register={register('user_name', {
            required: { value: true, message: 'The field is required' },
            minLength: { value: 4, message: 'Username min length is 4' },
            maxLength: { value: 20, message: 'Username max length is 20' },
          })}
          error={errors.user_name}
        />
        <Input
          type="email"
          name="user_email"
          placeholder="Enter the Email"
          register={register('user_email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          error={errors.user_email}
        />
        <Input
          type="password"
          placeholder="Enter the password"
          name="password"
          register={register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: "Password's min length is 6 characters" },
            maxLength: { value: 16, message: "Password's max length is 16" },
          })}
          error={errors.password}
        />

       <Button type="submit" disabled={isSubmitting}> {isSubmitting ? 'Loging In...' : 'Log In'}
       </Button>
        </Form>
    </div>
    </>
  );
};

export default Login;