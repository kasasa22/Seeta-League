'use client'

import { useTransition } from 'react'
import { Trash2, TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { addFinanceRecord, deleteFinanceRecord } from '@/app/admin/finance/actions'

interface NamedRef { id: string; name: string }
interface Record {
  id: string
  type: string
  category: string | null
  amount: number
  description: string | null
  occurred_on: string
  team: NamedRef | null
}
interface Props {
  canManage: boolean
  registrationFee: number | null
  teams: NamedRef[]
  records: Record[]
}

const ugx = (n: number) => 'UGX ' + new Intl.NumberFormat('en-US').format(n)

export function FinanceManager({ canManage, registrationFee, teams, records }: Props) {
  const [isPending, startTransition] = useTransition()

  const payments = records.filter((r) => r.type === 'payment')
  const expenses = records.filter((r) => r.type === 'expense')
  const totalPaid = payments.reduce((s, r) => s + Number(r.amount), 0)
  const totalExpenses = expenses.reduce((s, r) => s + Number(r.amount), 0)

  const paidByTeam = (teamId: string) =>
    payments.filter((r) => r.team?.id === teamId).reduce((s, r) => s + Number(r.amount), 0)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    startTransition(async () => {
      const res = await addFinanceRecord(fd)
      if (res?.ok) {
        toast.success('Record added')
        form.reset()
      } else {
        toast.error(res?.message ?? 'Failed')
      }
    })
  }

  const onDelete = (id: string) =>
    startTransition(async () => {
      const res = await deleteFinanceRecord(id)
      if (res?.ok) toast.success('Deleted')
    })

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-slate-700 bg-slate-800/50">
          <CardContent className="p-4">
            <p className="text-xs text-slate-400">Total Collected</p>
            <p className="text-2xl font-black text-emerald-400">{ugx(totalPaid)}</p>
          </CardContent>
        </Card>
        <Card className="border-slate-700 bg-slate-800/50">
          <CardContent className="p-4">
            <p className="text-xs text-slate-400">Total Expenses</p>
            <p className="text-2xl font-black text-red-400">{ugx(totalExpenses)}</p>
          </CardContent>
        </Card>
        <Card className="border-slate-700 bg-slate-800/50">
          <CardContent className="p-4">
            <p className="text-xs text-slate-400">Net Balance</p>
            <p className="text-2xl font-black text-white">{ugx(totalPaid - totalExpenses)}</p>
          </CardContent>
        </Card>
      </div>

      {registrationFee && teams.length > 0 && (
        <Card className="border-slate-700 bg-slate-800/50">
          <CardContent className="p-5">
            <h2 className="mb-3 font-bold text-white">Team Registration Balances</h2>
            <p className="mb-3 text-xs text-slate-400">Fee per team: {ugx(Number(registrationFee))}</p>
            <div className="space-y-2">
              {teams.map((t) => {
                const paid = paidByTeam(t.id)
                const balance = Number(registrationFee) - paid
                return (
                  <div key={t.id} className="flex items-center justify-between rounded-md bg-slate-700/40 px-3 py-2 text-sm">
                    <span className="font-semibold text-white">{t.name}</span>
                    <span className="flex items-center gap-3">
                      <span className="text-emerald-400">{ugx(paid)} paid</span>
                      <Badge className={balance <= 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}>
                        {balance <= 0 ? 'Cleared' : ugx(balance) + ' due'}
                      </Badge>
                    </span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {canManage && (
        <Card className="border-slate-700 bg-slate-800/50">
          <CardContent className="p-5">
            <h2 className="mb-4 font-bold text-white">Record a transaction</h2>
            <form onSubmit={onSubmit} className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <Label className="text-white text-xs">Type</Label>
                <select name="type" className="h-9 w-full rounded-md border border-slate-600 bg-slate-700/50 px-2 text-sm text-white">
                  <option value="payment">Payment (in)</option>
                  <option value="expense">Expense (out)</option>
                </select>
              </div>
              <div className="space-y-1">
                <Label className="text-white text-xs">Amount (UGX)</Label>
                <Input name="amount" type="number" step="any" required className="border-slate-600 bg-slate-700/50 text-white" />
              </div>
              <div className="space-y-1">
                <Label className="text-white text-xs">Category</Label>
                <Input name="category" placeholder="registration_fee, pitch, referees..." className="border-slate-600 bg-slate-700/50 text-white" />
              </div>
              <div className="space-y-1">
                <Label className="text-white text-xs">Team (optional)</Label>
                <select name="team_id" className="h-9 w-full rounded-md border border-slate-600 bg-slate-700/50 px-2 text-sm text-white">
                  <option value="">None</option>
                  {teams.map((t) => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <Label className="text-white text-xs">Date</Label>
                <Input name="occurred_on" type="date" className="border-slate-600 bg-slate-700/50 text-white" />
              </div>
              <div className="space-y-1">
                <Label className="text-white text-xs">Description</Label>
                <Input name="description" className="border-slate-600 bg-slate-700/50 text-white" />
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" disabled={isPending} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  {isPending ? 'Saving...' : 'Add Record'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card className="border-slate-700 bg-slate-800/50">
        <CardContent className="p-5">
          <h2 className="mb-4 font-bold text-white">Transactions</h2>
          {records.length === 0 ? (
            <p className="text-slate-400 text-sm">No transactions recorded yet.</p>
          ) : (
            <div className="space-y-2">
              {records.map((r) => (
                <div key={r.id} className="flex items-center justify-between rounded-md bg-slate-700/40 px-3 py-2">
                  <div className="flex items-center gap-3">
                    {r.type === 'payment' ? (
                      <TrendingUp className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-400" />
                    )}
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {ugx(Number(r.amount))}
                        {r.team ? ` · ${r.team.name}` : ''}
                      </p>
                      <p className="text-xs text-slate-400">
                        {r.occurred_on}{r.category ? ` · ${r.category}` : ''}{r.description ? ` · ${r.description}` : ''}
                      </p>
                    </div>
                  </div>
                  {canManage && (
                    <button onClick={() => onDelete(r.id)} disabled={isPending} className="text-slate-400 hover:text-red-400">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
