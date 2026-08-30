import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import Loader from '../components/Loader';
import BookingModal from '../components/BookingModal';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { 
  Layers, Users, CircleDollarSign, CheckSquare, 
  Trash2, Edit3, ShieldAlert, Award, CalendarDays, X 
} from 'lucide-react';
import toast from 'react-hot-toast';

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Edit fields state
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editImage, setEditImage] = useState('');
  const [editFloor, setEditFloor] = useState('');
  const [editCapacity, setEditCapacity] = useState('');
  const [editHourlyRate, setEditHourlyRate] = useState('');
  const [editAmenities, setEditAmenities] = useState([]);

  const amenitiesOptions = [
    'Whiteboard',
    'Projector',
    'Wi-Fi',
    'Power Outlets',
    'Quiet Zone',
    'Air Conditioning'
  ];

  useDocumentTitle(room ? `StudyNook – ${room.name}` : 'StudyNook – Room Details');

  const fetchRoomDetails = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/api/rooms/${id}`);
      setRoom(response.data);
      // Pre-fill editing fields
      setEditName(response.data.name);
      setEditDescription(response.data.description);
      setEditImage(response.data.image);
      setEditFloor(response.data.floor);
      setEditCapacity(response.data.capacity);
      setEditHourlyRate(response.data.hourlyRate);
      setEditAmenities(response.data.amenities || []);
    } catch (error) {
      toast.error('Failed to load room details');
      navigate('/rooms');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoomDetails();
  }, [id]);

  const isOwner = user && room && room.owner && (
    room.owner._id === user.id || room.owner === user.id
  );

  const handleDelete = async () => {
    try {
      await api.delete(`/api/rooms/${id}`);
      toast.success('Room deleted successfully');
      navigate('/rooms');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete room');
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/api/rooms/${id}`, {
        name: editName,
        description: editDescription,
        image: editImage,
        floor: editFloor,
        capacity: parseInt(editCapacity, 10),
        hourlyRate: parseFloat(editHourlyRate),
        amenities: editAmenities
      });
      toast.success('Room details updated successfully');
      setRoom(response.data.room);
      setIsEditing(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update room');
    }
  };

  const handleAmenityToggle = (amenity) => {
    if (editAmenities.includes(amenity)) {
      setEditAmenities(editAmenities.filter(item => item !== amenity));
    } else {
      setEditAmenities([...editAmenities, amenity]);
    }
  };

  if (loading) return <Loader fullPage={true} />;
  if (!room) return <div className="text-center py-20 text-slate-500">Room details not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Back button */}
      <div className="mb-6">
        <Link to="/rooms" className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">
          &larr; Back to Rooms
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Main Details Showcase (Left Column) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Room Image */}
          <div className="h-[350px] sm:h-[450px] w-full rounded-2xl overflow-hidden shadow bg-slate-100">
            <img
              src={room.image}
              alt={room.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800';
              }}
            />
          </div>

          {/* Details Metadata */}
          <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{room.name}</h1>
                <div className="mt-3 flex flex-wrap gap-4 text-sm font-semibold text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Layers className="w-4.5 h-4.5 text-blue-500" />
                    {room.floor}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4.5 h-4.5 text-blue-500" />
                    Capacity: {room.capacity} people
                  </span>
                </div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 px-5 py-3 rounded-2xl text-center sm:text-right shrink-0">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Hourly Rate</p>
                <p className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">${room.hourlyRate}/hr</p>
              </div>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-700 pt-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Description</h3>
              <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                {room.description}
              </p>
            </div>

            {/* Amenities Section */}
            <div className="border-t border-slate-100 dark:border-slate-700 pt-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Amenities Included</h3>
              <div className="flex flex-wrap gap-2">
                {room.amenities && room.amenities.length > 0 ? (
                  room.amenities.map((item, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-700 dark:bg-slate-700/50 dark:border-slate-600 dark:text-slate-300 rounded-xl text-sm font-semibold"
                    >
                      <CheckSquare className="w-4 h-4 text-blue-500" />
                      {item}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">No amenities specified.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Controls (Right Column) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Booking Summary Box */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm text-center space-y-5">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Reserve this Workspace</h3>
            
            {/* Display Booking Count (Challenge feature) */}
            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl flex items-center justify-between border border-slate-100 dark:border-slate-700">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4 text-blue-500" />
                Total Bookings:
              </span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {room.bookingCount || 0} times booked
              </span>
            </div>

            {isOwner ? (
              /* Owner Actions */
              <div className="space-y-3">
                <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900/50 p-3.5 rounded-xl text-left flex gap-2">
                  <ShieldAlert className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-yellow-800 dark:text-yellow-400 leading-relaxed font-medium">
                    You listed this room. You can update details or delete this room.
                  </p>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow shadow-blue-500/10"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Listing
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900 rounded-xl font-bold transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Listing
                </button>
              </div>
            ) : (
              /* Student/Booker Actions */
              <button
                onClick={() => {
                  if (user) {
                    setIsBookModalOpen(true);
                  } else {
                    toast('Redirecting you to Login to book rooms.');
                    navigate('/login', { state: { from: `/rooms/${id}` } });
                  }
                }}
                className="w-full px-4 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/15 hover:shadow-blue-500/25 transition-all text-sm uppercase tracking-wider"
              >
                {user ? 'Book Now' : 'Login to Book'}
              </button>
            )}
          </div>

          {/* Owner details card */}
          {room.owner && (
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Room Owner</h4>
              <div className="flex items-center gap-3">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={room.owner.photoURL || 'https://i.ibb.co.com/mRxb9gL/user-placeholder.png'}
                  alt={room.owner.name}
                  onError={(e) => { e.target.src = 'https://i.ibb.co.com/mRxb9gL/user-placeholder.png'; }}
                />
                <div className="overflow-hidden">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{room.owner.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{room.owner.email}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Booking Form Modal */}
      {isBookModalOpen && (
        <BookingModal
          room={room}
          onClose={() => setIsBookModalOpen(false)}
          onBookingSuccess={fetchRoomDetails}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowDeleteConfirm(false)} />
          <div className="relative bg-white dark:bg-slate-800 rounded-2xl w-full max-w-md shadow-2xl p-6 border border-slate-200 dark:border-slate-700 animate-in zoom-in duration-300">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Delete Study Room?</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Are you sure you want to permanently delete <strong>{room.name}</strong>? This action cannot be undone, and will cancel all active reservations for this room.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/60 font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold shadow-sm transition-colors"
              >
                Delete Room
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Room Listing Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsEditing(false)} />
          <div className="relative bg-white dark:bg-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700 animate-in zoom-in duration-300">
            <div className="flex justify-between items-center p-5 border-b border-slate-100 dark:border-slate-700">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Edit Study Room</h3>
              <button onClick={() => setIsEditing(false)} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Room Name</label>
                <input
                  type="text" required value={editName} onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Description</label>
                <textarea
                  required rows={4} value={editDescription} onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Location Floor</label>
                  <input
                    type="text" required placeholder="e.g. 3rd Floor" value={editFloor} onChange={(e) => setEditFloor(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Image URL</label>
                  <input
                    type="url" required value={editImage} onChange={(e) => setEditImage(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Seat Capacity</label>
                  <input
                    type="number" required min={1} value={editCapacity} onChange={(e) => setEditCapacity(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Hourly Rate ($/hr)</label>
                  <input
                    type="number" required min={0} value={editHourlyRate} onChange={(e) => setEditHourlyRate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-xl"
                  />
                </div>
              </div>

              {/* Amenities */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Amenities</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {amenitiesOptions.map((amenity) => (
                    <label key={amenity} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editAmenities.includes(amenity)}
                        onChange={() => handleAmenityToggle(amenity)}
                        className="rounded border-slate-300 text-blue-600"
                      />
                      <span>{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                <button
                  type="button" onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/60 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default RoomDetails;
