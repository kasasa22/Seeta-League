import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Goal, Handshake, Star, Award, ClipboardList, Shield, ShieldCheck } from "lucide-react"
import type { PlayerDetail } from "@/lib/details"

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}

export function PlayerProfile({ detail, backHref, backLabel }: { detail: PlayerDetail; backHref: string; backLabel: string }) {
  const { player, team, goals, assists, motm, outstanding, appearances, cleanSheets } = detail

  const isDefensive = ["goalkeeper", "defender"].includes((player.position ?? "").toLowerCase())

  const stats = [
    { label: "Goals", value: goals, icon: Goal, tint: "text-emerald-500" },
    { label: "Assists", value: assists, icon: Handshake, tint: "text-blue-500" },
    ...(isDefensive ? [{ label: "Clean Sheets", value: cleanSheets, icon: ShieldCheck, tint: "text-cyan-500" }] : []),
    { label: "Man of the Match", value: motm, icon: Star, tint: "text-amber-500" },
    { label: "Outstanding (Match Day)", value: outstanding, icon: Award, tint: "text-fuchsia-500" },
    { label: "Matches Involved", value: appearances, icon: ClipboardList, tint: "text-slate-400" },
    { label: "Goal Contributions", value: goals + assists, icon: Goal, tint: "text-emerald-400" },
  ]

  return (
    <div>
      <div className="relative h-[200px] sm:h-[240px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900" />
        <div className="relative z-10 flex h-full flex-col justify-end px-4 sm:px-6 pb-6 sm:pb-8 text-white">
          <div className="mx-auto w-full max-w-5xl">
            <Link href={backHref} className="mb-2 inline-flex items-center gap-1 text-sm text-white/80 hover:text-accent">
              <ArrowLeft className="h-4 w-4" /> {backLabel}
            </Link>
            <div className="flex items-center gap-4">
              {player.photo_url ? (
                <img src={player.photo_url} alt={player.name} className="h-20 w-20 rounded-full border-2 border-white/30 object-cover" />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 text-2xl font-black">
                  {player.name?.charAt(0) ?? "?"}
                </div>
              )}
              <div>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight">{player.name}</h1>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-white/90">
                  {player.jersey_number != null && <Badge className="bg-accent text-accent-foreground">#{player.jersey_number}</Badge>}
                  {player.position && <span className="uppercase tracking-wide">{player.position}</span>}
                  {team && (
                    <span className="inline-flex items-center gap-1">
                      <Shield className="h-4 w-4" /> {team.name}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
        <section className="grid gap-4 grid-cols-2 sm:grid-cols-3">
          {stats.map((s) => (
            <Card key={s.label}>
              <CardContent className="p-4 sm:p-6">
                <s.icon className={`mb-2 h-5 w-5 ${s.tint}`} />
                <p className="text-3xl sm:text-4xl font-black">{s.value}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <h2 className="mb-4 text-lg font-bold">Player Details</h2>
            <div className="grid gap-3 sm:grid-cols-2 text-sm">
              <Detail label="Team" value={team?.name ?? "-"} />
              <Detail label="Position" value={player.position ?? "-"} />
              <Detail label="Jersey Number" value={player.jersey_number != null ? `#${player.jersey_number}` : "-"} />
              <Detail label="Date of Birth" value={player.date_of_birth ?? "-"} />
              <Detail label="Phone" value={player.contact_phone ?? "-"} />
              <Detail label="Email" value={player.contact_email ?? "-"} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
