'use client';
import React, { useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {
    ChartBarIcon,
    ChartPieIcon,

    DocumentArrowDownIcon,
    PresentationChartLineIcon,
} from '@heroicons/react/24/outline';
import Breadcrumb from '@/app/components/Breadcrumb';

ChartJS.register(...registerables);

const RevenueReport = () => {
    const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>('bar');

    // Organizer Info
    const organizer = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        contact: '+1 234 567 890',
    };

    // Event Data
    const events = [
        {
            id: 1,
            name: 'Tech Conference 2024',
            tickets: [
                { type: 'VIP', sold: 50, limit: 100 },
                { type: 'Regular', sold: 200, limit: 'Unlimited' },
                { type: 'Early Bird', sold: 100, limit: 150 },
            ],
            totalRevenue: 15000,
        },
        {
            id: 2,
            name: 'Music Fest',
            tickets: [
                { type: 'VIP', sold: 80, limit: 100 },
                { type: 'Regular', sold: 300, limit: 'Unlimited' },
            ],
            totalRevenue: 20000,
        },
    ];

    // Handle Export to PDF
    const exportToPDF = () => {
        const input = document.getElementById('revenue-report');
        if (input) {
            html2canvas(input).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
                pdf.save('revenue-report.pdf');
            });
        }
    };
    const revenueData = {
        totalRevenue: 150000,
        totalEvents: 25,
        totalPurchases: 2000,
        avgRevenuePerEvent: 6000,
        monthlyRevenue: [12000, 15000, 13000, 20000, 18000, 21000], // Example
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    };

    return (
        <div className="">
            <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">Organizer Revenue Report</h1>
            <Breadcrumb items={[
                { title: 'Home', link: '#' },
                { title: 'Reports', link: '/organizer/Reports' },

            ]} />
            <div id="revenue-report" className='mt-10'>


                {/* Organizer Info */}
                <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                        Organizer: {organizer.name}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">Email: {organizer.email}</p>
                    <p className="text-gray-600 dark:text-gray-400">Contact: {organizer.contact}</p>
                </div>

                {/* Revenue Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                    <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg shadow">
                        <p className="text-lg font-semibold text-gray-700 dark:text-white">Total Revenue</p>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                            ${revenueData.totalRevenue.toLocaleString()}
                        </p>
                    </div>
                    <div className="p-4 bg-green-100 dark:bg-green-900 rounded-lg shadow">
                        <p className="text-lg font-semibold text-gray-700 dark:text-white">Total Events</p>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-300">
                            {revenueData.totalEvents}
                        </p>
                    </div>
                    <div className="p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg shadow">
                        <p className="text-lg font-semibold text-gray-700 dark:text-white">Total Purchases</p>
                        <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-300">
                            {revenueData.totalPurchases}
                        </p>
                    </div>
                    <div className="p-4 bg-purple-100 dark:bg-purple-900 rounded-lg shadow">
                        <p className="text-lg font-semibold text-gray-700 dark:text-white">
                            Avg Revenue/Event
                        </p>
                        <p className="text-2xl font-bold text-purple-600 dark:text-purple-300">
                            ${revenueData.avgRevenuePerEvent.toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Event Reports */}
                <div className="flex flex-row w-full  items-center justify-between gap-6">
                    {events.map((event) => {
                        const chartData = {
                            labels: event.tickets.map((ticket) => ticket.type),
                            datasets: [
                                {
                                    label: 'Tickets Sold',
                                    data: event.tickets.map((ticket) => ticket.sold),
                                    backgroundColor: ['#3B82F6', '#10B981', '#F59E0B'],
                                    borderColor: '#ffffff',
                                    borderWidth: 2,
                                },
                            ],
                        };

                        return (
                            <div
                                key={event.id}
                                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md flex flex-col items-center w-full "
                            >
                                {/* Event Header */}
                                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                                    {event.name}
                                </h2>

                                {/* Chart Controls */}
                                <div className="flex items-center gap-4 mt-4">
                                    <button
                                        onClick={() => setChartType('bar')}
                                        className={`p-2 rounded ${chartType === 'bar' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                                            }`}
                                    >
                                        <ChartBarIcon className="h-6 w-6" />
                                    </button>
                                    <button
                                        onClick={() => setChartType('line')}
                                        className={`p-2 rounded ${chartType === 'line' ? 'bg-green-500 text-white' : 'bg-gray-200'
                                            }`}
                                    >
                                        <PresentationChartLineIcon className="h-6 w-6" />
                                    </button>
                                    <button
                                        onClick={() => setChartType('pie')}
                                        className={`p-2 rounded ${chartType === 'pie' ? 'bg-yellow-500 text-white' : 'bg-gray-200'
                                            }`}
                                    >
                                        <ChartPieIcon className="h-6 w-6" />
                                    </button>
                                </div>

                                {/* Chart */}
                                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mt-4">
                                    {chartType === 'bar' && <Bar data={chartData} />}
                                    {chartType === 'line' && <Line data={chartData} />}
                                    {chartType === 'pie' && <Pie data={chartData} />}
                                </div>

                                {/* Event Details */}
                                <div className="mt-4 text-gray-700 dark:text-gray-300">
                                    <p>Total Revenue: ${event.totalRevenue.toLocaleString()}</p>
                                    {event.tickets.map((ticket) => (
                                        <p key={ticket.type}>
                                            {ticket.type} Tickets: {ticket.sold} /{' '}
                                            {ticket.limit ? ticket.limit : 'Unlimited'}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>

            {/* Export Button */}
            <div className="flex justify-end mt-6">
                <button
                    onClick={exportToPDF}
                    className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    <DocumentArrowDownIcon className="h-5 w-5" />
                    Download Report
                </button>
            </div>
        </div>
    );
};

export default RevenueReport;
