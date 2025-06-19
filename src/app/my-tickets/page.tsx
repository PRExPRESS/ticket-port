'use client';
import React, { useEffect, useState } from 'react';
import Button from '../../components/CustomBotton';
import TicketCard2 from '../../components/PurchasedTicket';

import Header from '../../components/PageHeader';




//import BASE_URL from '../services/baseUrl';

const MyTicketsPage: React.FC = () => {
    const [tickets, setTickets] = useState<any[]>([]);
    const [unpaidTickets, setUnpaidTickets] = useState<any[]>([]);
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    // Simulating fetching data from data.json
    //   useEffect(() => {
    //     const fetchData = async () => {
    //       const response = await getUnpaidPayments(user.id);

    //       if(Array.isArray(response)) {
    //         setUnpaidTickets(response);
    //       }
    //     }

    //     fetchData();
    //   }, []);

    //   //get all tickets
    //   useEffect(() => {
    //     const fetchTickets = async () => {
    //       const response = await getPurchasesByUserId(user.id);
    //       if (Array.isArray(response)) {
    //         setTickets(response);
    //       }
    //     };
    //     fetchTickets();
    //   }, []);

    const handlePayment = (paymentId: string, amount: number) => {
        window.location.href = `/payment?paymentId=${paymentId}&amount=${amount}`
    }
    const ticketss = [
        {
            id: 1,
            type: 'Early Bird',
            price: 50,
            status: 'verified',
            secret_code: '123456'
        },
        {
            id: 2,
            type: 'Early Bird',
            price: 50,
            status: 'pending',
            secret_code: '123456'
        }

    ]
    return (
        <div className="bg-gray-100 dark:bg-background-dark flex flex-col justify-start h-full min-h-screen py-10 px-[10%]">
            <Header title="My Tickets" subtitle="View and manage your tickets" />
            <div className="dark:bg-gray-800 shadow-lg rounded-lg p-4 mt-2  w-full">
                

                {/* Important Notice */}
                <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md mt-4">
                    <strong>Important Notice:</strong> Please wait to download until the admin approves your payment. <br />
                    <span className='text-center'>ඔබේ ගණුදෙනුව අනුමත කරන තුරු මදක් රැදී සිටින්න.<br /> එකම ටිකට් පත සඳහා නැවත නැවත රිසිට්පත් අප්ලෝඩ් කිරීමෙන් වලකින්න!</span>
                </div>

                {/* Unpaid tickets */}
                {unpaidTickets.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold">Unpaid Tickets</h3>
                        <p className="text-sm text-gray-500">These tickets have not been paid yet.</p>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                            {unpaidTickets.map((ticket, index) => (
                                <div className='col-span-1'>
                                    <div key={index} className='flex flex-row justify-between p-4 border-2 rounded-lg shadow-md'>
                                        <div className="flex flex-col">
                                            <span>Payment ID: {ticket.id}</span>
                                            <span>Amount: {ticket.amount}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <Button label="Pay" onClick={() => handlePayment(ticket.id, ticket.amount)} />
                                        </div>

                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                    {ticketss.map((ticket) => (
                        <div key={ticket.id} className='col-span-1'>

                            <TicketCard2
                                
                                category={ticket.type}
                                quantity={ticket.price}
                                approved={ticket.status === 'verified'}
                                code={ticket.secret_code}
                                downloadLink={`${'BASE_URL'}/download/ticket/${ticket.secret_code}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

};

export default MyTicketsPage;
