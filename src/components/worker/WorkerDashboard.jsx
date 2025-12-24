import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import { bookingService } from '../../api/bookingService';
import Loader from '../common/Loader';
import BookingCard from '../booking/BookingCard';

const WorkerDashboard = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await bookingService.getWorkerBookings(currentUser.id);
        setBookings(data);
      } catch (err) {
        setError(err.response?.data?.message || t('errors.fetchFailed'));
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchBookings();
    }
  }, [currentUser, t]);

  if (loading) return <Loader fullScreen showText />;
  if (error) return <div className="text-center py-16 text-red-600">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('booking.myBookings')}</h1>

      <div className="space-y-4">
        {bookings.length === 0 ? (
          <p className="text-gray-600">{t('booking.noBookings')}</p>
        ) : (
          bookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
        )}
      </div>
    </div>
  );
};

export default WorkerDashboard;