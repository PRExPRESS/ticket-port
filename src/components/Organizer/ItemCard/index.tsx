'use client';
import React from 'react';
import { MapPinIcon, CalendarIcon, TicketIcon, PencilIcon, TrashIcon, UserGroupIcon } from '@heroicons/react/24/outline';

type EventCardProps = {
  name: string;
  location: string;
  date: string;
  totalTickets: number ;
  purchases: number;
  status: string;
  onEdit: () => void;
  onDelete: () => void;
};

const EventCard: React.FC<EventCardProps> = ({
  name,
  location,
  date,
  totalTickets,
  purchases,
  status,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="w-full bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg hover:shadow-2xl p-4 flex flex-col gap-4 transition duration-300">
      {/* Event Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <MapPinIcon className="h-4 w-4 text-blue-500" />
            {location}
          </p>
        </div>

        {/* Edit & Delete Icons */}
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="text-blue-500 hover:text-blue-600 transition duration-300"
            title="Edit Event"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          <button
            onClick={onDelete}
            className="text-red-500 hover:text-red-600 transition duration-300"
            title="Delete Event"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Event Info */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <CalendarIcon className="h-5 w-5 text-green-500" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <TicketIcon className="h-5 w-5 text-yellow-500" />
          <span>
            {totalTickets}
            {/* {totalTickets === 'Unlimited' ? 'Unlimited Tickets' : `${totalTickets} Tickets`} */}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <UserGroupIcon className="h-5 w-5 text-purple-500" />
          <span>{purchases} Purchases</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold">
          <span
            className={`${
              status === 'Active'
                ? 'text-green-500'
                : status === 'Ended'
                ? 'text-red-500'
                : 'text-yellow-500'
            }`}
          >
            {status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
