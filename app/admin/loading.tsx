import { Skeleton } from '@/components/ui/skeleton'

export default function AdminLoading() {
  return (
    <div className="p-4 sm:p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-lg bg-slate-800" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-48 bg-slate-800" />
            <Skeleton className="h-3 w-32 bg-slate-800" />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl bg-slate-800" />
          ))}
        </div>
        <Skeleton className="h-64 w-full rounded-xl bg-slate-800" />
      </div>
    </div>
  )
}
