'use client';

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const ChatBot = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const newUserMessage = { type: 'user', content: query };
    setMessages((prev) => [...prev, newUserMessage]);
    setQuery('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/user/chatBot', { query });
      const botMessage = { type: 'bot', content: res.data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Something went wrong. Please try again.';
      setMessages((prev) => [...prev, { type: 'bot', content: `⚠️ ${errorMsg}` }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl flex flex-col p-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">🩺 AI Medical Assistant</h1>

        <div className="flex-1 overflow-y-auto space-y-4 max-h-[60vh] px-1 mb-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] px-4 py-2 rounded-lg shadow-sm text-sm whitespace-pre-wrap ${
                  msg.type === 'user'
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                }`}
              >
                {msg.type === 'bot' ? (
                  <ReactMarkdown
                    components={{
                      a: (props) => <a className="text-blue-600 underline" {...props} />,
                      li: (props) => <li className="ml-4 list-disc" {...props} />,
                      strong: (props) => <strong className="font-semibold" {...props} />,
                      p: (props) => <p className="mb-2" {...props} />,
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}
          {loading && <div className="text-gray-500 text-sm">Bot is typing...</div>}
          <div ref={bottomRef} />
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a medical question..."
            className="flex-1 p-3 border rounded-lg resize-none h-20"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
