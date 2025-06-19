import React from 'react';
import Button from '../../CustomBotton';

type TicketCardProps = {
  id: number;
  name: string;
  price: string;
  qty: number;
  onDelete: (id: number) => void; // Delete handler function
};

const TicketCard: React.FC<TicketCardProps> = ({ id, name, price, qty, onDelete }) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800 w-full">
      {/* Header */}
      <div className="flex flex-col items-start justify-between">
        <h2 className="text-lg font-bold text-text-light dark:text-text-dark">{name}</h2>
        <p>Price: LKR {price}</p>
        <p>Qty: {qty}</p>

        {/* Delete Button */}
        <Button
          label="Delete"
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg mt-4"
          onClick={() => onDelete(id)} // Call the delete handler with the ticket ID
        />
      </div>
    </div>
  );
};

export default TicketCard;
