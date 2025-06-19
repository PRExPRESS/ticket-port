import React from 'react';
import Button from '../../../components/CustomBotton';
import AddTicketModal from '../CreateTicket';
import TicketCard from '../TicketCard';

const TicketManagement = ({ ticketData, setTicketData }: any) => {
  const [isOpen, setIsOpen] = React.useState(false);

  // Function to delete a ticket
  const handleDeleteTicket = (id: number) => {
    const updatedTickets = ticketData.filter((_: any, index: any) => index !== id); // Remove the ticket by index
    setTicketData(updatedTickets); // Update the parent state
  };

  return (
    <div className="w-full h-full">
      <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">Ticket Management</h2>
      <Button
        label="Add Ticket"
        className="bg-accent text-white hover:bg-hoverEffects-gold"
        onClick={() => setIsOpen(true)}
      />
      <div className="p-4 mt-5 border rounded-lg bg-gray-50 dark:bg-gray-800 grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.isArray(ticketData) &&
          ticketData.map((ticket: any, index) => (
            <TicketCard
              key={index}
              {...ticket}
              id={index}
              onDelete={handleDeleteTicket} // Pass the delete handler
            />
          ))}
      </div>
      {isOpen && <AddTicketModal onClose={setIsOpen} ticketData={ticketData} />}
    </div>
  );
};

export default TicketManagement;
