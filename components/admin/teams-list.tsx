"use client"

import type { Team } from "@/lib/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trash2, Mail, Phone, User, Shield, Eye } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { usePagination, PaginationBar, TableToolbar, downloadPdf, type CsvColumn } from "@/components/admin/table-tools"

const csvColumns: CsvColumn<Team>[] = [
  { label: "Name", value: (t) => t.name },
  { label: "Representative", value: (t) => t.representative_name },
  { label: "Email", value: (t) => t.contact_email },
  { label: "Phone", value: (t) => t.contact_phone },
  { label: "Active", value: (t) => (t.is_active ? "Yes" : "No") },
]

export function TeamsList({ teams, canManage = true }: { teams: Team[]; canManage?: boolean }) {
  const router = useRouter()
  const [deleting, setDeleting] = useState<string | null>(null)
  const { page, setPage, totalPages, pageItems, total } = usePagination(teams, 10)

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team?")) return

    setDeleting(id)
    const supabase = createClient()
    const { error } = await supabase.from("teams").delete().eq("id", id)

    if (error) {
      alert("Error deleting team: " + error.message)
    } else {
      router.refresh()
    }
    setDeleting(null)
  }

  if (teams.length === 0) {
    return <p className="py-8 text-center text-slate-400">No teams registered yet</p>
  }

  return (
    <div>
      <TableToolbar total={total} onExport={() => downloadPdf("Teams", csvColumns, teams)} />
      <div className="rounded-lg border border-slate-700 bg-slate-900/50">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-700 hover:bg-slate-800/50">
            <TableHead className="text-slate-300">Team Name</TableHead>
            <TableHead className="text-slate-300">Representative</TableHead>
            <TableHead className="text-slate-300">Contact</TableHead>
            <TableHead className="text-slate-300">Status</TableHead>
            <TableHead className="text-right text-slate-300">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pageItems.map((team) => (
            <TableRow key={team.id} className="border-slate-700 hover:bg-slate-800/50">
              <TableCell className="font-semibold text-white">
                <div className="flex items-center gap-3">
                  {team.logo_url ? (
                    <img
                      src={team.logo_url}
                      alt={team.name}
                      className="h-9 w-9 rounded-md object-cover"
                    />
                  ) : (
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-800 text-slate-500">
                      <Shield className="h-4 w-4" />
                    </div>
                  )}
                  <span>{team.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-slate-300">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-slate-500" />
                  {team.representative_name || "-"}
                </div>
              </TableCell>
              <TableCell className="text-slate-300">
                <div className="flex flex-col gap-1">
                  {team.contact_email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-3 w-3 text-slate-500" />
                      <span className="text-sm">{team.contact_email}</span>
                    </div>
                  )}
                  {team.contact_phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3 text-slate-500" />
                      <span className="text-sm">{team.contact_phone}</span>
                    </div>
                  )}
                  {!team.contact_email && !team.contact_phone && "-"}
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={team.is_active ? "default" : "secondary"}
                  className={team.is_active ? "bg-emerald-500 hover:bg-emerald-600" : ""}
                >
                  {team.is_active ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Link href={`/admin/teams/${team.id}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  {canManage && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(team.id)}
                      disabled={deleting === team.id}
                      className="text-red-400 hover:bg-red-500/20 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
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
