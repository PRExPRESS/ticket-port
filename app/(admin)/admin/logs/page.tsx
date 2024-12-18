'use client';

import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon, FunnelIcon, DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import Breadcrumb from "@/app/components/Breadcrumb";

interface Log {
  id: number;
  user: string;
  action: string;
  timestamp: string;
  status: "success" | "error" | "info";
}

const mockLogs: Log[] = [
  { id: 1, user: "John Doe", action: "Ticket Purchase", timestamp: "2024-12-18 14:30", status: "success" },
  { id: 2, user: "Jane Smith", action: "Login", timestamp: "2024-12-18 13:50", status: "success" },
  { id: 3, user: "Admin", action: "Refund Processed", timestamp: "2024-12-18 13:10", status: "info" },
  { id: 4, user: "Mike Brown", action: "Payment Failed", timestamp: "2024-12-18 12:45", status: "error" },
];

const LogPage: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>(mockLogs);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  useEffect(() => {
    let filtered = mockLogs;

    // Apply status filter
    if (filterStatus) {
      filtered = filtered.filter((log) => log.status === filterStatus);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((log) =>
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.user.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setLogs(filtered);
  }, [searchTerm, filterStatus]);

  const exportLogs = (format: "csv" | "pdf") => {
    console.log(`Exporting logs as ${format.toUpperCase()}`);
    // Implement export logic (e.g., CSV generation or PDF rendering)
  };

  return (
    <div className="p-6 bg-background-light dark:bg-background-dark min-h-screen">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">Logs</h1>
      <Breadcrumb items={[
        { title: 'Home', link: '#' },
        { title: 'Logs', link: '#' },
      ]} />

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row items-center gap-4 mt-10 mb-6">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search logs..."
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
            onChange={(e) => setFilterStatus(e.target.value || null)}
          >
            <option value="">All Statuses</option>
            <option value="success">Success</option>
            <option value="error">Error</option>
            <option value="info">Info</option>
          </select>
        </div>

        <button
          onClick={() => exportLogs("csv")}
          className="flex items-center gap-2 px-4 py-2 bg-secondary text-gray-900 rounded shadow hover:bg-hoverEffects-gold transition"
        >
          <DocumentArrowDownIcon className="w-5 h-5" />
          Export CSV
        </button>

        <button
          onClick={() => exportLogs("pdf")}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded shadow hover:bg-buttonHover-light dark:hover:bg-buttonHover-dark transition"
        >
          <DocumentArrowDownIcon className="w-5 h-5" />
          Export PDF
        </button>
      </div>

      {/* Log Table */}
      <div className="bg-white dark:bg-inputBackground-dark rounded shadow-lg overflow-auto">
        <table className="w-full table-auto">
          <thead className="bg-primary text-white">
            <tr>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Action</th>
              <th className="p-3 text-left">Timestamp</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                <td className="p-3">{log.user}</td>
                <td className="p-3">{log.action}</td>
                <td className="p-3">{log.timestamp}</td>
                <td
                  className={`p-3 font-semibold ${
                    log.status === "success"
                      ? "text-feedback-success"
                      : log.status === "error"
                      ? "text-feedback-error"
                      : "text-secondary"
                  }`}
                >
                  {log.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Placeholder */}
      <div className="mt-6 flex justify-end">
        <p className="text-sm text-text-muted">Showing {logs.length} of {mockLogs.length} logs</p>
      </div>
    </div>
  );
};

export default LogPage;
