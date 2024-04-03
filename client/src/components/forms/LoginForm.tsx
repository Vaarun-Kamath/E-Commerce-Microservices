'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

import StyledInput from '@/components/atoms/StyledInput';

import { signIn } from 'next-auth/react';

type Props = {
  callbackUrl?: string;
};

export default function LoginForm(props: Props) {
  const [loginError, setLoginError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const errorHandler = (error: string): void => {
    setLoginError(error);

    setTimeout(() => {
      setLoginError(null);
    }, 10000);
  };

  const validateInputs = (
    email: FormDataEntryValue,
    password: FormDataEntryValue
  ): boolean => {
    if (email === '' || password === '') {
      setLoading(false);
      errorHandler('Please fill all the fields');
      return false;
    }
    setLoginError(null);
    return true;
  };

  const handleSignIn = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);

    const email = formData.get('email') || '';
    const password = formData.get('password') || '';

    try {
      if (!validateInputs(email, password)) return;

      const res = await signIn('credentials', {
        email: email.toString(),
        password: password.toString(),
        redirect: false,
        callbackUrl: props.callbackUrl ? props.callbackUrl : '/home',
      });
      if (res?.error) {
        errorHandler(res.error);
      } else {
        router.push(props.callbackUrl ? props.callbackUrl : '/home');
      }
    } catch (err) {
      errorHandler('Please try again after some time');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignIn} className='space-y-6'>
      <div>
        <label
          htmlFor='email'
          className='block text-sm font-medium leading-6 text-gray-900'
        >
          Email address
        </label>
        <StyledInput
          className='block w-full rounded-md py-1.5 px-1.5 text-gray-900 border-2 shadow-sm ring-0 ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-green-600 sm:text-sm sm:leading-6'
          name='email'
          type='email'
          placeholder='Email'
        />
      </div>

      <div>
        {/* <div className=''> */}
        <label
          htmlFor='password'
          className='text-sm font-medium leading-6 text-gray-900 flex items-center justify-between'
        >
          <span>Password</span>
          <span className='text-sm'>
            <a
              href='#'
              className='font-semibold text-green-600 hover:text-green-500'
            >
              Forgot password?
            </a>
          </span>
        </label>
        {/* </div> */}
        <div className='mt-2'>
          <StyledInput
            className='block w-full rounded-md py-1.5 px-1.5 text-gray-900 border-2 shadow-sm ring-0 ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-green-600 sm:text-sm sm:leading-6'
            name='password'
            type='password'
            placeholder='Password'
          />
        </div>
      </div>
      {loginError && (
        <span className='transition-all duration-200 bg-red-500 w-full text-sm rounded-sm text-white font-medium flex items-center px-1.5 py-1'>
          <FaExclamationCircle className='mr-2 animate-pulse' /> {loginError}
        </span>
      )}
      <div>
        <button
          type='submit'
          className='flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600'
        >
          Sign in
        </button>
      </div>
    </form>
  );

  // return (
  //   <div className='flex flex-col justify-center w-3/6 border-2 p-10'>
  //     <h1 className='mt-2 mb-6 text-4xl font-bold text-center'>Sign In</h1>
  //     <form onSubmit={handleSignIn} className='w-full'>
  //       <StyledInput
  //         className='w-full p-2 my-3 border-gray-400 border'
  //         name='email'
  //         type='text'
  //         placeholder='Email'
  //       />
  //       <StyledInput
  //         className='w-full p-2 my-3 border-gray-400 border'
  //         name='password'
  //         type='password'
  //         placeholder='Password'
  //       />

  //       {loginError && (
  //         <span className='transition-all duration-200 bg-red-500 w-full text-sm rounded-sm text-white font-medium flex items-center px-1.5 py-1'>
  //           <FaExclamationCircle className='mr-2 animate-pulse' /> {loginError}
  //         </span>
  //       )}

  //       <button
  //         type='submit'
  //         disabled={loading}
  //         className='w-full font-medium flex items-center justify-center transition-all duration-200 text-white text-lg rounded-sm bg-slate-900 hover:bg-slate-800 py-2.5 mt-7 mb-6'
  //       >
  //         Sign In
  //         {loading && (
  //           <Image
  //             src='images/bars.svg'
  //             alt='Loading'
  //             className='ml-2 text-white select-none'
  //             width={15}
  //             height={15}
  //           />
  //         )}
  //       </button>
  //     </form>
  //     <div className='flex flex-row justify-between'>
  //       <StyledLink
  //         className='font-medium tracking-tight text-blue-700 underline transition-all duration-300 hover:text-blue-600 underline-offset-4'
  //         type='internal'
  //         href='/forgotPassword'
  //       >
  //         Forgot your Password?
  //       </StyledLink>
  //       <span className='flex gap-1'>
  //         New User?
  //         <StyledLink
  //           className='font-medium tracking-tight text-blue-700 underline transition-all duration-300 hover:text-blue-600 underline-offset-4'
  //           type='internal'
  //           href='/register'
  //         >
  //           Register
  //         </StyledLink>
  //       </span>
  //     </div>
  //   </div>
  // );
}
