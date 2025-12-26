import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { authService } from '../../api/authService';

const EditProfileModal = ({ onClose, setCurrentUser }) => {
  // Deprecated: modal removed in favor of /settings page. Left to avoid build errors if referenced elsewhere.
  const { currentUser } = useAuth();
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState(currentUser?.firstName || '');
  const [lastName, setLastName] = useState(currentUser?.lastName || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);

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

      // Update context user
      setCurrentUser(resp.user || resp);
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || err.message || t('profile.updateFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div onClick={onClose} className="fixed inset-0 bg-gray-900 bg-opacity-10 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl p-6 w-full max-w-md sm:max-w-lg shadow-xl">
        <h3 className="text-lg font-medium mb-4">{t('profile.editProfile')}</h3>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('profile.firstName')}</label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder={t('profile.firstName')}
                className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={t('profile.firstName')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('profile.lastName')}</label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder={t('profile.lastName')}
                className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={t('profile.lastName')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('profile.phone')}</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t('profile.phone')}
                className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={t('profile.phone')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Avatar</label>
              <input type="file" accept="image/*" onChange={(e) => setAvatarFile(e.target.files[0])} className="block text-sm text-gray-600" aria-label="avatar upload" />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">{t('common.cancel')}</button>
            <button disabled={loading} type="submit" className="px-4 py-2 rounded bg-blue-600 text-white shadow">{loading ? t('common.saving') : t('common.save')}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
