'use client'
import React, { useState } from 'react'

import Link from 'next/link'


//import toastr from 'toastr';
import { redirect } from 'next/navigation';

import Input from '../../components/FormInput';
import Button from '../../components/CustomBotton';
import { userValidation } from '@/app/validations/user-validation';
import { GoogleLogin } from '@react-oauth/google';

//import { adminLogin } from '../services/auth.service'
type errorType = {
  fullName?: string,
  email?: string,
  password?: string,
  confirmPassword?: string,
  phone?: string
};
const page = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
  });

  const [errors, setErrors] = useState<errorType>({});
  //const {login} = useAuth();

  const handleSubmit = async () => {
    const user = { ...formData, phone: '0000000000', address: 'address', fullName: 'fullName', confirmPassword: formData.password };

    const errors = await userValidation(user);
    if (errors) {
      setErrors(errors);
      return
    }

    // const response = await adminLogin({ email: formData.email, password: formData.password });
    // console.log('response',response);
    //   if (response.error) {
    //     const showErrorToast = () => {
    //       toastr.error(response.error.message,'', {
    //         "closeButton": true,
    //         "debug": false,
    //         "newestOnTop": false,
    //         "progressBar": true,
    //         "positionClass": "toast-top-right",
    //         "preventDuplicates": false,
    //         "showDuration": 300,
    //         "hideDuration": 1000,
    //         "timeOut": 5000,
    //         "extendedTimeOut": 1000,
    //         "showEasing": "swing",
    //         "hideEasing": "linear",
    //         "showMethod": "fadeIn",
    //         "hideMethod": "fadeOut"
    //       });
    //     };
    //     showErrorToast();
    //     setErrors(response.error.message);

    //   }
    //   if(response.status === 201){
    //     login(response.user as any);
    //     toastr.success('Login successful! Redirecting to dashboard... ','', {
    //       "closeButton": true,
    //       "debug": false,
    //       "newestOnTop": false,
    //       "progressBar": true,
    //       "positionClass": "toast-top-right",
    //       "preventDuplicates": false,
    //       "showDuration": 300,
    //       "hideDuration": 1000,
    //       "timeOut": 5000,
    //       "extendedTimeOut": 1000,
    //       "showEasing": "swing",
    //       "hideEasing": "linear",
    //       "showMethod": "fadeIn",
    //       "hideMethod": "fadeOut"
    //     });
    //     redirect('/admin');
    //   }

    // login(formData.email,formData.password);
    // setTimeout(() => {
    //   redirect('/admin');
    // }, 500); 
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className='flex justify-center items-center w-full'>
        <div className="block w-[50px] h-[50px]">
          <img src="/imgs/logo/logo.png" alt="" />
        </div>
        <span className='text-5xl font-bold text-text-light font-playfair'>TicketPort</span>
      </div>
      <div className="w-full max-w-md p-6 mt-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-800 dark:text-white">Sign in to Ticket Port</h1>
        <form className="mt-4">
          <div className="mb-4">
            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              name="email"
              onChange={(e) => { setFormData({ ...formData, email: e.target.value }) }}
              value={formData.email}
              error={errors.email}
              className=''
            />
          </div>
          <div className="mb-4">
            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
              name="password"
              onChange={(e) => { setFormData({ ...formData, password: e.target.value }) }}
              value={formData.password}
              error={errors.password}
            />
          </div>
          <Link href="/forgot-password" className='text-primary hover:text-hoverEffects-gold font-bold'>Forgot password?</Link>
          <Button
            label="Login"
            onClick={handleSubmit}
            className='w-full bg-primary text-white hover:bg-accent hover:text-white mt-4'
          />
        </form>
        <div className='text-text-light mt-3' >Don't have an account?<Link href="/register" className='text-accent hover:text-primary '> Register</Link></div>
      </div>
      <div className="flex flex-col items-center justify-center mt-6 w-full">
        <div className="flex items-center justify-center w-3/12 my-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500 font-semibold">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <GoogleLogin
          onSuccess={credentialResponse => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />;
      </div>
    </div>
  )
}

export default page
