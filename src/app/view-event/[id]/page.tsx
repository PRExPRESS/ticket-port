'use client';
import React from 'react';


import { CalendarIcon, ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';
import Button from '@/app/components/CustomBotton';
import RelatedEvents from '@/app/components/RelatedEvents';
import Link from 'next/link';

const EventViewPage = () => {
  return (
    <div className="container mx-auto mt-[50px] px-4 py-8 bg-background-light dark:bg-background-dark flex flex-col items-center">
      {/* Event Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section: Event Image */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold  text-primary dark:text-text-dark">
            Tutorial on Canvas Painting for Beginners
          </h1>
          <p className="text-text-muted mt-2 dark:text-gray-400">
            Online Event • Starts on Wed, Jun 01, 2022 at 5:30 AM • Duration: 1h
          </p>
          <img
            src="/imgs/sample-event.jpg"
            alt="Event Banner"
            className="w-full h-64 object-cover rounded-lg mt-5"
          />

          {/* Action Buttons */}
          <div className="flex gap-4 mt-4">
            <Button
              label="Save"
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-text-dark"
              onClick={() => {}}
            />
            <Button
              label="Share"
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-text-dark"
              onClick={() => {}}
            />
          </div>

          {/* About This Event */}
          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-text-light dark:text-text-dark">About This Event</h2>
            <p className="mt-4 text-text-muted dark:text-gray-400 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae justo, sodales
              mattis erat et, mattis faucibus erat. Nulla amet convallis neque euismod ex. Maecenas
              efficitur facilisis lectus venenatis fermentum...
            </p>
          </section>
        </div>

        {/* Right Section: Event Details Panel */}
        <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg border border-border-light dark:border-border-dark">
          <h3 className="text-xl font-bold mb-4 text-text-light dark:text-text-dark">Event Details</h3>

          {/* Countdown */}
          <div className="flex justify-between mb-6">
            {['Days', 'Hours', 'Minutes', 'Seconds'].map((unit, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-bold text-accent">166</p>
                <p className="text-text-muted text-sm dark:text-gray-400">{unit}</p>
              </div>
            ))}
          </div>

          {/* Organizer Info */}
          <p className="text-text-muted dark:text-gray-400">
            <span className="font-semibold">Organized by:</span> Story Tellers
          </p>
          <p className="text-accent underline mt-1 cursor-pointer">View Profile</p>

          {/* Date and Time */}
          <div className="flex items-center gap-2 mt-4 text-text-muted dark:text-gray-400">
            <CalendarIcon className="w-5 h-5" />
            <span>Wed, Jan 01, 2022, 5:30 AM</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 mt-4 text-text-muted dark:text-gray-400">
            <MapPinIcon className="w-5 h-5" />
            <span>Online</span>
          </div>

          {/* Price */}
          <p className="text-text-light dark:text-text-dark font-bold mt-4">AUD $50.00</p>

          {/* CTA Button */}
          <Link href={`/purchase/${1}`} className={`w-full mt-4 bg-primary dark:bg-accent hover:bg-hoverEffects-gold dark:hover:bg-hoverEffects-gold text-white py-3 rounded-lg dark:text-gray-900`}>
          <Button
            label="Buy Now"
            className="w-full mt-4 bg-primary dark:bg-accent hover:bg-hoverEffects-gold dark:hover:bg-hoverEffects-gold text-white py-3 rounded-lg dark:text-gray-900"
            onClick={() => {}}
          />
          </Link>
        </div>
      </div>

      {/* Related Events */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-4">More Events</h2>
        <RelatedEvents />
      </section>
    </div>
  );
};

export default EventViewPage;
