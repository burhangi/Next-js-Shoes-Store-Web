// 📦src/components/common/ChatWidget.tsx - UPDATED
"use client";

import { useState, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface ChatWidgetProps {
  position?: 'bottom-right' | 'bottom-left';
  companyName?: string;
  supportHours?: string;
}

export function ChatWidget({ 
  position = 'bottom-right',
  companyName = 'Luxury Store',
  supportHours = '9 AM - 9 PM, Mon-Fri'
}: ChatWidgetProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ id: number; text: string; sender: 'user' | 'bot'; time: string }>>([]);
  const [messageIdCounter, setMessageIdCounter] = useState(1);

  useEffect(() => {
    setIsMounted(true);
    // Initialize with welcome message only on client
    setMessages([
      { id: 1, text: 'Hi! Welcome to Luxury Store. How can I help you today?', sender: 'bot', time: 'Just now' }
    ]);
    setMessageIdCounter(2);
  }, []);

  const handleSendMessage = () => {
    if (!message.trim() || !isMounted) return;
    
    const newId = messageIdCounter;
    setMessageIdCounter(prev => prev + 1);
    
    const newMessage = {
      id: newId,
      text: message,
      sender: 'user' as const,
      time: 'Just now'
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    
    // Simulate bot response
    setTimeout(() => {
      const botId = messageIdCounter + 1;
      setMessageIdCounter(prev => prev + 1);
      const botResponse = {
        id: botId,
        text: 'Thanks for your message! Our customer support team will get back to you shortly.',
        sender: 'bot' as const,
        time: 'Just now'
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110",
          position === 'bottom-right' ? 'right-6 bottom-6' : 'left-6 bottom-6',
          isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-[#FF6B35] hover:bg-[#E85A28]'
        )}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></span>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={cn(
          "fixed z-50 w-80 md:w-96 h-[500px] rounded-xl shadow-2xl overflow-hidden border border-gray-200",
          position === 'bottom-right' ? 'right-6 bottom-24' : 'left-6 bottom-24'
        )}>
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-[#FF6B35] to-[#E85A28] p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">Live Chat Support</h3>
                <p className="text-sm opacity-90">{companyName}</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-2 text-xs opacity-80">
              Available: {supportHours}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-[320px] bg-white overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex",
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2",
                    msg.sender === 'user'
                      ? 'bg-[#FF6B35]/10 text-gray-800 rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  )}
                >
                  <p className="text-sm">{msg.text}</p>
                  <span className="text-xs opacity-60 mt-1 block">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="p-3 bg-[#FF6B35] text-white rounded-full hover:bg-[#E85A28] disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Typically replies within 5 minutes
            </p>
          </div>
        </div>
      )}
    </>
  );
}