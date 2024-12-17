import React from 'react';
import Button from '../CustomBotton';


interface Ticket {
    id: number;
    name: string;
    price: number;
}

const tickets: Ticket[] = [
    { id: 1, name: 'Early Bird', price: 50 },
    { id: 2, name: 'VIP', price: 100 },
    { id: 3, name: 'Regular', price: 30 },
];

interface TicketSelectionProps {
    addToCart: (ticket: { id: number; name: string; price: number }) => void;
}

const TicketSelection: React.FC<TicketSelectionProps> = ({ addToCart }) => {
    return (
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-4">Select Tickets</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {tickets.map((ticket) => (
                    <div
                        key={ticket.id}
                        className="p-4 border border-border-light dark:border-border-dark rounded-lg"
                    >
                        <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">
                            {ticket.name}
                        </h3>
                        <p className="text-text-muted dark:text-gray-400 mt-2">Price: ${ticket.price}</p>
                        <Button
                            label="Select"
                            className="mt-4 bg-primary dark:bg-accent hover:bg-hoverEffects-gold text-white py-2 px-4 "
                            onClick={() => addToCart(ticket)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TicketSelection;
