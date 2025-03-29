import { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes } from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

const STORAGE_KEY = 'chatbot_history';

// Message content component
const MessageContent = ({ content }) => {
  const parseMessageContent = (text) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: text.slice(lastIndex, match.index)
        });
      }

      parts.push({
        type: 'link',
        text: match[1],
        url: match[2]
      });

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push({
        type: 'text',
        content: text.slice(lastIndex)
      });
    }

    return parts;
  };

  const parts = parseMessageContent(content);
  
  return (
    <div className="space-y-2">
      {parts.map((part, index) => {
        if (part.type === 'link') {
          return (
            <Link
              key={index}
              to={part.url}
              // eslint-disable-next-line no-undef
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

MessageContent.propTypes = {
  content: PropTypes.string.isRequired
};

// Typing animation component
const TypingAnimation = ({ text, onComplete }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!text) return;

    if (currentIndex < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 15); // Adjust speed here (lower = faster)

      return () => clearTimeout(timeoutId);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, onComplete]);

  return <MessageContent content={displayText} />;
};

TypingAnimation.propTypes = {
  text: PropTypes.string.isRequired,
  onComplete: PropTypes.func
};

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
  const [isTyping, setIsTyping] = useState(false);
  const [currentTypingMessage, setCurrentTypingMessage] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    try {
      setIsLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/chat`, {
        message: inputMessage,
        history: messages
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        withCredentials: true
      });

      setIsLoading(false);
      setIsTyping(true);
      setCurrentTypingMessage(response.data.reply);

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      };
      const finalMessages = [...messages, errorMessage];
      setMessages(finalMessages);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(finalMessages));
      setIsLoading(false);
    }
  };

  const handleTypingComplete = () => {
    const assistantMessage = {
      role: 'assistant',
      content: currentTypingMessage
    };
    setMessages(prev => [...prev, assistantMessage]);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...messages, assistantMessage]));
    setIsTyping(false);
    setCurrentTypingMessage('');
  };

  return (
    <>
      {/* Updated floating button with pulse effect and larger size */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-white  text-black p-5  cursor-pointer rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
      >
        <div className="absolute -inset-1 bg-gradient-to-r  from-[#2997ff] to-[#2171b5] rounded-2xl opacity-30 group-hover:opacity-50 blur-lg transition-all duration-300"></div>
        <div className="relative flex items-center gap-3">
          <FaRobot size={28} className="animate-pulse" />
          <span className="hidden md:block font-semibold">AI Assistant</span>
        </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            ref={modalRef}
            className="bg-gradient-to-b from-[#1c1c1e] to-[#2c2c2e] rounded-3xl shadow-2xl w-full max-w-4xl flex flex-col border border-[#2997ff]/30 relative mx-4 transform transition-all duration-300 scale-100 opacity-100"
          >
            {/* Enhanced Header */}
            <div className="p-6 flex justify-between items-center border-b border-[#2997ff]/30 bg-[#1c1c1e]/80 rounded-t-3xl backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#2997ff] to-[#2171b5] rounded-full opacity-30 blur-sm"></div>
                  <FaRobot className="text-[#2997ff] relative" size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">AI Learning Assistant</h3>
                  <p className="text-gray-400 text-sm">Powered by Advanced AI</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray-400">
                <kbd className="hidden sm:inline-block px-3 py-1.5 text-xs font-semibold bg-[#2c2c2e] rounded-lg border border-[#3c3c3e]">esc</kbd>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="hover:text-white p-2 rounded-lg transition-all hover:bg-[#2c2c2e]"
                >
                  <FaTimes size={20} />
                </button>
              </div>
            </div>
            
            {/* Enhanced Messages Area */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 max-h-[60vh] scrollbar-thin scrollbar-thumb-[#2997ff]/20 scrollbar-track-transparent">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                >
                  <div
                    className={`inline-block p-5 rounded-2xl max-w-[85%] shadow-lg ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-[#2997ff] to-[#2171b5] text-white'
                        : 'bg-gradient-to-br from-[#2c2c2e] to-[#3c3c3e] text-gray-200'
                    }`}
                  >
                    <MessageContent content={message.content} />
                  </div>
                </div>
              ))}

              {/* Enhanced Typing Animation */}
              {isTyping && currentTypingMessage && (
                <div className="flex justify-start animate-fadeIn">
                  <div className="inline-block p-5 rounded-2xl max-w-[85%] bg-gradient-to-br from-[#2c2c2e] to-[#3c3c3e] text-gray-200 shadow-lg">
                    <TypingAnimation 
                      text={currentTypingMessage}
                      onComplete={handleTypingComplete}
                    />
                  </div>
                </div>
              )}

              {/* Enhanced Loading Animation */}
              {isLoading && (
                <div className="text-center text-gray-400 p-4">
                  <div className="animate-pulse flex items-center justify-center gap-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-[#2997ff] to-[#2171b5] rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-gradient-to-r from-[#2997ff] to-[#2171b5] rounded-full animate-bounce delay-100"></div>
                    <div className="w-3 h-3 bg-gradient-to-r from-[#2997ff] to-[#2171b5] rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Enhanced Input Area */}
            <div className="p-6 bg-[#1c1c1e]/90 rounded-b-3xl border-t border-[#2997ff]/30">
              <div className="flex gap-4">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                  placeholder="Ask about any feature, roadmap, or learning path..."
                  className="flex-1 bg-[#2c2c2e] text-white border border-[#3c3c3e] rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#2997ff] placeholder-gray-500 text-lg shadow-inner transition-all duration-300"
                  disabled={isTyping}
                  autoFocus
                />
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || isTyping || !inputMessage.trim()}
                  className="bg-gradient-to-r from-[#2997ff] to-[#2171b5] text-white px-8 rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 font-medium shadow-lg hover:shadow-xl disabled:hover:shadow-none"
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