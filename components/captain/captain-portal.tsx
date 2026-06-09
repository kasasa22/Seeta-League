'use client'

import { useState, useTransition } from 'react'
import Image from 'next/image'
import { Upload, Trash2, UserPlus, Users, CalendarClock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { registerTeam, registerPlayer, removePlayer } from '@/app/admin/team/actions'

interface SeasonRef {
  id: string
  name: string
  registration_deadline: string | null
  kickoff_date?: string | null
  venue?: string | null
}
interface TeamRow {
  id: string
  name: string
  representative_name: string | null
  contact_phone: string | null
  contact_email: string | null
  logo_url: string | null
}
interface PlayerRow {
  id: string
  name: string
  jersey_number: number | null
  position: string | null
  photo_url: string | null
}

interface Props {
  season: SeasonRef
  team: TeamRow | null
  players: PlayerRow[]
  deadlinePassed: boolean
}

async function uploadFile(file: File): Promise<{ ok: boolean; url?: string; message?: string }> {
  try {
    const fd = new FormData()
    fd.set('file', file)
    const res = await fetch('/api/uploads', { method: 'POST', body: fd })
    return await res.json()
  } catch (e: any) {
    return { ok: false, message: e?.message || 'Network error' }
  }
}

export function CaptainPortal({ season, team, players, deadlinePassed }: Props) {
  if (!team) return <TeamForm />

  return (
    <div className="space-y-6">
      <Card className="border-slate-700 bg-slate-800/50">
        <CardContent className="p-5 flex items-center gap-4">
          {team.logo_url ? (
            <Image src={team.logo_url} alt={team.name} width={64} height={64} className="h-16 w-16 rounded-lg object-cover" />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-slate-700 text-slate-400">
              <Users className="h-7 w-7" />
            </div>
          )}
          <div>
            <h2 className="text-xl font-black text-white">{team.name}</h2>
            <p className="text-sm text-slate-400">{players.length} players registered</p>
          </div>
        </CardContent>
      </Card>

      {deadlinePassed ? (
        <Card className="border-amber-700/50 bg-amber-900/20">
          <CardContent className="p-4 flex items-center gap-2 text-amber-300">
            <CalendarClock className="h-5 w-5" />
            Player registration closed for {season.name}.
          </CardContent>
        </Card>
      ) : (
        <PlayerForm teamId={team.id} />
      )}

      <Roster players={players} teamId={team.id} canEdit={!deadlinePassed} />
    </div>
  )
}

function TeamForm() {
  const [isPending, startTransition] = useTransition()
  const [logoUrl, setLogoUrl] = useState('')
  const [uploading, setUploading] = useState(false)

  const onLogo = async (file: File | undefined) => {
    if (!file) return
    setUploading(true)
    const res = await uploadFile(file)
    setUploading(false)
    if (res.ok && res.url) {
      setLogoUrl(res.url)
      toast.success('Logo uploaded')
    } else {
      toast.error(res.message || 'Logo upload failed')
    }
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    fd.set('logo_url', logoUrl)
    startTransition(async () => {
      const res = await registerTeam(fd)
      if (res?.ok) toast.success('Team registered')
      else toast.error(res?.message ?? 'Failed')
    })
  }

  return (
    <Card className="border-slate-700 bg-slate-800/50">
      <CardContent className="p-5">
        <h2 className="mb-4 font-bold text-white">Register your team</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">Team Name *</Label>
            <Input id="name" name="name" required className="border-slate-600 bg-slate-700/50 text-white" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contact_phone" className="text-white">Contact Phone</Label>
              <Input id="contact_phone" name="contact_phone" className="border-slate-600 bg-slate-700/50 text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact_email" className="text-white">Contact Email</Label>
              <Input id="contact_email" name="contact_email" type="email" className="border-slate-600 bg-slate-700/50 text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-white">Team Logo</Label>
            <div className="flex items-center gap-3">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-slate-600 bg-slate-700/50 px-3 py-2 text-sm text-white hover:bg-slate-700">
                <Upload className="h-4 w-4" />
                {uploading ? 'Uploading...' : 'Choose logo'}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => onLogo(e.target.files?.[0])} />
              </label>
              {logoUrl && <img src={logoUrl} alt="logo" className="h-12 w-12 rounded object-cover" />}
            </div>
          </div>
          <Button type="submit" disabled={isPending || uploading} className="bg-emerald-600 hover:bg-emerald-700 text-white">
            {isPending ? 'Registering...' : 'Register Team'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

function PlayerForm({ teamId }: { teamId: string }) {
  const [isPending, startTransition] = useTransition()
  const [photoUrl, setPhotoUrl] = useState('')
  const [uploading, setUploading] = useState(false)

  const onPhoto = async (file: File | undefined) => {
    if (!file) return
    setUploading(true)
    const res = await uploadFile(file)
    setUploading(false)
    if (res.ok && res.url) {
      setPhotoUrl(res.url)
      toast.success('Photo uploaded')
    } else {
      toast.error(res.message || 'Photo upload failed')
    }
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!photoUrl) {
      toast.error('A passport-size photo is required')
      return
    }
    const form = e.currentTarget
    const fd = new FormData(form)
    fd.set('team_id', teamId)
    fd.set('photo_url', photoUrl)
    startTransition(async () => {
      const res = await registerPlayer(fd)
      if (res?.ok) {
        toast.success('Player registered')
        form.reset()
        setPhotoUrl('')
      } else {
        toast.error(res?.message ?? 'Failed')
      }
    })
  }

  return (
    <Card className="border-slate-700 bg-slate-800/50">
      <CardContent className="p-5">
        <h2 className="mb-4 flex items-center gap-2 font-bold text-white">
          <UserPlus className="h-5 w-5 text-emerald-400" /> Register a player
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="pname" className="text-white">Full Name *</Label>
              <Input id="pname" name="name" required className="border-slate-600 bg-slate-700/50 text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jersey" className="text-white">Jersey Number</Label>
              <Input id="jersey" name="jersey_number" type="number" className="border-slate-600 bg-slate-700/50 text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position" className="text-white">Position</Label>
              <select
                id="position"
                name="position"
                defaultValue=""
                className="h-10 w-full rounded-md border border-slate-600 bg-slate-700/50 px-3 text-sm text-white"
              >
                <option value="">Select position</option>
                <option value="Goalkeeper">Goalkeeper</option>
                <option value="Defender">Defender</option>
                <option value="Midfielder">Midfielder</option>
                <option value="Forward">Forward</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob" className="text-white">Date of Birth</Label>
              <Input id="dob" name="date_of_birth" type="date" className="border-slate-600 bg-slate-700/50 text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-white">Passport Photo * (required)</Label>
            <div className="flex items-center gap-3">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-slate-600 bg-slate-700/50 px-3 py-2 text-sm text-white hover:bg-slate-700">
                <Upload className="h-4 w-4" />
                {uploading ? 'Uploading...' : 'Choose photo'}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => onPhoto(e.target.files?.[0])} />
              </label>
              {photoUrl && <img src={photoUrl} alt="player" className="h-14 w-14 rounded object-cover" />}
            </div>
          </div>
          <Button type="submit" disabled={isPending || uploading || !photoUrl} className="bg-emerald-600 hover:bg-emerald-700 text-white">
            {isPending ? 'Adding...' : 'Add Player'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

function Roster({ players, teamId, canEdit }: { players: PlayerRow[]; teamId: string; canEdit: boolean }) {
  const [isPending, startTransition] = useTransition()

  const onRemove = (id: string) =>
    startTransition(async () => {
      const res = await removePlayer(id, teamId)
      if (res?.ok) toast.success('Player removed')
      else toast.error(res?.message ?? 'Failed')
    })

  if (players.length === 0) {
    return (
      <Card className="border-slate-700 bg-slate-800/50">
        <CardContent className="flex h-28 items-center justify-center text-slate-400">
          No players registered yet.
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-slate-700 bg-slate-800/50">
      <CardContent className="p-5">
        <h2 className="mb-4 font-bold text-white">Squad ({players.length})</h2>
        <div className="space-y-2">
          {players.map((p) => (
            <div key={p.id} className="flex items-center justify-between rounded-lg bg-slate-700/40 px-3 py-2">
              <div className="flex items-center gap-3">
                {p.photo_url ? (
                  <img src={p.photo_url} alt={p.name} className="h-10 w-10 rounded-full object-cover" />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-slate-600" />
                )}
                <div>
                  <p className="font-semibold text-white">{p.name}</p>
                  <p className="text-xs text-slate-400">
                    {p.position ?? 'Player'}{p.jersey_number ? ` · #${p.jersey_number}` : ''}
                  </p>
                </div>
              </div>
              {canEdit && (
                <button onClick={() => onRemove(p.id)} disabled={isPending} className="text-slate-400 hover:text-red-400">
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
