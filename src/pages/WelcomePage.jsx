import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const WelcomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, userType } = location.state || {};

  const { t } = useTranslation();

  const workerSteps = [
    {
      icon: "👤",
      title: t('welcome.workerSteps.1.title'),
      description: t('welcome.workerSteps.1.description')
    },
    {
      icon: "🔍",
      title: t('welcome.workerSteps.2.title'),
      description: t('welcome.workerSteps.2.description')
    },
    {
      icon: "📅",
      title: t('welcome.workerSteps.3.title'),
      description: t('welcome.workerSteps.3.description')
    },
    {
      icon: "⭐",
      title: t('welcome.workerSteps.4.title'),
      description: t('welcome.workerSteps.4.description')
    }
  ];

  const customerSteps = [
    {
      icon: "🔍",
      title: t('welcome.customerSteps.1.title'),
      description: t('welcome.customerSteps.1.description')
    },
    {
      icon: "👤",
      title: t('welcome.customerSteps.2.title'),
      description: t('welcome.customerSteps.2.description')
    },
    {
      icon: "📅",
      title: t('welcome.customerSteps.3.title'),
      description: t('welcome.customerSteps.3.description')
    },
    {
      icon: "💬",
      title: t('welcome.customerSteps.4.title'),
      description: t('welcome.customerSteps.4.description')
    }
  ];

  const steps = userType === 'worker' ? workerSteps : customerSteps;

  const handleGetStarted = () => {
    if (userType === 'worker') {
      navigate('/workers'); // They'll see their own profile
    } else {
      navigate('/workers'); // Browse workers
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <span className="text-5xl">🎉</span>
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {t('welcome.title')}{user && `, ${user.firstName}!`}
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {userType === 'worker' ? t('welcome.hero.worker') : t('welcome.hero.customer')}
          </p>
        </div>

        {/* How It Works Section */}
        <div className="max-w-5xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            {t('welcome.howItWorks')}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
                <div className="text-5xl mb-4">{step.icon}</div>
                <div className="flex items-center mb-2">
                  <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    {index + 1}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                </div>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {t('welcome.whatYouCanDoNow')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {userType === 'worker' ? (
              <>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{t('welcome.features.completeProfile.title')}</h3>
                    <p className="text-sm text-gray-600">{t('welcome.features.completeProfile.description')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{t('welcome.features.setAvailability.title')}</h3>
                    <p className="text-sm text-gray-600">{t('welcome.features.setAvailability.description')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{t('welcome.features.respondInquiries.title')}</h3>
                    <p className="text-sm text-gray-600">{t('welcome.features.respondInquiries.description')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{t('welcome.features.acceptBookings.title')}</h3>
                    <p className="text-sm text-gray-600">{t('welcome.features.acceptBookings.description')}</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{t('welcome.features.searchWorkers.title')}</h3>
                    <p className="text-sm text-gray-600">{t('welcome.features.searchWorkers.description')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{t('welcome.features.saveFavorites.title')}</h3>
                    <p className="text-sm text-gray-600">{t('welcome.features.saveFavorites.description')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{t('welcome.features.bookServices.title')}</h3>
                    <p className="text-sm text-gray-600">{t('welcome.features.bookServices.description')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{t('welcome.features.leaveReviews.title')}</h3>
                    <p className="text-sm text-gray-600">{t('welcome.features.leaveReviews.description')}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button
            onClick={handleGetStarted}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-lg font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {userType === 'worker' ? t('welcome.cta.viewProfile') : t('welcome.cta.browseWorkers')}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          
          <p className="mt-4 text-sm text-gray-600">
            {t('welcome.cta.dashboardNote')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;