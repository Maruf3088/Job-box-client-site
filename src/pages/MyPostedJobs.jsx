import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext/AuthContext";
import { Link } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { PiCurrencyCircleDollarThin } from "react-icons/pi";
import { IoMdPeople } from "react-icons/io";
import Swal from "sweetalert2";

const MyPostedJobs = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/jobs?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, [user.email]);

  const handleDeleteJob=(jobId)=>{
Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then((result) => {
  if (result.isConfirmed) {
    fetch(`http://localhost:3000/jobs/${jobId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          setJobs((prev) => prev.filter((job) => job._id !== jobId));
          Swal.fire(
            'Deleted!',
            'Your job has been deleted.',
            'success'
          );
        }
      })
      .catch((err) => console.error("Delete failed:", err));
  }
})

  }
  return (
    <div className="container mx-auto py-10 px-4 md:px-10 min-h-[63vh]">
      <h1 className="text-3xl font-bold text-gray-700 mb-8">
        My Posted Jobs <span className="text-blue-500">({jobs.length})</span>
      </h1>

      <div className="grid gap-6">
        {jobs.length === 0 && (
          <p className="text-gray-500 text-center col-span-full">
            You have not posted any jobs yet.
          </p>
        )}

        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:shadow-lg transition-all duration-300"
          >
            {/* Company Info */}
            <div className="flex items-center gap-4">
              <img
                src={job.company_logo}
                alt={job.company}
                className="h-16 w-16 rounded-xl object-cover border border-gray-100 shadow-sm"
              />
              <div>
                <h2 className="font-semibold text-xl text-gray-800">
                  {job.company}
                </h2>
                <p className="flex items-center gap-1 text-gray-500 mt-1">
                  <CiLocationOn /> {job.location}
                </p>
              </div>
            </div>

            {/* Job Info */}
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-700">
                {job.title}
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="badge badge-outline bg-blue-100 text-blue-700">
                  {job.jobType}
                </span>
                <span className="badge badge-outline bg-green-100 text-green-700">
                  {job.category}
                </span>
                <span className="badge badge-outline bg-yellow-100 text-yellow-700 flex items-center gap-1">
                  <PiCurrencyCircleDollarThin /> {job.salaryRange?.min}-
                  {job.salaryRange?.max} {job.salaryRange?.currency}
                </span>
              </div>
            </div>

            {/* Applicants & Actions */}
            <div className="flex flex-col gap-2 items-start md:items-end">
              <div className="flex items-center gap-2 text-gray-600 font-medium">
                <IoMdPeople /> Applicants:{" "}
                <span className="text-gray-800 font-bold">
                  {job.applicationCount || 0}
                </span>
              </div>
              <div className="flex gap-2 mt-2">
                <Link
                  to={`/jobs/${job._id}`}
                  className="btn btn-sm bg-blue-500 text-white hover:bg-blue-400"
                >
                  View Details
                </Link>
                <Link
                  to={`/job-applicants/${job._id}`}
                  className="btn btn-sm btn-outline border-blue-500 text-blue-500 hover:bg-blue-50"
                >
                  View Applicants
                </Link>
                <button
                  onClick={() => handleDeleteJob(job._id)}
                  className="btn btn-sm btn-outline border-red-500 text-red-500 hover:bg-red-50"
                >
                  Delete Job
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPostedJobs;
