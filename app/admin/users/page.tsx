import Link from 'next/link'
import { ArrowLeft, Users } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { requirePermission } from '@/lib/rbac'
import { UsersManager } from '@/components/admin/users-manager'

export default async function AdminUsersPage() {
  await requirePermission('manage_users')
  const supabase = await createClient()

  const { data: users } = await supabase
    .from('profiles')
    .select('id, email, full_name, phone, status, created_at, user_roles(id, role:roles(id, key, name), team:teams(id, name), season:seasons(id, name))')
    .order('created_at', { ascending: false })

  const { data: roles } = await supabase.from('roles').select('id, key, name').order('name')
  const { data: seasons } = await supabase.from('seasons').select('id, name').order('year', { ascending: false })
  const currentSeason = seasons?.[0]
  const { data: teams } = currentSeason
    ? await supabase.from('teams').select('id, name').eq('season_id', currentSeason.id).order('name')
    : { data: [] as { id: string; name: string }[] }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-4 sm:p-6 pt-20">
      <div className="mx-auto max-w-6xl">
        <Link href="/admin" className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Admin
        </Link>
        <div className="flex items-center gap-3 mb-8">
          <div className="rounded-lg bg-emerald-500 p-2">
            <Users className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Users & Roles</h1>
            <p className="text-slate-400 text-sm">Approve accounts and assign roles</p>
          </div>
        </div>

        <UsersManager
          users={(users as any) ?? []}
          roles={roles ?? []}
          teams={teams ?? []}
          seasons={seasons ?? []}
        />
      </div>
    </div>
  )
}
