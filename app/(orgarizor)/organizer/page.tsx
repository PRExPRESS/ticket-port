'use client';
import Breadcrumb from '@/app/components/Breadcrumb';
import Indicators from '@/app/components/Indicators';
import RecentActivities from '@/app/components/Organizer/ResentActivities';
import RevenueChart from '@/app/components/Organizer/RevenueChart';
import React from 'react';


const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">Dashboard</h1>
      <Breadcrumb items={[{ title: 'Dashboard', link: '#' }]} />

      {/* Indicators Section */}
      <Indicators />

      {/* Revenue Report Section */}
      <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-4">Revenue Report</h2>
        <RevenueChart />
      </div>

      {/* Recent Activities Section */}
      <RecentActivities />
    </div>
  );
};

export default Dashboard;
