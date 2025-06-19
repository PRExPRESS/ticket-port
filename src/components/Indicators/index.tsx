import React from 'react';

const indicators = [
  { label: 'Total Attendees', value: '2,345' },
  { label: 'Total Purchases', value: '1,234' },
  { label: 'Total Revenue', value: '$12,450' },
  { label: 'Total Events', value: '25' },
  { label: 'Active Events', value: '8' },
];

const Indicators = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      {indicators.map((indicator) => (
        <div
          key={indicator.label}
          className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex flex-col items-center"
        >
          <span className="text-xl font-semibold text-text-light dark:text-text-dark">
            {indicator.value}
          </span>
          <span className="text-sm text-text-muted dark:text-gray-400">{indicator.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Indicators;
