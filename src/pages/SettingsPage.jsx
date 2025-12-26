import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { authService } from '../api/authService';

const SettingsPage = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    if (currentUser) {
      setFirstName(currentUser.firstName || '');
      setLastName(currentUser.lastName || '');
      setPhone(currentUser.phone || '');
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let avatarUrl = currentUser.avatarUrl;
      if (avatarFile) {
        const uploadResp = await authService.uploadAvatar(currentUser.id, avatarFile);
        avatarUrl = uploadResp.avatarUrl || avatarUrl;
      }

      const resp = await authService.updateProfile(currentUser.id, {
        firstName,
        lastName,
        phone,
        avatarUrl,
      });

      setCurrentUser(resp.user || resp);
      alert(t('profile.updateSuccess'));
    } catch (err) {
      alert(err.response?.data?.message || err.message || t('profile.updateFailed'));
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="max-w-2xl mx-auto pt-12">
      <h2 className="text-3xl font-bold mb-6">{t('profile.editProfile')}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('profile.firstName')}</label>
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="block w-full border border-gray-300 rounded-md p-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('profile.lastName')}</label>
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="block w-full border border-gray-300 rounded-md p-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('profile.phone')}</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className="block w-full border border-gray-300 rounded-md p-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Avatar</label>
          <input type="file" accept="image/*" onChange={(e) => setAvatarFile(e.target.files[0])} className="block text-sm text-gray-600" />
        </div>

        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => window.history.back()} className="px-4 py-2 rounded border">{t('common.cancel')}</button>
          <button type="submit" disabled={loading} className="px-4 py-2 rounded bg-orange-500 text-white">{loading ? t('common.saving') : t('common.save')}</button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;
