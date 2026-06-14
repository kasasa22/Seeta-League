"use client"

import type React from "react"

import type { Team } from "@/lib/types"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil, Users, Upload } from "lucide-react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const CAMPUSES = ["Main", "Nama", "Green", "A level campus", "All Campuses"]

function campusYears(): number[] {
  const current = new Date().getFullYear()
  const years: number[] = []
  for (let y = current; y >= 2000; y--) years.push(y)
  return years
}

const fieldClass = "border-slate-700 bg-slate-800 text-white"
const selectClass = "h-10 w-full rounded-md border border-slate-700 bg-slate-800 px-3 text-sm text-white"

export function EditTeamDialog({ team }: { team: Team }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [logoUrl, setLogoUrl] = useState(team.logo_url ?? "")
  const [uploading, setUploading] = useState(false)
  const router = useRouter()

  const onLogo = async (file: File | undefined) => {
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.set("file", file)
      const res = await fetch("/api/uploads", { method: "POST", body: fd })
      const json = await res.json()
      if (json.ok && json.url) {
        setLogoUrl(json.url)
        toast.success("Logo uploaded")
      } else {
        toast.error(json.message || "Logo upload failed")
      }
    } catch (err: any) {
      toast.error(err?.message || "Logo upload failed")
    }
    setUploading(false)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const campus = (formData.get("campus") as string) || ""
    const yearRaw = formData.get("year") as string
    if (!campus) {
      toast.error("Campus is required")
      setLoading(false)
      return
    }
    if (!yearRaw) {
      toast.error("Year is required")
      setLoading(false)
      return
    }

    const supabase = createClient()
    const { error } = await supabase
      .from("teams")
      .update({
        name: formData.get("name") as string,
        campus,
        year: Number.parseInt(yearRaw, 10),
        representative_name: (formData.get("representative") as string) || null,
        contact_email: (formData.get("email") as string) || null,
        contact_phone: (formData.get("phone") as string) || null,
        is_active: formData.get("is_active") === "active",
        logo_url: logoUrl || null,
      })
      .eq("id", team.id)

    if (error) {
      toast.error("Error updating team: " + error.message)
    } else {
      toast.success("Team updated")
      setOpen(false)
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-blue-400 hover:bg-blue-500/20 hover:text-blue-300"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="border-slate-700 bg-slate-900">
        <DialogHeader>
          <div className="mb-2 flex items-center gap-2">
            <div className="rounded-lg bg-blue-500/20 p-2">
              <Users className="h-5 w-5 text-blue-400" />
            </div>
            <DialogTitle className="text-white">Edit Team</DialogTitle>
          </div>
          <DialogDescription className="text-slate-400">Update team details</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-300">
              Team Name *
            </Label>
            <Input id="name" name="name" required defaultValue={team.name} className={fieldClass} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="campus" className="text-slate-300">
                Campus *
              </Label>
              <select id="campus" name="campus" required defaultValue={team.campus ?? ""} className={selectClass}>
                <option value="" disabled>
                  Select campus
                </option>
                {CAMPUSES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="year" className="text-slate-300">
                Year *
              </Label>
              <select id="year" name="year" required defaultValue={team.year ?? ""} className={selectClass}>
                <option value="" disabled>
                  Select year
                </option>
                {campusYears().map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="representative" className="text-slate-300">
              Representative Name
            </Label>
            <Input
              id="representative"
              name="representative"
              defaultValue={team.representative_name ?? ""}
              className={fieldClass}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">
                Contact Email
              </Label>
              <Input id="email" name="email" type="email" defaultValue={team.contact_email ?? ""} className={fieldClass} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-slate-300">
                Contact Phone
              </Label>
              <Input id="phone" name="phone" type="tel" defaultValue={team.contact_phone ?? ""} className={fieldClass} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="is_active" className="text-slate-300">
              Status
            </Label>
            <select
              id="is_active"
              name="is_active"
              defaultValue={team.is_active ? "active" : "inactive"}
              className={selectClass}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label className="text-slate-300">Team Logo</Label>
            <div className="flex items-center gap-3">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white hover:bg-slate-700">
                <Upload className="h-4 w-4" />
                {uploading ? "Uploading..." : "Choose logo"}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => onLogo(e.target.files?.[0])} />
              </label>
              {logoUrl && <img src={logoUrl} alt="logo" className="h-12 w-12 rounded object-cover" />}
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            disabled={loading || uploading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
