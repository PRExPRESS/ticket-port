'use client'
import { useAuth } from '@/app/context/AuthContext';
import { Bars3Icon, MoonIcon, PowerIcon, SunIcon, UserIcon } from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import React, { useState } from 'react'
import MobileNavbar from '../MobileNavbar';
import Navbar from '../navbar/Navbar';
import Image from 'next/image';
import { UserCircleIcon } from '@heroicons/react/24/outline';


const Topbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const username = 'John Doe'
  const letter = username.charAt(0);

  //const {isAuthenticated, logout} = useAuth();
  const isAuthenticated = true;
  const logout = () => { }

  return (

    <div className='w-full  dark:bg-background-dark  border-b dark:border-gray-200/10 flex flex-row items-center justify-between  p-4 shadow'>

      <Link href={'/'} className="flex flex-row items-center md:w-2/12">
        <div className=''>
          <Image
            src={'/imgs/logo/logo.png'}
            width={30}
            height={30}
            alt='logo'

            className='w-full h-full object-contain' />
        </div>
        <span className='text-2xl font-fira font-bold text-primary dark:text-text-dark'>Ticket Port</span>
      </Link>
      <Navbar />
      <div className="hidden md:flex flex-row items-center justify-evenly w-3/12  gap-4">
        <span onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {
            theme === "dark" ? (
              <SunIcon className="w-6  h-6  text-white cursor-pointer hover:text-accent" />
            ) : (
              <MoonIcon className="w-6  h-6  text-text-light cursor-pointer hover:text-accent" />
            )
          }
        </span>
        <Link href={`/explore-events`} className='text-[16px] font-bold text-text-light dark:text-text-dark hover:text-hoverEffects-gold dark:hover:text-hoverEffects-gold font-roboto'>
          Explore Events
        </Link>
        <Link href={`/my-tickets`} className='text-[16px] font-bold text-text-light dark:text-text-dark hover:text-hoverEffects-gold dark:hover:text-hoverEffects-gold font-roboto'>
          My Tickets
        </Link>
        <Link href={`/auth/login`} className='text-[16px] font-bold text-text-light dark:text-text-dark hover:text-hoverEffects-gold dark:hover:text-hoverEffects-gold font-roboto'>
          Login
        </Link>
      </div>
      {
        isOpen && (
          <div className='flex flex-col justify-center items-center w-full h-full bg-white'>
            <MobileNavbar username={username} logout={logout} close={(): void => setIsOpen(false)} />
          </div>
        )
      }
      <div className='md:hidden block'>
        <Bars3Icon className='w-6 h-6' onClick={() => setIsOpen(!isOpen)} />
      </div>
    </div>
  )
}

export default Topbar
