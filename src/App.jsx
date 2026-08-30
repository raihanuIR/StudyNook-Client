import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layouts
import RootLayout from './layouts/RootLayout';

// Components
import PrivateRoute from './components/PrivateRoute';

// Pages
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import RoomDetails from './pages/RoomDetails';
import AddRoom from './pages/AddRoom';
import MyListings from './pages/MyListings';
import MyBookings from './pages/MyBookings';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Core Application Layout */}
        <Route path="/" element={<RootLayout />}>
          
          {/* Public Routes */}
          <Route index element={<Home />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="rooms/:id" element={<RoomDetails />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          
          {/* Private Routes */}
          <Route 
            path="add-room" 
            element={
              <PrivateRoute>
                <AddRoom />
              </PrivateRoute>
            } 
          />
          <Route 
            path="my-listings" 
            element={
              <PrivateRoute>
                <MyListings />
              </PrivateRoute>
            } 
          />
          <Route 
            path="my-bookings" 
            element={
              <PrivateRoute>
                <MyBookings />
              </PrivateRoute>
            } 
          />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
