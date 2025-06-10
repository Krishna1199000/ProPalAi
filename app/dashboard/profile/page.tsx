'use client';

import { useState, useEffect } from 'react';
import { AnimatedButton } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Loader2, Save, User as UserIcon, Mail, Phone, Key, Shield, CheckCircle, Eye, EyeOff, Activity } from 'lucide-react';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import PasswordInput from '@/components/auth/password-input';
import PasswordStrength from '@/components/auth/password-strength';
import { validatePassword } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface Account {
  provider: string;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  accounts?: Account[];
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isGoogleOAuthUser, setIsGoogleOAuthUser] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user-profile');
      if (response.ok) {
        const data: UserData = await response.json();
        setUserData(data);
        setFormData({
          email: data.email || '',
          phone: data.phone || '',
          password: '',
          confirmPassword: '',
        });

        const googleAccount = data.accounts?.find(account => account.provider === 'google');
        setIsGoogleOAuthUser(!!googleAccount);

      } else {
        console.error('Failed to fetch user data:', response.statusText);
        toast.error('Failed to load user profile');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Failed to load user profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password && !validatePassword(formData.password).isValid) {
      toast.error('Password does not meet strong password requirements.');
      return;
    }

    setSaving(true);
    setSuccess(false);
    
    try {
      const response = await fetch('/api/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userData?.id,
          email: formData.email,
          phone: formData.phone,
          password: formData.password || undefined,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setSuccess(true);
          setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
          setPasswordStrength(0);
          fetchUserData();
          setTimeout(() => setSuccess(false), 3000);
          toast.success('Profile updated successfully!');
        } else {
          toast.error(result.error || 'Failed to update profile');
        }
      } else {
        toast.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('An error occurred while updating profile');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    if (field === 'password') {
      const strength = validatePassword(value).score;
      setPasswordStrength(strength);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-orange-500" />
          <p className="text-gray-400 text-lg">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 orange-gradient rounded-2xl flex items-center justify-center glow-orange-sm">
            <UserIcon className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Profile Settings</h1>
            <p className="text-gray-400 text-lg">
              Manage your account information and security preferences
            </p>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-8 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <p className="text-green-400 font-semibold">Profile updated successfully!</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Profile Form */}
        <div className="lg:col-span-2">
          <Card className="bg-black/20 backdrop-blur-xl border-white/10 shadow-2xl">
            <CardHeader className="pb-8">
              <CardTitle className="text-white flex items-center space-x-3 text-2xl">
                <UserIcon className="h-7 w-7 text-orange-500" />
                <span>Personal Information</span>
              </CardTitle>
              <CardDescription className="text-gray-400 text-lg">
                Update your personal details and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Username (readonly) */}
                <div className="space-y-3">
                  <Label htmlFor="username" className="text-white flex items-center space-x-3 text-lg font-semibold">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                    <span>Username</span>
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    value={session?.user?.name || userData?.name || 'N/A'}
                    disabled
                    className="bg-white/5 border-white/10 text-gray-400 cursor-not-allowed h-14 text-lg rounded-xl"
                  />
                  <p className="text-sm text-gray-500">Username cannot be changed for security reasons</p>
                </div>

                <Separator className="bg-white/10" />

                {/* Email */}
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-white flex items-center space-x-3 text-lg font-semibold">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <span>Email Address</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className="bg-white/5 border-white/10 text-white focus:border-orange-500 focus:ring-orange-500/20 h-14 text-lg rounded-xl"
                    placeholder="Enter your email address"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-3">
                  <Label htmlFor="phone" className="text-white flex items-center space-x-3 text-lg font-semibold">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <span>Phone Number</span>
                  </Label>
                  <Input
                    id="phone"
                    type="text"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="bg-white/5 border-white/10 text-white focus:border-orange-500 focus:ring-orange-500/20 h-14 text-lg rounded-xl"
                    placeholder="Enter your phone number (optional)"
                  />
                </div>

                <Separator className="bg-white/10" />

                {/* Password Section (Conditional Rendering) */}
                {isGoogleOAuthUser ? (
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-gray-400">
                    <p className="text-lg font-semibold mb-2 flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-orange-500" />
                      <span>Password Management</span>
                    </p>
                    <p>Your account is signed up with Google OAuth, so there is no need to change your password directly here. Please manage your password through your Google account settings.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Label htmlFor="password" className="text-white flex items-center space-x-3 text-lg font-semibold">
                      <Key className="h-5 w-5 text-gray-400" />
                      <span>New Password</span>
                    </Label>
                    
                    <PasswordInput
                      id="password"
                      placeholder="Enter new password"
                      value={formData.password}
                      onChange={(value) => handleInputChange('password', value)}
                      name="password"
                    />
                    <PasswordStrength password={formData.password} />

                    <Label htmlFor="confirmPassword" className="sr-only">Confirm New Password</Label>
                    <PasswordInput
                      id="confirmPassword"
                      placeholder="Confirm new password"
                      value={formData.confirmPassword}
                      onChange={(value) => handleInputChange('confirmPassword', value)}
                      name="confirmPassword"
                    />
                  </div>
                )}

                <AnimatedButton
                  type="submit"
                  disabled={saving}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-xl text-lg transition duration-300 ease-in-out"
                >
                  {saving ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-5 w-5" />
                  )}
                  {saving ? 'Saving...' : 'Save Changes'}
                </AnimatedButton>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Security Info Sidebar */}
        <div className="space-y-6">
          <Card className="bg-black/20 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Shield className="h-5 w-5 text-orange-500" />
                <span>Security</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-green-400 text-sm font-semibold">Account Secure</p>
                  <p className="text-green-300 text-xs">2FA Enabled</p>
                </div>
              </div>
              
              <div className="space-y-3 text-sm text-gray-400">
                <p>• Strong password recommended</p>
                <p>• Email verification active</p>
                <p>• Profile encryption enabled</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/20 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-lg">Account Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Member Since</span>
                <span className="text-white font-semibold">Nov 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Last Updated</span>
                <span className="text-white font-semibold">Today</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Profile Status</span>
                <span className="text-green-400 font-semibold">Active</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
