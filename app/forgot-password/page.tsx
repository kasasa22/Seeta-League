'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Trophy, Mail, AlertCircle, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const supabase = createClient()
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (resetError) {
      setError(resetError.message)
      toast.error('Could not send reset email')
      setIsLoading(false)
      return
    }

    setSent(true)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 flex items-center justify-center p-4 sm:p-6">
      <Card className="w-full max-w-md border-slate-700 bg-slate-800/50 backdrop-blur">
        <CardHeader className="text-center p-4 sm:p-6">
          <div className="mx-auto mb-3 sm:mb-4 rounded-lg bg-emerald-500 p-2 sm:p-3 w-fit">
            {sent ? <CheckCircle2 className="h-6 w-6 sm:h-8 sm:w-8 text-white" /> : <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-white" />}
          </div>
          <CardTitle className="text-xl sm:text-2xl font-bold text-white">
            {sent ? 'Check Your Email' : 'Forgot Password'}
          </CardTitle>
          <CardDescription className="text-sm sm:text-base text-slate-300">
            {sent
              ? 'If an account exists for that email, we sent a link to reset your password.'
              : 'Enter your email and we will send you a reset link.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          {sent ? (
            <Link href="/login">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Back to Sign In</Button>
            </Link>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
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

              {error && (
                <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 p-3">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <Button type="submit" disabled={isLoading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
                {isLoading ? 'Sending...' : (<><Mail className="h-4 w-4" /> Send reset link</>)}
              </Button>

              <p className="text-center text-sm text-slate-400">
                <Link href="/login" className="text-emerald-400 hover:underline">Back to Sign In</Link>
              </p>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
