import React, { useState } from 'react';

const JobFilterComponent = () => {
  const [company, setCompany] = useState('');
  const [jobBoard, setJobBoard] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [jobType, setJobType] = useState('');
  const [numResults, setNumResults] = useState('50');

  const handleSearch = async () => {
    const res = await fetch("http://127.0.0.1:8000/jobs/indeed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        search_term: searchTerm,
        location: "Germany",
        job_type: jobType,
        results_wanted: numResults,
        hours_old: 720
      }),
    });
    const data = await res.json();
    console.log(data.jobs);
  };
  

  return (
    <div className="w-full bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Job Search Filters</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {/* Company Name Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Company Name
            </label>
            <select
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-800 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition"
            >
              <option value="">All Companies</option>
              <option value="google">Google</option>
              <option value="amazon">Amazon</option>
              <option value="microsoft">Microsoft</option>
              <option value="meta">Meta</option>
              <option value="apple">Apple</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Job Board Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Job Board
            </label>
            <select
              value={jobBoard}
              onChange={(e) => setJobBoard(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-800 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition"
            >
              <option value="">All Boards</option>
              <option value="linkedin">LinkedIn</option>
              <option value="indeed">Indeed</option>
              <option value="glassdoor">Glassdoor</option>
              <option value="dice">Dice</option>
              <option value="monster">Monster</option>
            </select>
          </div>

          {/* Search Terms Input */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Search Terms
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="e.g. Data Analyst, Software Engineer"
              className="w-full px-4 py-3 bg-white border border-gray-800 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition"
            />
            <p className="mt-1 text-xs text-gray-600">
              Data Analyst, Software Engineer, Data Scientist, Blockchain...
            </p>
          </div>

          {/* Job Type Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Job Type
            </label>
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-800 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition"
            >
              <option value="">All Types</option>
              <option value="fulltime">Full-Time</option>
              <option value="parttime">Part-Time</option>
              <option value="internship">Internship</option>
              <option value="contract">Contract Based</option>
            </select>
          </div>

          {/* Number of Results */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Results Limit
            </label>
            <input
              type="number"
              min="10"
              max="200"
              step="10"
              value={numResults}
              onChange={(e) => setNumResults(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-800 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Optional: Add a search button row if needed */}
        <div className="mt-8 flex justify-end">
        <button
  onClick={handleSearch}
  className="px-8 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition shadow-md"
>
  Apply Filters
</button>
        </div>
      </div>
    </div>
  );
};

export default JobFilterComponent;