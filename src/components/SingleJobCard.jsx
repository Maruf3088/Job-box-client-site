import React from "react";
import { CiClock1, CiLocationOn } from "react-icons/ci";
import { IoBagOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const SingleJobCard = ({ job }) => {
  const {
    title,
    jobType,
    company_logo,
    company,
    location,
    _id,
    description,
    requirements,
    keywords,
    salaryRange,
  } = job;
  return (
    <div className="card bg-white border border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden ">
      <div className="card-body space-y-4 flex justify-between">
        {/* Company Info */}
        <div className="flex items-center gap-4">
          <img
            className="w-14 h-14 object-contain rounded-lg bg-blue-50 p-2"
            src={company_logo}
            alt={`${company} logo`}
          />
          <div>
            <h2 className="card-title text-lg font-semibold text-gray-800">
              {company}
            </h2>
            <p className="flex items-center text-gray-500 text-sm gap-1">
              <CiLocationOn className="text-blue-500" />
              {location}
            </p>
          </div>
        </div>

        {/* Job Title & Meta */}
        <div>
          <Link
            to={`jobs/${_id}`}
            className="text-xl text-gray-800 font-bold hover:text-blue-500 transition duration-300"
          >
            {title}
          </Link>

          <div className="flex justify-between text-gray-500 text-sm mt-2">
            <p className="flex items-center gap-1">
              <IoBagOutline className="text-blue-500" />
              {jobType}
            </p>
            <p className="flex items-center gap-1">
              <CiClock1 className="text-blue-500" />8 minutes ago
            </p>
          </div>
        </div>

        {/* Description & Tags */}
        <div className="space-y-3">
          <p className="text-gray-600 text-sm leading-relaxed">
            {description.length > 100
              ? description.slice(0, 100) + "..."
              : description}
          </p>
          <div className="flex flex-wrap gap-2">
            {keywords.slice(0, 3).map((req, index) => (
              <div
                key={index}
                className="badge badge-outline border-blue-200 text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 transition duration-300"
              >
                {req}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
          <p className="text-xl font-semibold text-blue-600">
            {salaryRange.max}
            <span className="text-gray-500 text-base ml-1">
              {salaryRange.currency.toUpperCase()}
            </span>
          </p>

          <Link
            to={`/job-apply/${_id}`}
            className="btn bg-blue-500 text-white hover:bg-blue-600 border-none rounded-lg px-5"
          >
            Apply
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleJobCard;
