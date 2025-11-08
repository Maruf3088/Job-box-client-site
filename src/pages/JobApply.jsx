import React, { useContext, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext/AuthContext";
import Swal from "sweetalert2";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaGithub,
  FaLinkedin,
  FaPhoneAlt,
  FaUser,
  FaEnvelope,
} from "react-icons/fa";

const JobApply = () => {
  const job = useLoaderData();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleApplyBtn = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const resumeUrl = form.resumeUrl.value;
    const linkdInUrl = form.linkdInUrl.value;
    const githubUrl = form.githubUrl.value;
    const mobile = form.contactNo.value;

    const jobApplication = {
      job_id: job._id,
      name,
      email,
      resumeUrl,
      linkdInUrl,
      githubUrl,
      mobile,
      status: "pending",
    };

    fetch("http://localhost:3000/job-applications", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(jobApplication),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your application has been submitted!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/my-applications");
        }
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-10">
      {/* Banner Section */}
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl flex flex-col md:flex-row items-center gap-6 p-8 border border-blue-100">
        <img
          src={job.company_logo || "https://i.ibb.co/3v9vphZ/profile.png"}
          alt={job.company}
          className="w-24 h-24 rounded-full border-4 border-blue-100"
        />
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{job.title}</h1>
          <p className="text-blue-500 font-medium flex items-center justify-center md:justify-start gap-2">
            <FaBuilding /> {job.company}
          </p>
          <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2">
            <FaMapMarkerAlt /> {job.location}
          </p>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
        {/* Left: Application Form */}
        <div className="lg:col-span-2 bg-white shadow-md rounded-2xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Submit Your Application
          </h2>
          <p className="text-gray-600 mb-6">
            Please provide accurate information so we can review your profile.
          </p>

          <form onSubmit={handleApplyBtn} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="label font-medium flex items-center gap-2">
                <FaUser /> Full Name
              </label>
              <input
                type="text"
                name="name"
                className="input input-bordered w-full"
                placeholder="Steven Job"
                defaultValue={user?.displayName}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="label font-medium flex items-center gap-2">
                <FaEnvelope /> Email Address
              </label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full"
                placeholder="you@example.com"
                defaultValue={user?.email}
                readOnly
              />
            </div>

            {/* Resume */}
            <div>
              <label className="label font-medium">Resume URL</label>
              <input
                type="url"
                name="resumeUrl"
                className="input input-bordered w-full"
                placeholder="https://example.com/resume.pdf"
                required
              />
            </div>

            {/* GitHub */}
            <div>
              <label className="label font-medium flex items-center gap-2">
                <FaGithub /> GitHub Profile
              </label>
              <input
                type="url"
                name="githubUrl"
                className="input input-bordered w-full"
                placeholder="https://github.com/username"
                required
              />
            </div>

            {/* LinkedIn */}
            <div>
              <label className="label font-medium flex items-center gap-2">
                <FaLinkedin /> LinkedIn Profile
              </label>
              <input
                type="url"
                name="linkdInUrl"
                className="input input-bordered w-full"
                placeholder="https://linkedin.com/in/username"
                required
              />
            </div>

            {/* Contact */}
            <div>
              <label className="label font-medium flex items-center gap-2">
                <FaPhoneAlt /> Contact Number
              </label>
              <input
                type="tel"
                name="contactNo"
                className="input input-bordered w-full"
                placeholder="+880-123-456-789"
                required
              />
            </div>

            <button className="btn bg-blue-600 hover:bg-blue-700 text-white mt-4 w-full">
              Apply Now 🚀
            </button>
          </form>
        </div>

        {/* Right: Sidebar Info */}
        <div className="space-y-6">
          {/* Job Summary */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Job Summary
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <FaBuilding className="text-blue-500" /> {job.company}
              </li>
              <li className="flex items-center gap-2">
                <FaMoneyBillWave className="text-green-500" />{" "}
                {job.salaryRange
                  ? `${job.salaryRange.min}-${job.salaryRange.max} ${job.salaryRange.currency}`
                  : "Not Specified"}
              </li>
              <li className="flex items-center gap-2">
                <FaCalendarAlt className="text-orange-500" /> Deadline:{" "}
                {job.applicationDeadline}
              </li>
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500" /> {job.location}
              </li>
            </ul>
          </div>

          {/* Why Work Here */}
          <div className="bg-gradient-to-br from-blue-100 to-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Why Work Here?
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Friendly & supportive environment</li>
              <li>Performance bonuses & growth opportunities</li>
              <li>Hybrid work model (Remote + Office)</li>
              <li>Annual leave & festival bonuses</li>
              <li>Modern tech stack & mentoring sessions</li>
            </ul>
          </div>

          {/* HR Contact */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              HR Contact
            </h3>
            <p className="text-gray-700 font-medium">{job.hr_name}</p>
            <p className="text-gray-600 text-sm">{job.hr_email}</p>
            <p className="text-gray-600 text-sm">Phone: +880-1712-XXXXXX</p>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center mt-10 text-gray-600">
        <p>
          💡 Make sure all links and contact information are correct before
          submitting.
        </p>
        <p className="text-sm mt-2">Good luck with your application! 🍀</p>
      </div>
    </div>
  );
};

export default JobApply;
