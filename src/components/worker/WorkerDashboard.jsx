import React from 'react';
import { Calendar, DollarSign, Star, Clock } from 'lucide-react';

const WorkerDashboard = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Worker Dashboard</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-full">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Active Jobs</p>
              <p className="text-xl font-bold">3</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-full">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Earnings (Month)</p>
              <p className="text-xl font-bold">$1,250</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Rating</p>
              <p className="text-xl font-bold">4.8</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 rounded-full">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Hours Worked</p>
              <p className="text-xl font-bold">124</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold text-lg mb-4">Recent Bookings</h3>
        <p className="text-gray-500">No new booking requests.</p>
      </div>
    </div>
  );
};

export default WorkerDashboard;