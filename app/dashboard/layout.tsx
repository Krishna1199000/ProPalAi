'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { User, Bot, Menu, X, Zap, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

const sidebarItems = [
  {
    name: 'Profile',
    href: '/dashboard/profile',
    icon: User,
  },
  {
    name: 'Agent',
    href: '/dashboard/agent',
    icon: Bot,
  },
  {
    name: 'Sign Out',
    href: '#', // Placeholder, handled by onClick
    icon: LogOut,
    onClick: () => signOut({ callbackUrl: '/' }),
    isSignOut: true,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen gradient-bg">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-3 rounded-xl bg-black/20 backdrop-blur-sm text-white hover:bg-black/30 transition-all duration-300 border border-white/10 glow-orange-sm"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-black/30 backdrop-blur-xl border-r border-white/10 transform transition-all duration-300 ease-in-out z-50 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="p-8">
          {/* Logo Section */}
          <div className="flex items-center space-x-4 mb-12">
            <div className="w-12 h-12 orange-gradient rounded-xl flex items-center justify-center glow-orange-sm">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-2xl">Pro Pal AI</h1>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <p className="text-orange-400 text-sm font-medium">Voice Dashboard</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-3">
            <div className="text-xs uppercase tracking-wider text-gray-400 mb-4 px-4 font-semibold">
              Navigation
            </div>
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href && !item.isSignOut;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    if (item.isSignOut) {
                      item.onClick?.();
                    } else {
                      setSidebarOpen(false);
                    }
                  }}
                  className={`group flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-300 ${
                    isActive
                      ? 'orange-gradient text-white shadow-xl glow-orange'
                      : item.isSignOut
                      ? 'bg-red-600/20 text-red-400 hover:bg-red-500/30 hover:text-white hover:shadow-lg border border-red-500/30'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white hover:shadow-lg'
                  }`}
                >
                  <Icon size={22} className={`${isActive ? 'text-white' : item.isSignOut ? 'text-red-400 group-hover:text-white' : 'text-gray-400 group-hover:text-orange-400'} transition-colors duration-300`} />
                  <span className="font-semibold text-lg">{item.name}</span>
                  {isActive && (
                    <div className="ml-auto">
                      <Zap size={16} className="text-white animate-pulse" />
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Status Indicator */}
          <div className="mt-12 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <p className="text-white text-sm font-semibold">System Online</p>
                <p className="text-gray-400 text-xs">All services running</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-72 min-h-screen">
        <div className="p-8 lg:p-12">
          <div className="pt-20 lg:pt-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}