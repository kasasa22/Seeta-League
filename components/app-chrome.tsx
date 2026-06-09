'use client'

import { usePathname } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

const BARE_PREFIXES = ['/admin', '/login', '/register', '/pending', '/forgot-password', '/reset-password']

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const bare = BARE_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + '/'))

  if (bare) return <>{children}</>

  return (
    <div className="relative min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
