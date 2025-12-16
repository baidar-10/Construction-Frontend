import React, { createContext, useState, useEffect } from 'react';
import { workerService } from '../api/workerService';

export const WorkerContext = createContext();

export const WorkerProvider = ({ children }) => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});

  const fetchWorkers = async (newFilters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await workerService.getAllWorkers(newFilters);
      setWorkers(data);
      setFilters(newFilters);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch workers');
    } finally {
      setLoading(false);
    }
  };

  const searchWorkers = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const data = await workerService.searchWorkers(query);
      setWorkers(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  const value = {
    workers,
    loading,
    error,
    filters,
    fetchWorkers,
    searchWorkers,
  };

  return (
    <WorkerContext.Provider value={value}>
      {children}
    </WorkerContext.Provider>
  );
};