import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Toast Notification Container */}
      <Toaster 
        position="top-center" 
        reverseOrder={false}
        toastOptions={{
          className: 'dark:bg-slate-800 dark:text-white border dark:border-slate-700',
          duration: 3000,
        }}
      />
      
      {/* Navigation Header */}
      <Navbar />
      
      {/* Page Body Viewport */}
      <main className="flex-grow">
        <Outlet />
      </main>
      
      {/* Shared Footer */}
      <Footer />
    </div>
  );
};

export default RootLayout;
