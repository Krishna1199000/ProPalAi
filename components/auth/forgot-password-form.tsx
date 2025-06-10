'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AnimatedButton } from '@/components/ui/button';
import { validatePassword } from '@/lib/utils';
import PasswordInput from '@/components/auth/password-input';
import PasswordStrength from '@/components/auth/password-strength';

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

  const validateForm = (): boolean => {
    setPasswordError('');
    
    if (!newPassword) {
      setPasswordError('New password is required');
      return false;
    }

    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.isValid && passwordValidation.message) {
      setPasswordError(passwordValidation.message);
      return false;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to reset password');
      }

      setSuccess('Password has been reset successfully. You can now sign in with your new password.');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
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
    <div className="min-h-screen flex items-center justify-center bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-4 left-4">
        <Link href="/" className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg md:text-xl">P</span>
            </div>
            <div className="absolute inset-0 bg-orange-500/30 rounded-full blur-sm"></div>
          </div>
          <span className="text-2xl font-bold text-orange-500">Pro Pal AI</span>
        </Link>
      </div>
      
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Enter your email and create a new password
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-900/20 p-4 border border-red-800">
              <div className="text-sm text-red-400">{error}</div>
            </div>
          )}
          {success && (
            <div className="rounded-md bg-green-900/20 p-4 border border-green-800">
              <div className="text-sm text-green-400">{success}</div>
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-300">
                New Password
              </label>
              <div className="mt-1">
                <PasswordInput
                  placeholder="Create a strong password"
                  value={newPassword}
                  onChange={setNewPassword}
                  onFocus={handlePasswordFocus}
                  onBlur={handlePasswordBlur}
                  error={passwordError}
                  name="new-password"
                />
              </div>
              {passwordError && (
                <p className="mt-1 text-sm text-red-400">{passwordError}</p>
              )}
              {showPasswordRequirements && (
                <div className="absolute z-[999] mt-1 p-3 bg-gray-800 border border-gray-700 rounded-md shadow-lg max-w-sm">
                  <PasswordStrength password={newPassword} />
                </div>
              )}
            </div>
            
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300">
                Confirm Password
              </label>
              <div className="mt-1">
                <PasswordInput
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  error={passwordError}
                  name="confirm-password"
                />
              </div>
            </div>
          </div>

          <div>
            <AnimatedButton
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
              ) : (
                'Reset Password'
              )}
            </AnimatedButton>
          </div>
        </form>

        <div className="text-center mt-4">
          <Link href="/login" className="text-orange-400 hover:text-orange-300 transition-colors">
            Remember your password? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}