import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/rbac'

export async function GET() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ ok: false }, { status: 401 })
  return NextResponse.json({
    ok: true,
    permissions: user.permissions,
    roleKeys: user.roleKeys,
    isSuper: user.roleKeys.includes('super_admin'),
  })
}
