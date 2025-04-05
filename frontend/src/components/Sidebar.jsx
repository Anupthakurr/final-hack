import React from 'react';
import { ClipboardDocumentCheckIcon, ChatBubbleLeftRightIcon, ArrowUpTrayIcon, ChatBubbleLeftEllipsisIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 flex flex-col items-center w-64 h-screen py-6 bg-gray-800">
      <a href="#prediction" className="flex items-center w-10/12 h-12 px-4 mb-6 text-white transition-all rounded-lg hover:bg-gray-600 hover:shadow-lg">
        <ClipboardDocumentCheckIcon className="w-6 h-6 mr-3" />
        Prediction
      </a>
      <a href="#consultation" className="flex items-center w-10/12 h-12 px-4 mb-6 text-white transition-all rounded-lg hover:bg-gray-600 hover:shadow-lg">
        <ChatBubbleLeftRightIcon className="w-6 h-6 mr-3" />
        Consultation
      </a>
      <a href="#upload" className="flex items-center w-10/12 h-12 px-4 mb-6 text-white transition-all rounded-lg hover:bg-gray-600 hover:shadow-lg">
        <ArrowUpTrayIcon className="w-6 h-6 mr-3" />
        Image Upload
      </a>
      <a href="#chatbot" className="flex items-center w-10/12 h-12 px-4 mb-6 text-white transition-all rounded-lg hover:bg-gray-600 hover:shadow-lg">
        <ChatBubbleLeftEllipsisIcon className="w-6 h-6 mr-3" />
        Chatbot
      </a>
      <a href="#profile" className="flex items-center w-10/12 h-12 px-4 text-white transition-all rounded-lg hover:bg-gray-600 hover:shadow-lg">
        <UserCircleIcon className="w-6 h-6 mr-3" />
        Profile
      </a>
    </div>
  );
};

export default Sidebar;