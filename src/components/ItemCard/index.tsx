import { CalendarDateRangeIcon, CalendarIcon, ClockIcon, MapPinIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import React from 'react'
import Button from '../CustomBotton'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'


const ItemCard = () => {
  return (
    <div className='col-span-1 flex flex-col items-center bg-white border dark:border-gray-200/10 rounded-lg hover:shadow-xl '>
      <div className="block w-full  bg-gray-300 rounded-lg overflow-hidden">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <Image src="/imgs/sample-event.jpg" alt="Product Image" width={296} height={180} className='rounded-t-lg' />
            
          </motion.div>
        </AnimatePresence>
      </div>
      {/* info */}
      <div className="flex flex-col px-4 py-2 items-center gap-5">
        <span className='text-2xl font-bold text-text-light dark:text-text-dark font-playfair'>Smbathra</span>
        <div className="flex flex-col gap-1">
          
          <div className='flex flex-row items-center text-sm text-text-muted font-medium font-roboto gap-2'>
            <CalendarIcon className='w-4 h-4 inline-block' /> 
            21st November 2024
          </div>
          <div className='flex flex-row items-center text-sm text-text-muted font-medium font-roboto gap-2'>
            <ClockIcon className='w-4 h-4 inline-block' /> 
            04:00 PM 
          </div>
          <div className='flex flex-row items-center text-sm text-text-muted font-medium font-roboto gap-2'>
            <MapPinIcon className='w-4 h-4 inline-block' /> 
            Horizon Campus
          </div>
          
        </div>
      </div>

    <Link href={ `/view-event/${1}`} className='w-10/12'>
      <Button 
      label='Buy Ticket' 
      className='bg-accent hover:bg-hoverEffects-gold text-primary p-4 w-full  mb-4' 
      onClick={() => {}}
      />
    </Link>
    </div>
  )
}

export default ItemCard
