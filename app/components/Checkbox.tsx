'use client';

import { InputHTMLAttributes } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export default function Checkbox({ label, className = '', ...props }: CheckboxProps) {
  return (
    <label className="flex items-center space-x-3 cursor-pointer">
      <input
        type="checkbox"
        className={`checkbox ${className}`}
        {...props}
      />
      {label && (
        <span className="text-sm text-text-primary select-none">{label}</span>
      )}
    </label>
  );
}
