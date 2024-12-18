import React from "react";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline"; // HeroIcon (chat bubble)

interface OpenChatButtonProps {
  onClick: () => void; // Function to open chat
  icon?: string; // Optional custom image URL
}

const OpenChatButton: React.FC<OpenChatButtonProps> = ({ onClick, icon }) => {
  return (
    <button
      onClick={onClick}
      aria-label="Open Chat"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:bg-buttonHover-light dark:hover:bg-buttonHover-dark transition-all duration-300 focus:outline-none"
    >
      {/* Optional Custom Icon */}
      {icon ? (
        <img src={icon} alt="Chat Icon" className="w-8 h-8 object-contain" />
      ) : (
        <ChatBubbleOvalLeftEllipsisIcon className="w-8 h-8 text-white" />
      )}
    </button>
  );
};

export default OpenChatButton;
