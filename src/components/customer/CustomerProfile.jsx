import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { User } from 'lucide-react';

const CustomerProfile = () => {
  const { currentUser } = useAuth();
  const { t } = useTranslation();

  if (!currentUser) return null;

  const avatarUrl = currentUser.avatarUrl;

  return (
    <div className="max-w-3xl mx-auto pt-12 pb-24">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 mt-2">{t('profile.myProfile')}</h2>

      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        {/* Profile Picture */}
        <div className="flex justify-start mb-6">
          <div className="relative">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-300">
                <User className="w-16 h-16 text-gray-500" />
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm text-gray-500">{t('auth.firstName')}</h3>
            <p className="text-lg font-medium text-gray-900">{currentUser.firstName || '-'}</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">{t('auth.lastName')}</h3>
            <p className="text-lg font-medium text-gray-900">{currentUser.lastName || '-'}</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm text-gray-500">{t('auth.email')}</h3>
          <p className="text-lg font-medium text-gray-900">{currentUser.email || '-'}</p>
        </div>

        <div>
          <h3 className="text-sm text-gray-500">{t('auth.phone')}</h3>
          <p className="text-lg font-medium text-gray-900">{currentUser.phone || '-'}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">{t('profile.editDisabledNote') || 'To change your account details, go to Settings.'}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;