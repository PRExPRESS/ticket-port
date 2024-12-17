import Image from 'next/image'
import React from 'react'


const HowToBuySection = () => {
    return (
        <div className='w-full h-full p-[67px] my-[50px] flex flex-col'>
            <span className='text-5xl font-bold text-text-light dark:text-text-dark font-playfair'>How Ticket Port Works</span>
            <div className="flex flex-col w-full h-full items-center justify-center  mt-10 ">
                <div className="w-full h-full md:w-6/2 flex flex-col md:flex-row justify-center md:justify-around items-center mt-10">

                    <div className="flex flex-col w-full md:w-3/12 h-full justify-center items-center bg-white border dark:border-gray-200/10 rounded-lg hover:shadow-xl p-[25px]">
                        <Image src="/imgs/magnifier.png" alt="Product Image" width={50} height={50} className='rounded-t-lg' />
                        <span className='text-lg font-bold text-text-light font-roboto'>Discover Events</span>
                        <p className='text-sm text-text-muted font-medium font-roboto w-10/12 text-center'>Browse thousands of events and find the perfect one.</p>
                    </div>

                    <div className="flex flex-col w-full md:w-3/12 h-full justify-center items-center bg-white border dark:border-gray-200/10 rounded-lg hover:shadow-xl p-[25px]">
                        <Image src="/imgs/ticket.png" alt="Product Image" width={50} height={50} className='rounded-t-lg' />
                        <span className='text-lg font-bold text-text-light font-roboto'>Secure Tickets</span>
                        <p className='text-sm text-text-muted font-medium font-roboto w-10/12 text-center'>Choose your tickets and pay securely.</p>
                    </div>

                    <div className="flex flex-col w-full md:w-3/12 h-full justify-center items-center bg-white border dark:border-gray-200/10 rounded-lg hover:shadow-xl p-[25px]">
                        <Image src="/imgs/cone.png" alt="Product Image" width={50} height={50} className='rounded-t-lg' />
                        <span className='text-lg font-bold text-text-light font-roboto'>Enjoy The Event</span>
                        <p className='text-sm text-text-muted font-medium font-roboto w-10/12 text-center'>Present your e-ticket at the venue and enjoy!</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default HowToBuySection
