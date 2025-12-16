import { useContext } from 'react';
import { WorkerContext } from '../context/WorkerContext';

export const useWorkers = () => {
  const context = useContext(WorkerContext);
  if (!context) {
    throw new Error('useWorkers must be used within WorkerProvider');
  }
  return context;
};