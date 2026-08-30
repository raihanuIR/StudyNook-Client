import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import useDocumentTitle from '../hooks/useDocumentTitle';
import toast from 'react-hot-toast';
import { PlusCircle, Info, Image, Layers, Users, CircleDollarSign, CheckSquare } from 'lucide-react';

const AddRoom = () => {
  useDocumentTitle('StudyNook – Add Room');
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [floor, setFloor] = useState('');
  const [capacity, setCapacity] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const amenitiesOptions = [
    'Whiteboard',
    'Projector',
    'Wi-Fi',
    'Power Outlets',
    'Quiet Zone',
    'Air Conditioning'
  ];

  const handleAmenityToggle = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(item => item !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !image || !floor || !capacity || !hourlyRate) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post('/api/rooms', {
        name,
        description,
        image,
        floor,
        capacity: parseInt(capacity, 10),
        hourlyRate: parseFloat(hourlyRate),
        amenities: selectedAmenities
      });

      toast.success('Room listing created successfully!');
      navigate('/my-listings');
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to list room';
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Page Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5 mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <PlusCircle className="w-8 h-8 text-blue-500" />
          List a New Study Room
        </h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Share your library study room listing so other campus students can book it.
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm rounded-2xl p-6 sm:p-8">
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Room Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-slate-400" />
              Room Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Group Study Room A (Central Library)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Detailed Description
            </label>
            <textarea
              required
              rows={4}
              placeholder="Describe the room, its layout, specific location notes, key policies, or availability guidelines..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Image URL & Floor location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Image URL */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Image className="w-4 h-4 text-slate-400" />
                Image URL
              </label>
              <input
                type="url"
                required
                placeholder="e.g. https://images.unsplash.com/..."
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Floor Location */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-slate-400" />
                Floor Level (Number)
              </label>
              <input
                type="number"
                min={1}
                max={50}
                required
                placeholder="e.g. 3"
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

          </div>

          {/* Seat Capacity & Hourly Rate */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Capacity */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-slate-400" />
                Seat Capacity
              </label>
              <input
                type="number"
                required
                min={1}
                placeholder="e.g. 6"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Hourly Rate */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <CircleDollarSign className="w-4 h-4 text-slate-400" />
                Hourly Rate ($)
              </label>
              <input
                type="number"
                required
                min={0}
                placeholder="e.g. 5"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

          </div>

          {/* Amenities Checkboxes */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              Amenities Available
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {amenitiesOptions.map((amenity) => (
                <label
                  key={amenity}
                  className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                    className="w-4.5 h-4.5 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500"
                  />
                  <span>{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all uppercase tracking-wider text-sm"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin-custom"></div>
                  <span>Creating Listing...</span>
                </>
              ) : (
                <span>Publish Listing</span>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddRoom;
