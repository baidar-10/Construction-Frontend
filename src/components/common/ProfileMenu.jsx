import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';

const ProfileMenu = () => {
  const { currentUser, logout, setCurrentUser } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!currentUser) return null;

  return (
    <div className="relative inline-block text-left">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2">
        <img
          src={currentUser.avatarUrl || '/default-avatar.svg'}
          alt="avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-md shadow-sm py-1 z-50">
          <button
            onClick={() => { setOpen(false); navigate('/profile'); }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            {t('profile.myProfile')}
          </button>

          <button
            onClick={() => { setOpen(false); navigate('/settings'); }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            {t('profile.editProfile')}
          </button>

          {currentUser.userType === 'worker' && (
            <button
              onClick={() => { setOpen(false); navigate('/dashboard'); }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Dashboard
            </button>
          )}

          <button
            onClick={() => { setOpen(false); handleLogout(); }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            {t('nav.logout')}
          </button>
        </div>
      )}


    </div>
  );
};

export default ProfileMenu;
