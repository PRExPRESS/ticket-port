
import React from 'react'

import Logo from '../assets/IMG/logo.png';
import { XMarkIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence } from 'framer-motion';


interface MobileNavProps {
    username: string;
    logout: () => void;
    close: () => void;
}
const MobileNav: React.FC<MobileNavProps> = ({ username, logout, close }) => {

    return (
        <div className='w-full h-full inset-0 bg-black/50 fixed top-0 left-0 z-10'>
            <AnimatePresence>
                
            </AnimatePresence>
            <div className='w-8/12 h-full min-h-screen bg-white relative'>
                <span className='absolute top-0 right-0'><XMarkIcon className="w-8 h-8 text-primary cursor-pointer hover:stroke-secondary" onClick={close} /></span>
                <div className="w-full h-[auto] ">
                    <Link href={'/'} className="flex flex-row items-center p-6 md:w-2/12">
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
                    <div className="flex flex-col items-start justify-between w-full h-full gap-6 p-6">
                        {username && (
                            <span className='text-primary text-xl font-bold '>Hello, {username.split(' ')[0]}</span>

                        )}
                        {!username && (
                            <>
                                <span className='text-primary text-xl font-bold '>Hello, Guest</span>
                                <Link href={'/login'} className='hover:text-secondary mt-4' onClick={close}>Login</Link>
                            </>
                        )}


                        <Link href={'/'} className='text-[16px] font-bold text-text-light dark:text-text-dark hover:text-hoverEffects-gold dark:hover:text-hoverEffects-gold font-roboto' onClick={close}>Home</Link>

                        <Link href={'/mytickets'} className='text-[16px] font-bold text-text-light dark:text-text-dark hover:text-hoverEffects-gold dark:hover:text-hoverEffects-gold font-roboto' onClick={close}>My Tickets</Link>

                        <Link href={'/explore-events'} className='text-[16px] font-bold text-text-light dark:text-text-dark hover:text-hoverEffects-gold dark:hover:text-hoverEffects-gold font-roboto' onClick={close}>Explore Events</Link>

                        
                    </div>
                    <div className="flex flex-col items-start justify-between w-full h-full gap-6 p-6">
                        


                        <Link href={'/'} className='text-[16px] font-bold text-text-light dark:text-text-dark hover:text-hoverEffects-gold dark:hover:text-hoverEffects-gold font-roboto' onClick={close}>Concerts</Link>

                        <Link href={'/mytickets'} className='text-[16px] font-bold text-text-light dark:text-text-dark hover:text-hoverEffects-gold dark:hover:text-hoverEffects-gold font-roboto' onClick={close}>Theaters</Link>

                        <Link href={'/explore-events'} className='text-[16px] font-bold text-text-light dark:text-text-dark hover:text-hoverEffects-gold dark:hover:text-hoverEffects-gold font-roboto' onClick={close}>EDMs</Link>

                        {username && (
                            <Link href={'#'} className='hover:text-secondary mt-4 ' onClick={() => { logout(); close(); }}>Logout</Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MobileNav;
