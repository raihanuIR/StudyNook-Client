import React from 'react';

const Loader = ({ fullPage = false }) => {
  return (
    <div className={`flex items-center justify-center ${fullPage ? 'min-height-screen bg-slate-50 dark:bg-slate-900 w-full fixed inset-0 z-50' : 'py-12'}`}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin-custom"></div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 animate-pulse">Loading StudyNook...</p>
      </div>
    </div>
  );
};

export default Loader;
