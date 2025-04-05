
"use client";
import React from "react";
import { Calendar, Clock } from "lucide-react";

const Prediction = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-10">
      <div className="max-w-2xl w-full bg-gray-800 rounded-xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white">Book A Consultation</h2>
          <p className="text-gray-400 mt-2">Connect with our experienced doctors for personalized care</p>
        </div>

        {/* Form */}
        <form className="space-y-6">
          {/* Personal Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-2">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              className="mt-4 w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-500"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="mt-4 w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          {/* Symptoms */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-2">Symptoms & Concerns</h3>
            <textarea
              rows={4}
              placeholder="Please describe your symptoms or health concerns..."
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-500"
            ></textarea>
          </div>

          {/* Date & Time */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-2">Preferred Consultation Time</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="date"
                  className="pl-12 pr-4 py-2 w-full rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="time"
                  className="pl-12 pr-4 py-2 w-full rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Book Consultation
          </button>
        </form>
      </div>
    </div>
  );
};

export default Prediction;