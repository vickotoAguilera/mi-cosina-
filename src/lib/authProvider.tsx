'use client';

import { useContext } from 'react';
import { AppContext, UserRole } from '@/context/AppContext';

const FAKE_USER = {
  name: 'John Doe',
  picture: 'https://randomuser.me/api/portraits/men/32.jpg',
};

export const useAuth = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAuth must be used within an AppProvider');
  }

  const { setRole, setUser, user } = context;

  const loginWithGoogle = () => {
    // Simulate Google login
    setRole('USER');
    setUser(FAKE_USER);
  };

  const logout = () => {
    setRole('GUEST');
    setUser(null);
  };

  return { ...context, loginWithGoogle, logout, isAuthenticated: !!user };
};
