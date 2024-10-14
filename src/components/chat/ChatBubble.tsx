import React from "react";
import { format } from "date-fns";

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
    timestamp: Date;
  }

  const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isUser, timestamp }) => {
    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
        <div
          className={`max-w-[70%] rounded-lg p-3 ${
            isUser
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
          }`}
        >
          <p>{message}</p>
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {format(timestamp, 'HH:mm')}
          </span>
        </div>
      </div>
    );
  };

  export default ChatBubble;