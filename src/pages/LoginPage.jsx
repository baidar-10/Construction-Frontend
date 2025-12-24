import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      await login(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(t('errors.loginFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          {t('auth.welcomeBack')}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label={t('auth.email')}
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            label={t('auth.password')}
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" loading={loading} className="w-full">
            {t('auth.login')}
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          {t('auth.dontHaveAccount')}{' '}
          <Link to="/register" className="text-orange-500 hover:text-orange-600 font-semibold">
            {t('auth.signupLink')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;