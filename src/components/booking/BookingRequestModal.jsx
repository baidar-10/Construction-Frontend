import React, { useState } from 'react';
import { bookingService } from '../../api/bookingService';
import { useTranslation } from 'react-i18next';
import Input from '../common/Input';
import Button from '../common/Button';

const BookingRequestModal = ({ workerId, onClose, onCreated }) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [durationHours, setDurationHours] = useState(1);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Convert date to ISO 8601 format with time component
      const scheduledDateTime = scheduledDate ? `${scheduledDate}T00:00:00Z` : '';
      
      const payload = {
        workerId,
        title,
        description,
        scheduledDate: scheduledDateTime,
        durationHours: parseInt(durationHours, 10),
        location,
      };
      console.log('Sending booking payload:', payload);
      const resp = await bookingService.createBooking(payload);
      onCreated && onCreated(resp.booking);
      onClose();
    } catch (err) {
      console.error('Booking error:', err.response?.data || err);
      setError(err.response?.data?.error || err.response?.data?.message || err.message || t('errors.bookingFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-50 overflow-y-auto z-50">
      {/* Header-like section */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">{t('booking.requestTitle')}</h1>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label className="block text-base font-medium text-gray-700 mb-1 text-left">
                {t('booking.titleLabel')}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t('booking.titlePlaceholder')}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-base font-medium text-gray-700 mb-1 text-left">
                {t('booking.descriptionLabel')}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t('booking.descriptionPlaceholder')}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block text-base font-medium text-gray-700 mb-1 text-left">
                {t('booking.dateLabel')}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="date"
                name="scheduledDate"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-base font-medium text-gray-700 mb-1 text-left">
                  {t('booking.durationLabel')}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="number"
                  name="durationHours"
                  min={1}
                  value={durationHours}
                  onChange={(e) => setDurationHours(parseInt(e.target.value, 10) || 1)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-1 text-left">
                  {t('booking.locationLabel')}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={t('booking.locationPlaceholder')}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <Button type="button" onClick={onClose} variant="ghost">
                {t('common.cancel')}
              </Button>
              <Button type="submit" loading={loading} disabled={loading} variant="primary">
                {t('booking.sendRequest')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingRequestModal;