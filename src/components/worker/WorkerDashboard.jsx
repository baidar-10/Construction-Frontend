import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import { bookingService } from '../../api/bookingService';
import { workerService } from '../../api/workerService';
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
        // If user is a worker, we need the worker's ID (not the user ID) to fetch bookings
        if (currentUser.userType === 'worker') {
          try {
            const worker = await workerService.getWorkerByUserId(currentUser.id);
            if (!worker || !worker.id) {
              // show friendly message when worker profile doesn't exist
              setError(t('workerProfile.notFound') || 'Worker profile not found. Please complete your profile.');
              return;
            }
            const data = await bookingService.getWorkerBookings(worker.id);
            // Transform booking data to include customer information
            const transformedBookings = data.map(booking => ({
              ...booking,
              customerName: booking.customer?.user ? 
                `${booking.customer.user.firstName} ${booking.customer.user.lastName}` : 
                'Unknown Customer',
              customerPhone: booking.customer?.user?.phone || 'N/A',
              date: booking.scheduledDate,
              time: booking.scheduledTime,
              description: booking.description || booking.title
            }));
            setBookings(transformedBookings);
          } catch (err) {
            // If backend returns 404 for missing worker profile, show helpful message
            if (err.response?.status === 404) {
              setError(err.response?.data?.message || t('workerProfile.notFound') || 'Worker profile not found. Please complete your profile.');
              return;
            }
            throw err; // rethrow other errors to be handled below
          }
        } else {
          const data = await bookingService.getUserBookings(currentUser.id);
          setBookings(data);
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || t('errors.fetchFailed'));
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
          bookings.map((booking) => <BookingCard key={booking.id} booking={booking} isWorker={true} />)
        )}
      </div>
    </div>
  );
};

export default WorkerDashboard;