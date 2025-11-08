import React, { useEffect, useState } from "react";
import SingleJobCard from "./SingleJobCard";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  // Fetch jobs
  useEffect(() => {
    fetch("http://localhost:3000/jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setFilteredJobs(data);
      });
  }, []);

  // Extract unique categories
  const categories = ["All", ...new Set(jobs.map((job) => job.category))];

  // Handle filtering
  useEffect(() => {
    let filtered = jobs;

    if (category !== "All") {
      filtered = filtered.filter((job) => job.category === category);
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredJobs(filtered);
  }, [searchTerm, category, jobs]);

  return (
    <div className="container mx-auto py-10 px-5">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gray-800">
          Jobs of the Day
        </h1>
        <p className="text-gray-500 font-medium">
          Search and connect with the right opportunities faster.
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by job title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full md:w-1/2 border-gray-300 focus:border-blue-500"
        />
      </div>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center  lg:w-[60%] mx-auto gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-5 py-2 rounded-xl border border-blue-300 font-semibold transition-all duration-200 
              ${
                category === cat
                  ? "bg-blue-400 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-100"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Jobs Grid */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredJobs.map((job) => (
            <SingleJobCard key={job._id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-20">
          <p className="text-lg">No jobs found. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
};

export default AllJobs;
