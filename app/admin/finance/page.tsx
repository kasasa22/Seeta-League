import Link from 'next/link'
import { Wallet } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { requireAnyPermission, userHasPermission } from '@/lib/rbac'
import { getSelectedSeason } from '@/lib/seasons'
import { FinanceManager } from '@/components/finance/finance-manager'

export default async function FinancePage() {
  const user = await requireAnyPermission(['view_finance', 'manage_finance', 'view_all'])
  const canManage = userHasPermission(user, 'manage_finance')
  const supabase = await createClient()

  const season = await getSelectedSeason()

  const { data: teams } = season
    ? await supabase.from('teams').select('id, name').eq('season_id', season.id).order('name')
    : { data: [] as { id: string; name: string }[] }

  const { data: records } = season
    ? await supabase
        .from('finance_records')
        .select('id, type, category, amount, description, occurred_on, team:teams(id, name)')
        .eq('season_id', season.id)
        .order('occurred_on', { ascending: false })
    : { data: [] as any[] }

  return (
    <div className="p-4 sm:p-6">
      <div className="">
        <div className="flex items-center gap-3 mb-8">
          <div className="rounded-lg bg-emerald-500 p-2">
            <Wallet className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Finance</h1>
            <p className="text-slate-400 text-sm">{season ? season.name : 'No active season'}</p>
          </div>
        </div>

        <FinanceManager
          canManage={canManage}
          registrationFee={season?.registration_fee ?? null}
          teams={teams ?? []}
          records={(records as any) ?? []}
        />
      </div>
    </div>
  )
}
