import React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Chat } from '@/lib/schema';

interface ChatHistoryProps {
  chats: Chat[];
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ chats }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
      <h2 className="text-lg font-semibold p-4 border-b dark:border-gray-700">Chat History</h2>
      <div className="divide-y dark:divide-gray-700">
        {chats.map((chat) => (
          <Link href={`/chat/${chat.id}`} key={chat.id}>
            <div className="p-4 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              <h3 className="font-medium">{chat.title}</h3>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {format(new Date(chat.createdAt), 'MMM d, yyyy')}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChatHistory;