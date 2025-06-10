'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import Link from 'next/link';
import { AnimatedButton } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/components/auth/auth-layout';
import GoogleSignInButton from '@/components/auth/google-signin-button';
import PasswordInput from '@/components/auth/password-input';
import { validatePassword } from '@/lib/utils';
import PasswordStrength from '@/components/auth/password-strength';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Errors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export default function SignUpPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

  // Redirect if user is already logged in
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  // Show loading state while checking session
  if (status === 'loading') {
    return (
      <AuthLayout
        title="Loading..."
        subtitle="Please wait while we check your session"
      >
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500" />
        </div>
      </AuthLayout>
    );
  }

  // Don't render the form if user is authenticated
  if (status === 'authenticated') {
    return null;
  }

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        newErrors.password = passwordValidation.message;
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'Something went wrong');
        setErrors({ general: data.error || 'Something went wrong' });
        return;
      }

      toast.success('Account created successfully! Please log in.');
      router.push('/login?message=Account created successfully. Please log in.');
    } catch (error) {
      toast.error('Network error. Please try again.');
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

  const handlePasswordFocus = () => {
    setShowPasswordRequirements(true);
  };

  const handlePasswordBlur = () => {
    // Hide requirements after a short delay to allow for interaction
    setTimeout(() => {
      setShowPasswordRequirements(false);
    }, 200);
  };

  return (
    <AuthLayout
      title="Get started with Pro Pal AI"
      subtitle="Create your account to unlock intelligent productivity"
    >
      <div className="space-y-6">
        <GoogleSignInButton buttonText="Sign up with Google" />
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-900 text-gray-400">or</span>
          </div>
        </div>

        {errors.general && (
          <div className="p-3 text-sm text-red-400 bg-red-900/20 border border-red-800 rounded-md">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 relative z-1">
          <div>
            <Label htmlFor="name" className="text-gray-300 font-medium">
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Your full name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`mt-1 h-12 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-orange-500 ${errors.name ? 'border-red-500 focus:border-red-500' : ''}`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name}</p>
            )}
          </div>

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

          <div className="relative z-20">
            <Label htmlFor="password" className="text-gray-300 font-medium">
              Password
            </Label>
            <div className="mt-1">
              <PasswordInput
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(value) => handleInputChange('password', value)}
                onFocus={handlePasswordFocus}
                onBlur={handlePasswordBlur}
                error={errors.password}
                name="password"
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-400">{errors.password}</p>
            )}
            {showPasswordRequirements && (
              <div className="absolute z-[999] mt-1 p-3 bg-gray-800 border border-gray-700 rounded-md shadow-lg max-w-sm">
                <PasswordStrength password={formData.password} />
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="confirmPassword" className="text-gray-300 font-medium">
              Confirm Password
            </Label>
            <div className="mt-1">
              <PasswordInput
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(value) => handleInputChange('confirmPassword', value)}
                error={errors.confirmPassword}
                name="confirmPassword"
              />
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
            )}
          </div>

          <AnimatedButton
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            ) : (
              'Create account'
            )}
          </AnimatedButton>
        </form>

        <div className="text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-medium text-orange-400 hover:text-orange-300 transition-colors"
          >
            Log in
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}