import React, { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/outline';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="flex items-center">
          <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
              className="flex-1 p-2 rounded-l-md border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              disabled={disabled}
          />
          <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-r-md ${
                  disabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={disabled}
          >
            <PaperAirplaneIcon className="h-5 w-5 transform rotate-90" />
          </button>
        </div>
      </form>
  );
};

export default ChatInput;