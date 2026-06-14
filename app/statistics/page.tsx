import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, BarChart3 } from "lucide-react"

import { getSelectedSeason } from "@/lib/seasons"
import { getStatsCentreData } from "@/lib/stats"
import { Button } from "@/components/ui/button"
import { StatsCentre } from "@/components/stats/stats-centre"

export const metadata: Metadata = {
  title: "Stats Centre",
  description:
    "Seeta League Stats Centre — top scorers, assist leaders, clean sheets, best attacks and defences, and goals-per-matchday trends across the season.",
  alternates: { canonical: "/statistics" },
}

export default async function StatisticsPage({
  searchParams,
}: {
  searchParams: Promise<{ md?: string }>
}) {
  const season = await getSelectedSeason()
  const sp = await searchParams
  const matchDay = sp?.md ? Number.parseInt(sp.md, 10) : null
  const data = await getStatsCentreData(season?.id ?? null, Number.isNaN(matchDay as number) ? null : matchDay)

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <div className="relative h-[230px] sm:h-[280px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-emerald-900" />
        <div className="relative z-10 flex h-full flex-col justify-end px-4 sm:px-6 pb-6 sm:pb-8 text-white">
          <div className="mx-auto w-full max-w-7xl">
            <Link href="/">
              <Button variant="ghost" size="sm" className="mb-3 sm:mb-4 text-white hover:bg-white/20">
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span className="text-sm sm:text-base">Back to Home</span>
              </Button>
            </Link>
            <div className="flex items-center gap-2 sm:gap-3">
              <BarChart3 className="h-8 w-8 sm:h-10 sm:w-10 text-accent" />
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">Stats Centre</h1>
                <p className="mt-1 text-sm sm:text-base md:text-lg text-white/90">
                  Player & club statistics — {season?.name ?? "Season"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
        <StatsCentre data={data} seasonName={season?.name ?? "this season"} />
      </div>
    </div>
  )
}
