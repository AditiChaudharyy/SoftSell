import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, ChevronUp, ChevronDown } from 'lucide-react';

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    if (isOpen && messages.length === 0) {
      // Add welcome message
      setTimeout(() => {
        setMessages([
          {
            text: "Hello! 👋 I'm the SoftSell AI assistant. How can I help you with selling your unused software licenses today?",
            sender: 'bot',
          },
        ]);
      }, 500);
    }
  }, [isOpen, messages.length]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  };

  const handleSend = () => {
    if (input.trim() === '') return;

    const userMessage = { text: input.trim(), sender: 'user' };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = { text: getBotResponse(input.trim()), sender: 'bot' };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getBotResponse = (message) => {
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('pricing') || lowerMsg.includes('cost') || lowerMsg.includes('fee')) {
      return "Our service fee is just 10% of the license value - much lower than the industry average of 25-30%. There are no upfront costs or hidden fees.";
    } 
    else if (lowerMsg.includes('how') && lowerMsg.includes('work')) {
      return "It's simple! Upload your license details, we'll provide a valuation within 24 hours, and once you accept, you'll receive payment within 48 hours.";
    }
    else if (lowerMsg.includes('time') || lowerMsg.includes('long')) {
      return "The entire process typically takes 3-5 business days from submission to payment, though many transactions complete in 48 hours or less.";
    }
    else if (lowerMsg.includes('eligible') || lowerMsg.includes('qualify')) {
      return "We accept most major software licenses, including Microsoft, Adobe, Oracle, AutoDesk, and many more. Enterprise, perpetual, and subscription licenses are all eligible.";
    }
    else if (lowerMsg.includes('safe') || lowerMsg.includes('secure')) {
      return "Absolutely! We use bank-level encryption for all transactions, are SOC 2 Type II compliant, and never share your information with third parties.";
    }
    else {
      return "Thanks for your message! One of our license specialists will get back to you shortly. In the meantime, feel free to check our FAQ section or ask me another question.";
    }
  };

  const suggestedQuestions = [
    "How does the process work?",
    "What are your fees?",
    "How long does it take to get paid?",
    "Which licenses are eligible?",
    "Is the process secure?"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat window */}
      {isOpen && (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 w-80 sm:w-96 mb-4 flex flex-col overflow-hidden transition-all duration-300 ease-in-out max-h-[500px]">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              <h3 className="font-semibold">SoftSell Support</h3>
            </div>
            <button
              onClick={toggleChat}
              className="p-1 rounded-full hover:bg-blue-700 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto max-h-80">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Suggested questions */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInput(question);
                      inputRef.current.focus();
                    }}
                    className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-1 px-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input area */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message here..."
                className="flex-1 py-2 px-3 rounded-l-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className={`py-2 px-4 rounded-r-lg bg-blue-600 text-white ${
                  !input.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                } transition-colors`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={toggleChat}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-colors group relative"
        aria-label="Open chat"
      >
        {isOpen ? (
          <ChevronDown className="w-6 h-6 group-hover:scale-110 transition-transform" />
        ) : (
          <>
            <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">1</span>
          </>
        )}
      </button>
    </div>
  );
};

export default FloatingChat;