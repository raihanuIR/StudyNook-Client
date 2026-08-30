import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import RoomCard from '../components/RoomCard';
import Loader from '../components/Loader';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { LayoutGrid, PlusCircle, Search } from 'lucide-react';

const MyListings = () => {
  useDocumentTitle('StudyNook – My Listings');
  const { user } = useContext(AuthContext);

  const [myRooms, setMyRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyRooms = async () => {
      try {
        const response = await api.get('/api/rooms');
        // Filter rooms listed by current user
        const filtered = (response.data || []).filter(room => 
          room.owner === user.id || room.owner?._id === user.id
        );
        setMyRooms(filtered);
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchMyRooms();
    }
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-5 mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <LayoutGrid className="w-8 h-8 text-blue-500" />
            My Room Listings
          </h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Manage, update details, or delete the study rooms you listed.
          </p>
        </div>
        <Link
          to="/add-room"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow shadow-blue-500/10 transition-colors uppercase tracking-wider shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          Add New Room
        </Link>
      </div>

      {loading ? (
        <Loader />
      ) : myRooms.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 max-w-xl mx-auto">
          <p className="text-lg font-bold text-slate-700 dark:text-slate-300">No rooms listed yet</p>
          <p className="text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
            You haven't listed any rooms in this library yet. Click the button below to add your first room!
          </p>
          <Link
            to="/add-room"
            className="mt-6 inline-flex px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow-sm transition-colors"
          >
            Create First Listing
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {myRooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      )}

    </div>
  );
};

export default MyListings;
