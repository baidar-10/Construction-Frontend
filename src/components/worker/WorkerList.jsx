import React from 'react';
import { MapPin, Star, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const WorkerList = () => {
  // Temporary dummy data
  const workers = [
    { id: 1, name: "Alex Johnson", role: "Electrician", rating: 4.9, location: "New York, NY", price: 45 },
    { id: 2, name: "Sarah Smith", role: "Plumber", rating: 4.7, location: "Brooklyn, NY", price: 55 },
    { id: 3, name: "Mike Brown", role: "Carpenter", rating: 4.8, location: "Queens, NY", price: 40 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {workers.map((worker) => (
        <div key={worker.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{worker.name}</h3>
              <div className="flex items-center text-blue-600 mt-1">
                <Briefcase className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">{worker.role}</span>
              </div>
            </div>
            <div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
              <Star className="w-4 h-4 text-yellow-500 mr-1 fill-current" />
              <span className="font-bold text-sm text-yellow-700">{worker.rating}</span>
            </div>
          </div>

          <div className="flex items-center text-gray-500 mb-4 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            {worker.location}
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <span className="text-lg font-bold text-gray-900">${worker.price}<span className="text-sm text-gray-500 font-normal">/hr</span></span>
            <Link to={`/profile`} className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors">
              View Profile
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkerList;