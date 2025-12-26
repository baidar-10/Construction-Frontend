import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../api/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const user = await authService.getCurrentUser();
          setCurrentUser(user);
        } catch (err) {
          console.error('Failed to load user:', err);
          authService.logout();
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (credentials) => {
    try {
      setError(null);
      const data = await authService.login(credentials);
      setCurrentUser(data.user);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    }
  };

  const normalizeRegistrationPayload = (userData) => {
    const payload = { ...userData };

    // Map alternate field names
    if (payload.role && !payload.specialty) payload.specialty = payload.role;
    if (payload.experience && !payload.experienceYears) payload.experienceYears = parseInt(payload.experience, 10) || 0;
    if (payload.hourlyRate && typeof payload.hourlyRate === 'string') payload.hourlyRate = parseFloat(payload.hourlyRate) || 0;

    // If customer used `location` field, map it to `address` (optional)
    if (payload.location && payload.userType === 'customer' && !payload.address) payload.address = payload.location;

    // Ensure userType exists if omitted
    if (!payload.userType) payload.userType = payload.specialty ? 'worker' : 'customer';

    return payload;
  };

  const register = async (userData) => {
    try {
      setError(null);
      const normalized = normalizeRegistrationPayload(userData);
      const data = await authService.register(normalized);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.error || 'Registration failed');
      throw err;
    }
  };


  const logout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
    setCurrentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};