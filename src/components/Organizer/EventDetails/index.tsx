import React from 'react';
import SelectInput from '../../../components/SelectInput';
import Input from '../../FormInput';

const EventDetails = ({ event, setEvent }:any) => {
  const categories = [
    { value: 'edm', label: 'edm' },
    { value: 'concert', label: 'Concert' },
    { value: 'Theatre', label: 'Theatre' },
  ];

  const handleCategoryChange = (selectedOption: any) => {
    console.log('selectedOption', selectedOption);
    setEvent({ ...event, category: selectedOption });
  };

  const handleBannerChange = (file:any) => {
    console.log('file', file);
    setEvent({ ...event, banner: file });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">Event Details</h2>

      <Input
        label="Event Name*"
        placeholder="Enter event name here"
        value={event.name}
        onChange={(e) => setEvent({ ...event, name: e.target.value })}
        className='mt-4'
      />

      <SelectInput
        label="Category*"
        options={categories}
        placeholder="Select category"
        value={event.category}
        onChange={handleCategoryChange}
        className='mt-4'
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="date"
          label="Event Date*"
          value={event.date}
          onChange={(e) => setEvent({ ...event, date: e.target.value })}
          className='mt-4'
        />
        <Input
          type="time"
          label="Event Time*"
          value={event.time}
          onChange={(e) => setEvent({ ...event, time: e.target.value })}
          className='mt-4'
        />
      </div>

      <Input
        label="Event Location*"
        placeholder="Enter event location here"
        value={event.location}
        onChange={(e) => setEvent({ ...event, location: e.target.value })}
        className='mt-4'
      />

      <Input
        label="Event Banner*"
        type="file"
        value={''}
        onChange={(e) => handleBannerChange(e.target.files ? e.target.files[0] : null)}
        className='mt-4'
      />

      <label className="block text-gray-700 dark:text-text-dark text-sm font-semibold">Description</label>
      <textarea
        rows={4}
        placeholder="Describe your event..."
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent"
        value={event.description}
        onChange={(e) => setEvent({ ...event, description: e.target.value })}
      />
    </div>
  );
};

export default EventDetails;
