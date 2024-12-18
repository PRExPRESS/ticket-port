'use client';
import React from 'react';
import { TrashIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { Switch } from '@headlessui/react';

type TicketCardProps = {
  title: string;
  date: string;
  price: string;
  totalTickets: number;
  ticketLimit: number;
  discount: string;
  onDelete: () => void;
  onToggle: (enabled: boolean) => void;
};

const TicketCard: React.FC<TicketCardProps> = ({
  title,
  date,
  price,
  totalTickets,
  ticketLimit,
  discount,
  onDelete,
  onToggle,
}) => {
  const [enabled, setEnabled] = React.useState(true);

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100">
            <span className="text-purple-500 text-lg">🎟️</span>
          </div>
          {/* Title & Price */}
          <div>
            <h3 className="text-lg font-bold text-text-light dark:text-text-dark">
              {title} - {price}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{date}</p>
          </div>
        </div>
        {/* Action Icons */}
        <div className="flex items-center gap-2">
          {/* Delete Icon */}
          <button
            onClick={onDelete}
            className="text-red-500 hover:text-red-600 transition duration-200"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
          {/* Toggle Switch */}
          <Switch
            checked={enabled}
            onChange={(value) => {
              setEnabled(value);
              onToggle(value);
            }}
            className={`${
              enabled ? 'bg-green-500' : 'bg-gray-300'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Enable ticket</span>
            <span
              className={`${
                enabled ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
          {/* Menu Icon */}
          <button className="text-gray-500 hover:text-gray-600">
            <EllipsisHorizontalIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Details Row */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 dark:text-gray-500">🎫</span>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total tickets</p>
            <p className="text-base font-bold text-text-light dark:text-text-dark">
              {totalTickets}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 dark:text-gray-500">👥</span>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ticket limit per customer
            </p>
            <p className="text-base font-bold text-text-light dark:text-text-dark">
              {ticketLimit}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 dark:text-gray-500">🏷️</span>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Discount</p>
            <p className="text-base font-bold text-text-light dark:text-text-dark">
              {discount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
