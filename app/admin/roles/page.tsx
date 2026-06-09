import Link from 'next/link'
import { Shield } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { requireAnyPermission, userHasPermission } from '@/lib/rbac'
import { RolesManager } from '@/components/admin/roles-manager'

export default async function AdminRolesPage() {
  const me = await requireAnyPermission(['manage_roles', 'view_roles'])
  const canManage = userHasPermission(me, 'manage_roles')
  const supabase = await createClient()

  const { data: roles } = await supabase
    .from('roles')
    .select('id, key, name, description, is_system, role_permissions(permission_key)')
    .order('is_system', { ascending: false })
    .order('name')

  const { data: permissions } = await supabase
    .from('permissions')
    .select('key, label, category')
    .order('category')

  return (
    <div className="p-4 sm:p-6">
      <div className="">
        <div className="flex items-center gap-3 mb-8">
          <div className="rounded-lg bg-emerald-500 p-2">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Roles & Permissions</h1>
            <p className="text-slate-400 text-sm">Define what each role can do</p>
          </div>
        </div>

        <RolesManager roles={(roles as any) ?? []} permissions={permissions ?? []} canManage={canManage} />
      </div>
    </div>
  )
}
