'use client';

import React from "react";
import { XMarkIcon, TrashIcon, CheckIcon, XCircleIcon } from "@heroicons/react/24/outline";

type NotificationItem = {
  id: number;
  title: string;
  description: string;
  time: string;
  type: "info" | "success" | "error";
  actions?: {
    label: string;
    onClick: () => void;
    color: "text-success" | "text-error";
  }
};


  

const NotificationPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const notifications: NotificationItem[] = [
        {
          id: 1,
          title: "Ticket Purchase Successful",
          description: "You have successfully purchased a ticket for 'Concert Night'.",
          time: "2 min ago",
          type: "success",
        },
        {
          id: 2,
          title: "Message from Admin",
          description: "Your event details have been updated.",
          time: "30 min ago",
          type: "info",
        },
        {
          id: 3,
          title: "Payment Failed",
          description: "Your payment for 'Sports Event' has failed.",
          time: "1 hour ago",
          type: "error",
          actions: {
            label: "Retry Payment",
            onClick: () => {},
            color: "text-error",
          }
        },
      ];
  return (
    <div className="fixed top-16 right-4 w-96 max-h-[600px] bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark rounded-lg shadow-lg overflow-y-auto z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border-light dark:border-border-dark">
        <h3 className="text-lg font-roboto font-semibold">Notifications</h3>
        <button onClick={onClose}>
          <XMarkIcon className="w-5 h-5 text-text-muted hover:text-primary" />
        </button>
      </div>

      {/* Notification Items */}
      <div className="divide-y divide-border-light dark:divide-border-dark">
        {notifications.map((item) => (
          <div key={item.id} className="p-4 flex items-start gap-3">
            {/* Icon */}
            <div>
              {item.type === "success" && <CheckIcon className="w-6 h-6 text-feedback-success" />}
              {item.type === "info" && <XCircleIcon className="w-6 h-6 text-primary" />}
              {item.type === "error" && <XCircleIcon className="w-6 h-6 text-feedback-error" />}
            </div>

            {/* Content */}
            <div className="flex-1">
              <h4 className="text-sm font-roboto font-semibold">{item.title}</h4>
              <p className="text-xs text-text-muted">{item.description}</p>
              <p className="text-xs mt-1 text-text-placeholder">{item.time}</p>
            </div>

            {/* Actions */}
            {/* {item.actions && (
              <div className="flex space-x-2">
                {item.actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.onClick}
                    className={`text-xs font-semibold ${action.color} hover:underline`}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )} */}

            {/* Delete Icon */}
            <button>
              <TrashIcon className="w-5 h-5 text-text-muted hover:text-feedback-error" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPopup;
