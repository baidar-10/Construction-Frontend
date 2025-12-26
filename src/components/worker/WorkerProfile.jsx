import React from 'react';
import { MapPin, Star, Calendar, MessageSquare, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // 1. Import hook
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';
import BookingRequestModal from '../booking/BookingRequestModal';

const WorkerProfile = ({ worker: propWorker }) => {
  const { t } = useTranslation(); // 2. Initialize t function

  // Accept worker from props; fall back to a simple placeholder if missing
  const worker = propWorker || {
    user: { firstName: "Unknown", lastName: "" },
    role: t('worker.professional'),
    location: "-",
    rating: 0,
    reviewCount: 0,
    hourlyRate: 0,
    experienceYears: 0,
    skills: []
  };

  const workerName = worker.user ? `${worker.user.firstName} ${worker.user.lastName}`.trim() : 'Unknown';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-8 border-b border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 break-words">{workerName}</h1>
              <p className="text-lg text-blue-600 font-medium">
                {/* Assuming "Professional" prefix from JSON */}
                {t('worker.professional')} {worker.role}
              </p>
              <div className="flex items-center mt-2 text-gray-500">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{worker.location}</span>
                <span className="mx-2">•</span>
                <Star className="w-4 h-4 text-yellow-500 mr-1 fill-current" />
                <span className="text-gray-900 font-medium">
                  {/* Interpolation for review count */}
                  {worker.rating} ({t('worker.reviews', { count: worker.reviewCount })})
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-gray-900">
                ${worker.hourlyRate}
                <span className="text-sm text-gray-500 font-normal">{t('worker.perHour')}</span>
              </p>
              <ProfileBookingButton worker={worker} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <section>
              <h3 className="text-xl font-bold mb-3">{t('worker.about')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {/* Example of dynamic experience string */}
                {t('worker.experience', { count: worker.experienceYears })}. 
                {t('worker.licenseNote')}
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-3">{t('worker.skills')}</h3>
              <div className="flex flex-wrap gap-2">
                {worker.skills.map((skill) => (
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
                <span className="font-medium">{t('worker.verified')}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                <span className="font-medium">
                  {/* You can add a key for "Member since" in common/auth if needed */}
                  {t('profile.overview')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileBookingButton = ({ worker }) => {
  const { currentUser } = useAuth();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  if (!currentUser) return null;

  return (
    <>
      {currentUser.userType === 'customer' ? (
        <>
          <button 
            onClick={() => setOpen(true)} 
            className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            {t('worker.bookNow')}
          </button>
          {open && (
            <BookingRequestModal workerId={worker.id} onClose={() => setOpen(false)} onCreated={() => {}} />
          )}
        </>
      ) : (
        <button 
          onClick={() => alert(t('worker.viewBookings'))} 
          className="mt-3 px-6 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
        >
          {t('worker.viewBookings')}
        </button>
      )}
    </>
  );
};

export default WorkerProfile;