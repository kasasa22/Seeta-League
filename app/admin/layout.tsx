import { redirect } from 'next/navigation'
import { getCurrentUser, userHasPermission } from '@/lib/rbac'
import { AdminShell } from '@/components/admin/admin-sidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()

  if (!user) redirect('/login')
  if (user.status !== 'approved') redirect('/pending')
  if (!userHasPermission(user, 'view_admin')) redirect('/')

  return (
    <AdminShell
      user={{ full_name: user.full_name, email: user.email }}
      permissions={user.permissions}
      isSuper={user.roleKeys.includes('super_admin')}
    >
      {children}
    </AdminShell>
  )
}
