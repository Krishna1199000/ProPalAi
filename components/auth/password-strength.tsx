'use client';

import { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';

type PasswordStrengthProps = {
  password: string;
};

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const [requirements, setRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  useEffect(() => {
    setRequirements({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  }, [password]);

  return (
    <div className="text-sm">
      <p className="text-gray-300 font-medium mb-3">Password Requirements:</p>
      <ul className="space-y-2">
        <li className={`flex items-center gap-2 ${requirements.length ? 'text-green-400' : 'text-gray-400'}`}>
          {requirements.length ? (
            <Check className="w-4 h-4 flex-shrink-0" />
          ) : (
            <X className="w-4 h-4 flex-shrink-0" />
          )}
          <span>At least 8 characters</span>
        </li>
        <li className={`flex items-center gap-2 ${requirements.uppercase ? 'text-green-400' : 'text-gray-400'}`}>
          {requirements.uppercase ? (
            <Check className="w-4 h-4 flex-shrink-0" />
          ) : (
            <X className="w-4 h-4 flex-shrink-0" />
          )}
          <span>One uppercase letter</span>
        </li>
        <li className={`flex items-center gap-2 ${requirements.lowercase ? 'text-green-400' : 'text-gray-400'}`}>
          {requirements.lowercase ? (
            <Check className="w-4 h-4 flex-shrink-0" />
          ) : (
            <X className="w-4 h-4 flex-shrink-0" />
          )}
          <span>One lowercase letter</span>
        </li>
        <li className={`flex items-center gap-2 ${requirements.number ? 'text-green-400' : 'text-gray-400'}`}>
          {requirements.number ? (
            <Check className="w-4 h-4 flex-shrink-0" />
          ) : (
            <X className="w-4 h-4 flex-shrink-0" />
          )}
          <span>One number</span>
        </li>
        <li className={`flex items-center gap-2 ${requirements.special ? 'text-green-400' : 'text-gray-400'}`}>
          {requirements.special ? (
            <Check className="w-4 h-4 flex-shrink-0" />
          ) : (
            <X className="w-4 h-4 flex-shrink-0" />
          )}
          <span>One special character (!@#$%^&*(),.?":{}|{'>'})</span>
        </li>
      </ul>
    </div>
  );
} 