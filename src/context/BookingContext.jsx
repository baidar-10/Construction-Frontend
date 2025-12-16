import React, { createContext, useState } from 'react';
import { bookingService } from '../api/bookingService';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createBooking = async (bookingData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await bookingService.createBooking(bookingData);
      setBookings((prev) => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchUserBookings = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await bookingService.getUserBookings(userId);
      setBookings(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const updateBooking = async (bookingId, status) => {
    setLoading(true);
    setError(null);
    try {
      const data = await bookingService.updateBookingStatus(bookingId, status);
      setBookings((prev) =>
        prev.map((booking) => (booking.id === bookingId ? data : booking))
      );
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    setLoading(true);
    setError(null);
    try {
      await bookingService.cancelBooking(bookingId);
      setBookings((prev) => prev.filter((booking) => booking.id !== bookingId));
    } catch (err) {
      setError(err.response?.data?.message || 'Cancellation failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    bookings,
    loading,
    error,
    createBooking,
    fetchUserBookings,
    updateBooking,
    cancelBooking,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};