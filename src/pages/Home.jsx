import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import RoomCard from '../components/RoomCard';
import Loader from '../components/Loader';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { BookOpen, CheckCircle, Search, CalendarCheck, ShieldCheck, HelpCircle } from 'lucide-react';

const Home = () => {
  useDocumentTitle('StudyNook – Home');
  
  const [latestRooms, setLatestRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    const fetchLatestRooms = async () => {
      try {
        const response = await api.get('/api/rooms/latest');
        setLatestRooms(response.data || []);
      } catch (error) {
        console.error('Error loading latest rooms:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestRooms();
  }, []);

  const faqData = [
    {
      q: "How does conflict-detection work on StudyNook?",
      a: "Our scheduling system parses hourly intervals dynamically. If another user has a confirmed booking for any part of your requested time slot, the booking is blocked, ensuring zero double-bookings."
    },
    {
      q: "Can I list my own study room?",
      a: "Yes! Any registered user can become an owner. Just head over to the 'Add Room' page, fill in the details and amenities, and your room will be live immediately for others to book."
    },
    {
      q: "Is there a minimum booking duration?",
      a: "Yes, bookings are scheduled in hourly slots and require a minimum duration of 1 hour."
    },
    {
      q: "Can I cancel a booking?",
      a: "Absolutely. You can cancel any confirmed booking directly from your 'My Bookings' dashboard, provided the booking date is in the future."
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. Hero / Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent opacity-60"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
              <BookOpen className="w-3.5 h-3.5" />
              Empowering Student Collaboration
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white">
              Find Your Perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">Study Room</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-xl leading-relaxed">
              Browse and book quiet, private study rooms in your library. List your own room and earn. Keep your scheduling conflict-free.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/rooms"
                className="px-8 py-4 rounded-xl text-base font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Explore Rooms
              </Link>
              <Link
                to="/add-room"
                className="px-8 py-4 rounded-xl text-base font-bold bg-white/10 hover:bg-white/15 text-white border border-white/10 backdrop-blur-sm transition-all"
              >
                List Your Room
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Dynamic Section – Available Study Rooms */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Recently Listed Rooms
            </h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Explore the latest addition of study rooms ready for booking.
            </p>
          </div>
          <Link
            to="/rooms"
            className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 shrink-0"
          >
            Browse All Rooms &rarr;
          </Link>
        </div>

        {loading ? (
          <Loader />
        ) : latestRooms.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-800 border rounded-2xl p-8 border-slate-200 dark:border-slate-700">
            <p className="text-slate-500 dark:text-slate-400">No rooms listed yet.</p>
            <Link to="/add-room" className="mt-4 inline-block text-sm font-bold text-blue-600 dark:text-blue-400">
              Create the first room listing!
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestRooms.map((room) => (
              <RoomCard key={room._id} room={room} />
            ))}
          </div>
        )}
      </section>

      {/* 3. Static Section 1: How It Works */}
      <section className="bg-slate-50 dark:bg-slate-900/40 py-16 border-y border-slate-200/60 dark:border-slate-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Booking Made Simple
            </h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Reserve quiet workspaces in a few clicks without worry of schedules overlapping.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-5">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">1. Browse Rooms</h3>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Filter rooms by capacity, amenities, floor range, and rate to locate the perfect study setup.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-5">
                <CalendarCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">2. Check & Book</h3>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Pick a date and start/end time. Our system checks for conflicts and calculates cost in real-time.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">3. Study Comfortably</h3>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Walk in knowing your slot is guaranteed. Manage, update, or cancel bookings via your user dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Static Section 2: Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-2">
            <HelpCircle className="w-8 h-8 text-blue-500" />
            Questions? Look Here
          </h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Frequently asked questions about booking and listing study rooms.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <span>{faq.q}</span>
                <span className="ml-4 text-slate-400 shrink-0 text-xl font-bold">
                  {activeFaq === idx ? '−' : '+'}
                </span>
              </button>
              
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  activeFaq === idx ? 'max-h-40 border-t border-slate-100 dark:border-slate-700' : 'max-h-0'
                }`}
              >
                <div className="p-5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;
