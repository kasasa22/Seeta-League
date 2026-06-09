"use client"

import type { Match } from "@/lib/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trash2, Calendar, Trophy } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { EditMatchDialog } from "@/components/admin/edit-match-dialog"
import { usePagination, PaginationBar, TableToolbar, downloadPdf, type CsvColumn } from "@/components/admin/table-tools"

const csvColumns: CsvColumn<Match>[] = [
  { label: "Match Day", value: (m) => m.match_day },
  { label: "Home Team", value: (m) => m.home_team?.name ?? "" },
  { label: "Away Team", value: (m) => m.away_team?.name ?? "" },
  { label: "Date", value: (m) => m.match_date },
  { label: "Home Score", value: (m) => m.home_score },
  { label: "Away Score", value: (m) => m.away_score },
  { label: "Status", value: (m) => (m.is_completed ? "Completed" : "Scheduled") },
]

export function MatchesList({ matches, canManage = true }: { matches: Match[]; canManage?: boolean }) {
  const router = useRouter()
  const [deleting, setDeleting] = useState<string | null>(null)
  const { page, setPage, totalPages, pageItems, total } = usePagination(matches, 10)

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this match?")) return

    setDeleting(id)
    const supabase = createClient()
    const { error } = await supabase.from("matches").delete().eq("id", id)

    if (error) {
      alert("Error deleting match: " + error.message)
    } else {
      router.refresh()
    }
    setDeleting(null)
  }

  if (matches.length === 0) {
    return <p className="py-8 text-center text-slate-400">No matches scheduled yet</p>
  }

  return (
    <div>
      <TableToolbar total={total} onExport={() => downloadPdf("Matches", csvColumns, matches)} />
      <div className="rounded-lg border border-slate-700 bg-slate-900/50">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-700 hover:bg-slate-800/50">
            <TableHead className="text-slate-300">Match Day</TableHead>
            <TableHead className="text-slate-300">Home Team</TableHead>
            <TableHead className="text-slate-300">Away Team</TableHead>
            <TableHead className="text-slate-300">Date</TableHead>
            <TableHead className="text-slate-300">Score</TableHead>
            <TableHead className="text-slate-300">Status</TableHead>
            <TableHead className="text-right text-slate-300">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pageItems.map((match) => (
            <TableRow key={match.id} className="border-slate-700 hover:bg-slate-800/50">
              <TableCell className="text-slate-300">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-slate-500" />
                  <span className="font-semibold">MD {match.match_day}</span>
                </div>
              </TableCell>
              <TableCell className="font-semibold text-white">{match.home_team?.name}</TableCell>
              <TableCell className="font-semibold text-white">{match.away_team?.name}</TableCell>
              <TableCell className="text-slate-300">{new Date(match.match_date).toLocaleDateString()}</TableCell>
              <TableCell className="text-slate-300">
                {match.is_completed ? (
                  <span className="font-semibold text-white">
                    {match.home_score} - {match.away_score}
                  </span>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell>
                <Badge
                  variant={match.is_completed ? "default" : "secondary"}
                  className={match.is_completed ? "bg-emerald-500 hover:bg-emerald-600" : ""}
                >
                  {match.is_completed ? (
                    <span className="flex items-center gap-1">
                      <Trophy className="h-3 w-3" />
                      Completed
                    </span>
                  ) : (
                    "Scheduled"
                  )}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                {canManage ? (
                  <div className="flex items-center justify-end gap-2">
                    {match.is_completed && <EditMatchDialog match={match} />}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(match.id)}
                      disabled={deleting === match.id}
                      className="text-red-400 hover:bg-red-500/20 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <span className="text-slate-600">—</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
      <PaginationBar page={page} totalPages={totalPages} onPage={setPage} />
    </div>
  )
}
