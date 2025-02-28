import React, { useState } from 'react';
import Input from '../utils/Input';
import Form from '../utils/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useForm } from 'react-hook-form';
import Button from '../utils/Button';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await axios.post('', data);
      toast.success('You made your account');
      navigate('/home');
    } catch (error) {
      if (error.response) {
        toast.error(`Error: ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        toast.error('Network error. Please try again.');
      } else {
        toast.error('An unexpected error occurred.');
        console.error('Error details:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const password = watch('password');

  return (
    <>
      <div className="main">
        <ToastContainer position="top-left" />
        <div className="auth-container">
          <h1>Sign Up</h1>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="text"
              name="username"
              placeholder="Enter the user name"
              register={register('username', {
                required: { value: true, message: 'Username is required' },
                minLength: { value: 4, message: 'Username min length is 4' },
                maxLength: { value: 20, message: 'Username cannot be greater than 20 letters' },
              })}
              error={errors.user_name}
            />

            <Input
              type="password"
              placeholder="Enter the password"
              name="password"
              register={register('password', {
                required: 'Password is required',
                minLength: { value: 8, message: "Password's min length is 8 characters" },
                maxLength: { value: 100, message: "Password's max length is 100" },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character',
                },
              })}
              error={errors.password}
            />

            <Input
              type="email"
              name="email"
              placeholder="Enter the Email"
              register={register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              error={errors.email}
            />

            <Input
              type="password"
              placeholder="Confirm password"
              name="confirm_password"
              register={register('confirm_password', {
                required: 'Confirm password is required',
                validate: (value) => value === password || 'Passwords do not match',
              })}
              error={errors.confirm_password}
            />

            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SignUp;