import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import RoomCard from '../components/RoomCard';
import Loader from '../components/Loader';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { Search, Filter, RotateCcw, SlidersHorizontal } from 'lucide-react';

const Rooms = () => {
  useDocumentTitle('StudyNook – Available Rooms');

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState('');
  const [minRate, setMinRate] = useState('');
  const [maxRate, setMaxRate] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const amenitiesOptions = [
    'Whiteboard',
    'Projector',
    'Wi-Fi',
    'Power Outlets',
    'Quiet Zone',
    'Air Conditioning'
  ];

  const floorOptions = [
    { label: 'All Floors', value: '' },
    { label: '1st Floor', value: '1st' },
    { label: '2nd Floor', value: '2nd' },
    { label: '3rd Floor', value: '3rd' },
    { label: '4th Floor', value: '4th' }
  ];

  // Fetch rooms whenever filter states change
  const fetchRooms = async () => {
    setLoading(true);
    try {
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (selectedFloor) params.floor = selectedFloor;
      if (minRate) params.minRate = minRate;
      if (maxRate) params.maxRate = maxRate;
      if (selectedAmenities.length > 0) {
        params.amenities = selectedAmenities.join(',');
      }

      const response = await api.get('/api/rooms', { params });
      setRooms(response.data || []);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Debounce search slightly to avoid excessive calls
    const delayDebounce = setTimeout(() => {
      fetchRooms();
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, selectedAmenities, selectedFloor, minRate, maxRate]);

  const handleAmenityChange = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(item => item !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedAmenities([]);
    setSelectedFloor('');
    setMinRate('');
    setMaxRate('');
  };

  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Reset Button */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-slate-400" />
          Filter Options
        </h3>
        <button
          onClick={handleResetFilters}
          className="text-xs font-semibold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" />
          Reset All
        </button>
      </div>

      {/* Floor Filter */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Library Floor
        </label>
        <select
          value={selectedFloor}
          onChange={(e) => setSelectedFloor(e.target.value)}
          className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-750 text-slate-950 dark:text-white text-sm"
        >
          {floorOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Hourly Rate ($/hr)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minRate}
            onChange={(e) => setMinRate(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-750 text-slate-900 dark:text-white"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxRate}
            onChange={(e) => setMaxRate(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-750 text-slate-900 dark:text-white"
          />
        </div>
      </div>

      {/* Amenities Checkboxes */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
          Amenities
        </label>
        <div className="space-y-2">
          {amenitiesOptions.map((amenity) => (
            <label
              key={amenity}
              className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300 cursor-pointer hover:text-slate-900 dark:hover:text-white"
            >
              <input
                type="checkbox"
                checked={selectedAmenities.includes(amenity)}
                onChange={() => handleAmenityChange(amenity)}
                className="w-4.5 h-4.5 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500"
              />
              <span>{amenity}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Page Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Explore Study Rooms
        </h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Find available study rooms, compare rates, and pick the perfect workspace.
        </p>
      </div>

      {/* Search Bar & Mobile Filter Trigger */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search study rooms by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        
        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          className="sm:hidden flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-semibold transition-colors"
        >
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl h-fit">
          <FiltersContent />
        </aside>

        {/* Mobile Collapsible Filters */}
        {mobileFiltersOpen && (
          <div className="lg:hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-xl space-y-4 mb-6">
            <FiltersContent />
          </div>
        )}

        {/* Room Grid Section */}
        <section className="lg:col-span-3">
          {loading ? (
            <Loader />
          ) : rooms.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-8">
              <p className="text-lg font-bold text-slate-700 dark:text-slate-300">No rooms found</p>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                Try loosening your filters or search terms.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-5 px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {rooms.map((room) => (
                <RoomCard key={room._id} room={room} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Rooms;
