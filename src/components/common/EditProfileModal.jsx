import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { authService } from '../../api/authService';
import { User, Trash2 } from 'lucide-react';

const EditProfileModal = ({ onClose, setCurrentUser }) => {
  // Deprecated: modal removed in favor of /settings page. Left to avoid build errors if referenced elsewhere.
  const { currentUser } = useAuth();
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState(currentUser?.firstName || '');
  const [lastName, setLastName] = useState(currentUser?.lastName || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [avatarFile, setAvatarFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(currentUser?.avatarUrl || '');
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAvatar = async () => {
    if (!window.confirm(t('profile.confirmDeleteAvatar') || 'Are you sure you want to delete your profile picture?')) {
      return;
    }
    
    setDeleting(true);
    try {
      await authService.deleteAvatar(currentUser.id);
      setPreviewUrl('');
      setAvatarFile(null);
      
      // Update context user
      const updatedUser = { ...currentUser, avatarUrl: '' };
      setCurrentUser(updatedUser);
      
      alert(t('profile.avatarDeleted') || 'Profile picture deleted successfully');
    } catch (err) {
      alert(err.response?.data?.message || err.message || t('profile.deleteFailed') || 'Failed to delete avatar');
    } finally {
      setDeleting(false);
    }
  };

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
    <div onClick={onClose} className="fixed inset-0 bg-gray-900 bg-opacity-10 backdrop-blur-sm flex items-center justify-start z-50 p-4">
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl p-6 w-full max-w-md sm:max-w-lg shadow-xl">
        <h3 className="text-lg font-medium mb-4">{t('profile.editProfile')}</h3>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Avatar Preview and Upload */}
            <div className="flex flex-col items-center">
              <div className="mb-3 relative">
                {previewUrl ? (
                  <>
                    <img
                      src={previewUrl}
                      alt="Profile preview"
                      className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={handleDeleteAvatar}
                      disabled={deleting}
                      className="absolute -bottom-1 -right-1 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg disabled:opacity-50"
                      title={t('profile.deleteAvatar') || 'Delete avatar'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-300">
                    <User className="w-12 h-12 text-gray-500" />
                  </div>
                )}
              </div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('profile.profilePicture') || 'Profile Picture'}</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleAvatarChange} 
                className="block text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
                aria-label="avatar upload" 
              />
            </div>
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
          </div>

          <div className="mt-6 mb-4 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">{t('common.cancel')}</button>
            <button disabled={loading} type="submit" className="px-4 py-2 rounded bg-blue-600 text-white shadow">{loading ? t('common.saving') : t('common.save')}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
