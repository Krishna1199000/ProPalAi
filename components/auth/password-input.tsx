'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { AnimatedButton } from '@/components/ui/button';

interface PasswordInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  name?: string;
}

export default function PasswordInput({ 
  placeholder = "Password",
  value,
  onChange,
  error,
  name
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`pr-12 h-12 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-orange-500 ${error ? 'border-red-500 focus:border-red-500' : ''}`}
        name={name}
      />
      <AnimatedButton
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <EyeOff className="w-4 h-4 text-gray-400" />
        ) : (
          <Eye className="w-4 h-4 text-gray-400" />
        )}
      </AnimatedButton>
    </div>
  );
}