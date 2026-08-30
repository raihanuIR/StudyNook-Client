import React from 'react';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { Home, Compass } from 'lucide-react';

const NotFound = () => {
  useDocumentTitle('StudyNook – Page Not Found');

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="space-y-6 max-w-md">
        
        {/* Visual Icon */}
        <div className="w-24 h-24 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 rounded-3xl flex items-center justify-center mx-auto shadow-sm animate-bounce duration-1000">
          <Compass className="w-12 h-12 text-blue-500" />
        </div>

        <h1 className="text-6xl font-black text-slate-900 dark:text-white tracking-tight">404</h1>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Page Not Found</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back on track!
          </p>
        </div>

        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md shadow-blue-500/10 transition-colors uppercase tracking-wider text-xs"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
};

export default NotFound;
