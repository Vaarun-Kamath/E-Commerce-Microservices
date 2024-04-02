'use client';

import React, { useState } from 'react';
import StyledLink from './atoms/StyledLink';
import { FaShoppingCart } from 'react-icons/fa';
import { FaRegUser } from 'react-icons/fa';
import { signOut } from 'next-auth/react';

function Sidebar() {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <nav className='fixed top-0 z-50 flex items-center justify-between h-16 w-full px-3 py-1.5 bg-green-500 border-b border-green-400 max-w-screen lg:px-5 lg:pl-3'>
      {loading ? null : (
        <div className='fade-in-1 flex flex-row  justify-between w-full'>
          <StyledLink
            href={'/home'}
            className='relative flex items-center text-md justify-between font-medium text-gray-100 transition-all duration-200 sm:ml-2 hover:text-white'
          >
            E-Commerce Website
          </StyledLink>
          <div className='flex flex-row gap-2 items-center'>
            <StyledLink
              href={'/cart'}
              className='flex flex-row gap-3 justify-center items-center hover:text-green-700 font-medium text-sm bg-white text-green-500 py-2 px-4 rounded-full'
            >
              <span className='font-medium'>
                <FaShoppingCart />
              </span>
              Cart
            </StyledLink>
            <StyledLink
              href={'#'}
              className='relative flex items-center gap-2 text-sm justify-between font-medium text-green-500 transition-all duration-200 sm:ml-2 hover:text-green-700 py-2 px-7 bg-white rounded-full'
            >
              <span className='font-medium'>
                <FaRegUser />
              </span>
              Username
            </StyledLink>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className='relative flex items-center gap-2 text-sm justify-between font-medium text-green-500 transition-all duration-200 sm:ml-2 hover:text-green-700 py-2 px-7 bg-white rounded-full'
            >
              <span className='font-medium'>
                <FaRegUser />
              </span>
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Sidebar;
