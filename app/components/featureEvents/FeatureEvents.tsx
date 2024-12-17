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
    <div className='flex flex-col justify-between  w-full h-full p-[67px] my-[50px] '>
      <span className='text-5xl font-bold text-text-light dark:text-text-dark font-playfair '>Featured Events</span>

      <div className="flex flex-col justify-center items-center w-full h-full ">

        <div className="w-full h-full flex-col justify-center items-center mt-10">
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            modules={[Navigation, Pagination]}
            className="mySwiper"
          >
            {
              events.map((item, index) => {
                if (index > 5) return
                return (
                  <SwiperSlide key={index}>
                    <div>
                      <ItemCard />
                    </div>
                  </SwiperSlide>
                )
              })
            }

          </Swiper>
        </div>

      <Button label='View All' onClick={() => { }}
        className='bg-primary hover:bg-hoverEffects-gold text-white p-4 mt-8 h-[50px] w-[200px]'
      />
      </div>




    </div>
  )
}

export default FeatureEvents
