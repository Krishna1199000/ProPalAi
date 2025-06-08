import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex bg-gray-900">
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <span className="text-2xl font-bold text-white">Pro Pal AI</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
            <p className="text-gray-400">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>

      {/* Right Panel - Hero */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-black/20" />
        
        {/* AI-themed geometric background */}
        <div className="absolute inset-0">
          <svg className="absolute top-20 left-20 w-32 h-32 text-orange-500/10" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" />
          </svg>
          <svg className="absolute top-40 right-20 w-24 h-24 text-orange-500/10" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
          </svg>
          <svg className="absolute bottom-40 left-40 w-20 h-20 text-orange-500/10" fill="currentColor" viewBox="0 0 24 24">
            <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
          </svg>
          <svg className="absolute bottom-20 right-40 w-28 h-28 text-orange-500/10" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L13.41 8.41L20 10L13.41 11.59L12 18L10.59 11.59L4 10L10.59 8.41L12 2Z" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 py-24 text-white">
          <div className="max-w-md">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-orange-500/30">
                <svg
                  className="w-7 h-7 text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              Powerful AI Labs by <span className="text-orange-400">Pro Pal AI</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Boost your AI application's speed and efficiency globally by bringing inference closer to your users. Enjoy unmatched performance with our intelligent edge AI infrastructure.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-orange-500/20 rounded-full border-2 border-orange-500/30 backdrop-blur-sm" />
                <div className="w-8 h-8 bg-orange-500/20 rounded-full border-2 border-orange-500/30 backdrop-blur-sm" />
                <div className="w-8 h-8 bg-orange-500/20 rounded-full border-2 border-orange-500/30 backdrop-blur-sm" />
              </div>
              <span className="text-sm text-gray-400">Trusted by 10,000+ professionals</span>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full translate-y-48 -translate-x-48" />
      </div>
    </div>
  );
}