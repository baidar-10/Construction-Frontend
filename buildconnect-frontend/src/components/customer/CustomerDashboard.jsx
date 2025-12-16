import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { bookingService } from '../../api/bookingService';
import Loader from '../common/Loader';
import BookingList from '../booking/BookingList';
import { useBooking } from '../../hooks/useBooking';

const CustomerDashboard = () => {
  const { currentUser } = useAuth();
  const { cancelBooking } = useBooking();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await bookingService.getUserBookings(currentUser.id);
        setBookings(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchBookings();
    }
  }, [currentUser]);

  const handleCancelBooking = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    } catch (err) {
      alert('Failed to cancel booking');
    }
  };

  if (loading) return <Loader fullScreen />;
  if (error) return <div className="text-center py-16 text-red-600">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>

      <BookingList
        bookings={bookings}
        loading={loading}
        error={error}
        isWorker={false}
        onCancel={handleCancelBooking}
      />
    </div>
  );
};

export default CustomerDashboard;