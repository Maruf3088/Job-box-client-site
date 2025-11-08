import React from "react";
import faq from "../assets/faq.svg";

const Faq = () => {
  return (
    <div className="w-full bg-gradient-to-b from-blue-50 to-white py-16 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Left side image */}
        <div className="flex-1 flex justify-center">
          <img
            src={faq}
            alt="FAQ Illustration"
            className="w-72 md:w-96 drop-shadow-md hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Right side FAQ content */}
        <div className="flex-1">
          <div className="text-center md:text-left mb-8">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
              Frequently Asked <span className="text-blue-600">Questions</span>
            </h1>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto md:mx-0">
              Have a question about applying, posting jobs, or managing your
              account? We’ve got answers to help you out.
            </p>
          </div>

          {/* Accordion */}
          <div className="join join-vertical bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden">
            <div className="collapse collapse-arrow join-item border-b border-gray-200 hover:bg-blue-50 transition-all duration-200">
              <input type="radio" name="my-accordion-4" defaultChecked />
              <div className="collapse-title font-semibold text-gray-800">
                How do I apply for a job?
              </div>
              <div className="collapse-content text-gray-600 text-sm leading-relaxed">
                After logging in, go to the job details page and click the “Apply
                Now” button. Fill in your details and upload your resume.
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border-b border-gray-200 hover:bg-blue-50 transition-all duration-200">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title font-semibold text-gray-800">
                Can I edit my application after submission?
              </div>
              <div className="collapse-content text-gray-600 text-sm leading-relaxed">
                Once submitted, you can’t edit your application. However, you can
                withdraw and reapply before the job deadline.
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border-b border-gray-200 hover:bg-blue-50 transition-all duration-200">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title font-semibold text-gray-800">
                How do I post a job as a recruiter?
              </div>
              <div className="collapse-content text-gray-600 text-sm leading-relaxed">
                After logging in as a recruiter, click on “Add Job” in the
                navigation bar. Fill in the job details and publish your post.
              </div>
            </div>

            <div className="collapse collapse-arrow join-item hover:bg-blue-50 transition-all duration-200">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title font-semibold text-gray-800">
                I’m not getting any verification email. What should I do?
              </div>
              <div className="collapse-content text-gray-600 text-sm leading-relaxed">
                Check your spam or junk folder. If it’s still not there, go to
                your profile settings and click “Resend Verification Email.”
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
