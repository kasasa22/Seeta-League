'use client'

import { useState, useTransition } from 'react'
import { Plus, Trash2, Lock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { createRole, toggleRolePermission, deleteRole } from '@/app/admin/roles/actions'

interface PermissionRef { key: string; label: string; category: string | null }
interface RoleRow {
  id: string
  key: string
  name: string
  description: string | null
  is_system: boolean
  role_permissions: { permission_key: string }[]
}

interface Props {
  roles: RoleRow[]
  permissions: PermissionRef[]
}

export function RolesManager({ roles, permissions }: Props) {
  const [isPending, startTransition] = useTransition()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const categories = Array.from(new Set(permissions.map((p) => p.category ?? 'general')))

  const onCreate = () => {
    if (!name.trim()) return
    const fd = new FormData()
    fd.set('name', name)
    fd.set('description', description)
    startTransition(async () => {
      await createRole(fd)
      setName('')
      setDescription('')
      toast.success('Role created')
    })
  }

  const onToggle = (roleId: string, permKey: string, enabled: boolean) =>
    startTransition(async () => {
      await toggleRolePermission(roleId, permKey, enabled)
    })

  const onDelete = (roleId: string) =>
    startTransition(async () => {
      await deleteRole(roleId)
      toast.success('Role deleted')
    })

  return (
    <div className="space-y-6">
      <Card className="border-slate-700 bg-slate-800/50">
        <CardContent className="p-4 sm:p-5">
          <h2 className="mb-3 font-bold text-white">Create a role</h2>
          <div className="flex flex-wrap items-end gap-3">
            <div className="flex-1 min-w-[180px]">
              <label className="text-xs text-slate-400">Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Coordinator"
                className="border-slate-600 bg-slate-700/50 text-white"
              />
            </div>
            <div className="flex-1 min-w-[220px]">
              <label className="text-xs text-slate-400">Description</label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What this role does"
                className="border-slate-600 bg-slate-700/50 text-white"
              />
            </div>
            <Button onClick={onCreate} disabled={isPending} className="gap-1 bg-emerald-600 hover:bg-emerald-700 text-white">
              <Plus className="h-4 w-4" /> Create
            </Button>
          </div>
        </CardContent>
      </Card>

      {roles.map((role) => {
        const enabled = new Set(role.role_permissions.map((rp) => rp.permission_key))
        const isSuper = role.key === 'super_admin'
        return (
          <Card key={role.id} className="border-slate-700 bg-slate-800/50">
            <CardContent className="p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white">{role.name}</h3>
                  {role.is_system && (
                    <Badge className="bg-slate-600 text-white gap-1">
                      <Lock className="h-3 w-3" /> system
                    </Badge>
                  )}
                </div>
                {!role.is_system && (
                  <Button size="sm" variant="outline" onClick={() => onDelete(role.id)} disabled={isPending} className="gap-1 border-slate-600 bg-slate-700/50 text-white hover:bg-red-600">
                    <Trash2 className="h-4 w-4" /> Delete
                  </Button>
                )}
              </div>
              {role.description && <p className="mt-1 text-sm text-slate-400">{role.description}</p>}

              {isSuper ? (
                <p className="mt-3 text-sm text-emerald-400">Super Admin always has every permission.</p>
              ) : (
                <div className="mt-4 space-y-4">
                  {categories.map((cat) => (
                    <div key={cat}>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{cat}</p>
                      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        {permissions.filter((p) => (p.category ?? 'general') === cat).map((p) => (
                          <label key={p.key} className="flex items-center gap-2 rounded-md bg-slate-700/40 px-3 py-2 text-sm text-slate-200">
                            <input
                              type="checkbox"
                              checked={enabled.has(p.key)}
                              disabled={isPending}
                              onChange={(e) => onToggle(role.id, p.key, e.target.checked)}
                              className="h-4 w-4 accent-emerald-500"
                            />
                            {p.label}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
