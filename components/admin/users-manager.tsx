'use client'

import { useState, useTransition } from 'react'
import { Check, X, Trash2, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { setUserStatus, assignRole, removeUserRole } from '@/app/admin/users/actions'
import { usePagination, PaginationBar, TableToolbar, downloadPdf, type CsvColumn } from '@/components/admin/table-tools'

interface RoleRef { id: string; key: string; name: string }
interface NamedRef { id: string; name: string }
interface UserRole { id: string; role: RoleRef | null; team: NamedRef | null; season: NamedRef | null }
interface UserRow {
  id: string
  email: string | null
  full_name: string | null
  phone: string | null
  status: string
  user_roles: UserRole[]
}

interface Props {
  users: UserRow[]
  roles: RoleRef[]
  teams: NamedRef[]
  seasons: NamedRef[]
  canManage: boolean
}

const statusBadge: Record<string, string> = {
  approved: 'bg-emerald-500/20 text-emerald-400',
  pending: 'bg-amber-500/20 text-amber-400',
  suspended: 'bg-red-500/20 text-red-400',
}

const csvColumns: CsvColumn<UserRow>[] = [
  { label: 'Name', value: (u) => u.full_name },
  { label: 'Email', value: (u) => u.email },
  { label: 'Phone', value: (u) => u.phone },
  { label: 'Status', value: (u) => u.status },
  { label: 'Roles', value: (u) => u.user_roles.map((ur) => ur.role?.name).filter(Boolean).join('; ') },
]

export function UsersManager({ users, roles, teams, seasons, canManage }: Props) {
  const [isPending, startTransition] = useTransition()
  const { page, setPage, totalPages, pageItems, total } = usePagination(users, 10)
  const [picks, setPicks] = useState<Record<string, { roleId: string; teamId: string; seasonId: string }>>({})

  const pickFor = (userId: string) =>
    picks[userId] ?? { roleId: roles[0]?.id ?? '', teamId: '', seasonId: seasons[0]?.id ?? '' }

  const update = (userId: string, patch: Partial<{ roleId: string; teamId: string; seasonId: string }>) =>
    setPicks((p) => ({ ...p, [userId]: { ...pickFor(userId), ...patch } }))

  const onStatus = (userId: string, status: string) =>
    startTransition(async () => {
      await setUserStatus(userId, status)
      toast.success(`User ${status}`)
    })

  const onAssign = (userId: string) => {
    const pick = pickFor(userId)
    if (!pick.roleId) return
    const fd = new FormData()
    fd.set('userId', userId)
    fd.set('roleId', pick.roleId)
    if (pick.teamId) fd.set('teamId', pick.teamId)
    if (pick.seasonId) fd.set('seasonId', pick.seasonId)
    startTransition(async () => {
      await assignRole(fd)
      toast.success('Role assigned')
    })
  }

  const onRemoveRole = (userRoleId: string) =>
    startTransition(async () => {
      await removeUserRole(userRoleId)
      toast.success('Role removed')
    })

  if (users.length === 0) {
    return (
      <Card className="border-slate-700 bg-slate-800/50">
        <CardContent className="flex h-40 items-center justify-center text-slate-400">
          No users yet. Captains who register will appear here.
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <TableToolbar total={total} onExport={() => downloadPdf('Users', csvColumns, users)} />
      {pageItems.map((u) => {
        const pick = pickFor(u.id)
        const selectedRole = roles.find((r) => r.id === pick.roleId)
        return (
          <Card key={u.id} className="border-slate-700 bg-slate-800/50">
            <CardContent className="p-4 sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-bold text-white">{u.full_name || '(no name)'}</p>
                  <p className="text-sm text-slate-400">{u.email}</p>
                  {u.phone && <p className="text-sm text-slate-500">{u.phone}</p>}
                </div>
                <Badge className={statusBadge[u.status] ?? 'bg-slate-600 text-white'}>
                  {u.status === 'pending' && <Clock className="mr-1 h-3 w-3" />}
                  {u.status}
                </Badge>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {u.user_roles.length === 0 && <span className="text-sm text-slate-500">No roles assigned</span>}
                {u.user_roles.map((ur) => (
                  <span
                    key={ur.id}
                    className="inline-flex items-center gap-1 rounded-full bg-slate-700 px-3 py-1 text-xs text-white"
                  >
                    {ur.role?.name ?? 'role'}
                    {ur.team ? ` · ${ur.team.name}` : ''}
                    {ur.season ? ` · ${ur.season.name}` : ''}
                    {canManage && (
                      <button onClick={() => onRemoveRole(ur.id)} disabled={isPending} className="ml-1 text-slate-400 hover:text-red-400">
                        <Trash2 className="h-3 w-3" />
                      </button>
                    )}
                  </span>
                ))}
              </div>

              {canManage && (
              <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-700 pt-4">
                {u.status !== 'approved' && (
                  <Button size="sm" onClick={() => onStatus(u.id, 'approved')} disabled={isPending} className="gap-1 bg-emerald-600 hover:bg-emerald-700 text-white">
                    <Check className="h-4 w-4" /> Approve
                  </Button>
                )}
                {u.status !== 'suspended' && (
                  <Button size="sm" variant="outline" onClick={() => onStatus(u.id, 'suspended')} disabled={isPending} className="gap-1 border-slate-600 bg-slate-700/50 text-white hover:bg-slate-700">
                    <X className="h-4 w-4" /> Suspend
                  </Button>
                )}

                <select
                  value={pick.roleId}
                  onChange={(e) => update(u.id, { roleId: e.target.value })}
                  className="h-9 rounded-md border border-slate-600 bg-slate-700/50 px-2 text-sm text-white"
                >
                  {roles.map((r) => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>

                {selectedRole?.key === 'captain' && (
                  <>
                    <select
                      value={pick.teamId}
                      onChange={(e) => update(u.id, { teamId: e.target.value })}
                      className="h-9 rounded-md border border-slate-600 bg-slate-700/50 px-2 text-sm text-white"
                    >
                      <option value="">No team yet</option>
                      {teams.map((t) => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                    <select
                      value={pick.seasonId}
                      onChange={(e) => update(u.id, { seasonId: e.target.value })}
                      className="h-9 rounded-md border border-slate-600 bg-slate-700/50 px-2 text-sm text-white"
                    >
                      {seasons.map((s) => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </>
                )}

                <Button size="sm" onClick={() => onAssign(u.id)} disabled={isPending} className="bg-slate-200 text-slate-900 hover:bg-white">
                  Assign role
                </Button>
              </div>
              )}
            </CardContent>
          </Card>
        )
      })}
      <PaginationBar page={page} totalPages={totalPages} onPage={setPage} />
    </div>
  )
}
