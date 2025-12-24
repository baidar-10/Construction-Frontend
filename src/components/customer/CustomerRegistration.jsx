import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Input from '../common/Input';
import PhoneInput from '../common/PhoneInput'; // Add this import
import Button from '../common/Button';
import { useAuth } from '../../hooks/useAuth';
import { validateForm } from '../../utils/validation';
import { USER_TYPES } from '../../utils/constants';

const CustomerRegistration = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '+7', // Initialize with +7
    location: '',
    userType: USER_TYPES.CUSTOMER,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationRules = {
      name: { required: true },
      email: { required: true, email: true },
      password: { required: true, password: true },
      phone: { required: true, phone: true },
      location: { required: true },
    };

    const validationErrors = validateForm(formData, validationRules);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setErrors({ submit: err.response?.data?.message || t('errors.registrationFailed') });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {t('auth.register')} {t('auth.imCustomer').toLowerCase()}
      </h2>

      <Input
        label={t('auth.fullName')}
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
      />

      <Input
        label={t('auth.email')}
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
      />

      <Input
        label={t('auth.password')}
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        required
      />

      <PhoneInput
        label={t('auth.phone')}
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder={t('auth.phonePlaceholder')}
        error={errors.phone}
        required
      />

      <Input
        label={t('auth.location')}
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder={t('auth.locationPlaceholder')}
        error={errors.location}
        required
      />

      {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}

      <Button type="submit" loading={loading} className="w-full">
        {t('auth.createCustomerAccount')}
      </Button>
    </form>
  );
};

export default CustomerRegistration;