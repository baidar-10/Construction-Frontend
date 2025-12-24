import React from 'react';
import BookingCard from './BookingCard';
import Loader from '../common/Loader';
import { useTranslation } from 'react-i18next'; // 1. Hook is already imported here

const BookingList = ({ bookings, loading, error, isWorker, onAccept, onReject, onCancel }) => {
  const { t } = useTranslation(); // 2. Initialize the translation function

  if (loading) {
    return (
      <div className="py-16">
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        {/* 3. Use t() for error messages if you have a specific key, 
           or keep the dynamic error if it comes from the API */}
        <p className="text-xl text-red-600">{t('errors.fetchFailed')}</p>
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-center py-16">
        {/* 4. Replace "No bookings found" with the JSON key */}
        <p className="text-xl text-gray-600">{t('booking.noBookings')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <BookingCard
          key={booking.id}
          booking={booking}
          isWorker={isWorker}
          onAccept={onAccept}
          onReject={onReject}
          onCancel={onCancel}
        />
      ))}
    </div>
  );
};

export default BookingList;