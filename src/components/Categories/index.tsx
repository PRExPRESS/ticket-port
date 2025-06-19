import Image from 'next/image'
import React from 'react'
Image
const CategoriesSection = () => {
    return (
        <div className='flex flex-col justify-between items-start w-full h-full  '>
            <span className="text-3xl md:text-5xl font-bold text-primary dark:text-text-dark font-Roboto px-4 ">Browse Categories</span>
            <div className="flex flex-col w-full h-full items-center justify-center bg-gray-200 dark:bg-gray-800 mt-10 p-[25px]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6  w-full">

                    <div className="col-span-1 md w-full h-full justify-center items-center bg-white border dark:border-gray-200/10 rounded-lg hover:shadow-xl p-[25px]">
                    <div className="flex gap-6 items-center">
                        <Image src="/imgs/dj.png" alt="Product Image" width={100} height={100} className='rounded-t-lg' />
                        <span className='uppercase font-bold text-text-light font-roboto'>EDMs</span>
                    </div>
                    </div>

                    <div className="col-span-1 md w-full h-full justify-center items-center bg-white border dark:border-gray-200/10 rounded-lg hover:shadow-xl p-[25px]">
                    <div className="flex gap-6 items-center">
                        <Image src="/imgs/theater.png" alt="Product Image" width={100} height={100} className='rounded-t-lg' />
                        <span className='uppercase font-bold text-text-light font-roboto'>Theaters</span>
                    </div>
                    </div>

                    <div className="col-span-1 md w-full h-full justify-center items-center bg-white border dark:border-gray-200/10 rounded-lg hover:shadow-xl p-[25px]">
                    <div className="flex gap-6 items-center">
                        <Image src="/imgs/concert.png" alt="Product Image" width={100} height={100} className='rounded-t-lg' />
                        <span className='uppercase font-bold text-text-light font-roboto'>Concerts</span>
                    </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CategoriesSection
