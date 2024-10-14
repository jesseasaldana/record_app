import React, { useState, useEffect } from 'react';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import { Chat } from '@/lib/schema';
import { getAIResponse } from '@/lib/ai-service';

interface ChatWindowProps {
  chat: Chat;
  onUpdateChat: (messages: any[]) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chat, onUpdateChat }) => {
  const [messages, setMessages] = useState<any[]>(chat.messages);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMessages(chat.messages);
  }, [chat]);

  const handleSendMessage = async (content: string) => {
    const newMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    onUpdateChat(updatedMessages);

    setIsLoading(true);
    try {
      const aiResponse = await getAIResponse(content);
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
      };
      const messagesWithAiResponse = [...updatedMessages, aiMessage];
      setMessages(messagesWithAiResponse);
      onUpdateChat(messagesWithAiResponse);
    } catch (error) {
      console.error('Failed to get AI response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="flex flex-col h-[calc(100vh-16rem)]">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
              <ChatBubble
                  key={message.id}
                  message={message.content}
                  isUser={message.role === 'user'}
                  timestamp={new Date(message.timestamp)}
              />
          ))}
          {isLoading && (
              <div className="text-center text-gray-500 dark:text-gray-400">
                AI is thinking...
              </div>
          )}
        </div>
        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
  );
};

export default ChatWindow;