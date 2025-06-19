import React from 'react';

interface TicketCardProps {
  category: string;
  quantity: number;
  approved: boolean;
  downloadLink: string;
  code: string;
}

const TicketCard2: React.FC<TicketCardProps> = ({ category, quantity, approved, downloadLink,code }) => {
  return (
    <div className="p-4 border-2 rounded-lg shadow-md dark:bg-background-dark">
      <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">{category} Ticket</h3>
      <p className="text-sm text-gray-500 dark:text-text-dark">Price: {quantity}</p>
      <p className="text-sm text-gray-500 dark:text-text-dark">Code: {code}</p>
      <div className="mt-4">
        {approved ? (
          <a
            href={downloadLink}
            download
            className="bg-primary hover:bg-secondary text-white py-2 px-4 rounded-md"
          >
            Download
          </a>
        ) : (
          <p className="text-red-500">Pending</p>
        )}
      </div>
    </div>
  );
};

export default TicketCard2;
