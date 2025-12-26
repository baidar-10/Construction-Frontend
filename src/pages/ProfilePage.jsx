import React from 'react';
import WorkerProfile from '../components/worker/WorkerProfile';
import CustomerProfile from '../components/customer/CustomerProfile';
import { useAuth } from '../hooks/useAuth';
import { USER_TYPES } from '../utils/constants';

const ProfilePage = () => {
  const { currentUser, loading } = useAuth();

  if (loading) return null;
  if (!currentUser) return null;

  return currentUser.userType === USER_TYPES.WORKER ? <WorkerProfile /> : <CustomerProfile />;
};

export default ProfilePage;