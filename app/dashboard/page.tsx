'use client';

import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Brain, LogOut, User, Bot, Zap, Activity, TrendingUp, Shield } from 'lucide-react';
import { AnimatedButton } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 orange-gradient rounded-2xl flex items-center justify-center animate-pulse glow-orange-sm">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          <p className="text-gray-400 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const quickActions = [
    {
      title: 'Profile Settings',
      description: 'Update your personal information and security settings',
      icon: User,
      href: '/dashboard/profile',
      gradient: 'from-orange-500/20 to-red-500/20',
      border: 'border-orange-500/30',
    },
    {
      title: 'Agent Configuration',
      description: 'Configure your voice AI agent settings',
      icon: Bot,
      href: '/dashboard/agent',
      gradient: 'from-blue-500/20 to-purple-500/20',
      border: 'border-blue-500/30',
    },
  ];

  const stats = [
    {
      title: 'Active Sessions',
      value: '12',
      change: '+2.5%',
      icon: Activity,
      positive: true,
    },
    {
      title: 'Performance',
      value: '98.5%',
      change: '+1.2%',
      icon: TrendingUp,
      positive: true,
    },
    {
      title: 'Security Score',
      value: '95/100',
      change: 'Excellent',
      icon: Shield,
      positive: true,
    },
  ];

  return (
    <div className="min-h-screen gradient-bg">
      {/* Removed Header */}
      {/* <header className="flex justify-between items-center p-6 md:p-8 border-b border-white/10 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 orange-gradient rounded-xl flex items-center justify-center glow-orange-sm">
            <span className="text-white font-bold text-xl">P</span>
          </div>
          <div>
            <span className="text-2xl font-bold text-white">Pro Pal AI</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <p className="text-orange-400 text-sm font-medium">Voice Dashboard</p>
            </div>
          </div>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 orange-gradient rounded-2xl flex items-center justify-center glow-orange-sm">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Welcome back, {session.user?.name?.split(' ')[0] || 'User'}! 👋
              </h1>
              <p className="text-gray-400 text-xl">
                Your AI-powered voice assistant is ready to help you achieve more.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-black/20 backdrop-blur-xl border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                      <p className="text-white text-3xl font-bold mt-2">{stat.value}</p>
                      <div className="flex items-center mt-2">
                        <span className={`text-sm font-semibold ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
                          {stat.change}
                        </span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                      <Icon className="h-6 w-6 text-orange-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center space-x-3 mb-8">
            <Zap className="h-7 w-7 text-orange-500" />
            <h2 className="text-3xl font-bold text-white">Quick Actions</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link key={index} href={action.href}>
                  <Card className="bg-black/20 backdrop-blur-xl border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group">
                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-4">
                        <div className={`w-14 h-14 bg-gradient-to-r ${action.gradient} rounded-2xl flex items-center justify-center border ${action.border} group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="h-7 w-7 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-white text-xl group-hover:text-orange-400 transition-colors duration-300">
                            {action.title}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-400 text-lg leading-relaxed">
                        {action.description}
                      </CardDescription>
                      <div className="mt-6">
                        <AnimatedButton className="orange-gradient hover:shadow-xl text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 glow-orange-sm group-hover:glow-orange">
                          Get Started
                          <Zap className="ml-2 h-4 w-4" />
                        </AnimatedButton>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </motion.div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Card className="bg-black/20 backdrop-blur-xl border-white/10 shadow-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-3 text-2xl">
                <Activity className="h-6 w-6 text-orange-500" />
                <span>System Status</span>
              </CardTitle>
              <CardDescription className="text-gray-400 text-lg">
                All systems are running optimally
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="flex items-center space-x-3 p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div>
                    <p className="text-green-400 font-semibold">Voice AI</p>
                    <p className="text-green-300 text-sm">Online</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div>
                    <p className="text-green-400 font-semibold">Database</p>
                    <p className="text-green-300 text-sm">Connected</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div>
                    <p className="text-green-400 font-semibold">API</p>
                    <p className="text-green-300 text-sm">Healthy</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div>
                    <p className="text-green-400 font-semibold">Security</p>
                    <p className="text-green-300 text-sm">Protected</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}