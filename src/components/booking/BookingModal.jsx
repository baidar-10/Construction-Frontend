import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import { useBooking } from '../../hooks/useBooking';
import { useAuth } from '../../hooks/useAuth';

const BookingModal = ({ worker, onClose }) => {
  const { createBooking } = useBooking();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      alert('Please login to book a worker');
      return;
    }

    try {
      setLoading(true);
      await createBooking({
        workerId: worker.id,
        customerId: currentUser.id,
        date: formData.date,
        time: formData.time,
        description: formData.description,
        status: 'pending',
      });
      alert(`Booking request sent to ${worker.name}`);
      onClose();
    } catch (err) {
      alert('Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full">
        <div className="bg-orange-500 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Book {worker.name}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-orange-600 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <p className="mt-1 text-orange-100">{worker.role}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Input
            label="Select Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Time <span className="text-red-500">*</span>
            </label>
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            >
              <option value="">Choose a time</option>
              <option value="08:00">8:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="12:00">12:00 PM</option>
              <option value="14:00">2:00 PM</option>
              <option value="16:00">4:00 PM</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the work you need done..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              rows="4"
              required
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Estimated Rate:</span>
              <span className="font-bold text-gray-900">${worker.hourlyRate}/hr</span>
            </div>
            <p className="text-xs text-gray-600">Final cost will be discussed with the worker</p>
          </div>

          <Button
            type="submit"
            loading={loading}
            className="w-full flex items-center justify-center gap-2"
          >
            <Calendar size={20} />
            Send Booking Request
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;