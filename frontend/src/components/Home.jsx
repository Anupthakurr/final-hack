import React from "react";
import Spline from "@splinetool/react-spline";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
const AboutPage =()=>{
navigate('/about')
}
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-black to-[#0b0b0b]">
      {/* Navigation Bar */}
      <nav
        className="fixed top-0 left-0 z-20 flex w-full items-center justify-between px-8 py-4 backdrop-blur-md bg-black/30"
        aria-label="Main navigation"
      >
        <div className="text-2xl font-bold text-white">AI Predictors</div>
        <ul className="flex space-x-8 text-white">
          <li className="cursor-pointer transition duration-300 hover:text-pink-500">
            Home
          </li>
          <li className="transition duration-300 hover:text-pink-500">
            <a
              href="https://mri-tumour-detector-10.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Brain Tumor Predictor
            </a>
          </li>
          <li className="cursor-pointer transition duration-300 hover:text-pink-500">
            Lung Cancer Predictor
          </li>
          <button onClick={AboutPage} className="cursor-pointer transition duration-300 hover:text-pink-500">
            About
          </button>
        </ul>
      </nav>

      {/* 3D Background Scene */}
      <Spline
        scene="https://prod.spline.design/12Fncx42nq3-ZgEC/scene.splinecode"
        className="absolute inset-0 h-full w-full object-cover animate-fadeIn"
      />

      {/* Optional Shadow at Bottom Right */}
      <div
        className="absolute bottom-0 right-0 z-20 h-16 w-40 bg-gradient-to-b from-black to-[#0b0b0b]"
        style={{ pointerEvents: "none" }}
      />

      {/* Main Header Content */}
      <header className="absolute inset-0 z-10 flex flex-col items-center justify-center space-y-6 text-center text-white px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
          Brain Tumor & Lung Cancer Predictor
        </h1>
        <p className="max-w-2xl text-base sm:text-lg text-gray-300">
          AI-powered tools for detecting brain tumors from MRI images and
          predicting lung cancer from CT scan images.
        </p>
        <a
          href="https://mri-tumour-detector-10.onrender.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 text-lg font-semibold text-white shadow-lg transition duration-300 hover:scale-105"
        >
          Get Started
        </a>
      </header>
    </div>
  );
};

export default Header;
