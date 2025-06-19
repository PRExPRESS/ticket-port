'use client';
import React, { useState } from 'react';

import Input from '../../FormInput';
import Button from '../../CustomBotton';

interface TicketCardProps {
  name: string;
  price: number; 
  totalTickets: string;
  image: File | null;
  qty: number;
}

const AddTicketModal = ({
  onClose,
  ticketData,
}: {
  onClose: (state: boolean) => void;
  ticketData: any[];
}) => {
  const [ticket, setTicket] = useState({
    name: '',
    price: 0, // Initialize as a number
    image: null,
    qty: 0,
  } as TicketCardProps);

  // Handle image and mime type (jpg/png/jpeg)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please select a valid image file (jpg, png, jpeg)');
        return;
      }
      setTicket({ ...ticket, image: file });
    }
  };

  // Handle submit
  const handleSubmit = () => {
    console.log('ticket', ticket);
    ticketData.push(ticket); // Push ticket to array
    onClose(false); // Close modal
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 inset-0 flex items-center justify-center bg-black/50">
      <div className="w-full h-[85vh] max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-auto">
        {/* Header */}
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-text-light dark:text-text-dark">
            Create Single Ticket
          </h2>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Ticket Name */}
          <Input
            label="Ticket Name*"
            type="text"
            placeholder="Event Ticket Name"
            value={ticket.name}
            onChange={(e) => setTicket({ ...ticket, name: e.target.value })}
          />

          {/* Ticket Price */}
          <Input
            label="Ticket Price*"
            type="number"
            placeholder="Ticket Price"
            value={ticket.price.toString()} // Convert number to string for input
            onChange={(e) => setTicket({ ...ticket, price: Number(e.target.value) })} // Explicitly convert to number
            className="mt-4"
          />

          {/* Total Tickets */}
          <Input
            label="Total Tickets*"
            type="number"
            placeholder="Total Tickets"
            value={ticket.qty.toString()} // Convert number to string for input
            onChange={(e: any) =>
              setTicket({ ...ticket, qty: Number(e.target.value) }) // Explicitly convert to number
            }
            className="mt-4"
          />

          {/* Image Upload */}
          <Input
            label="Image*"
            type="file"
            value=''
            onChange={(e: any) => handleImageChange(e)}
            className="mt-4"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {ticket.image ? ticket.image.name : ''}
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 p-4 border-t">
          <Button
            label="Cancel"
            className="bg-gray-300 text-black"
            onClick={() => onClose(false)}
          />
          <Button
            label="Save"
            className="bg-accent text-white hover:bg-hoverEffects-gold"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default AddTicketModal;
