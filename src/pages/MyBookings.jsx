import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import Loader from '../components/Loader';
import useDocumentTitle from '../hooks/useDocumentTitle';
import toast from 'react-hot-toast';
import { CalendarRange, HelpCircle, XCircle } from 'lucide-react';

const MyBookings = () => {
  useDocumentTitle('StudyNook – My Bookings');

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCancelId, setSelectedCancelId] = useState(null);

  const fetchBookings = async () => {
    try {
      const response = await api.get('/api/bookings/my-bookings');
      setBookings(response.data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async () => {
    if (!selectedCancelId) return;

    try {
      await api.patch(`/api/bookings/${selectedCancelId}/cancel`);
      toast.success('Booking cancelled successfully');
      setSelectedCancelId(null);
      fetchBookings(); // Refresh list
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to cancel booking');
    }
  };

  const isFutureBooking = (bookingDateStr) => {
    const bookingDate = new Date(bookingDateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return bookingDate >= today;
  };

  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  if (loading) return <Loader fullPage={true} />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Page Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5 mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <CalendarRange className="w-8 h-8 text-blue-500" />
          My Reservations
        </h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Track your study room reservations, statuses, and cancel upcoming sessions.
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 max-w-xl mx-auto">
          <CalendarRange className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-lg font-bold text-slate-700 dark:text-slate-300">You have no bookings yet</p>
          <p className="text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
            Reserve quiet, private library study rooms to supercharge your campus collaboration.
          </p>
          <Link
            to="/rooms"
            className="mt-6 inline-flex px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow-sm transition-colors"
          >
            Find a Room
          </Link>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700 text-left">
              <thead className="bg-slate-50 dark:bg-slate-900/50">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Room</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Time Slot</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Cost</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {bookings.map((booking) => {
                  const hasCancelOption = booking.status === 'confirmed' && isFutureBooking(booking.date);
                  
                  return (
                    <tr key={booking._id} className="hover:bg-slate-50/55 dark:hover:bg-slate-750/30 transition-colors">
                      {/* Room Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <img
                            className="h-11 w-11 rounded-lg object-cover bg-slate-100"
                            src={booking.room?.image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=100'}
                            alt={booking.room?.name}
                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=100'; }}
                          />
                          <div className="max-w-[220px]">
                            <div className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                              {booking.room ? booking.room.name : 'Deleted Room'}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                              {booking.room?.floor || 'N/A'}
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      {/* Date */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-700 dark:text-slate-300">
                        {formatDate(booking.date)}
                      </td>
                      
                      {/* Time Slot */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400 font-semibold">
                        {booking.startTime} – {booking.endTime}
                      </td>
                      
                      {/* Total Cost */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-extrabold text-slate-900 dark:text-white">
                        ${booking.totalCost}
                      </td>
                      
                      {/* Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-semibold ${
                          booking.status === 'confirmed'
                            ? 'bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400 border border-green-200/50'
                            : 'bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400 border border-red-200/50'
                        }`}>
                          {booking.status === 'confirmed' ? 'Confirmed' : 'Cancelled'}
                        </span>
                      </td>
                      
                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                        {hasCancelOption ? (
                          <button
                            onClick={() => setSelectedCancelId(booking._id)}
                            className="text-red-600 dark:text-red-400 hover:text-red-900 font-bold transition-all text-xs border border-red-200 dark:border-red-900 bg-red-50/40 dark:bg-red-950/10 px-3 py-1.5 rounded-lg hover:bg-red-100"
                          >
                            Cancel
                          </button>
                        ) : booking.status === 'confirmed' ? (
                          <span className="text-xs text-slate-400 font-medium">Session past</span>
                        ) : (
                          <span className="text-xs text-slate-400 font-medium flex items-center gap-1 justify-end">
                            <XCircle className="w-3.5 h-3.5" /> Cancelled
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Grid/Card View */}
          <div className="grid grid-cols-1 gap-6 md:hidden">
            {bookings.map((booking) => {
              const hasCancelOption = booking.status === 'confirmed' && isFutureBooking(booking.date);
              
              return (
                <div key={booking._id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-2xl space-y-4">
                  <div className="flex gap-3">
                    <img
                      className="h-14 w-14 rounded-xl object-cover bg-slate-100 shrink-0"
                      src={booking.room?.image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=100'}
                      alt={booking.room?.name}
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=100'; }}
                    />
                    <div className="overflow-hidden">
                      <h3 className="font-bold text-slate-900 dark:text-white truncate">
                        {booking.room ? booking.room.name : 'Deleted Room'}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">{booking.room?.floor || 'N/A'}</p>
                    </div>
                  </div>

                  <hr className="border-slate-100 dark:border-slate-700" />

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-slate-400 font-semibold uppercase">Date</p>
                      <p className="mt-1 font-bold text-slate-700 dark:text-slate-300">{formatDate(booking.date)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-semibold uppercase">Slot</p>
                      <p className="mt-1 font-bold text-slate-700 dark:text-slate-300">{booking.startTime} – {booking.endTime}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-semibold uppercase">Cost</p>
                      <p className="mt-1 font-extrabold text-blue-600 dark:text-blue-400">${booking.totalCost}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-semibold uppercase">Status</p>
                      <div className="mt-1">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          booking.status === 'confirmed'
                            ? 'bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400 border border-green-200/50'
                            : 'bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400 border border-red-200/50'
                        }`}>
                          {booking.status === 'confirmed' ? 'Confirmed' : 'Cancelled'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Actions */}
                  {hasCancelOption && (
                    <button
                      onClick={() => setSelectedCancelId(booking._id)}
                      className="w-full mt-2 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold shadow-sm transition-colors"
                    >
                      Cancel Reservation
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Cancellation Confirmation Dialog */}
      {selectedCancelId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedCancelId(null)} />
          <div className="relative bg-white dark:bg-slate-800 rounded-2xl w-full max-w-md shadow-2xl p-6 border border-slate-200 dark:border-slate-700 animate-in zoom-in duration-300">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <HelpCircle className="w-5 h-5 text-red-500" />
              Cancel Room Booking?
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2.5 leading-relaxed">
              Are you sure you want to cancel this reservation? The slot will be freed up for other users immediately.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setSelectedCancelId(null)}
                className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/60 font-semibold"
              >
                No, Keep it
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold shadow-sm transition-colors"
              >
                Yes, Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MyBookings;
