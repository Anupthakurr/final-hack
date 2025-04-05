import React, { useEffect } from "react";
import Spline from "@splinetool/react-spline";

const Home = () => {
  return (
    <div className="w-full h-screen relative overflow-hidden bg-gradient-to-b from-black to-[#0b0b0b]">
      <nav className="fixed top-0 left-0 w-full py-4 px-8 flex justify-between items-center backdrop-blur-md bg-opacity-20 z-20">
        <div className="text-white text-2xl font-bold">AI Predictors</div>
        <ul className="flex space-x-8 text-white">
          <li className="hover:text-pink-500 transition duration-300 cursor-pointer">
            Home
          </li>
          <li className="hover:text-pink-500 transition duration-300 cursor-pointer">
            Brain Tumor Predictor
          </li>
          <li className="hover:text-pink-500 transition duration-300 cursor-pointer">
            Lung Cancer Predictor
          </li>
          <li className="hover:text-pink-500 transition duration-300 cursor-pointer">
            About
          </li>
        </ul>
      </nav>

      <Spline
        scene="https://prod.spline.design/12Fncx42nq3-ZgEC/scene.splinecode"
        className="absolute inset-0 w-full h-full object-cover animate-fadeIn"
      />

      <div
        className="absolute bottom-0 right-0 z-20 w-40 h-16 bg-gradient-to-b from-black to-[#0b0b0b]"
        style={{ pointerEvents: "none" }}
      ></div>

      {/* Header Content */}
      <header className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 space-y-4">
        <h1 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 drop-shadow-lg">
          Brain Tumor & Lung Cancer Predictor
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl text-center">
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

export default Home;
