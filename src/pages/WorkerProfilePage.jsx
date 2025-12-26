import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { workerService } from '../api/workerService';
import Loader from '../components/common/Loader';
import WorkerProfile from '../components/worker/WorkerProfile';

const WorkerProfilePage = () => {
  const { id } = useParams();
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchWorker = async () => {
      try {
        const data = await workerService.getWorkerById(id);
        if (mounted) setWorker(data);
      } catch (err) {
        if (mounted) setError(err.response?.data?.message || err.response?.data?.error || err.message || 'Failed to load worker');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchWorker();
    return () => { mounted = false; };
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Loader showText />
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-red-500">{error}</p>
      </div>
    </div>
  );
  
  if (!worker) return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-gray-600">Worker not found</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <WorkerProfile worker={worker} />
    </div>
  );
};

export default WorkerProfilePage;
