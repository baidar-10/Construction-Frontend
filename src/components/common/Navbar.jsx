import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import LanguageSwitcher from './LanguageSwitcher';
import ProfileMenu from './ProfileMenu';

const Navbar = () => {
  const { t } = useTranslation();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
              <Users className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold text-gray-900">BuildConnect</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/workers"
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {t('nav.findWorkers')}
            </Link>

            <LanguageSwitcher />

            {currentUser ? (
              <>
                {currentUser.userType === 'worker' && (
                  <Link
                    to="/dashboard"
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {t('nav.dashboard')}
                  </Link>
                )}
                <ProfileMenu />
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
                >
                  {t('nav.signup')}
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <div className="px-4 py-2">
              <LanguageSwitcher />
            </div>
            
            <Link
              to="/workers"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.findWorkers')}
            </Link>

            {currentUser ? (
              <>
                {currentUser.userType === 'worker' && (
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('nav.dashboard')}
                  </Link>
                )}
                <div className="px-4 py-2">
                  <ProfileMenu />
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 bg-orange-500 text-white rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('nav.signup')}
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;