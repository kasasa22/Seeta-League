'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { requirePermission } from '@/lib/rbac'

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '')
}

export async function createRole(formData: FormData) {
  await requirePermission('manage_roles')
  const name = String(formData.get('name') ?? '').trim()
  const description = String(formData.get('description') ?? '').trim()
  if (!name) return

  const supabase = await createClient()
  await supabase.from('roles').insert({
    key: slugify(name),
    name,
    description: description || null,
    is_system: false,
  })
  revalidatePath('/admin/roles')
}

export async function toggleRolePermission(roleId: string, permissionKey: string, enabled: boolean) {
  await requirePermission('manage_roles')
  const supabase = await createClient()
  if (enabled) {
    await supabase.from('role_permissions').insert({ role_id: roleId, permission_key: permissionKey })
  } else {
    await supabase
      .from('role_permissions')
      .delete()
      .eq('role_id', roleId)
      .eq('permission_key', permissionKey)
  }
  revalidatePath('/admin/roles')
}

export async function deleteRole(roleId: string) {
  await requirePermission('manage_roles')
  const supabase = await createClient()
  await supabase.from('roles').delete().eq('id', roleId).eq('is_system', false)
  revalidatePath('/admin/roles')
}
