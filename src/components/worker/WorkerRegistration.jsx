import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Input from '../common/Input';
import PhoneInput from '../common/PhoneInput'; // Add this import
import Button from '../common/Button';
import { useAuth } from '../../hooks/useAuth';
import { validateForm } from '../../utils/validation';
import { USER_TYPES } from '../../utils/constants';

const WorkerRegistration = () => {
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
    role: '',
    experience: '',
    skills: '',
    hourlyRate: '',
    bio: '',
    userType: USER_TYPES.WORKER,
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
      role: { required: true },
      experience: { required: true },
      hourlyRate: { required: true },
    };

    const validationErrors = validateForm(formData, validationRules);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      const skillsArray = formData.skills.split(',').map((s) => s.trim());
      await register({ ...formData, skills: skillsArray });
      navigate('/dashboard');
    } catch (err) {
      setErrors({ submit: err.response?.data?.message || t('errors.registrationFailed') });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {t('auth.register')} {t('auth.imWorker').toLowerCase()}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        <Input
          label={t('auth.professionalRole')}
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder={t('auth.rolePlaceholder')}
          error={errors.role}
          required
        />

        <Input
          label={t('auth.yearsExperience')}
          name="experience"
          type="number"
          value={formData.experience}
          onChange={handleChange}
          error={errors.experience}
          required
        />

        <Input
          label={t('auth.hourlyRate')}
          name="hourlyRate"
          type="number"
          value={formData.hourlyRate}
          onChange={handleChange}
          error={errors.hourlyRate}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('auth.skillsLabel')} <span className="text-red-500">*</span>
        </label>
        <textarea
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          placeholder={t('auth.skillsPlaceholder')}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          rows="3"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('auth.bio')}
        </label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder={t('auth.bioPlaceholder')}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          rows="4"
        />
      </div>

      {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}

      <Button type="submit" loading={loading} className="w-full">
        {t('auth.createWorkerAccount')}
      </Button>
    </form>
  );
};

export default WorkerRegistration;