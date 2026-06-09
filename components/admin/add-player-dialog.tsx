"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import type { Team, Player } from "@/lib/types"
import { Upload, UserCircle } from "lucide-react"
import { toast } from "sonner"

interface AddPlayerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  teams: Team[]
  editingPlayer?: Player | null
}

export function AddPlayerDialog({ open, onOpenChange, teams, editingPlayer }: AddPlayerDialogProps) {
  const [name, setName] = useState("")
  const [teamId, setTeamId] = useState("")
  const [jerseyNumber, setJerseyNumber] = useState("")
  const [position, setPosition] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [photoUrl, setPhotoUrl] = useState("")
  const [uploading, setUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const onPhoto = async (file?: File) => {
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append("file", file)
      const res = await fetch("/api/uploads", { method: "POST", body: fd })
      const j = await res.json()
      if (j.ok && j.url) {
        setPhotoUrl(j.url)
        toast.success("Photo uploaded")
      } else {
        toast.error(j.message || "Upload failed")
      }
    } catch (e: any) {
      toast.error(e?.message || "Upload failed")
    }
    setUploading(false)
  }

  useEffect(() => {
    if (editingPlayer) {
      setName(editingPlayer.name)
      setTeamId(editingPlayer.team_id)
      setJerseyNumber(editingPlayer.jersey_number?.toString() || "")
      setPosition(editingPlayer.position || "")
      setDateOfBirth(editingPlayer.date_of_birth || "")
      setContactPhone(editingPlayer.contact_phone || "")
      setContactEmail(editingPlayer.contact_email || "")
      setPhotoUrl((editingPlayer as any).photo_url || "")
    } else {
      resetForm()
    }
  }, [editingPlayer, open])

  const resetForm = () => {
    setName("")
    setTeamId("")
    setJerseyNumber("")
    setPosition("")
    setDateOfBirth("")
    setContactPhone("")
    setContactEmail("")
    setPhotoUrl("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const playerData = {
      name,
      team_id: teamId,
      jersey_number: jerseyNumber ? Number.parseInt(jerseyNumber) : null,
      position: position || null,
      date_of_birth: dateOfBirth || null,
      contact_phone: contactPhone || null,
      contact_email: contactEmail || null,
      photo_url: photoUrl || null,
    }

    let error

    if (editingPlayer) {
      const result = await supabase.from("players").update(playerData).eq("id", editingPlayer.id)
      error = result.error
    } else {
      const result = await supabase.from("players").insert([playerData])
      error = result.error
    }

    if (error) {
      alert("Error saving player: " + error.message)
    } else {
      resetForm()
      onOpenChange(false)
      router.refresh()
    }

    setIsSubmitting(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-slate-700 bg-slate-900 text-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{editingPlayer ? "Edit Player" : "Add New Player"}</DialogTitle>
          <DialogDescription className="text-slate-400">
            {editingPlayer ? "Update player information" : "Enter player details to register them"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Profile Photo</Label>
            <div className="flex items-center gap-3">
              {photoUrl ? (
                <img src={photoUrl} alt="player" className="h-16 w-16 rounded-full object-cover" />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-800 text-slate-500">
                  <UserCircle className="h-8 w-8" />
                </div>
              )}
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white hover:bg-slate-700">
                <Upload className="h-4 w-4" />
                {uploading ? "Uploading..." : photoUrl ? "Change photo" : "Upload photo"}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => onPhoto(e.target.files?.[0])} />
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Player Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter player name"
              required
              className="border-slate-700 bg-slate-800 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="team">Team *</Label>
            <Select value={teamId} onValueChange={setTeamId} required>
              <SelectTrigger className="border-slate-700 bg-slate-800 text-white">
                <SelectValue placeholder="Select a team" />
              </SelectTrigger>
              <SelectContent className="border-slate-700 bg-slate-800 text-white">
                {teams.map((team) => (
                  <SelectItem key={team.id} value={team.id}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jersey">Jersey Number</Label>
              <Input
                id="jersey"
                type="number"
                value={jerseyNumber}
                onChange={(e) => setJerseyNumber(e.target.value)}
                placeholder="e.g., 10"
                className="border-slate-700 bg-slate-800 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Select value={position} onValueChange={setPosition}>
                <SelectTrigger className="border-slate-700 bg-slate-800 text-white">
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent className="border-slate-700 bg-slate-800 text-white">
                  <SelectItem value="Goalkeeper">Goalkeeper</SelectItem>
                  <SelectItem value="Defender">Defender</SelectItem>
                  <SelectItem value="Midfielder">Midfielder</SelectItem>
                  <SelectItem value="Forward">Forward</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              id="dob"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="border-slate-700 bg-slate-800 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Contact Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="Enter phone number"
              className="border-slate-700 bg-slate-800 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Contact Email</Label>
            <Input
              id="email"
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="Enter email address"
              className="border-slate-700 bg-slate-800 text-white"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || uploading} className="bg-cyan-600 hover:bg-cyan-700">
              {isSubmitting ? "Saving..." : editingPlayer ? "Update Player" : "Add Player"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
