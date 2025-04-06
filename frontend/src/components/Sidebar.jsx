// src/components/Sidebar.jsx
import React from 'react';
import { ClipboardDocumentCheckIcon, ChatBubbleLeftRightIcon, ArrowUpTrayIcon, ChatBubbleLeftEllipsisIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    
    // Fix function names for clarity
    const goToChatBot = () => {
      navigate('/chatBot');
    };
    
    const goToImageUpload = () => {
      // For external links, use window.open instead of navigate
      window.open('https://mri-tumour-detector-10.onrender.com', '_blank');
    };
    
    const goToConsultation = () => {
      navigate('/consultation');
    };
    
    const goToPrediction = () => {
      navigate('/prediction');
    };
    
    const goToProfile = () => {
      navigate('/profile');
    };
    const goToDashboard = () => {
      navigate('/dashboard');
    };
    
  return (
    <div className="fixed top-0 left-0 flex flex-col items-center w-64 h-screen py-6 bg-gray-800">
      <button onClick={goToDashboard} className="flex items-center w-10/12 h-12 px-4 mb-6 text-white transition-all rounded-lg hover:bg-gray-600 hover:shadow-lg">
        <ClipboardDocumentCheckIcon className="w-6 h-6 mr-3" />
        Dashboard
      </button>
      <button onClick={goToPrediction} className="flex items-center w-10/12 h-12 px-4 mb-6 text-white transition-all rounded-lg hover:bg-gray-600 hover:shadow-lg">
        <ClipboardDocumentCheckIcon className="w-6 h-6 mr-3" />
        Prediction
      </button>
      <button onClick={goToConsultation} className="flex items-center w-10/12 h-12 px-4 mb-6 text-white transition-all rounded-lg hover:bg-gray-600 hover:shadow-lg">
        <ChatBubbleLeftRightIcon className="w-6 h-6 mr-3" />
        Consultation
      </button>
      <button onClick={goToImageUpload} className="flex items-center w-10/12 h-12 px-4 mb-6 text-white transition-all rounded-lg hover:bg-gray-600 hover:shadow-lg">
        <ArrowUpTrayIcon className="w-6 h-6 mr-3" />
        Image Upload
      </button>
      <button onClick={goToChatBot} className="flex items-center w-10/12 h-12 px-4 mb-6 text-white transition-all rounded-lg hover:bg-gray-600 hover:shadow-lg">
        <ChatBubbleLeftEllipsisIcon className="w-6 h-6 mr-3" />
        Chatbot
      </button>
      <button onClick={goToProfile} className="flex items-center w-10/12 h-12 px-4 text-white transition-all rounded-lg hover:bg-gray-600 hover:shadow-lg">
        <UserCircleIcon className="w-6 h-6 mr-3" />
        Profile
      </button>
    </div>
  );
};

export default Sidebar;