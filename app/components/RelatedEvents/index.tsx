import React from 'react';
import ItemCard from '../ItemCard';


const RelatedEvents: React.FC = () => {
  const events = [1, 2, 3, 4]; // Replace with real data

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {events.map((_, index) => (
        <ItemCard key={index} />
      ))}
    </div>
  );
};

export default RelatedEvents;
