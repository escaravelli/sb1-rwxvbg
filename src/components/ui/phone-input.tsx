import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';

interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange: (value: string) => void;
}

export function PhoneInput({ onChange, value = '', ...props }: PhoneInputProps) {
  const [inputValue, setInputValue] = useState(value as string);

  useEffect(() => {
    setInputValue(value as string);
  }, [value]);

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Check if it's a mobile number (9 digits) or landline (8 digits)
    const isMobile = digits.length > 8;
    
    if (digits.length <= 2) {
      return `(${digits}`;
    }
    
    if (isMobile) {
      // Format as mobile: (XX) XXXXX-XXXX
      if (digits.length <= 7) {
        return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
      }
      if (digits.length <= 11) {
        return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
      }
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
    } else {
      // Format as landline: (XX) XXXX-XXXX
      if (digits.length <= 6) {
        return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
      }
      if (digits.length <= 10) {
        return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
      }
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6, 10)}`;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formattedValue = formatPhoneNumber(rawValue);
    setInputValue(formattedValue);
    onChange(formattedValue);
  };

  return (
    <Input
      {...props}
      type="tel"
      value={inputValue}
      onChange={handleChange}
      placeholder="(00) 00000-0000"
      maxLength={16}
    />
  );
}