import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { X, Calendar, Clock, BookOpen, AlertCircle } from 'lucide-react';

const BookingModal = ({ room, onClose, onBookingSuccess }) => {
  const { _id: roomId, name, hourlyRate } = room;

  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [specialNote, setSpecialNote] = useState('');
  const [totalCost, setTotalCost] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate start time slots from 08:00 to 20:00
  const startSlots = Array.from({ length: 13 }, (_, i) => {
    const hr = 8 + i;
    return `${hr.toString().padStart(2, '0')}:00`;
  });

  // Generate end slots dynamically based on selected start time (minimum 1 hour duration, up to 21:00)
  const getEndSlots = () => {
    if (!startTime) return [];
    const startHour = parseInt(startTime.split(':')[0], 10);
    const endSlotsList = [];
    for (let hr = startHour + 1; hr <= 21; hr++) {
      endSlotsList.push(`${hr.toString().padStart(2, '0')}:00`);
    }
    return endSlotsList;
  };

  const endSlots = getEndSlots();

  // Reset end time if start time changes and renders the current end time invalid
  useEffect(() => {
    if (startTime && endTime) {
      const startHr = parseInt(startTime.split(':')[0], 10);
      const endHr = parseInt(endTime.split(':')[0], 10);
      if (endHr <= startHr) {
        setEndTime('');
      }
    }
  }, [startTime]);

  // Compute total cost in real-time
  useEffect(() => {
    if (startTime && endTime) {
      const startHr = parseInt(startTime.split(':')[0], 10);
      const endHr = parseInt(endTime.split(':')[0], 10);
      const hours = endHr - startHr;
      setTotalCost(hours * hourlyRate);
    } else {
      setTotalCost(0);
    }
  }, [startTime, endTime, hourlyRate]);

  // Get today's date formatted as YYYY-MM-DD for date-picker min attribute
  const getTodayString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !startTime || !endTime) {
      toast.error('Please fill in all booking details');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await api.post('/api/bookings', {
        room: roomId,
        date,
        startTime,
        endTime,
        totalCost,
        specialNote
      });

      toast.success(response.data.message || 'Room booked successfully!');
      if (onBookingSuccess) {
        onBookingSuccess();
      }
      onClose();
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to book room';
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden transform transition-all border border-slate-200 dark:border-slate-700 animate-in zoom-in duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-700">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              Book Room
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate max-w-[320px]">
              {name}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-700 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Booking Date */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              Select Date
            </label>
            <input
              type="date"
              required
              min={getTodayString()}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Time Slot Selectors */}
          <div className="grid grid-cols-2 gap-4">
            {/* Start Time */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                Start Time
              </label>
              <select
                required
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Start</option>
                {startSlots.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>

            {/* End Time */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                End Time
              </label>
              <select
                required
                disabled={!startTime}
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">End</option>
                {endSlots.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Special Note */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Special Note (Optional)
            </label>
            <textarea
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              placeholder="e.g. Need projector instructions, quiet room request..."
              rows={2}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Cost Calculator Section */}
          {startTime && endTime && (
            <div className="bg-blue-50 dark:bg-blue-950/40 p-4 rounded-xl border border-blue-100 dark:border-blue-900/60 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Total Booking Cost:</span>
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                ${totalCost}
              </span>
            </div>
          )}

          {/* Footer Action buttons */}
          <div className="flex gap-3 pt-3 border-t border-slate-100 dark:border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-1/2 px-4 py-3 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 transition-all"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin-custom"></div>
                  <span>Booking...</span>
                </>
              ) : (
                <span>Confirm Booking</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
