import { redirect } from 'next/navigation'
import Link from 'next/link'
import { User } from 'lucide-react'
import { getCurrentUser, userHasPermission } from '@/lib/rbac'
import { LogoutButton } from '@/components/admin/logout-button'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()

  if (!user) redirect('/login')
  if (user.status !== 'approved') redirect('/pending')
  if (!userHasPermission(user, 'view_admin')) redirect('/')

  return (
    <div className="relative">
      <div className="absolute top-6 right-6 z-20 flex items-center gap-4">
        <Link
          href="/admin"
          className="flex items-center gap-2 rounded-lg bg-slate-800/80 px-3 py-2 backdrop-blur"
        >
          <User className="h-4 w-4 text-emerald-400" />
          <span className="text-sm text-white font-medium">{user.full_name || user.email}</span>
        </Link>
        <LogoutButton />
      </div>
      {children}
    </div>
  )
}
