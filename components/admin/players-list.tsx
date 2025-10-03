"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2, UserCircle } from "lucide-react"
import type { Player, Team } from "@/lib/types"
import { AddPlayerDialog } from "./add-player-dialog"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface PlayersListProps {
  players: (Player & { team?: { name: string } })[]
  teams: Team[]
}

export function PlayersListComponent({ players, teams }: PlayersListProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this player?")) return

    const { error } = await supabase.from("players").delete().eq("id", id)

    if (error) {
      alert("Error deleting player: " + error.message)
    } else {
      router.refresh()
    }
  }

  const handleEdit = (player: Player) => {
    setEditingPlayer(player)
    setIsAddDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false)
    setEditingPlayer(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2 bg-cyan-600 hover:bg-cyan-700">
          <Plus className="h-4 w-4" />
          Add Player
        </Button>
      </div>

      {players.length === 0 ? (
        <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-12 text-center">
          <UserCircle className="mx-auto h-12 w-12 text-slate-600" />
          <h3 className="mt-4 text-lg font-semibold text-white">No players yet</h3>
          <p className="mt-2 text-slate-400">Get started by adding your first player.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-700">
          <table className="w-full">
            <thead className="bg-slate-900/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Team</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Jersey #</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Position</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Contact</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {players.map((player) => (
                <tr key={player.id} className="hover:bg-slate-900/30">
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{player.name}</div>
                    {player.date_of_birth && (
                      <div className="text-sm text-slate-400">
                        DOB: {new Date(player.date_of_birth).toLocaleDateString()}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-sm font-medium text-cyan-300">
                      {player.team?.name || "Unknown"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-300">
                    {player.jersey_number ? `#${player.jersey_number}` : "-"}
                  </td>
                  <td className="px-6 py-4 text-slate-300">{player.position || "-"}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-300">{player.contact_phone || "-"}</div>
                    <div className="text-sm text-slate-400">{player.contact_email || "-"}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(player)}
                        className="text-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-300"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(player.id)}
                        className="text-red-400 hover:bg-red-500/20 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AddPlayerDialog
        open={isAddDialogOpen}
        onOpenChange={handleCloseDialog}
        teams={teams}
        editingPlayer={editingPlayer}
      />
    </div>
  )
}
