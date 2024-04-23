'use client';

import React, { useEffect, useState } from 'react';
import StyledLink from './atoms/StyledLink';
import { FaShoppingCart } from 'react-icons/fa';
import { FaRegUser } from 'react-icons/fa';
import { signOut } from 'next-auth/react';
import { MdLogout } from 'react-icons/md';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

function Sidebar() {
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(`/`);
    },
  });
  const user = session?.user;

  return (
    <nav className='fixed top-0 z-50 flex items-center justify-between h-16 w-full px-3 py-1.5 bg-green-500 border-b border-green-400 max-w-screen lg:px-5 lg:pl-3'>
      {loading ? null : (
        <div className='fade-in-1 flex flex-row justify-between w-full'>
          <div className='relative justify-center text-gray-100 flex-col lg:flex hidden '>
            <p className='font-semibold text-sm'>Created By</p>
            <div className='flex flex-row gap-5 text-sm font-mono'>
              <StyledLink
                className='hover:text-slate-800 p-1 transition-all duration-100'
                href={'https://github.com/Vaarun-C'}
                type='external'
              >
                Varun C
              </StyledLink>
              <StyledLink
                className='hover:text-slate-800 p-1 transition-all duration-100'
                href={'https://github.com/Vaarun-Kamath/'}
                type='external'
              >
                Varun Kamath
              </StyledLink>
              <StyledLink
                className='hover:text-slate-800 p-1 transition-all duration-100'
                href={'https://github.com/RockerBot'}
                type='external'
              >
                Vikas Paul Menezes
              </StyledLink>
              <StyledLink
                className='hover:text-slate-800 p-1 transition-all duration-100'
                href={'https://github.com/VishalMGodi'}
                type='external'
              >
                Vishal M Godi
              </StyledLink>
            </div>
          </div>
          <StyledLink
            href={'/home'}
            className='relative flex items-center lg:text-md justify-between font-semibold text-gray-100 transition-all duration-200 sm:ml-2 hover:text-white text-sm'
          >
            E-Commerce Website
          </StyledLink>

          <div className='flex flex-row gap-2 items-center'>
            <StyledLink
              href={'/cart'}
              className='flex flex-row gap-3 justify-center items-center hover:text-green-700 font-semibold lg:text-sm text-xs bg-white text-green-500 py-2 px-4 rounded-full'
            >
              <span className='font-semibold'>
                <FaShoppingCart />
              </span>
              Cart
            </StyledLink>
            <StyledLink
              href={'/orders'}
              className='flex flex-row gap-3 justify-center items-center hover:text-green-700 font-semibold lg:text-sm text-xs bg-white text-green-500 py-2 px-4 rounded-full'
            >
              <span className='font-semibold'>
                {/* <FaShoppingCart /> */}
              </span>
              Orders
            </StyledLink>
            <StyledLink
              href={'#'}
              className='relative flex items-center gap-2 lg:text-sm text-xs justify-between font-semibold text-green-500 transition-all duration-200 sm:ml-2 hover:text-green-700 py-2 px-7 bg-white rounded-full'
            >
              <span className='font-semibold'>
                <FaRegUser />
              </span>
              {user?.username}
            </StyledLink>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className='relative flex items-center gap-2 lg:text-sm text-xs justify-between font-semibold text-green-500 transition-all duration-200 sm:ml-2 hover:text-white hover:bg-red-600 py-2 px-7 bg-white rounded-full'
            >
              Logout
              <span className='font-semibold'>
                <MdLogout />
              </span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Sidebar;
