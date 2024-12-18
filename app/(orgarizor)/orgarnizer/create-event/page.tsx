'use client';
import React, { useState } from 'react';

import Button from '../../../components/CustomBotton';
import ProgressBar from '@/app/components/Organizer/ProgressBar';

import TicketManagement from '@/app/components/Organizer/TicketManagement';
import EventSettings from '@/app/components/Organizer/EventSettings';
import EventDetails from '@/app/components/Organizer/EventDetails';

const CreateEventPage = () => {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="container mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
      <h1 className="text-3xl font-bold text-text-light dark:text-text-dark mb-8">Create Event</h1>
      <ProgressBar step={step} />

      {step === 0 && <EventDetails />}
      {step === 1 && <TicketManagement />}
      {step === 2 && <EventSettings />}

      <div className="flex justify-between mt-8">
        {step > 0 && <Button label="Previous" className="bg-gray-300" onClick={prevStep} />}
        {step < 2 ? (
          <Button label="Next" className="bg-accent text-white" onClick={nextStep} />
        ) : (
          <Button label="Finish" className="bg-green-500 text-white" onClick={() => alert('Event Created!')} />
        )}
      </div>
    </div>
  );
};

export default CreateEventPage;
