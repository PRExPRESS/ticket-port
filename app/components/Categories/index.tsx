import Image from 'next/image'
import React from 'react'
Image
const CategoriesSection = () => {
    return (
        <div className='flex flex-col justify-between items-start w-full h-full  '>
            <span className='text-5xl font-bold text-text-light dark:text-text-dark font-playfair px-[67px]'>Browse Categories</span>
            <div className="flex flex-col w-full h-full items-center justify-center bg-gray-200 dark:bg-gray-800 mt-10 p-[67px]">
                <div className="w-full h-full md:w-1/2 flex flex-col md:flex-row justify-center md:justify-around items-center mt-10">
                
                                    <div className="flex flex-col w-full md:w-2/12 h-full justify-center items-center bg-white border dark:border-gray-200/10 rounded-lg hover:shadow-xl p-[25px]">
                                        <Image src="/imgs/dj.png" alt="Product Image" width={100} height={100} className='rounded-t-lg' />
                                        <span className='uppercase font-bold text-text-light font-roboto'>EDMs</span>
                                    </div>
                
                                    <div className="flex flex-col w-full md:w-2/12 h-full justify-center items-center bg-white border dark:border-gray-200/10 rounded-lg hover:shadow-xl p-[25px]">
                                        <Image src="/imgs/theater.png" alt="Product Image" width={100} height={100} className='rounded-t-lg' />
                                        <span className='uppercase font-bold text-text-light font-roboto'>Theaters</span>
                                    </div>
                
                                    <div className="flex flex-col w-full md:w-2/12 h-full justify-center items-center bg-white border dark:border-gray-200/10 rounded-lg hover:shadow-xl p-[25px]">
                                        <Image src="/imgs/concert.png" alt="Product Image" width={100} height={100} className='rounded-t-lg' />
                                        <span className='uppercase font-bold text-text-light font-roboto'>Concerts</span>
                                    </div>
                                </div>

            </div>
        </div>
    )
}

export default CategoriesSection
