'use client'

import { AdminAuthWrapper } from "@/components/admin/admin-auth-wrapper"

export default function AdminTest() {
  return (
    <AdminAuthWrapper>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-6">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold text-white mb-8">Admin Test Page</h1>
          <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-emerald-400 mb-4">✅ Authentication Working!</h2>
            <p className="text-white">
              If you can see this page, the admin authentication is working correctly.
            </p>
            <p className="text-slate-300 mt-2">
              You can now navigate back to the full admin dashboard.
            </p>
          </div>
        </div>
      </div>
    </AdminAuthWrapper>
  )
}