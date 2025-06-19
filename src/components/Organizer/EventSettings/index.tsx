import React from 'react';

const EventSettings = () => {
  const settings = [
    { label: 'Start bookings immediately.', checked: true },
    { label: 'Allow customers to cancel orders.', checked: false },
    { label: 'Charge service fees during booking.', checked: true },
    { label: 'Do not add special instructions on tickets.', checked: false },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">Event Settings</h2>
      <div className="space-y-4">
        {settings.map((setting, index) => (
          <label key={index} className="flex items-center gap-2">
            <input type="checkbox" defaultChecked={setting.checked} />
            <span className="text-sm font-medium text-text-light dark:text-text-dark">
              {setting.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default EventSettings;
