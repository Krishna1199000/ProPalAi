'use client'

import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { Brain, LogOut } from 'lucide-react'
import { AnimatedButton } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950">
      {/* Header */}
      <header className="flex justify-between items-center p-6 md:p-8">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Pro Pal AI
          </span>
        </div>
        
        <AnimatedButton
          variant="ghost"
          size="sm"
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </AnimatedButton>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to Your Dashboard
          </h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-white/10 shadow-2xl"
          >
            <h2 className="text-2xl font-semibold mb-4">
              Hello, {session.user?.name || session.user?.email}! 👋
            </h2>
            <p className="text-muted-foreground mb-6">
              You've successfully signed in to Pro Pal AI. Your AI journey starts here!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                <h3 className="font-semibold text-lg mb-2">Get Started</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Begin your AI-powered productivity journey with our guided tutorial.
                </p>
                <AnimatedButton size="sm">Start Tutorial</AnimatedButton>
              </div>
              
              <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                <h3 className="font-semibold text-lg mb-2">Explore Features</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Discover all the powerful AI tools available in your account.
                </p>
                <AnimatedButton size="sm" variant="secondary">
                  Browse Features
                </AnimatedButton>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}