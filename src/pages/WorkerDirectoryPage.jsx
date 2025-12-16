import React, { useState, useEffect } from 'react';
import WorkerList from '../components/worker/WorkerList';
import SearchBar from '../components/common/SearchBar';
import { useWorkers } from '../hooks/useWorkers';
import { SKILLS_LIST } from '../utils/constants';

const WorkerDirectoryPage = () => {
  const { workers, loading, error, searchWorkers, fetchWorkers } = useWorkers();
  const [selectedSkill, setSelectedSkill] = useState('');

  useEffect(() => {
    fetchWorkers({ skill: selectedSkill });
  }, [selectedSkill]);

  const handleSearch = (query) => {
    if (query) {
      searchWorkers(query);
    } else {
      fetchWorkers({ skill: selectedSkill });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Workers</h1>
        <p className="text-gray-600">
          Browse through our network of verified construction professionals
        </p>
      </div>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search by name, role, or location..."
          />
        </div>
        <div className="md:w-64">
          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">All Skills</option>
            {SKILLS_LIST.map((skill, idx) => (
              <option key={idx} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-gray-600">
          {workers?.length || 0} workers found
        </p>
      </div>

      <WorkerList workers={workers} loading={loading} error={error} />
    </div>
  );
};

export default WorkerDirectoryPage;
