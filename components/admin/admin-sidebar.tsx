'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, UserCog, Shield, Users, UserCircle, Calendar, Trophy, Award,
  Wallet, Newspaper, MessagesSquare, Eye, Bell, FileText, Menu, Trophy as Logo, ExternalLink,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { LogoutButton } from '@/components/admin/logout-button'
import { SeasonSelector } from '@/components/season-selector'

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  perms: string[]
}

const NAV: NavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, perms: [] },
  { label: 'Users & Roles', href: '/admin/users', icon: UserCog, perms: ['manage_users', 'view_users'] },
  { label: 'Roles & Permissions', href: '/admin/roles', icon: Shield, perms: ['manage_roles', 'view_roles'] },
  { label: 'My Team', href: '/admin/team', icon: Users, perms: ['register_team', 'register_players'] },
  { label: 'Teams', href: '/admin/teams', icon: Users, perms: ['manage_teams', 'view_teams'] },
  { label: 'Players', href: '/admin/players', icon: UserCircle, perms: ['manage_players', 'view_players'] },
  { label: 'Matches', href: '/admin/matches', icon: Calendar, perms: ['manage_matches', 'view_matches'] },
  { label: 'Enter Scores', href: '/admin/scores', icon: Trophy, perms: ['enter_scores'] },
  { label: 'Records', href: '/admin/records', icon: Award, perms: ['enter_scores', 'edit_records', 'view_records'] },
  { label: 'Finance', href: '/admin/finance', icon: Wallet, perms: ['view_finance', 'manage_finance'] },
  { label: 'News & Activities', href: '/admin/activities', icon: Newspaper, perms: ['post_news', 'manage_news', 'view_news'] },
  { label: 'Blogs', href: '/admin/blogs', icon: FileText, perms: ['post_news', 'manage_news', 'view_news'] },
  { label: 'Notices', href: '/admin/notices', icon: Bell, perms: ['post_news', 'manage_news', 'view_news'] },
  { label: 'Messages & RFCs', href: '/admin/messages', icon: MessagesSquare, perms: ['send_rfc', 'respond_rfc'] },
  { label: 'Overview', href: '/admin/overview', icon: Eye, perms: ['view_all'] },
]

interface ShellProps {
  user: { full_name: string | null; email: string | null }
  permissions: string[]
  isSuper: boolean
  children: React.ReactNode
}

function visibleItems(permissions: string[], isSuper: boolean) {
  return NAV.filter(
    (item) => item.perms.length === 0 || isSuper || item.perms.some((p) => permissions.includes(p))
  )
}

function NavLinks({ items, onNavigate }: { items: NavItem[]; onNavigate?: () => void }) {
  const pathname = usePathname()
  return (
    <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
      {items.map((item) => {
        const active = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              active
                ? 'bg-emerald-500/15 text-emerald-300'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            )}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            <span className="truncate">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

function SidebarBody({ user, items, onNavigate }: { user: ShellProps['user']; items: NavItem[]; onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col bg-slate-950">
      <Link href="/" className="flex items-center gap-2 border-b border-slate-800 px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700">
          <Logo className="h-5 w-5 text-white" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="font-black text-white">SEETA</span>
          <span className="text-xs text-slate-400">League Admin</span>
        </div>
      </Link>

      <NavLinks items={items} onNavigate={onNavigate} />

      <div className="border-t border-slate-800 p-3">
        <div className="mb-3">
          <p className="mb-1 px-1 text-xs font-medium text-slate-500">Viewing season</p>
          <SeasonSelector />
        </div>
        <Link href="/" className="mb-2 flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-400 hover:bg-slate-800 hover:text-white">
          <ExternalLink className="h-3.5 w-3.5" /> View public site
        </Link>
        <div className="flex items-center justify-between gap-2 rounded-lg bg-slate-900 px-3 py-2">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">{user.full_name || 'User'}</p>
            <p className="truncate text-xs text-slate-400">{user.email}</p>
          </div>
        </div>
        <div className="mt-2">
          <LogoutButton />
        </div>
      </div>
    </div>
  )
}

export function AdminShell({ user, permissions, isSuper, children }: ShellProps) {
  const [open, setOpen] = React.useState(false)
  const items = visibleItems(permissions, isSuper)

  return (
    <div className="min-h-screen bg-slate-950">
      <NavProgress />

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-slate-800 lg:block">
        <SidebarBody user={user} items={items} />
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-800 bg-slate-950/90 px-4 backdrop-blur lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-slate-800">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 border-slate-800 bg-slate-950 p-0">
              <SheetTitle className="sr-only">Admin navigation</SheetTitle>
              <SidebarBody user={user} items={items} onNavigate={() => setOpen(false)} />
            </SheetContent>
          </Sheet>
          <span className="font-black text-white">SEETA Admin</span>
          <div className="w-9" />
        </header>

        <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950">
          {children}
        </main>
      </div>
    </div>
  )
}

function NavProgress() {
  const pathname = usePathname()
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [pathname])

  if (!loading) return null
  return <div className="fixed inset-x-0 top-0 z-[60] h-0.5 animate-pulse bg-emerald-500" />
}
