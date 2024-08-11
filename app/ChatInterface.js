import { useState, useRef, useEffect } from 'react';
import BotAvatar from './BotAvatar';
import MessageBubble from './MessageBubble';
import { getGeminiResponse } from '../lib/gemini';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function ChatInterface({ selectedBot }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // State for dark mode
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (inputText.trim() === '') return;

    const newMessage = {
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isUser: true
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await getGeminiResponse(inputText, selectedBot.prompt);
      setMessages(prevMessages => [...prevMessages, { text: response, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), isUser: false }]);
    } catch (error) {
      console.error("Error getting response from Gemini:", error);
      const errorResponse = {
        text: "Sorry, I'm having trouble responding right now. Please try again later.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isUser: false
      };
      setMessages(prevMessages => [...prevMessages, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={`flex flex-col ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700' : 'bg-gradient-to-br from-pink-100 via-yellow-100 to-green-100'} h-screen mx-auto border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} shadow-lg`}>
      <div className={`flex items-center p-4 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700' : 'bg-gradient-to-br from-pink-100 via-yellow-100 to-green-100'} border-b ${isDarkMode ? 'border-gray-500' : 'border-gray-200'} shadow-md`}>
        <BotAvatar bot={selectedBot} className={`w-12 h-12 rounded-full border-2 ${isDarkMode ? 'border-blue-400' : 'border-pink-300'} shadow-md`} />
        <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} ml-4 tracking-wide`}>{selectedBot.name}</h2>

        <button 
          onClick={toggleTheme} 
          className={`p-4 border rounded-lg hover:bg-purple-300 transition ${isDarkMode ? 'text-white' : 'text-gray-800'} ${isDarkMode ? 'border-gray-500' : 'border-gray-300'}`}
          style={{ marginLeft: '65rem', marginRight:'0rem' }}
        >
          {isDarkMode ? '🌞' : '🌙'}
        </button>

        <a href="/" className={`p-4 border rounded-lg hover:bg-purple-300 transition ${isDarkMode ? 'text-white' : 'text-gray-800'}  ${isDarkMode ? 'border-gray-500' : 'border-gray-300'}`} style={{ marginLeft: '2 rem' }}>
           Home
        </a>
      </div>
      <div className="flex-1 overflow-y-auto p-4 flex flex-col space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-4`}>
            {!message.isUser && <BotAvatar bot={selectedBot} />}
            <MessageBubble message={message} isUser={message.isUser} />
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className={`flex p-4 border rounded-lg ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-pastel-gray text-gray-800 '} border-b ${isDarkMode ? 'border-gray-500' : 'border-gray-200'} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition ease-in-out duration-300`}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type a message..."
          className={`flex-1 p-3 border ${isDarkMode ? 'text-black border-gray-300' : 'text-gray-800 border-gray-200 shadow-pastel'}  rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className={`ml-3 px-4 py-2 rounded-lg ${isDarkMode ? 'bg-blue-900 text-white hover:bg-blue-700' : 'bg-pastel-blue text-gray-800 hover:bg-pastel-blue-dark'} border-b ${isDarkMode ? 'border-gray-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300 transition ease-in-out duration-300`}
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}
