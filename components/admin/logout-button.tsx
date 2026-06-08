'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    toast.success('Logged out')
    router.push('/login')
    router.refresh()
  }

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      size="sm"
      className="gap-2 border-slate-700 bg-slate-800/80 text-white hover:bg-slate-700 backdrop-blur"
    >
      <LogOut className="h-4 w-4" />
      Logout
    </Button>
  )
}
