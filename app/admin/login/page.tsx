'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trophy, Lock, AlertCircle } from "lucide-react"
import { toast } from "sonner"

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Super admin credentials
    const SUPER_ADMIN_EMAIL = 'kasasatrevor25@gmail.com'
    const SUPER_ADMIN_PASSWORD = 'Kasasa@2022'

    try {
      // Call server API to set server-side admin cookie
      const resp = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const result = await resp.json()
      if (resp.ok && result.ok) {
        const sessionData = {
          email: SUPER_ADMIN_EMAIL,
          name: 'Kasasa Trevor',
          role: 'super_admin',
          loginTime: new Date().toISOString()
        }
        localStorage.setItem('admin_session', JSON.stringify(sessionData))
        toast.success('Welcome back, Kasasa Trevor!')
        setTimeout(() => {
          window.location.href = '/admin'
        }, 800)
      } else {
        setError('Invalid email or password')
        toast.error('Invalid credentials')
      }
    } catch (err) {
      setError('Login failed. Please try again.')
      toast.error('Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 flex items-center justify-center p-4 sm:p-6">
      <Card className="w-full max-w-md border-slate-700 bg-slate-800/50 backdrop-blur">
        <CardHeader className="text-center p-4 sm:p-6">
          <div className="mx-auto mb-3 sm:mb-4 rounded-lg bg-emerald-500 p-2 sm:p-3 w-fit">
            <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </div>
          <CardTitle className="text-xl sm:text-2xl font-bold text-white">Admin Login</CardTitle>
          <CardDescription className="text-sm sm:text-base text-slate-300">
            Enter your credentials to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-slate-600 bg-slate-700/50 text-white placeholder:text-slate-400 focus:border-emerald-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-slate-600 bg-slate-700/50 text-white placeholder:text-slate-400 focus:border-emerald-500"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 p-3">
                <AlertCircle className="h-4 w-4 text-red-400" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Signing in...
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  Sign In
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}