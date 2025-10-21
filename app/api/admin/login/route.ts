import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const { email, password } = body

  // For now support single super admin seeded in client-side login
  const SUPER_ADMIN_EMAIL = 'kasasatrevor25@gmail.com'
  const SUPER_ADMIN_PASSWORD = 'Kasasa@2022'

  if (email === SUPER_ADMIN_EMAIL && password === SUPER_ADMIN_PASSWORD) {
    const session = {
      email: SUPER_ADMIN_EMAIL,
      name: 'Kasasa Trevor',
      role: 'super_admin',
      loginTime: new Date().toISOString()
    }

    const res = NextResponse.json({ ok: true })
    // set cookie for server-side checks (expires in 24h)
    res.cookies.set('admin_session', JSON.stringify(session), { httpOnly: true, maxAge: 60 * 60 * 24 })
    return res
  }

  return NextResponse.json({ ok: false, message: 'Invalid credentials' }, { status: 401 })
}
