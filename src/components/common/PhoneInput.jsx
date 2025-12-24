import React, { useState } from 'react';

const PhoneInput = ({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const [focused, setFocused] = useState(false);

  const formatPhoneNumber = (inputValue) => {
    // Remove all non-numeric characters
    const cleaned = inputValue.replace(/[^\d]/g, '');
    
    // If user tries to delete +7, prevent it
    if (cleaned.length === 0 || cleaned.length === 1) {
      return '+7';
    }
    
    // Start with +7
    let formatted = '+7';
    
    // Add the rest of the numbers with formatting
    if (cleaned.length > 1) {
      formatted += ' (' + cleaned.substring(1, 4);
    }
    if (cleaned.length >= 4) {
      formatted += ') ' + cleaned.substring(4, 7);
    }
    if (cleaned.length >= 7) {
      formatted += ' ' + cleaned.substring(7, 9);
    }
    if (cleaned.length >= 9) {
      formatted += ' ' + cleaned.substring(9, 11);
    }
    
    return formatted;
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    
    // If user tries to delete everything, keep +7
    if (inputValue.length < 2) {
      const formatted = '+7';
      onChange({
        target: {
          name,
          value: formatted,
        },
      });
      return;
    }
    
    // Format the phone number
    const formatted = formatPhoneNumber(inputValue);
    
    // Only update if the number is valid (max 11 digits including country code)
    const digitsOnly = formatted.replace(/[^\d]/g, '');
    if (digitsOnly.length <= 11) {
      onChange({
        target: {
          name,
          value: formatted,
        },
      });
    }
  };

  const handleFocus = (e) => {
    setFocused(true);
    // If empty, set to +7
    if (!value || value === '' || value === '+7') {
      onChange({
        target: {
          name,
          value: '+7',
        },
      });
      // Set cursor position after +7
      setTimeout(() => {
        e.target.setSelectionRange(2, 2);
      }, 0);
    }
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const handleKeyDown = (e) => {
    const cursorPosition = e.target.selectionStart;
    const currentValue = e.target.value;
    
    // Get only digits from current value
    const digitsOnly = currentValue.replace(/[^\d]/g, '');
    
    // Prevent deleting +7
    if (e.key === 'Backspace') {
      // If trying to delete when only +7 exists
      if (digitsOnly.length <= 1) {
        e.preventDefault();
        return;
      }
      
      // If cursor is at or before +7
      if (cursorPosition <= 2) {
        e.preventDefault();
        return;
      }
    }
    
    // Prevent cursor from going before +7
    if (e.key === 'ArrowLeft' && cursorPosition <= 2) {
      e.preventDefault();
    }
    
    // Prevent typing anything before +7
    if (e.key === 'Home') {
      e.preventDefault();
      e.target.setSelectionRange(2, 2);
    }
  };

  const handleClick = (e) => {
    // Prevent cursor from being placed before +7
    const cursorPosition = e.target.selectionStart;
    if (cursorPosition < 2) {
      setTimeout(() => {
        e.target.setSelectionRange(value?.length || 2, value?.length || 2);
      }, 0);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const digitsOnly = pastedText.replace(/[^\d]/g, '');
    
    // If pasted text starts with 7 or 8, remove it
    let cleanDigits = digitsOnly;
    if (cleanDigits.startsWith('7') || cleanDigits.startsWith('8')) {
      cleanDigits = cleanDigits.substring(1);
    }
    
    // Format with +7
    const formatted = formatPhoneNumber('7' + cleanDigits);
    onChange({
      target: {
        name,
        value: formatted,
      },
    });
  };

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type="tel"
        id={name}
        name={name}
        value={value || '+7'}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        onPaste={handlePaste}
        placeholder="+7 (___) ___ __ __"
        disabled={disabled}
        required={required}
        className={`w-full px-4 py-2 rounded-lg border ${
          error ? 'border-red-500' : 'border-gray-300'
        } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default PhoneInput;