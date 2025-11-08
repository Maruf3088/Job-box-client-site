import React, { useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import detailsBanner from "../assets/detailsBanner.png";
import { CiAlignRight, CiCalendarDate, CiLocationOn } from "react-icons/ci";
import { PiCurrencyCircleDollarThin } from "react-icons/pi";
import { HiOutlineMail } from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";

const JobDetails = () => {
  const singleJobDetails = useLoaderData();
  const {
    title,
    jobType,
    category,
    location,
    applicationDeadline,
    salaryRange,
    company,
    requirements,
    responsibilities,
    description,
    hr_email,
    hr_name,
    _id,
  } = singleJobDetails;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-5 md:px-10 pb-16">
      {/* Banner Section */}
      <div className="relative my-10">
        <img
          className="w-full h-64 sm:h-72 md:h-80 object-cover rounded-2xl shadow-md"
          src={detailsBanner}
          alt="Job Banner"
        />
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            {title}
          </h1>
          <p className="text-gray-200 text-sm sm:text-lg mt-1">{company}</p>
        </div>
      </div>

      {/* Job Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50 shadow-sm rounded-xl p-6 border border-gray-200">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
            {title}{" "}
            <span className="text-blue-500 text-base sm:text-lg font-normal">
              ({jobType})
            </span>
          </h2>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">at {company}</p>
        </div>
        <Link
          to={`/job-apply/${_id}`}
          className="btn w-full sm:w-auto btn-lg bg-blue-600 text-white hover:bg-blue-500 rounded-xl shadow-md transition-all duration-300"
        >
          Apply Now
        </Link>
      </div>

      <div className="divider my-8"></div>

      {/* Job Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side */}
        <div className="col-span-2 space-y-8">
          {/* Job Details Info */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
              <div className="space-y-4">
                <p className="flex items-center gap-2 text-sm sm:text-base">
                  <CiAlignRight className="text-blue-500 text-xl" />
                  <span className="font-semibold">Title:</span> {title}
                </p>
                <p className="flex items-center gap-2 text-sm sm:text-base">
                  <CiAlignRight className="text-blue-500 text-xl" />
                  <span className="font-semibold">Job Type:</span> {jobType}
                </p>
                <p className="flex items-center gap-2 text-sm sm:text-base">
                  <CiLocationOn className="text-blue-500 text-xl" />
                  <span className="font-semibold">Location:</span> {location}
                </p>
              </div>
              <div className="space-y-4">
                <p className="flex items-center gap-2 text-sm sm:text-base">
                  <PiCurrencyCircleDollarThin className="text-blue-500 text-xl" />
                  <span className="font-semibold">Salary:</span>{" "}
                  {salaryRange.min}-{salaryRange.max} {salaryRange.currency}
                </p>
                <p className="flex items-center gap-2 text-sm sm:text-base">
                  <CiAlignRight className="text-blue-500 text-xl" />
                  <span className="font-semibold">Category:</span> {category}
                </p>
                <p className="flex items-center gap-2 text-sm sm:text-base">
                  <CiCalendarDate className="text-blue-500 text-xl" />
                  <span className="font-semibold">Deadline:</span> {applicationDeadline}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">
              About {company}
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{description}</p>
          </div>

          {/* Requirements */}
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
              Requirements
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {requirements.map((req, index) => (
                <div
                  key={index}
                  className="badge badge-lg bg-blue-100 text-blue-700 border border-blue-300 hover:bg-blue-200 transition duration-200 text-xs sm:text-sm whitespace-normal"
                >
                  {req}
                </div>
              ))}
            </div>
          </div>

          {/* Responsibilities */}
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
              Responsibilities
            </h3>
            <ul className="space-y-2 sm:space-y-3 list-disc list-inside text-gray-600 text-sm sm:text-base">
              {responsibilities.map((res, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2"
                >
                  <CiAlignRight className="text-blue-500 mt-1 text-lg" />
                  {res}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Side */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 h-fit">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
            Quick Info
          </h3>
          <p className="text-gray-600 mb-2 text-sm sm:text-base">
            <span className="font-medium text-gray-800">Company:</span> {company}
          </p>
          <p className="text-gray-600 mb-2 text-sm sm:text-base">
            <span className="font-medium text-gray-800">Category:</span> {category}
          </p>
          <p className="text-gray-600 mb-2 text-sm sm:text-base">
            <span className="font-medium text-gray-800">Location:</span> {location}
          </p>
          <p className="text-gray-600 mb-5 text-sm sm:text-base">
            <span className="font-medium text-gray-800">Deadline:</span> {applicationDeadline}
          </p>

          {/* HR Info */}
          <div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-100">
            <h4 className="text-base sm:text-lg font-semibold text-blue-700 mb-2 flex items-center gap-2">
              <FaRegUserCircle /> HR Contact
            </h4>
            <p className="text-gray-700 text-sm sm:text-base">
              <span className="font-medium">Name:</span> {hr_name || "N/A"}
            </p>
            <p className="text-gray-700 flex items-center gap-2 mt-1 text-sm sm:text-base">
              <HiOutlineMail className="text-blue-500" />
              <a
                href={`mailto:${hr_email}`}
                className="hover:text-blue-600 transition duration-200"
              >
                {hr_email || "Not available"}
              </a>
            </p>
          </div>

          <Link
            to={`/job-apply/${_id}`}
            className="btn w-full mt-5 bg-blue-600 text-white hover:bg-blue-500 rounded-xl shadow-md transition-all duration-300"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
