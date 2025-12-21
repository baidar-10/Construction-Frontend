import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../common/Input';
import Button from '../common/Button';
import { useAuth } from '../../hooks/useAuth';
import { useWorkers } from '../../hooks/useWorkers';
import { validateForm } from '../../utils/validation';
import { USER_TYPES, WORKER_SPECIALTIES } from '../../utils/constants';

const WorkerRegistration = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { fetchWorkers } = useWorkers();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    specialty: '',
    hourlyRate: '',
    experienceYears: '',
    bio: '',
    location: '',
    skills: '',
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
      specialty: { required: true },
      hourlyRate: { required: true },
      location: { required: true },
    };

    const validationErrors = validateForm(formData, validationRules);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      // Map to API expected fields
      const payload = {
        fullName: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        userType: formData.userType,
        specialty: formData.specialty,
        hourlyRate: parseFloat(formData.hourlyRate) || 0,
        experienceYears: parseInt(formData.experienceYears) || 0,
        bio: formData.bio,
        location: formData.location,
        skills: formData.skills ? formData.skills.split(',').map(s => s.trim()).filter(Boolean) : [],
      };

      await register(payload);
      // Refresh worker listing so the new worker appears on Find Workers
      try {
        await fetchWorkers();
      } catch (e) {
        // ignore fetch errors for now
        console.error('Failed to refresh workers list:', e);
      }
      navigate('/workers');
    } catch (err) {
      setErrors({ submit: err.response?.data?.message || 'Registration failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Join as a Professional</h2>

      <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} error={errors.name} required />

      <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} required />

      <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} error={errors.password} required />

      <Input label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} error={errors.phone} required />

      <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
      <select name="specialty" value={formData.specialty} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
        <option value="">Select your trade...</option>
        {WORKER_SPECIALTIES.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      {errors.specialty && <p className="text-red-500 text-sm">{errors.specialty}</p>}

      <Input label="Hourly Rate ($)" name="hourlyRate" type="number" value={formData.hourlyRate} onChange={handleChange} error={errors.hourlyRate} required />

      <Input label="Location" name="location" value={formData.location} onChange={handleChange} error={errors.location} required />

      <Input label="Experience Years" name="experienceYears" type="number" value={formData.experienceYears} onChange={handleChange} />

      <Input label="Bio" name="bio" value={formData.bio} onChange={handleChange} />

      <Input label="Skills (comma separated)" name="skills" value={formData.skills} onChange={handleChange} />

      {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}

      <Button type="submit" loading={loading} className="w-full">Create Worker Account</Button>
    </form>
  );
};

export default WorkerRegistration;