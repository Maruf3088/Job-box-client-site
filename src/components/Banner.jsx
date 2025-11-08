import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const Banner = () => {
  return (
    <div
      className="hero min-h-[60vh]"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1578878900072-a84227bbf882?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2531)",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-lg">
          <h1 className="mb-5 text-4xl font-bold">
            The #1 <span className="text-green-500">Job Board for</span>  Hiring or Find your next job
          </h1>
          <p className="mb-5">
            Each month, more than 3 million job seekers turn to website in their search for work, making over 140,000 applications every single day
          </p>
          <button className="btn bg-green-400 text-white border-none shadow-none">Best Jobs for you <FaArrowRightLong  className="mt-[3px]"/></button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
