import React from 'react';
import BookingCard from './BookingCard';
import Loader from '../common/Loader';

const BookingList = ({ bookings, loading, error, isWorker, onAccept, onReject, onCancel }) => {
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
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-gray-600">No bookings found</p>
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