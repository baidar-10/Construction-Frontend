import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, Calendar, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Button from '../components/common/Button';
import SearchBar from '../components/common/SearchBar';
import { useWorkers } from '../hooks/useWorkers';

const HomePage = () => {
  const { t } = useTranslation();
  const { searchWorkers } = useWorkers();

  const handleSearch = (query) => {
    if (query) {
      searchWorkers(query);
    }
  };

  const features = [
    {
      icon: <Search size={32} />,
      title: t('features.findWorkers.title'),
      description: t('features.findWorkers.description'),
    },
    {
      icon: <Users size={32} />,
      title: t('features.verifiedProfiles.title'),
      description: t('features.verifiedProfiles.description'),
    },
    {
      icon: <Calendar size={32} />,
      title: t('features.easyBooking.title'),
      description: t('features.easyBooking.description'),
    },
    {
      icon: <MessageSquare size={32} />,
      title: t('features.directCommunication.title'),
      description: t('features.directCommunication.description'),
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-500 to-amber-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              {t('hero.subtitle')}
            </p>

            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-2">
              <SearchBar
                onSearch={handleSearch}
                placeholder={t('hero.searchPlaceholder')}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link to="/workers">
                <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600">
                  {t('hero.browseWorkers')}
                </Button>
              </Link>
              <Link to="/register?type=worker">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-orange-600"
                >
                  {t('hero.joinAsWorker')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            {t('features.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 text-orange-600 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-slate-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{t('cta.title')}</h2>
          <p className="text-xl text-slate-300 mb-8">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register?type=customer">
              <Button size="lg">{t('cta.signupCustomer')}</Button>
            </Link>
            <Link to="/register?type=worker">
              <Button size="lg" variant="secondary">
                {t('cta.registerWorker')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;