import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import WorkerDashboard from '../components/worker/WorkerDashboard';
import CustomerDashboard from '../components/customer/CustomerDashboard';
import Loader from '../components/common/Loader';
import { USER_TYPES } from '../utils/constants';

const DashboardPage = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return currentUser.userType === USER_TYPES.WORKER ? (
    <WorkerDashboard />
  ) : (
    <CustomerDashboard />
  );
};

export default DashboardPage;
