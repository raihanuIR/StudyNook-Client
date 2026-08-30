import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Layers, DollarSign } from 'lucide-react';

const RoomCard = ({ room }) => {
  const { _id, name, description, image, floor, capacity, hourlyRate, amenities } = room;

  // Truncate description to roughly 100 characters
  const truncatedDescription = description.length > 100 
    ? `${description.substring(0, 100).trim()}...` 
    : description;

  // Render max 3 amenities chips, and show remaining count if any
  const maxChips = 3;
  const visibleAmenities = amenities.slice(0, maxChips);
  const remainingCount = amenities.length - maxChips;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group">
      
      {/* Room Image with Zoom effect on hover */}
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <img
          src={image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600'}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600';
          }}
        />
        {/* Hourly Rate Floating Tag */}
        <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center shadow-md">
          <DollarSign className="w-3.5 h-3.5 text-blue-400" />
          <span>{hourlyRate}/hr</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-grow p-5">
        
        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {name}
        </h3>

        {/* Location / Specs indicators */}
        <div className="mt-2.5 flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-blue-500" />
            <span>{floor}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-blue-500" />
            <span>Capacity: {capacity} {capacity === 1 ? 'person' : 'people'}</span>
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
              className="text-[10px] font-semibold bg-slate-100 text-slate-600 dark:bg-slate-700/60 dark:text-slate-300 px-2 py-0.5 rounded-md"
            >
              {amenity}
            </span>
          ))}
          {remainingCount > 0 && (
            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">
              +{remainingCount} more
            </span>
          )}
        </div>

        {/* View Details Button */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700/80">
          <Link
            to={`/rooms/${_id}`}
            className="w-full inline-flex justify-center items-center px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow transition-all text-center"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
