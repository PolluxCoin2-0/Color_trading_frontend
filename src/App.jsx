import React from "react";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import logo from "./assets/logo.png";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div
      id="maintenance-modal"
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-neutral-900/90 backdrop-blur-lg rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-lg mx-auto">
        {/* Logo Section */}
        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="Logo"
            className="w-12 h-12 sm:w-16 sm:h-16 mr-4 object-contain"
          />
        </div>

        <h3 className="text-xl sm:text-3xl font-extrabold text-white text-center">
          Website Under Maintenance
        </h3>
        
        <p className="mt-4 text-neutral-400 text-center text-sm sm:text-base">
          We're currently working on improving our website. Please check back soon.
        </p>

        {/* Gradient Separator */}
        <div className="mt-6 flex justify-center">
          <div className="w-12 h-1 sm:w-16 bg-gradient-to-r from-yellow-500 via-lime-500 to-red-400 rounded-full"></div>
        </div>

        {/* Footer section */}
        <p className="mt-6 text-xs sm:text-sm text-neutral-500 text-center">
          Thank you for your patience.
        </p>
      </div>
    </div>

    // <Router>
    //   <Navbar />
    //   <Routes>
    //     <Route path="/navbar" element={<Navbar />} />
    //     <Route path="/" element={<Home />} />
    //     <Route path="/home" element={<Home />} />
    //   </Routes>
    // </Router>
  );
}

export default App;
