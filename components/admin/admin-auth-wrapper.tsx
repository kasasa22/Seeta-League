'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAdminSession, clearAdminSession, type AdminSession } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { LogOut, User } from 'lucide-react'
import { toast } from 'sonner'

interface AdminAuthWrapperProps {
  children: React.ReactNode
}

export function AdminAuthWrapper({ children }: AdminAuthWrapperProps) {
  const [session, setSession] = useState<AdminSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const adminSession = getAdminSession()
      console.log('Auth check result:', adminSession) // Debug log

      if (!adminSession) {
        console.log('No session found, redirecting to login')
        setIsLoading(false)
        router.push('/admin/login')
      } else {
        console.log('Session found, setting session')
        setSession(adminSession)
        setIsLoading(false)
      }
    }

    // Add a small delay to ensure localStorage is ready
    setTimeout(checkAuth, 100)
  }, [router])

  const handleLogout = () => {
    clearAdminSession()
    toast.success('Logged out successfully')
    router.push('/admin/login')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
      </div>
    )
  }

  if (!session) {
    return null // Will redirect to login
  }

  return (
    <div className="relative">
      {/* Admin Header */}
      <div className="absolute top-6 right-6 z-10 flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-lg bg-slate-800/80 px-3 py-2 backdrop-blur">
          <User className="h-4 w-4 text-emerald-400" />
          <span className="text-sm text-white font-medium">{session.name}</span>
        </div>
        <Button
          onClick={handleLogout}
          variant="outline"
          size="sm"
          className="gap-2 border-slate-700 bg-slate-800/80 text-white hover:bg-slate-700 backdrop-blur"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
      {children}
    </div>
  )
}