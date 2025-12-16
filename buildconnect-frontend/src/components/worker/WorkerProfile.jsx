import React from 'react';
import { MapPin, Star, Calendar, MessageSquare, Shield } from 'lucide-react';

const WorkerProfile = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-8 border-b border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Alex Johnson</h1>
              <p className="text-lg text-blue-600 font-medium">Professional Electrician</p>
              <div className="flex items-center mt-2 text-gray-500">
                <MapPin className="w-4 h-4 mr-1" />
                <span>New York, NY</span>
                <span className="mx-2">•</span>
                <Star className="w-4 h-4 text-yellow-500 mr-1 fill-current" />
                <span className="text-gray-900 font-medium">4.9 (124 reviews)</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-gray-900">$45<span className="text-sm text-gray-500 font-normal">/hr</span></p>
              <button className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Book Now
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <section>
              <h3 className="text-xl font-bold mb-3">About Me</h3>
              <p className="text-gray-600 leading-relaxed">
                Licensed electrician with over 8 years of experience in residential and commercial projects. 
                Specialized in panel upgrades, lighting installation, and troubleshooting. I take pride in clean, safe work.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {["Electrical Wiring", "Panel Upgrades", "Lighting", "Smart Home", "Troubleshooting"].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center mb-3">
                <Shield className="w-5 h-5 text-green-600 mr-2" />
                <span className="font-medium">Identity Verified</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                <span className="font-medium">Member since 2021</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;