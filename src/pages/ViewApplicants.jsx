import React, { useCallback, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { FaGithub, FaLinkedin, FaFileAlt, FaUserCircle } from "react-icons/fa";
import AuthContext from "../context/AuthContext/AuthContext";

const ViewApplicants = () => {
  const jobApplicants = useLoaderData();
  const { user } = useContext(AuthContext);

  const handleStatusUpdate = (e, id) => {
    const status = e.target.value;

    fetch(`https://job-box-server-site-2.onrender.com/job-applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire("✅ Success!", "Applicant status updated!", "success");
        }
      })
      .catch(() => Swal.fire("❌ Error", "Failed to update status.", "error"));
  };

  if (!jobApplicants || jobApplicants.length === 0) {
    return (
      <div className="min-h-[65vh] flex flex-col justify-center items-center text-gray-500">
        <p className="text-lg font-medium">No applicants found for this job.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 min-h-[65vh]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Job Applicants</h1>
        <p className="text-sm text-gray-500">
          Total:{" "}
          <span className="font-semibold text-blue-500">
            {jobApplicants.length}
          </span>
        </p>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-gray-200 shadow-sm bg-white">
        <table className="table w-full">
          <thead className="bg-gray-100 text-gray-700">
            <tr className="text-base font-semibold">
              <th>#</th>
              <th>Applicant</th>
              <th>Contact Info</th>
              <th>Profiles</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {jobApplicants.map((applicant, index) => (
              <tr
                key={applicant._id}
                className="hover:bg-gray-50 transition-all duration-200"
              >
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <img
                      className="w-[40px] object-cover h-[40px] rounded-full"
                      src={user.photoURL}
                      alt=""
                    />
                    <div>
                      <p className="font-semibold text-lg text-gray-800">
                        {applicant.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        ID: {applicant._id.slice(-5)} | Job:{" "}
                        {applicant.job_id.slice(-5)}
                      </p>
                    </div>
                  </div>
                </td>

                <td>
                  <p className="font-medium text-gray-700">{applicant.email}</p>
                  <p className="text-sm text-gray-500">📞 {applicant.mobile}</p>
                </td>

                <td>
                  <div className="flex flex-col gap-1">
                    <a
                      href={applicant.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-blue-500 hover:text-blue-700 transition-all"
                    >
                      <FaGithub /> GitHub
                    </a>
                    <a
                      href={applicant.linkdInUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-blue-500 hover:text-blue-700 transition-all"
                    >
                      <FaLinkedin /> LinkedIn
                    </a>
                    <a
                      href={applicant.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-green-600 hover:text-green-800 transition-all"
                    >
                      <FaFileAlt /> Resume
                    </a>
                  </div>
                </td>

                <td>
                  <select
                    onChange={(e) => handleStatusUpdate(e, applicant._id)}
                    defaultValue={applicant.status}
                    className={`select select-sm border ${
                      applicant.status === "Hired"
                        ? "border-green-500 text-green-600"
                        : applicant.status === "Rejected"
                        ? "border-red-400 text-red-600"
                        : applicant.status === "Set Interview"
                        ? "border-yellow-400 text-yellow-600"
                        : "border-gray-300"
                    }`}
                  >
                    <option disabled>Change Status</option>
                    <option>Under Review</option>
                    <option>Set Interview</option>
                    <option>Hired</option>
                    <option>Rejected</option>
                  </select>
                </td>

                <td>
                  <button className="btn btn-sm btn-outline btn-primary">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="flex flex-col gap-5 md:hidden mt-4">
        {jobApplicants.map((applicant) => (
          <div
            key={applicant._id}
            className="card border border-gray-200 shadow-sm rounded-2xl p-4 bg-white hover:shadow-md transition-all"
          >
            <h2 className="text-xl font-semibold mb-1 text-gray-800 flex items-center gap-2">
              <FaUserCircle className="text-blue-400 text-2xl" />
              {applicant.name}
            </h2>
            <p className="text-sm text-gray-600 mb-1">📧 {applicant.email}</p>
            <p className="text-sm text-gray-600 mb-2">📞 {applicant.mobile}</p>

            <div className="flex flex-wrap gap-2 mb-2">
              <a
                href={applicant.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="badge badge-outline badge-info flex items-center gap-1"
              >
                <FaGithub /> GitHub
              </a>
              <a
                href={applicant.linkdInUrl}
                target="_blank"
                rel="noreferrer"
                className="badge badge-outline badge-info flex items-center gap-1"
              >
                <FaLinkedin /> LinkedIn
              </a>
              <a
                href={applicant.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="badge badge-outline badge-success flex items-center gap-1"
              >
                <FaFileAlt /> Resume
              </a>
            </div>

            <select
              onChange={(e) => handleStatusUpdate(e, applicant._id)}
              defaultValue={applicant.status}
              className="select select-sm w-full mb-2 border-gray-300"
            >
              <option disabled>Change Status</option>
              <option>Under Review</option>
              <option>Set Interview</option>
              <option>Hired</option>
              <option>Rejected</option>
            </select>

            <button className="btn btn-sm btn-outline btn-primary w-full">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewApplicants;
