import { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes } from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io';
import { Link } from 'react-router-dom';
import axios from 'axios';

const STORAGE_KEY = 'chatbot_history';

const ChatBot = () => {
  // Initialize messages from localStorage or default message
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem(STORAGE_KEY);
    return savedMessages ? JSON.parse(savedMessages) : [{
      role: 'assistant',
      content: 'Hi! I\'m your AI assistant. How can I help you learn about our tech learning platform?'
    }];
  });

  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const modalRef = useRef(null);
  const inputRef = useRef(null);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle escape key to close
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen]);

  const parseMessageContent = (content) => {
    // Regular expression to match markdown-style links: [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
      // Add text before the link
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: content.slice(lastIndex, match.index)
        });
      }

      // Add the link
      parts.push({
        type: 'link',
        text: match[1],
        url: match[2]
      });

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text after last link
    if (lastIndex < content.length) {
      parts.push({
        type: 'text',
        content: content.slice(lastIndex)
      });
    }

    return parts;
  };

  // eslint-disable-next-line react/prop-types
  const MessageContent = ({ content }) => {
    const parts = parseMessageContent(content);
    
    return (
      <div className="space-y-2">
        {parts.map((part, index) => {
          if (part.type === 'link') {
            return (
              <Link
                key={index}
                to={part.url}
                onClick={() => setIsOpen(false)}
                className="text-[#2997ff] hover:underline inline-block"
              >
                {part.text}
              </Link>
            );
          }
          return <span key={index}>{part.content}</span>;
        })}
      </div>
    );
  };


  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      role: 'user',
      content: inputMessage
    };

    // Update messages immediately for user's message
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMessages));
    
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post('/api/chat', {
        message: inputMessage,
        includeLinks: true
      });

      const assistantMessage = {
        role: 'assistant',
        content: response.data.reply
      };

      // Update messages with assistant's response
      const finalMessages = [...updatedMessages, assistantMessage];
      setMessages(finalMessages);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(finalMessages));
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      };
      const finalMessages = [...updatedMessages, errorMessage];
      setMessages(finalMessages);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(finalMessages));
    }

    setIsLoading(false);
  };


  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 bg-[#2997ff] text-white p-4 rounded-full shadow-lg hover:bg-[#2997ff]/90 transition-all"
      >
        <FaRobot size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center pt-[10vh]">
          <div 
            ref={modalRef}
            className="bg-[#1c1c1e] rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col border border-[#2997ff]/20 relative mx-4"
          >
            {/* Header */}
            <div className="p-6 flex justify-between items-center border-b border-[#2997ff]/20">
              <div className="flex items-center gap-3">
                <FaRobot className="text-[#2997ff]" size={24} />
                <h3 className="text-xl font-semibold text-white">AI Learning Assistant</h3>
              </div>
              <div className="flex items-center gap-4 text-gray-400">
                <kbd className="hidden sm:inline-block px-2 py-1 text-xs font-semibold bg-[#2c2c2e] rounded">esc</kbd>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="hover:text-white p-2 rounded-lg transition-all"
                >
                  <FaTimes size={20} />
                </button>
              </div>
            </div>
            
            {/* Updated Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 max-h-[60vh] scrollbar-thin scrollbar-thumb-[#2c2c2e] scrollbar-track-transparent">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                >
                  <div
                    className={`inline-block p-4 rounded-2xl max-w-[80%] ${
                      message.role === 'user'
                        ? 'bg-[#2997ff] text-white'
                        : 'bg-[#2c2c2e] text-gray-200'
                    }`}
                  >
                    <MessageContent content={message.content} />
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="text-center text-gray-400">
                  <div className="animate-pulse flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-[#2997ff] rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-[#2997ff] rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-[#2997ff] rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 bg-[#1c1c1e]">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about any feature, roadmap, or learning path..."
                  className="flex-1 bg-[#2c2c2e] text-white border-none rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#2997ff] placeholder-gray-500 text-lg"
                  autoFocus
                  ref={inputRef}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  className="bg-[#2997ff] text-white px-6 rounded-xl hover:bg-[#2997ff]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
                >
                  <span className="hidden sm:inline">Send</span>
                  <IoMdSend size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot; 