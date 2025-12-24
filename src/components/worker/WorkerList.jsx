import React from 'react';
import { MapPin, Star, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Loader from '../common/Loader';

const WorkerList = ({ workers = [], loading = false, error = null }) => {
  const { t } = useTranslation();

  if (loading) {
    return <Loader showText />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!workers || workers.length === 0) {
    return <p className="text-gray-500">{t('search.noWorkersFound')}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {workers.map((worker) => {
        const name = worker.user ? `${worker.user.firstName} ${worker.user.lastName}` : worker.name || '';
        const role = worker.specialty || worker.role || t('worker.professional');
        const rating = worker.rating || 0;
        const location = worker.location || '';
        const price = worker.hourlyRate ? worker.hourlyRate.toFixed(0) : '—';

        return (
          <div key={worker.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
                <div className="flex items-center text-blue-600 mt-1">
                  <Briefcase className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">{role}</span>
                </div>
              </div>
              <div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
                <Star className="w-4 h-4 text-yellow-500 mr-1 fill-current" />
                <span className="font-bold text-sm text-yellow-700">{rating}</span>
              </div>
            </div>

            <div className="flex items-center text-gray-500 mb-4 text-sm">
              <MapPin className="w-4 h-4 mr-1" />
              {location}
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <span className="text-lg font-bold text-gray-900">
                ${price}
                <span className="text-sm text-gray-500 font-normal">
                  {t('worker.perHour')}
                </span>
              </span>
              <Link 
                to={`/workers/${worker.id}`} 
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
              >
                {t('worker.viewProfile')}
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WorkerList;