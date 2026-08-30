import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & Theme Description */}
          <div className="col-span-1 md:col-span-2">
            <span className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="bg-blue-600 text-white px-2.5 py-1 rounded-lg text-lg">SN</span>
              StudyNook
            </span>
            <p className="mt-4 text-sm text-slate-400 max-w-sm">
              Find and book quiet, private study rooms in your university library. List your room, manage bookings, and optimize your study sessions with conflict-free scheduling.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/rooms" className="text-sm hover:text-white transition-colors">Rooms</Link>
              </li>
              <li>
                <span className="text-sm cursor-pointer hover:text-white transition-colors">About Us</span>
              </li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">Contact Us</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-blue-500" />
                <span>support@studynook.com</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-blue-500" />
                <span>+1 (555) 019-2834</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span>Central Library, Campus Drive</span>
              </li>
            </ul>
            
            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              {/* Custom SVG for the new X logo */}
              <a href="#" className="text-slate-400 hover:text-white transition-colors" aria-label="X (formerly Twitter)">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} StudyNook. All rights reserved. Created for library room scheduling.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
