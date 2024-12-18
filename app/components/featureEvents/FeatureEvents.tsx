import React from 'react'
import ItemCard from '../ItemCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Button from '../CustomBotton';

const FeatureEvents = () => {
  const events = [
    {
      name: "Event 1",
      image: '/imgs/sample-event.jpg'
    },
    {
      name: "Event 2",
      image: '/imgs/sample-event.jpg'
    },
    {
      name: "Event 3",
      image: '/imgs/sample-event.jpg'
    },
    {
      name: "Event 4",
      image: '/imgs/sample-event.jpg'
    },
    {
      name: "Event 5",
      image: '/imgs/sample-event.jpg'
    },
    {
      name: "Event 5",
      image: '/imgs/sample-event.jpg'
    },
    {
      name: "Event 5",
      image: '/imgs/sample-event.jpg'
    },
  ]
  return (
    <div className='flex flex-col justify-between  w-full h-full p-4 my-[50px] '>
      <span className='text-3xl md:text-5xl font-bold text-primary dark:text-text-dark font-Roboto '>Featured Events</span>

      <div className="flex flex-col justify-center items-center w-full h-full ">

      <div className="grid grid-cols-1  md:grid-cols-4 gap-8 mt-10">
        {events.map((event, index) => (
          <ItemCard key={index}  />
        ))}
      </div>

      <Button label='View All' onClick={() => { }}
        className='bg-primary hover:bg-hoverEffects-gold text-white p-4 mt-8 h-[50px] w-[200px]'
      />
      </div>



    </div>
  )
}

export default FeatureEvents
