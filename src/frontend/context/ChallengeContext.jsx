import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../utils/api';

const ChallengeContext = createContext();

export const useChallenge = () => useContext(ChallengeContext);

export const ChallengeProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      const savedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (savedUser && token) {
        setUser(JSON.parse(savedUser));
        await fetchChallenge();
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const fetchChallenge = async () => {
    try {
      const data = await api.getChallenge();
      setChallenge(data);
    } catch (err) {
      console.error('Failed to fetch challenge:', err);
    }
  };

  const login = async (email, password) => {
    setError(null);
    try {
      const { user, token } = await api.login(email, password);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      await fetchChallenge();
      return true;
    } catch (err) {
      setError(err.message || 'Authentication failed');
      return false;
    }
  };

  const register = async (userData) => {
    setError(null);
    try {
      const { user, token } = await api.signup(userData);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      await fetchChallenge();
      return true;
    } catch (err) {
      setError(err.message || 'Registration failed');
      return false;
    }
  };

  const updateTask = async (date, taskId, value) => {
    try {
      const updated = await api.updateChallenge(date, taskId, value);
      setChallenge(updated);
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setChallenge(null);
  };

  const updateProfile = async (userData) => {
    try {
      const updatedUser = await api.updateProfile(userData);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return true;
    } catch (err) {
      console.error('Profile update failed:', err);
      return false;
    }
  };

  const deleteAccount = async () => {
    try {
      await api.deleteAccount();
      logout();
      return true;
    } catch (err) {
      console.error('Account deletion failed:', err);
      return false;
    }
  };

  const value = {
    user,
    challenge,
    loading,
    error,
    login,
    register,
    logout,
    updateTask,
    fetchChallenge,
    updateProfile,
    deleteAccount
  };

  return (
    <ChallengeContext.Provider value={value}>
      {children}
    </ChallengeContext.Provider>
  );
};
