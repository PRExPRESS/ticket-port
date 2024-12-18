'use client';

import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Breadcrumb from "@/app/components/Breadcrumb";

interface Feedback {
  id: number;
  customer: string;
  event: string;
  comment: string;
  sentiment: "Positive" | "Neutral" | "Negative";
  date: string;
}

const feedbackData: Feedback[] = [
  { id: 1, customer: "John Doe", event: "Music Concert", comment: "Amazing experience!", sentiment: "Positive", date: "2024-12-18" },
  { id: 2, customer: "Jane Smith", event: "Tech Conference", comment: "Average event.", sentiment: "Neutral", date: "2024-12-17" },
  { id: 3, customer: "Mike Brown", event: "Sports Gala", comment: "Terrible organization!", sentiment: "Negative", date: "2024-12-16" },
];

const FeedbackPage: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(feedbackData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSentiment, setFilterSentiment] = useState<string | null>(null);
  ChartJS.register(ArcElement, Tooltip, Legend);

  useEffect(() => {
    let filtered = feedbackData;

    // Apply sentiment filter
    if (filterSentiment) {
      filtered = filtered.filter((f) => f.sentiment === filterSentiment);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((f) =>
        f.comment.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFeedbacks(filtered);
  }, [searchTerm, filterSentiment]);

  // Chart Data for Sentiment Analysis
  const chartData = {
    labels: ["Positive", "Neutral", "Negative"],
    datasets: [
      {
        label: "Sentiment Analysis",
        data: [
          feedbackData.filter((f) => f.sentiment === "Positive").length,
          feedbackData.filter((f) => f.sentiment === "Neutral").length,
          feedbackData.filter((f) => f.sentiment === "Negative").length,
        ],
        backgroundColor: ["#16A34A", "#FFD700", "#DC2626"],
      },
    ],
  };

  return (
    <div className="p-6 bg-background-light dark:bg-background-dark min-h-screen">
      {/* Page Title */}
      <h1 className="text-2xl font-roboto font-semibold text-text-light dark:text-text-dark mb-6">
        Customer Feedbacks
      </h1>
      <Breadcrumb items={
        [
            { title: "Home", link: "/admin/" },
            { title: "Feedbacks", link: "/admin/feedbacks" },

        ]
        } />

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row items-center gap-4 mt-6 mb-6">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search feedback..."
            className="w-full p-2 rounded border border-border-light dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <MagnifyingGlassIcon className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="flex items-center gap-2">
          <FunnelIcon className="w-5 h-5 text-gray-500" />
          <select
            className="p-2 rounded border border-border-light dark:border-border-dark focus:outline-none"
            onChange={(e) => setFilterSentiment(e.target.value || null)}
          >
            <option value="">All Sentiments</option>
            <option value="Positive">Positive</option>
            <option value="Neutral">Neutral</option>
            <option value="Negative">Negative</option>
          </select>
        </div>
      </div>

      {/* Feedback Table */}
      <div className="bg-white dark:bg-inputBackground-dark rounded shadow-lg overflow-auto">
        <table className="w-full table-auto">
          <thead className="bg-primary text-white">
            <tr>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Event</th>
              <th className="p-3 text-left">Comment</th>
              <th className="p-3 text-left">Sentiment</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback.id} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                <td className="p-3">{feedback.customer}</td>
                <td className="p-3">{feedback.event}</td>
                <td className="p-3">{feedback.comment}</td>
                <td
                  className={`p-3 font-semibold ${
                    feedback.sentiment === "Positive"
                      ? "text-feedback-success"
                      : feedback.sentiment === "Neutral"
                      ? "text-secondary"
                      : "text-feedback-error"
                  }`}
                >
                  {feedback.sentiment}
                </td>
                <td className="p-3">{feedback.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sentiment Chart */}
      <div className="mt-8 w-full md:w-1/2 mx-auto">
        <h2 className="text-lg font-roboto font-semibold text-center mb-4 text-text-light dark:text-text-dark">
          Sentiment Analysis Overview
        </h2>
        <Pie data={chartData} />
      </div>
    </div>
  );
};

export default FeedbackPage;
