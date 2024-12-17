import React from 'react';
import { CalendarIcon, ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';

const EventDetails: React.FC = () => {
  return (
    <div className="bg-gray-100 dark:bg-background-dark p-6 rounded-lg mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          src="/imgs/sample-event.jpg"
          alt="Event"
          className="w-full h-64 object-cover rounded-lg"
        />
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">
            Tutorial on Canvas Painting for Beginners
          </h1>
          <p className="text-text-muted dark:text-gray-400 mt-2">
            Organized by{' '}
            <a href="#" className="text-accent underline">
              Story Tellers
            </a>
          </p>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2 text-text-muted">
              <CalendarIcon className="w-5 h-5" />
              <span>21st November 2024</span>
            </div>
            <div className="flex items-center gap-2 text-text-muted">
              <ClockIcon className="w-5 h-5" />
              <span>04:00 PM</span>
            </div>
            <div className="flex items-center gap-2 text-text-muted">
              <MapPinIcon className="w-5 h-5" />
              <span>Horizon Campus</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
