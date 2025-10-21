import { cookies } from 'next/headers'

export function isAdminRequest(): boolean {
  try {
    const cookieStore = cookies()
    const session = cookieStore.get('admin_session')
    if (!session) return false

    // Session stored as JSON string in cookie
    const parsed = JSON.parse(session.value)
    // Basic check for role and expiry (24h)
    if (!parsed?.role) return false
    const loginTime = new Date(parsed.loginTime)
    const now = new Date()
    const hoursDiff = (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60)
    return hoursDiff <= 24 && parsed.role === 'super_admin'
  } catch (err) {
    return false
  }
}
