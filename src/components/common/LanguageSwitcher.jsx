import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    // Check if i18n is properly initialized
    if (i18n && typeof i18n.changeLanguage === 'function') {
      i18n.changeLanguage(lng);
      localStorage.setItem('language', lng);
    }
  };

  // Get current language safely
  const currentLanguage = i18n?.language || 'en';

  return (
    <div className="flex items-center gap-2">
      <Globe size={20} className="text-gray-600" />
      <select
        value={currentLanguage}
        onChange={(e) => changeLanguage(e.target.value)}
        className="px-3 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-700"
      >
        <option value="en">English</option>
        <option value="ru">Русский</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;