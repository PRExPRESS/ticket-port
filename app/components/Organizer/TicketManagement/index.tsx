import React from 'react';
import Button from '../../../components/CustomBotton';
import AddTicketModal from '../CreateTicket';
import TicketCard from '../TicketCard';

const TicketManagement = () => {
    const [isOpen,setIsOpen] = React.useState(false);
  return (
    <div className="w-full h-full">
      <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">Ticket Management</h2>
      <Button label="Add Ticket" className="bg-accent text-white hover:bg-hoverEffects-gold" onClick={() => setIsOpen(true)} />
      <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 grid grid-cols-2 md:grid-cols-4">
        <div className="col-start-1">
        <TicketCard
        title="New Small"
        date="May 3, 2022"
        price={"10"}
        totalTickets={20}
        ticketLimit={2}
        discount="5%"
        onDelete={()=>{}}
        onToggle={()=>{}}
      />
        </div>
      </div>
      {
        isOpen && <AddTicketModal onClose={setIsOpen} onSave={()=>{}} />
      }
    </div>
  );
};

export default TicketManagement;
