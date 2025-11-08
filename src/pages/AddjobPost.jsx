import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext/AuthContext";
import Swal from "sweetalert2";
import {
  FaUserTie,
  FaEnvelope,
  FaPhoneAlt,
  FaBuilding,
  FaBriefcase,
  FaUsers,
} from "react-icons/fa";

const AddJobPost = () => {
  const { user } = useContext(AuthContext);
  const [requirements, setRequirements] = useState([]);
  const [responsibilities, setResponsibilities] = useState([]);
  const [keywords, setKeywords] = useState([]);

  const handleAddJob = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const location = form.location.value;
    const jobType = form.jobType.value;
    const category = form.category.value;
    const applicationDeadline = form.applicationDeadline.value;
    const salaryMin = parseInt(form.salaryMin.value);
    const salaryMax = parseInt(form.salaryMax.value);
    const currency = form.currency.value;
    const description = form.description.value;
    const company = form.company.value;
    const company_logo = form.company_logo.value;
    const hr_email = form.hr_email.value;
    const hr_name = form.hr_name.value;
    const status = form.status.value;

    const jobData = {
      title,
      location,
      jobType,
      category,
      applicationDeadline,
      salaryRange: { min: salaryMin, max: salaryMax, currency },
      description,
      company,
      company_logo,
      requirements: requirements.filter((r) => r.trim() !== ""),
      responsibilities: responsibilities.filter((r) => r.trim() !== ""),
      keywords: keywords.filter((k) => k.trim() !== ""),
      hr_email,
      hr_name,
      status,
    };

    fetch("http://localhost:3000/jobs", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(jobData),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire("✅ Success!", "Job Posted Successfully!", "success");
        form.reset();
        setRequirements([]);
        setResponsibilities([]);
        setKeywords([]);
      })
      .catch(() => Swal.fire("❌ Error!", "Failed to add job!", "error"));
  };

  const handleAddField = (type) => {
    if (type === "req") setRequirements([...requirements, ""]);
    else if (type === "res") setResponsibilities([...responsibilities, ""]);
    else setKeywords([...keywords, ""]);
  };

  const handleChange = (index, value, type) => {
    if (type === "req") {
      const updated = [...requirements];
      updated[index] = value;
      setRequirements(updated);
    } else if (type === "res") {
      const updated = [...responsibilities];
      updated[index] = value;
      setResponsibilities(updated);
    } else {
      const updated = [...keywords];
      updated[index] = value;
      setKeywords(updated);
    }
  };

  const fakeJobs = [
    { id: 1, title: "Frontend Developer", type: "Remote", status: "Active" },
    { id: 2, title: "Backend Engineer", type: "Onsite", status: "Closed" },
    { id: 3, title: "UI/UX Designer", type: "Hybrid", status: "Active" },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-10 px-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Section - Form */}
        <div className="lg:col-span-2 bg-white shadow-lg p-8 rounded-2xl border border-blue-100">
          <div className="text-center mb-6">
            <p className="text-blue-500 font-medium">Job Posting Dashboard</p>
            <h1 className="font-bold text-3xl mb-2 text-gray-700">
              Post a New Job Opening
            </h1>
            <div className="divider">Job Information</div>
          </div>

          <form onSubmit={handleAddJob} className="space-y-4">
            <label className="label">Job Title</label>
            <input
              name="title"
              placeholder="e.g. Frontend Developer"
              className="input input-bordered w-full"
              required
            />

            <label className="label">Company</label>
            <input
              name="company"
              placeholder="e.g. TechNova Solutions Ltd."
              className="input input-bordered w-full"
              required
            />

            <label className="label">Company Logo URL</label>
            <input
              name="company_logo"
              placeholder="https://example.com/logo.png"
              className="input input-bordered w-full"
              required
            />

            <label className="label">Location</label>
            <input
              name="location"
              placeholder="e.g. Dhaka, Bangladesh"
              className="input input-bordered w-full"
              required
            />

            <label className="label">Job Type</label>
            <select name="jobType" className="select select-bordered w-full" required>
              <option value="">Select Job Type</option>
              <option value="Onsite">Onsite</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>

            <label className="label">Category</label>
            <input
              name="category"
              placeholder="e.g. Software Engineering"
              className="input input-bordered w-full"
              required
            />

            <label className="label">Application Deadline</label>
            <input
              type="date"
              name="applicationDeadline"
              className="input input-bordered w-full"
              required
            />

            <label className="label">Salary Range</label>
            <div className="flex gap-2">
              <input
                name="salaryMin"
                type="number"
                className="input input-bordered w-1/3"
                placeholder="Min (e.g. 25000)"
                required
              />
              <input
                name="salaryMax"
                type="number"
                className="input input-bordered w-1/3"
                placeholder="Max (e.g. 60000)"
                required
              />
              <input
                name="currency"
                className="input input-bordered w-1/3"
                defaultValue="BDT"
                placeholder="Currency (e.g. USD, BDT)"
              />
            </div>

            <label className="label">Description</label>
            <textarea
              name="description"
              className="textarea textarea-bordered w-full"
              placeholder="Briefly describe the job role and expectations"
              required
              rows="3"
            ></textarea>

            {/* Requirements */}
            <label className="label flex justify-between items-center">
              Requirements
              <button
                type="button"
                className="btn btn-xs btn-outline"
                onClick={() => handleAddField("req")}
              >
                + Add
              </button>
            </label>
            {requirements.map((req, i) => (
              <input
                key={i}
                value={req}
                onChange={(e) => handleChange(i, e.target.value, "req")}
                className="input input-bordered w-full mb-2"
                placeholder={`Requirement ${i + 1} (e.g. 2+ years experience with React)`}
              />
            ))}

            {/* Responsibilities */}
            <label className="label flex justify-between items-center">
              Responsibilities
              <button
                type="button"
                className="btn btn-xs btn-outline"
                onClick={() => handleAddField("res")}
              >
                + Add
              </button>
            </label>
            {responsibilities.map((res, i) => (
              <input
                key={i}
                value={res}
                onChange={(e) => handleChange(i, e.target.value, "res")}
                className="input input-bordered w-full mb-2"
                placeholder={`Responsibility ${i + 1} (e.g. Maintain frontend architecture)`}
              />
            ))}

            {/* Keywords */}
            <label className="label flex justify-between items-center">
              Keywords
              <button
                type="button"
                className="btn btn-xs btn-outline"
                onClick={() => handleAddField("key")}
              >
                + Add
              </button>
            </label>
            {keywords.map((key, i) => (
              <input
                key={i}
                value={key}
                onChange={(e) => handleChange(i, e.target.value, "key")}
                className="input input-bordered w-full mb-2"
                placeholder={`Keyword ${i + 1} (e.g. React, Node.js, MongoDB)`}
              />
            ))}

            <div className="divider">HR Information</div>

            <label className="label">HR Name</label>
            <input
              name="hr_name"
              className="input input-bordered w-full"
              defaultValue={user?.displayName || ""}
              placeholder="Enter your full name"
              required
            />

            <label className="label">HR Email</label>
            <input
              type="email"
              name="hr_email"
              className="input input-bordered w-full"
              defaultValue={user?.email || ""}
              placeholder="Enter your company email"
              required
            />

            <label className="label">Status</label>
            <select name="status" className="select select-bordered w-full" required>
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="closed">Closed</option>
            </select>

            <button className="btn bg-green-500 hover:bg-green-600 text-white mt-4 w-full">
              Add Job
            </button>
          </form>
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col items-center text-center">
            <img
              src={user?.photoURL || ""}
              alt="Recruiter"
              className="w-24 h-24 rounded-full object-cover mb-3 border-4 border-blue-100"
            />
            <h2 className="font-semibold text-lg text-gray-800">
              {user?.displayName || "Farhan Rahman"}
            </h2>
            <p className="text-sm text-gray-500 mb-2">HR Recruiter</p>
            <p className="text-gray-600 flex items-center justify-center gap-1 text-sm">
              <FaEnvelope /> {user?.email || "hr@company.com"}
            </p>
            <p className="text-gray-600 flex items-center justify-center gap-1 text-sm">
              <FaPhoneAlt /> +880 1720-XXXXXX
            </p>
          </div>

          {/* Job Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-100 rounded-xl p-4 text-center">
              <FaBriefcase className="mx-auto text-blue-600 text-2xl mb-1" />
              <h3 className="font-bold text-xl">45</h3>
              <p className="text-sm text-gray-600">Active Jobs</p>
            </div>
            <div className="bg-green-100 rounded-xl p-4 text-center">
              <FaUsers className="mx-auto text-green-600 text-2xl mb-1" />
              <h3 className="font-bold text-xl">120</h3>
              <p className="text-sm text-gray-600">Applicants</p>
            </div>
            <div className="bg-yellow-100 rounded-xl p-4 text-center">
              <FaBuilding className="mx-auto text-yellow-600 text-2xl mb-1" />
              <h3 className="font-bold text-xl">12</h3>
              <p className="text-sm text-gray-600">Companies</p>
            </div>
          </div>

          {/* Company Info */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <FaBuilding /> Company Overview
            </h2>
            <p className="text-gray-600 mb-2">
              <strong>Company:</strong> Favorite IT Solutions Ltd.
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Location:</strong> Chittagong, Bangladesh
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Employees:</strong> 120+
            </p>
            <p className="text-gray-600">
              <strong>Active Recruiter:</strong>{" "}
              {user?.displayName || "Farhan Rahman"}
            </p>
          </div>

          {/* Recently Added Jobs */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaBriefcase /> Recently Added Jobs
            </h2>
            <table className="table w-full">
              <thead>
                <tr className="text-gray-500 text-sm">
                  <th>Title</th>
                  <th>Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {fakeJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50 text-gray-700">
                    <td>{job.title}</td>
                    <td>{job.type}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          job.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddJobPost;
