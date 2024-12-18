'use client';

import React, { useState } from 'react';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';

const ChatBox: React.FC<{ isOpen: boolean; onClose: (input: boolean) => void }> = ({ isOpen, onClose }) => {
    const [isModelOpen, setIsModelOpen] = React.useState(true)
    
        React.useEffect(() => {
            if (isModelOpen) {
                onClose(true)
            } else {
    
                setTimeout(() => {
                    onClose(false)
                }, 500)
            }
        }, [isModelOpen, onClose]);
  return (
    <div>
        <AnimatePresence>
            {isModelOpen && (
                <motion.div
                initial={{ y: "100%", opacity: 0 }} // Initial position: fully hidden at the bottom
                animate={{ y: isOpen ? 0 : "100%", opacity: isOpen ? 1 : 0 }} // Animate to visible
                exit={{ y: "100%", opacity: 0 }} // Animate out when closed
                transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth transition
                className="fixed bottom-0 right-4 w-[90%] sm:w-[400px] h-[60vh] bg-background-light dark:bg-background-dark rounded-t-lg shadow-lg flex flex-col overflow-hidden z-50"
              >
                {/* Header */}
                <div className="flex justify-between items-center bg-primary text-white p-4">
                  <h3 className="text-lg font-roboto font-semibold">Chat with Us</h3>
                  <button onClick={() => setIsModelOpen(false)} aria-label="Close Chatbox">
                    <XMarkIcon className="w-6 h-6 text-white hover:text-accent" />
                  </button>
                </div>
          
                {/* Chat Body */}
                <div className="flex-1 p-4 overflow-y-auto text-text-light dark:text-text-dark">
                  <p>Welcome! How can we assist you today?</p>
                  {/* Add your chat messages or components here */}
                </div>
          
                {/* Chat Input */}
                <div className="p-4 bg-inputBackground-light dark:bg-inputBackground-dark">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="w-full p-2 rounded border border-border-light dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </motion.div>
            )}
        </AnimatePresence>
    </div>
  );
};

export default ChatBox;
