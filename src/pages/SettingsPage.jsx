import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { authService } from '../api/authService';
import { User, Trash2, Lock } from 'lucide-react';
import ChangePasswordModal from '../components/common/ChangePasswordModal';

const SettingsPage = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setFirstName(currentUser.firstName || '');
      setLastName(currentUser.lastName || '');
      setPhone(currentUser.phone || '');
      setPreviewUrl(currentUser.avatarUrl || '');
    }
  }, [currentUser]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
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

      const updatedUser = resp.user || resp;
      setCurrentUser(updatedUser);
      setPreviewUrl(updatedUser.avatarUrl || '');
      setAvatarFile(null);
      alert(t('profile.updateSuccess'));
    } catch (err) {
      alert(err.response?.data?.message || err.message || t('profile.updateFailed'));
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="max-w-2xl mx-auto pt-12 px-4">
      <h2 className="text-3xl font-bold mb-6">{t('profile.editProfile')}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar Section */}
        <div className="flex items-start gap-6 py-4 border-b">
          <div className="relative flex-shrink-0">
            {previewUrl ? (
              <>
                <img
                  src={previewUrl}
                  alt="Profile preview"
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
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
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-300">
                <User className="w-16 h-16 text-gray-500" />
              </div>
            )}
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('profile.profilePicture') || 'Profile Picture'}</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleAvatarChange} 
              className="block text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
            />
          </div>
        </div>

        {/* Profile Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('profile.firstName')}</label>
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('profile.lastName')}</label>
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('profile.phone')}</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        {/* Security Section */}
        <div className="pt-4 border-t">
          <h3 className="text-lg font-medium mb-3">{t('profile.security') || 'Security'}</h3>
          <button
            type="button"
            onClick={() => setShowChangePassword(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
          >
            <Lock className="w-4 h-4" />
            {t('profile.changePassword') || 'Change Password'}
          </button>
        </div>

        <div className="flex justify-end gap-3 pt-4 mb-12">
          <button type="button" onClick={() => window.history.back()} className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-50">{t('common.cancel')}</button>
          <button type="submit" disabled={loading} className="px-4 py-2 rounded bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50">{loading ? t('common.saving') : t('common.save')}</button>
        </div>
      </form>

      {showChangePassword && (
        <ChangePasswordModal onClose={() => setShowChangePassword(false)} />
      )}
    </div>
  );
};

export default SettingsPage;
