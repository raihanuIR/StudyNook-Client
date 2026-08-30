import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Layers, DollarSign, ArrowRight, Sparkles } from 'lucide-react';

const RoomCard = ({ room }) => {
  const { _id, name, description, image, floor, capacity, hourlyRate, amenities } = room;

  // Truncate description to roughly 100 characters
  const truncatedDescription = description.length > 95 
    ? `${description.substring(0, 95).trim()}...` 
    : description;

  // Render max 3 amenities chips
  const maxChips = 3;
  const visibleAmenities = amenities.slice(0, maxChips);
  const remainingCount = amenities.length - maxChips;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 group">
      
      {/* Room Image with Zoom effect on hover */}
      <div className="relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-900">
        <img
          src={image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600'}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600';
          }}
        />

        {/* Gradient Overlay on Image */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Hourly Rate Floating Tag */}
        <div className="absolute top-3.5 right-3.5 bg-slate-950/80 backdrop-blur-md border border-white/10 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-lg">
          <DollarSign className="w-3.5 h-3.5 text-blue-400" />
          <span>{hourlyRate}/hr</span>
        </div>

        {/* Popular / Instant badge */}
        <div className="absolute bottom-3 left-3.5 bg-blue-600/90 backdrop-blur-md text-white px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
          <Sparkles className="w-3 h-3 text-amber-300" />
          <span>Instant Book</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-grow p-6">
        
        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {name}
        </h3>

        {/* Location / Specs indicators */}
        <div className="mt-2.5 flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-blue-500" />
            <span>{String(floor).toLowerCase().includes('floor') ? floor : `Floor ${floor}`}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-blue-500" />
            <span>{capacity} {capacity === 1 ? 'Seat' : 'Seats'}</span>
          </div>
        </div>

        {/* Description */}
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-grow">
          {truncatedDescription}
        </p>

        {/* Amenities chips */}
        <div className="mt-4 flex flex-wrap gap-1.5 items-center">
          {visibleAmenities.map((amenity, idx) => (
            <span
              key={idx}
              className="text-[11px] font-medium bg-slate-100 text-slate-700 dark:bg-slate-700/60 dark:text-slate-300 px-2.5 py-1 rounded-lg border border-slate-200/50 dark:border-slate-600/50"
            >
              {amenity}
            </span>
          ))}
          {remainingCount > 0 && (
            <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400">
              +{remainingCount} more
            </span>
          )}
        </div>

        {/* View Details Button */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/80">
          <Link
            to={`/rooms/${_id}`}
            className="w-full inline-flex justify-center items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/10 hover:shadow-blue-500/25 transition-all text-center group-hover:bg-blue-600"
          >
            <span>View Details</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
