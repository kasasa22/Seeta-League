"use client"

import type React from "react"

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
import { Plus, Users, Upload } from "lucide-react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function AddTeamDialog() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [logoUrl, setLogoUrl] = useState("")
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
    const supabase = createClient()

    const { error } = await supabase.from("teams").insert({
      name: formData.get("name") as string,
      representative_name: formData.get("representative") as string,
      contact_email: formData.get("email") as string,
      contact_phone: formData.get("phone") as string,
      logo_url: logoUrl || null,
    })

    if (error) {
      alert("Error adding team: " + error.message)
    } else {
      setOpen(false)
      setLogoUrl("")
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
          <Plus className="h-4 w-4" />
          Add Team
        </Button>
      </DialogTrigger>
      <DialogContent className="border-slate-700 bg-slate-900">
        <DialogHeader>
          <div className="mb-2 flex items-center gap-2">
            <div className="rounded-lg bg-blue-500/20 p-2">
              <Users className="h-5 w-5 text-blue-400" />
            </div>
            <DialogTitle className="text-white">Register New Team</DialogTitle>
          </div>
          <DialogDescription className="text-slate-400">Add a new team to the league</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-300">
              Team Name *
            </Label>
            <Input id="name" name="name" required className="border-slate-700 bg-slate-800 text-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="representative" className="text-slate-300">
              Representative Name
            </Label>
            <Input id="representative" name="representative" className="border-slate-700 bg-slate-800 text-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300">
              Contact Email
            </Label>
            <Input id="email" name="email" type="email" className="border-slate-700 bg-slate-800 text-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-slate-300">
              Contact Phone
            </Label>
            <Input id="phone" name="phone" type="tel" className="border-slate-700 bg-slate-800 text-white" />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-300">Team Logo</Label>
            <div className="flex items-center gap-3">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white hover:bg-slate-700">
                <Upload className="h-4 w-4" />
                {uploading ? "Uploading..." : "Choose logo"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onLogo(e.target.files?.[0])}
                />
              </label>
              {logoUrl && <img src={logoUrl} alt="logo" className="h-12 w-12 rounded object-cover" />}
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            disabled={loading || uploading}
          >
            {loading ? "Adding..." : "Add Team"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
