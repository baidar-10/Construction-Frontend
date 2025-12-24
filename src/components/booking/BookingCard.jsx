import React from 'react';
import { Calendar, Clock, User } from 'lucide-react';
import Button from '../common/Button';
import { formatDate, formatTime } from '../../utils/helpers';
import { BOOKING_STATUS } from '../../utils/constants';
import { useTranslation } from 'react-i18next'; // 1. Import hook

const BookingCard = ({ booking, onAccept, onReject, onCancel, isWorker = false }) => {
  const { t } = useTranslation(); // 2. Initialize t function

  const getStatusColor = (status) => {
    switch (status) {
      case BOOKING_STATUS.PENDING:
        return 'bg-yellow-100 text-yellow-800';
      case BOOKING_STATUS.CONFIRMED:
        return 'bg-green-100 text-green-800';
      case BOOKING_STATUS.IN_PROGRESS:
        return 'bg-blue-100 text-blue-800';
      case BOOKING_STATUS.COMPLETED:
        return 'bg-gray-100 text-gray-800';
      case BOOKING_STATUS.CANCELLED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center">
            <User className="text-white" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900">
              {isWorker ? booking.customerName : booking.workerName}
            </h3>
            <p className="text-gray-600 text-sm">{booking.workerRole}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(booking.status)}`}>
          {/* Use dynamic key for status: e.g., booking.status.pending */}
          {t(`booking.status.${booking.status}`)}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-gray-700">
          <Calendar size={16} />
          <span>{formatDate(booking.date)}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Clock size={16} />
          <span>{formatTime(booking.time)}</span>
        </div>
      </div>

      <div className="mb-4">
        {/* Translated Label */}
        <p className="text-sm text-gray-600 font-medium mb-1">{t('booking.projectDescription')}:</p>
        <p className="text-gray-700">{booking.description}</p>
      </div>

      {booking.status === BOOKING_STATUS.PENDING && (
        <div className="flex gap-2">
          {isWorker ? (
            <>
              <Button onClick={() => onAccept(booking.id)} className="flex-1" size="sm">
                {t('booking.acceptBooking')}
              </Button>
              <Button
                onClick={() => onReject(booking.id)}
                variant="outline"
                className="flex-1"
                size="sm"
              >
                {t('booking.declineBooking')}
              </Button>
            </>
          ) : (
            <Button
              onClick={() => onCancel(booking.id)}
              variant="outline"
              className="w-full"
              size="sm"
            >
              {t('booking.cancelBooking')}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingCard;