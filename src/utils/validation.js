export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^\+?[\d\s-()]+$/;
  return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

export const validatePassword = (password) => {
  return password.length >= 8;
};

export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

export const validateForm = (formData, rules) => {
  const errors = {};

  Object.keys(rules).forEach((field) => {
    const value = formData[field];
    const rule = rules[field];

    if (rule.required && !validateRequired(value)) {
      errors[field] = `${field} is required`;
    }

    if (rule.email && !validateEmail(value)) {
      errors[field] = 'Invalid email address';
    }

    if (rule.phone && !validatePhone(value)) {
      errors[field] = 'Invalid phone number';
    }

    if (rule.password && !validatePassword(value)) {
      errors[field] = 'Password must be at least 8 characters';
    }

    if (rule.min && value.length < rule.min) {
      errors[field] = `Minimum length is ${rule.min}`;
    }

    if (rule.max && value.length > rule.max) {
      errors[field] = `Maximum length is ${rule.max}`;
    }
  });

  return errors;
};