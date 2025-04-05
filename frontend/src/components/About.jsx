

import React from "react";

const About = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0b0b0b] to-black text-white px-6 py-16 flex flex-col items-center">
      <div className="max-w-4xl text-center space-y-6">
        <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          About Our AI-Powered Medical Assistant
        </h2>

        <p className="text-lg text-gray-300">
          This web application leverages deep learning to assist in early
          diagnosis of
          <span className="text-pink-400 font-medium"> brain tumors</span> and
          <span className="text-purple-400 font-medium">
            {" "}
            chest diseases
          </span>{" "}
          using medical scans (MRI and CT). Our goal is to provide fast,
          reliable, and accessible tools to support healthcare professionals.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-10 text-left">
          <div className="bg-black/30 rounded-xl p-6 shadow-lg border border-pink-500 hover:scale-[1.02] transition duration-300">
            <h3 className="text-xl font-semibold text-pink-400 mb-2">
              Brain Tumor Detection
            </h3>
            <p className="text-gray-400">
              Upload an MRI scan and our model—fine-tuned using transfer
              learning—will analyze it for tumor prediction using a VGG16
              architecture.
            </p>
          </div>

          <div className="bg-black/30 rounded-xl p-6 shadow-lg border border-purple-500 hover:scale-[1.02] transition duration-300">
            <h3 className="text-xl font-semibold text-purple-400 mb-2">
              Chest Disease Prediction
            </h3>
            <p className="text-gray-400">
              Using CT scan images, the AI detects lung abnormalities to assist
              in identifying conditions such as lung cancer.
            </p>
          </div>
        </div>

        <div className="mt-10 text-left space-y-4">
          <h3 className="text-2xl font-semibold text-gradient bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Technical Highlights
          </h3>
          <ul className="list-disc list-inside text-gray-300 text-sm sm:text-base">
            <li>
              <span className="text-white font-medium">Transfer Learning:</span>{" "}
              Utilizes the VGG16 model pretrained on the ImageNet dataset to
              boost performance with limited medical data.
            </li>
            <li>
              <span className="text-white font-medium">Custom Training:</span>{" "}
              Fine-tuned using a labeled dataset from Kaggle to adapt VGG16 to
              MRI and CT image analysis tasks.
            </li>
            <li>
              <span className="text-white font-medium">Performance:</span>{" "}
              Achieves high accuracy with reduced training time and overfitting,
              thanks to transfer learning.
            </li>
          </ul>
        </div>

        <p className="mt-10 text-sm text-gray-500">
          ⚠ This application is intended for educational and research purposes
          only and should not replace professional medical diagnosis.
        </p>
      </div>
    </section>
  );
};

export default About;