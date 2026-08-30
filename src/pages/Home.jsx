import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import RoomCard from '../components/RoomCard';
import Loader from '../components/Loader';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { 
  BookOpen, 
  CheckCircle, 
  Search, 
  CalendarCheck, 
  ShieldCheck, 
  HelpCircle, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Volume2, 
  Zap, 
  Star, 
  Users, 
  Layers, 
  Clock, 
  ArrowRight,
  Shield,
  Compass
} from 'lucide-react';

const Home = () => {
  useDocumentTitle('StudyNook – Reserve Quiet Library Pods & Group Rooms');
  const navigate = useNavigate();
  
  const [latestRooms, setLatestRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFaq, setActiveFaq] = useState(null);
  
  // Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Floor Guide Active Tab
  const [activeFloorTab, setActiveFloorTab] = useState(1);

  // Quick Finder Filter State
  const [quickDate, setQuickDate] = useState(new Date().toISOString().split('T')[0]);
  const [quickFloor, setQuickFloor] = useState('');
  const [quickStartTime, setQuickStartTime] = useState('09:00');

  const heroSlides = [
    {
      id: 1,
      tag: 'Quiet Focus Pods',
      title: 'Escape Distractions in Silent Study Pods',
      description: 'Sound-isolated workspaces with high-speed Wi-Fi, ergonomic chairs, and zero interruptions on Floors 1 & 3.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600',
      badge: 'Best for Exams & Thesis',
      accent: 'from-blue-600 to-indigo-600',
      rating: '4.9/5'
    },
    {
      id: 2,
      tag: 'Team Collaboration',
      title: 'Brainstorm & Build with Group Tech Labs',
      description: 'Equipped with 4K projectors, writable glassboards, and multiport power docks for team projects on Floor 2.',
      image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&q=80&w=1600',
      badge: 'Group Presentations',
      accent: 'from-teal-600 to-emerald-600',
      rating: '5.0/5'
    },
    {
      id: 3,
      tag: 'Executive Seminar',
      title: 'Spacious Multi-Seat Conference Nooks',
      description: 'Climate-controlled study halls with multimedia presentation screens, perfect for student workshops on Floor 4.',
      image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=1600',
      badge: 'Up to 10 Seats',
      accent: 'from-purple-600 to-pink-600',
      rating: '4.8/5'
    }
  ];

  // Auto-advance hero carousel
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isHovered, heroSlides.length]);

  // Fetch latest rooms
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

  const handleQuickSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (quickFloor) params.append('floor', quickFloor);
    navigate(`/rooms?${params.toString()}`);
  };

  const floorGuides = {
    1: {
      title: 'Level 1: Silent Research Sanctuary',
      soundLevel: 'Pin-Drop Quiet (0–15 dB)',
      soundColor: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800',
      description: 'Dedicated entirely to solo thesis writers, medical researchers, and exam crunching with zero spoken audio allowed.',
      features: ['Individual Privacy Pods', 'Ambient Warm Lighting', 'Dual Surge Outlets', 'Noise-Cancelling Acoustic Panels'],
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800'
    },
    2: {
      title: 'Level 2: Collaborative Innovation Labs',
      soundLevel: 'Moderate Discussion (40–60 dB)',
      soundColor: 'text-blue-500 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800',
      description: 'Ideal for group brainstorms, coding hackathons, and pitch preparation with movable furniture and dry-erase walls.',
      features: ['Magnetic Whiteboards', 'Wireless 4K Projectors', 'Conference Microphones', 'High-Speed Mesh Wi-Fi 6'],
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800'
    },
    3: {
      title: 'Level 3: Multimedia & Creative Pods',
      soundLevel: 'Low Whisper (20–35 dB)',
      soundColor: 'text-purple-500 bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800',
      description: 'Hybrid zones for pair programming, thesis defense rehearsals, and media analysis with ergonomic sit-stand desks.',
      features: ['Dual Monitor Stations', 'Ergonomic Mesh Seating', 'Integrated Webcams', 'Direct Library Catalog Terminal'],
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800'
    },
    4: {
      title: 'Level 4: Executive Study & Seminar Suites',
      soundLevel: 'Presentation Ready',
      soundColor: 'text-amber-500 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800',
      description: 'Large conference format study rooms designed for student clubs, research groups, and faculty seminars.',
      features: ['10+ Seater Boardroom Tables', 'Dual Climate AC Units', 'Motorized Presentation Screens', 'Surround Sound Audio'],
      image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=800'
    }
  };

  const studentReviews = [
    {
      name: 'Sarah Chen',
      major: 'Computer Science, Finalist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      comment: 'Booking Pod 301 before my algorithm midterms was a lifesaver. No double-bookings, instant confirmation, and crystal quiet!',
      rating: 5,
      room: 'Quiet Study Pod 301'
    },
    {
      name: 'Alex Rivera',
      major: 'Bioengineering, Senior',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      comment: 'The projector and writable walls in Lab B made our capstone rehearsals seamless. The dynamic hourly cost calculation is so transparent.',
      rating: 5,
      room: 'Collaborative Tech Lab B'
    },
    {
      name: 'Priya Patel',
      major: 'Architecture, Graduate',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150',
      comment: 'Listing my allocated studio room when I travel for conferences was super easy. Earned funds while helping fellow students study.',
      rating: 5,
      room: 'Executive Seminar Suite'
    }
  ];

  const faqData = [
    {
      q: 'How does conflict-detection prevent double-bookings on StudyNook?',
      a: 'Our scheduling engine parses requested hourly time intervals dynamically against active MongoDB reservations. If any overlapping confirmed booking exists for that room on that date, it blocks the slot immediately.'
    },
    {
      q: 'Can any registered user list a new study room?',
      a: 'Yes! Registered students and library assistants can navigate to "Add Room", fill in room photos, hourly rates, capacities, and amenities to list a room instantly.'
    },
    {
      q: 'How does room cancellation work?',
      a: 'If your plans change, navigate to "My Bookings" and click Cancel on any future reservation. The time slot is freed instantly for other students.'
    },
    {
      q: 'What amenities are available across the library floors?',
      a: 'Rooms feature high-speed fiber Wi-Fi, 4K wireless projectors, writable dry-erase whiteboards, air conditioning, and sound-isolated quiet zones.'
    }
  ];

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. HERO SECTION WITH INTERACTIVE CAROUSEL */}
      <section 
        className="relative overflow-hidden bg-slate-950 text-white min-h-[580px] lg:min-h-[640px] flex items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Carousel Background Images with Smooth Crossfade */}
        {heroSlides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-[6000ms] ease-out"
            />
            {/* Dark & Gradient Overlay for Contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40"></div>
          </div>
        ))}

        {/* Hero Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 py-20 w-full">
          <div className="max-w-2xl">
            
            {/* Animated Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 backdrop-blur-md mb-6 animate-float shadow-lg shadow-blue-500/10">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>{heroSlides[currentSlide].badge}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>

            {/* Slide Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              {heroSlides[currentSlide].title}
            </h1>

            {/* Slide Description */}
            <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              {heroSlides[currentSlide].description}
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/rooms"
                className="px-8 py-4 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Reserve a Room Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/add-room"
                className="px-6 py-4 rounded-xl text-sm font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md hover:scale-105 active:scale-95 transition-all"
              >
                List Your Study Space
              </Link>
            </div>

            {/* Live Stats Row */}
            <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-3 gap-4">
              <div>
                <p className="text-2xl font-black text-white">100%</p>
                <p className="text-xs text-slate-400 mt-0.5">Conflict-Free Slots</p>
              </div>
              <div>
                <p className="text-2xl font-black text-blue-400">4.9 ★</p>
                <p className="text-xs text-slate-400 mt-0.5">Student Rating</p>
              </div>
              <div>
                <p className="text-2xl font-black text-emerald-400">Instant</p>
                <p className="text-xs text-slate-400 mt-0.5">Booking Confirm</p>
              </div>
            </div>

          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-slate-900/60 hover:bg-blue-600 text-white backdrop-blur-md border border-white/10 transition-all hover:scale-110"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-slate-900/60 hover:bg-blue-600 text-white backdrop-blur-md border border-white/10 transition-all hover:scale-110"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicator Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'w-8 bg-blue-500' : 'w-2.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. FLOATING QUICK FINDER BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-30">
        <form 
          onSubmit={handleQuickSearch}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-4 sm:p-6 border border-slate-200/80 dark:border-slate-700/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end"
        >
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 flex items-center gap-1">
              <CalendarCheck className="w-3.5 h-3.5 text-blue-500" />
              Reservation Date
            </label>
            <input
              type="date"
              value={quickDate}
              onChange={(e) => setQuickDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              Start Hour
            </label>
            <input
              type="time"
              value={quickStartTime}
              onChange={(e) => setQuickStartTime(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-blue-500" />
              Floor Level
            </label>
            <input
              type="number"
              min={1}
              max={10}
              placeholder="e.g. 2 or 3"
              value={quickFloor}
              onChange={(e) => setQuickFloor(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2.5 px-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2 text-sm"
            >
              <Search className="w-4 h-4" />
              <span>Search Available Nooks</span>
            </button>
          </div>
        </form>
      </div>

      {/* 3. RECENTLY LISTED STUDY ROOMS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">
              <Compass className="w-4 h-4" /> Featured Workspaces
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Recently Listed Rooms
            </h2>
            <p className="mt-1 text-slate-500 dark:text-slate-400">
              Browse top-rated study spaces in the library ready for immediate booking.
            </p>
          </div>
          <Link
            to="/rooms"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
          >
            <span>Explore All Rooms</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <Loader />
        ) : latestRooms.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-800 border rounded-2xl p-8 border-slate-200 dark:border-slate-700">
            <p className="text-slate-500 dark:text-slate-400">No rooms listed yet.</p>
            <Link to="/add-room" className="mt-4 inline-block text-sm font-bold text-blue-600 dark:text-blue-400">
              Create the first room listing!
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestRooms.map((room) => (
              <div key={room._id} className="hover-lift">
                <RoomCard room={room} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. INTERACTIVE LIBRARY FLOOR GUIDE & NOISE LEVELS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">
            <Layers className="w-4 h-4" /> Campus Navigation
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Library Floor & Noise Guide
          </h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm">
            Each library floor is engineered for a specific study mode. Click any floor to explore its atmosphere.
          </p>
        </div>

        {/* Floor Selection Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {[1, 2, 3, 4].map((fl) => (
            <button
              key={fl}
              onClick={() => setActiveFloorTab(fl)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeFloorTab === fl
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 scale-105'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750'
              }`}
            >
              Floor {fl} {fl === 1 ? '(Silent)' : fl === 2 ? '(Group Labs)' : fl === 3 ? '(Multimedia)' : '(Executive)'}
            </button>
          ))}
        </div>

        {/* Floor Detail Card */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          <div className="p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${floorGuides[activeFloorTab].soundColor}`}>
                  <Volume2 className="w-3.5 h-3.5" />
                  {floorGuides[activeFloorTab].soundLevel}
                </span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {floorGuides[activeFloorTab].title}
              </h3>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {floorGuides[activeFloorTab].description}
              </p>

              <div className="mt-6 space-y-2.5">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Included Floor Amenities</p>
                <div className="grid grid-cols-2 gap-2">
                  {floorGuides[activeFloorTab].features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700">
              <Link
                to={`/rooms?floor=${activeFloorTab}`}
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700"
              >
                <span>View all Floor {activeFloorTab} study rooms</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative min-h-[300px] lg:min-h-full">
            <img
              src={floorGuides[activeFloorTab].image}
              alt={floorGuides[activeFloorTab].title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS 3D-EFFECT CARDS */}
      <section className="bg-slate-900 text-white py-20 border-y border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Effortless Scheduling</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mt-1">
              How StudyNook Works
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base">
              Say goodbye to walking around full libraries looking for a free study pod.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
            
            {/* Step 1 */}
            <div className="bg-slate-800/80 border border-slate-700/80 backdrop-blur-md p-8 rounded-3xl relative hover-lift group">
              <span className="text-5xl font-black text-slate-700/40 group-hover:text-blue-500/40 transition-colors absolute top-6 right-6">
                01
              </span>
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center mb-6">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Find Your Ideal Pod</h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                Filter by floor level, hourly rate, seating capacity, and essential amenities like 4K projectors or quiet zones.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-800/80 border border-slate-700/80 backdrop-blur-md p-8 rounded-3xl relative hover-lift group">
              <span className="text-5xl font-black text-slate-700/40 group-hover:text-teal-500/40 transition-colors absolute top-6 right-6">
                02
              </span>
              <div className="w-12 h-12 rounded-2xl bg-teal-600/20 text-teal-400 border border-teal-500/30 flex items-center justify-center mb-6">
                <CalendarCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Conflict-Free Booking</h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                Pick your date and time slot. Our validation engine guarantees no two students book overlapping slots.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-800/80 border border-slate-700/80 backdrop-blur-md p-8 rounded-3xl relative hover-lift group">
              <span className="text-5xl font-black text-slate-700/40 group-hover:text-purple-500/40 transition-colors absolute top-6 right-6">
                03
              </span>
              <div className="w-12 h-12 rounded-2xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Study & Manage</h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                Show up with your spot guaranteed. View, track, or cancel reservations anytime in your My Bookings dashboard.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 6. STUDENT TESTIMONIALS & REPUTATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Loved by Students</span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
            Student Experiences
          </h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm">
            Read how StudyNook is transforming exam preparation and group projects across campus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {studentReviews.map((rev, i) => (
            <div 
              key={i} 
              className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm hover-lift flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(rev.rating)].map((_, r) => (
                    <Star key={r} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700/60 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full object-cover bg-slate-100"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{rev.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{rev.major}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">
            <HelpCircle className="w-4 h-4" /> Got Questions?
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <span>{faq.q}</span>
                <span className="ml-4 text-slate-400 shrink-0 text-xl font-black">
                  {activeFaq === idx ? '−' : '+'}
                </span>
              </button>
              
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  activeFaq === idx ? 'max-h-48 border-t border-slate-100 dark:border-slate-700' : 'max-h-0'
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

      {/* 8. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-3xl p-10 sm:p-14 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Ready to Upgrade Your Study Routine?
            </h2>
            <p className="mt-4 text-blue-100 text-sm sm:text-base leading-relaxed">
              Join hundreds of students booking quiet pods and collaboration hubs across campus every day.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/rooms"
                className="px-8 py-3.5 bg-white text-blue-600 font-extrabold rounded-xl shadow-lg hover:bg-blue-50 hover:scale-105 active:scale-95 transition-all text-sm"
              >
                Browse Study Rooms
              </Link>
              <Link
                to="/register"
                className="px-8 py-3.5 bg-blue-800/40 hover:bg-blue-800/60 border border-white/20 text-white font-bold rounded-xl backdrop-blur-sm transition-all text-sm"
              >
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
