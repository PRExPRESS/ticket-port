import React from 'react';

const activities = [
  'New Event Created: Painting Class',
  '10 Tickets Sold for XYZ Event',
  'Revenue Updated: $500 for Event ABC',
  'Event Updated: Summer Festival Details',
];

const RecentActivities = () => {
  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-4">Recent Activities</h2>
      <ul className="space-y-2">
        {activities.map((activity, index) => (
          <li
            key={index}
            className="text-text-muted dark:text-gray-400 border-b last:border-b-0 pb-2"
          >
            {activity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivities;
