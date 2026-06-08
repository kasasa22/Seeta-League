import { createClient } from "@/lib/supabase/server"

export async function isAdminRequest(): Promise<boolean> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return false

    const { data } = await supabase
      .from("user_roles")
      .select("role:roles(key, role_permissions(permission_key))")
      .eq("user_id", user.id)

    for (const ur of data ?? []) {
      const role = (ur as any).role
      if (!role) continue
      if (role.key === "super_admin") return true
      if ((role.role_permissions ?? []).some((rp: any) => rp.permission_key === "view_admin")) {
        return true
      }
    }
    return false
  } catch {
    return false
  }
}
