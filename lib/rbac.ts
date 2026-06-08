import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export interface CurrentUser {
  id: string
  email: string | null
  full_name: string | null
  status: string
  roleKeys: string[]
  permissions: string[]
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return null

    const { data: profile } = await supabase
      .from("profiles")
      .select("email, full_name, status")
      .eq("id", user.id)
      .maybeSingle()

    const { data: userRoles } = await supabase
      .from("user_roles")
      .select("role:roles(key, role_permissions(permission_key))")
      .eq("user_id", user.id)

    const roleKeys: string[] = []
    const permissions = new Set<string>()

    for (const ur of userRoles ?? []) {
      const role = (ur as any).role
      if (!role) continue
      roleKeys.push(role.key)
      for (const rp of role.role_permissions ?? []) permissions.add(rp.permission_key)
    }

    return {
      id: user.id,
      email: profile?.email ?? user.email ?? null,
      full_name: profile?.full_name ?? null,
      status: profile?.status ?? "pending",
      roleKeys,
      permissions: Array.from(permissions),
    }
  } catch {
    return null
  }
}

export function userHasPermission(user: CurrentUser | null, permission: string): boolean {
  if (!user) return false
  if (user.roleKeys.includes("super_admin")) return true
  return user.permissions.includes(permission)
}

export async function requirePermission(permission: string): Promise<CurrentUser> {
  const user = await getCurrentUser()
  if (!user) redirect("/login")
  if (user.status !== "approved") redirect("/pending")
  if (!userHasPermission(user, permission)) redirect("/admin")
  return user
}

export async function requireAnyPermission(permissions: string[]): Promise<CurrentUser> {
  const user = await getCurrentUser()
  if (!user) redirect("/login")
  if (user.status !== "approved") redirect("/pending")
  if (!permissions.some((p) => userHasPermission(user, p))) redirect("/admin")
  return user
}
