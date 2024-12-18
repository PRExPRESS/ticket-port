import React from 'react';

import SelectInput from '../../../components/SelectInput';
import Input from '../../FormInput';

const EventDetails = () => {
  const categories = [
    { value: 'music', label: 'Music' },
    { value: 'sports', label: 'Sports' },
    { value: 'education', label: 'Education' },
  ];

  return (
    <div className="">
      <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">Event Details</h2>
      
      <Input
        label="Event Name*"
        placeholder="Enter event name here"
        value=""
        onChange={() => {}}
      />
      
      <SelectInput
        label="Category*"
        options={categories}
        placeholder="Select category"
        onChange={() => {}}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input type="date" label="Event Date*" value="" onChange={() => {}} />
        <Input type="time" label="Event Time*" value="" onChange={() => {}} />
      </div>

      <Input label="Duration*" placeholder="e.g., 1h, 2h" value="" onChange={() => {}} />

      <Input
        label="Event Banner*"
        type="file"
        value=""
        onChange={() => {}}
      />

      <label className="block text-gray-700 dark:text-text-dark text-sm font-semibold">Description</label>
      <textarea
        rows={4}
        placeholder="Describe your event..."
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent"
      />
    </div>
  );
};

export default EventDetails;
