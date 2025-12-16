import React from 'react';
import { Users } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
              <Users className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold">BuildConnect</span>
          </div>
          <p className="text-slate-400">
            Connecting customers with trusted construction professionals
          </p>
          <p className="text-slate-500 text-sm mt-4">
            © {new Date().getFullYear()} BuildConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;