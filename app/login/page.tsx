'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { AnimatedButton} from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/components/auth/auth-layout';
import GoogleSignInButton from '@/components/auth/google-signin-button';
import PasswordInput from '@/components/auth/password-input';

interface FormData {
  email: string;
  password: string;
}

interface Errors {
  email?: string;
  password?: string;
  general?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const message = searchParams?.get('message');
    if (message) {
      setSuccessMessage(message);
    }
  }, [searchParams]);

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});
    setSuccessMessage('');

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setErrors({ general: 'Invalid email or password' });
      } else if (result?.ok) {
        router.push('/dashboard');
      }
    } catch (error) {
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <AuthLayout
      title="Welcome back to Pro Pal AI"
      subtitle="Sign in to continue your productivity journey"
    >
      <div className="space-y-6">
        <GoogleSignInButton />
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-900 text-gray-400">or</span>
          </div>
        </div>

        {successMessage && (
          <div className="p-3 text-sm text-green-400 bg-green-900/20 border border-green-800 rounded-md">
            {successMessage}
          </div>
        )}

        {errors.general && (
          <div className="p-3 text-sm text-red-400 bg-red-900/20 border border-red-800 rounded-md">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-gray-300 font-medium">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`mt-1 h-12 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-orange-500 ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email}</p>
            )}
          </div>

          <div>
            <Label htmlFor="password" className="text-gray-300 font-medium">
              Password
            </Label>
            <div className="mt-1">
              <PasswordInput
                placeholder="Enter your password"
                value={formData.password}
                onChange={(value) => handleInputChange('password', value)}
                error={errors.password}
                name="password"
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-400">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-600 bg-gray-800 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                href="/forgot-password"
                className="font-medium text-orange-400 hover:text-orange-300 transition-colors"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <AnimatedButton
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            ) : (
              'Log In'
            )}
          </AnimatedButton>
        </form>

        <div className="text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link
            href="/signup"
            className="font-medium text-orange-400 hover:text-orange-300 transition-colors"
          >
            Sign up
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}