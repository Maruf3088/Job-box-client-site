import React from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="w-full bg-gradient-to-b from-blue-50 to-white py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Info Section */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            Get in <span className="text-blue-600">Touch</span>
          </h1>
          <p className="text-gray-600 text-base leading-relaxed max-w-md">
            We’d love to hear from you! Whether you’re a recruiter looking to
            post jobs, a job seeker with questions, or someone who wants to
            collaborate — feel free to reach out anytime.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-blue-600 text-lg" />
              <span className="text-gray-700 text-sm md:text-base">
                support@jobbox.com
              </span>
            </div>
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-blue-600 text-lg" />
              <span className="text-gray-700 text-sm md:text-base">
                +880 1234 567 890
              </span>
            </div>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-blue-600 text-lg" />
              <span className="text-gray-700 text-sm md:text-base">
                22/7 Dhanmondi, Dhaka, Bangladesh
              </span>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-gray-500 text-sm">
              Our support team is available Mon–Fri, 9:00 AM–6:00 PM
            </p>
          </div>
        </div>

        {/* Right Contact Form */}
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="input input-bordered w-full border-gray-300 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full border-gray-300 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Message
              </label>
              <textarea
                rows="5"
                placeholder="Write your message here..."
                className="textarea textarea-bordered w-full border-gray-300 focus:border-blue-500"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn bg-blue-600 hover:bg-blue-700 text-white w-full mt-3"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
