export interface AdminSession {
  email: string
  name: string
  role: 'super_admin'
  loginTime: string
}

export function getAdminSession(): AdminSession | null {
  if (typeof window === 'undefined') return null

  try {
    const session = localStorage.getItem('admin_session')
    if (!session) return null

    const parsed = JSON.parse(session) as AdminSession

    // Check if session is still valid (24 hours)
    const loginTime = new Date(parsed.loginTime)
    const now = new Date()
    const hoursDiff = (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60)

    if (hoursDiff > 24) {
      localStorage.removeItem('admin_session')
      return null
    }

    return parsed
  } catch {
    return null
  }
}

export function clearAdminSession(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('admin_session')
  }
}

export function isAdminAuthenticated(): boolean {
  return getAdminSession() !== null
}