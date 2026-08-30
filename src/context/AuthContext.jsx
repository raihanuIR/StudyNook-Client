import React, { createContext, useState, useEffect } from 'react';
import { signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';
import { auth as firebaseAuth, googleProvider } from '../firebase.config';
import api from '../utils/api';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check login status on app load/reload
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/api/auth/me');
        if (response.data && response.data.user) {
          setUser(response.data.user);
        }
      } catch (error) {
        // User not logged in (e.g. 401), keep user state as null
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Standard Email/Password Register
  const registerUser = async (name, email, password, photoURL) => {
    try {
      const response = await api.post('/api/auth/register', {
        name,
        email,
        password,
        photoURL
      });
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Registration failed';
      throw new Error(errorMsg);
    }
  };

  // Standard Email/Password Login
  const loginUser = async (email, password) => {
    try {
      const response = await api.post('/api/auth/login', { email, password });
      if (response.data && response.data.user) {
        setUser(response.data.user);
      }
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Login failed';
      throw new Error(errorMsg);
    }
  };

  // Google OAuth Login
  const googleLogin = async () => {
    try {
      // 1. Sign in via Firebase Auth popup
      const result = await signInWithPopup(firebaseAuth, googleProvider);
      const firebaseUser = result.user;

      // 2. Send token/user details to backend to establish JWT session
      const response = await api.post('/api/auth/google-login', {
        name: firebaseUser.displayName || 'Google User',
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL || 'https://i.ibb.co.com/mRxb9gL/user-placeholder.png'
      });

      if (response.data && response.data.user) {
        setUser(response.data.user);
      }
      toast.success('Logged in with Google successfully!');
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Google Auth failed';
      toast.error(errorMsg);
      throw new Error(errorMsg);
    }
  };

  // Logout User
  const logoutUser = async () => {
    try {
      // Logout from Express backend (clears JWT cookie)
      await api.post('/api/auth/logout');
      
      // Logout from Firebase Auth if active
      if (firebaseAuth.currentUser) {
        await firebaseSignOut(firebaseAuth);
      }

      setUser(null);
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, registerUser, loginUser, googleLogin, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
