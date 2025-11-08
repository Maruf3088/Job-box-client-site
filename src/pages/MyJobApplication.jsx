import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext/AuthContext";
import Swal from "sweetalert2";
import { CiLocationOn } from "react-icons/ci";
import { PiCurrencyCircleDollarThin } from "react-icons/pi";
import { MdOutlineWorkOutline } from "react-icons/md";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhoneAlt,
  FaBuilding,
  FaFileAlt,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const MyJobApplication = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/job-application?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, [user.email]);

  const handleDeleteBtn = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/job-application/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setJobs((prev) => prev.filter((job) => job._id !== id));
              Swal.fire(
                "Deleted!",
                "Your application has been deleted.",
                "success"
              );
            }
          })
          .catch((err) => console.error("Delete failed:", err));
      }
    });
  };

  if (jobs.length === 0) {
    return (
      <div className="min-h-[65vh] flex flex-col justify-center items-center text-gray-500 gap-4">
        
        <p className="text-lg font-medium">
          You haven’t applied to any jobs yet.
        </p>
        <Link
          to="/jobs"
          className="btn bg-blue-500 text-white hover:bg-blue-400 transition"
        >
          Browse Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-8 min-h-[65vh]">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center md:text-left">
        My Job Applications{" "}
        <span className="text-blue-500">({jobs.length})</span>
      </h1>

      <div className="grid gap-6 md:grid-cols-1">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all p-6 flex flex-col gap-6"
          >
            {/* COMPANY + JOB INFO */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 border-b pb-4">
              <div className="flex items-center gap-4">
                <img
                  src={job.company_logo}
                  alt={job.company}
                  className="h-16 w-16 rounded-xl object-cover border border-gray-100 shadow-sm"
                />
                <div>
                  <h2 className="font-semibold text-xl text-gray-800 flex items-center gap-2">
                    <FaBuilding className="text-blue-500" /> {job.company}
                  </h2>
                  <p className="flex items-center gap-1 text-gray-500 mt-1 text-sm">
                    <CiLocationOn /> {job.location}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 md:ml-auto">
                <span className="badge badge-outline bg-blue-100 text-blue-700">
                  {job.jobType || "Full Time"}
                </span>
                {job.salaryRange && (
                  <span className="badge badge-outline bg-green-100 text-green-700 flex items-center gap-1">
                    <PiCurrencyCircleDollarThin /> {job.salaryRange.min} -{" "}
                    {job.salaryRange.max} {job.salaryRange.currency}
                  </span>
                )}
                <span
                  className={`badge ${
                    job.status === "Approved"
                      ? "badge-success"
                      : job.status === "Pending"
                      ? "badge-warning"
                      : "badge-neutral"
                  }`}
                >
                  {job.status || "Pending"}
                </span>
              </div>
            </div>

            {/* APPLICANT INFO */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <h3 className="font-semibold text-lg text-gray-700 mb-3 flex items-center gap-2">
                <FaUserCircle className="text-blue-500" /> Applicant Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-gray-700">
                  <FaUserCircle className="text-gray-500" /> {job.name}
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <FaEnvelope className="text-gray-500" /> {job.email}
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <FaPhoneAlt className="text-gray-500" />{" "}
                  {job.mobile || "Not provided"}
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <MdOutlineWorkOutline className="text-gray-500" /> ID:{" "}
                  {job._id.slice(-6)}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {job.githubUrl && (
                  <a
                    href={job.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="badge badge-outline badge-info hover:badge-primary flex items-center gap-1"
                  >
                    <FaGithub /> GitHub
                  </a>
                )}
                {job.linkdInUrl && (
                  <a
                    href={job.linkdInUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="badge badge-outline badge-info hover:badge-primary flex items-center gap-1"
                  >
                    <FaLinkedin /> LinkedIn
                  </a>
                )}
                {job.resumeUrl && (
                  <a
                    href={job.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="badge badge-outline badge-success hover:badge-primary flex items-center gap-1"
                  >
                    <FaFileAlt /> Resume
                  </a>
                )}
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap justify-between items-center gap-3 pt-3 border-t">
              <Link
                to={`/jobs/${job.job_id}`}
                className="btn btn-sm bg-blue-500 text-white hover:bg-blue-400 transition"
              >
                View Job Details
              </Link>
              <button
                onClick={() => handleDeleteBtn(job._id)}
                className="btn btn-sm bg-red-500 text-white hover:bg-red-400 transition"
              >
                Delete Application
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyJobApplication;
