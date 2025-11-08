import React from "react";
import hireme1 from "../assets/hireme1.svg";
import hireme2 from "../assets/hireme2.svg";

const HireMe = () => {
  return (
    <div className="w-full bg-gradient-to-r from-blue-50 to-blue-100 py-12 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-10 max-w-6xl">
        {/* Left Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={hireme1}
            alt="Hire Illustration 1"
            className="h-40 w-40 md:h-56 md:w-56 hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Middle Text */}
        <div className="flex-1 text-center md:text-left space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            WE ARE <span className="text-blue-600">HIRING!</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-md mx-auto md:mx-0">
            Join our passionate team and be part of an innovative environment
            where your ideas matter. Explore exciting roles today!
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition duration-300">
            Find Job
          </button>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={hireme2}
            alt="Hire Illustration 2"
            className="h-40 w-40 md:h-56 md:w-56 hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default HireMe;
