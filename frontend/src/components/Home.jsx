import React from "react";
import Spline from "@splinetool/react-spline";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const goToAbout = () => navigate("/about");
  const goToSignUp = () => navigate("/sign-up");
  const goToSignIn = () => navigate("/sign-in");

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-black to-[#0b0b0b]">
      {/* Navigation Bar */}
      <nav
        className="fixed top-0 left-0 z-20 flex w-full items-center justify-between px-8 py-4 backdrop-blur-md bg-black/30"
        aria-label="Main navigation"
      >
        <div className="text-2xl font-bold text-white tracking-wide">
          🧠 AI MedAssist
        </div>
        <ul className="flex space-x-6 text-white text-sm sm:text-base items-center">
          <li
            onClick={() => navigate("/dashboard")}
            className="cursor-pointer transition duration-300 hover:text-pink-500"
          >
           Dashboard
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
          <li
            className="cursor-pointer transition duration-300 hover:text-pink-500"
            onClick={goToSignIn}
          >
            Sign In
          </li>
          <li
            className="cursor-pointer transition duration-300 hover:text-pink-500"
            onClick={goToSignUp}
          >
            Sign Up
          </li>
          <li
            onClick={goToAbout}
            className="cursor-pointer transition duration-300 hover:text-pink-500"
          >
            About
          </li>
        </ul>
      </nav>

      {/* 3D Background */}
      <Spline
        scene="https://prod.spline.design/12Fncx42nq3-ZgEC/scene.splinecode"
        className="absolute inset-0 h-full w-full object-cover animate-fadeIn"
      />

      {/* Optional Shadow */}
      <div
        className="absolute bottom-0 right-0 z-20 h-16 w-40 bg-gradient-to-b from-black to-[#0b0b0b]"
        style={{ pointerEvents: "none" }}
      />

      {/* Header Content */}
      <header className="absolute inset-0 z-10 flex flex-col items-center justify-center space-y-6 text-center text-white px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
          Brain Tumor Predictor & AI Consultant
        </h1>
        <p className="max-w-2xl text-base sm:text-lg text-gray-300">
          Harness the power of AI to detect brain tumors using MRI scans and
          consult with an AI medical assistant.
        </p>
        <div className="flex gap-4 mt-6">
          <a
            href="https://mri-tumour-detector-10.onrender.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 text-white font-medium shadow-md transition hover:scale-105"
          >
            Try Tumor Predictor
          </a>
          <button
            onClick={() => navigate("/chatbot")}
            className="rounded-full border border-pink-400 px-6 py-2 text-white font-medium transition hover:bg-pink-500/20"
          >
            Ask AI Consultant
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
