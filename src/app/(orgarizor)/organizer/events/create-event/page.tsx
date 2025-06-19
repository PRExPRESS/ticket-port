'use client';
import React, { use, useEffect, useState } from 'react';

import Button from '@/app/components/CustomBotton';
import ProgressBar from '@/app/components/Organizer/ProgressBar';
import TicketManagement from '@/app/components/Organizer/TicketManagement';
import EventSettings from '@/app/components/Organizer/EventSettings';
import EventDetails from '@/app/components/Organizer/EventDetails';
import { createEvent, createTicket } from '@/services/ticket.service';
import toastr from 'toastr';

type Ticket = {
  name: string;
  price: number;
  totalTickets: string;
  image: null;
  qty: number;
}

const CreateEventPage = () => {
  // Shared state for the event
  const [event, setEvent] = useState({
    name: '',
    category: '',
    date: '',
    time: '',

    banner: null,
    description: '',
    location: '',
  });

  useEffect(() => {
    console.log('event', event);
  }, [event]);
  const [ticketData, setTicketData] = useState<Ticket[]>([]);

  const [step, setStep] = useState(0);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleFinish = async () => {
    try {
      console.log('ticketData', ticketData);
      // Retrieve organizer data from localStorage
      let user;
      if (typeof window !== 'undefined') {
        user = JSON.parse(localStorage.getItem('organizer') || '{}');
      }

      if (!user || !user.id) {
        alert('User not found! Please log in again.');
        return;
      }

      // Ensure all required fields are provided
      if (
        !event.name ||
        !event.category ||
        !event.date ||
        !event.time ||
        !event.description ||
        !event.location
      ) {
        alert('Please fill in all required fields.');
        return;
      }

      // Create FormData object to handle file and other data
      const formData = new FormData();
      formData.append('vendorId', user.id); // Organizer's ID
      formData.append('eventName', event.name);
      formData.append('category', event.category);
      formData.append('date', event.date);
      formData.append('time', event.time);

      if (event.banner) {
        formData.append('banner', event.banner); // File upload
      }

      formData.append('description', event.description);
      formData.append('location', event.location);

      console.log('FormData before submission:', [...formData.entries()]); // Debugging: Log the FormData content

      // Send data to the server
      const response = await createEvent(formData);

      if (response.error) {
        toastr.error(response.error.message, '', {
          closeButton: true,
          debug: true,
          newestOnTop: true,
          progressBar: true,
          positionClass: 'toast-top-right',
          preventDuplicates: true,

          showDuration: 300,
          hideDuration: 1000,
          timeOut: 5000,
          extendedTimeOut: 1000,
          showEasing: 'swing',
          hideEasing: 'linear',
          showMethod: 'fadeIn',
          hideMethod: 'fadeOut',
        });
        return;
      }
      const eventId = response.event.id;

      /// upload tickets
      const ticketFormData = new FormData();
      

      

      

      // Append files
      
      
      const tickets = ticketData.map((ticket) => {
        return {
          name: ticket.name,
          price: ticket.price,
          totalTickets: ticket.totalTickets,
          qty: ticket.qty,
          eventId: eventId,
        };
      });
      const ticketJson = JSON.stringify(tickets);

      ticketFormData.append('tickets', ticketJson);
      ticketData.forEach((ticket) => {
        if (ticket.image) {
          ticketFormData.append('file', ticket.image);
        }
      })
      
      
      const ticketResponse = await createTicket(ticketFormData);

      if (ticketResponse.error) {
        toastr.error(response.error.message, '', {
          closeButton: true,
          debug: true,
          newestOnTop: true,
          progressBar: true,
          positionClass: 'toast-top-right',
          preventDuplicates: true,
          showDuration: 300,
          hideDuration: 1000,
          timeOut: 5000,
          extendedTimeOut: 1000,
          showEasing: 'swing',
          hideEasing: 'linear',
          showMethod: 'fadeIn',
          hideMethod: 'fadeOut',
        });
        return;
      }

      toastr.success('Event created successfully!', '', {
        closeButton: true,
        debug: true,
        newestOnTop: true,
        progressBar: true,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        showDuration: 300,
        hideDuration: 1000,
        timeOut: 5000,
        extendedTimeOut: 1000,
        showEasing: 'swing',
        hideEasing: 'linear',
        showMethod: 'fadeIn',
        hideMethod: 'fadeOut',
      });



    } catch (error) {
      console.error('Error in handleFinish:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  useEffect(() => {
    console.log('Ticket Data:', ticketData);
  }, [ticketData]);

  return (
    <div className="container mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
      <h1 className="text-3xl font-bold text-text-light dark:text-text-dark mb-8">Create Event</h1>
      <ProgressBar step={step} />
      <div className="w-1/2">
        {step === 0 && <EventDetails event={event} setEvent={setEvent} />}
      </div>
      {/* Pass the event data and updater to each step */}
      {step === 1 && <TicketManagement ticketData={ticketData} setTicketData={setTicketData} />}
      {step === 2 && <EventSettings />}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        {step > 0 && <Button label="Previous" className="bg-gray-300" onClick={prevStep} />}
        {step < 2 ? (
          <Button label="Next" className="bg-accent text-white" onClick={nextStep} />
        ) : (
          <Button label="Finish" className="bg-green-500 text-white" onClick={handleFinish} />
        )}
      </div>
    </div>

  );
};

export default CreateEventPage;
