import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import WorkerRegistration from '../components/worker/WorkerRegistration';
import CustomerRegistration from '../components/customer/CustomerRegistration';
import { USER_TYPES } from '../utils/constants';

const RegisterPage = () => {
  const [searchParams] = useSearchParams();
  const typeFromUrl = searchParams.get('type');
  const [userType, setUserType] = useState(typeFromUrl || USER_TYPES.CUSTOMER);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Create Your Account</h1>
        <p className="text-gray-600">Join BuildConnect today</p>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setUserType(USER_TYPES.CUSTOMER)}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            userType === USER_TYPES.CUSTOMER
              ? 'bg-orange-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          I'm a Customer
        </button>
        <button
          onClick={() => setUserType(USER_TYPES.WORKER)}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            userType === USER_TYPES.WORKER
              ? 'bg-orange-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          I'm a Worker
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        {userType === USER_TYPES.WORKER ? (
          <WorkerRegistration />
        ) : (
          <CustomerRegistration />
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
