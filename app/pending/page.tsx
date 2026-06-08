import Link from 'next/link'
import { Clock } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LogoutButton } from '@/components/admin/logout-button'

export default function PendingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 flex items-center justify-center p-4 sm:p-6">
      <Card className="w-full max-w-md border-slate-700 bg-slate-800/50 backdrop-blur">
        <CardHeader className="text-center p-6">
          <div className="mx-auto mb-4 rounded-lg bg-amber-500 p-3 w-fit">
            <Clock className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">Awaiting Approval</CardTitle>
          <CardDescription className="text-slate-300">
            Your account is registered but not yet approved by the Super Admin. You will gain access
            to your portal once your role is assigned.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 flex flex-col gap-3">
          <Link href="/">
            <Button variant="outline" className="w-full border-slate-700 bg-slate-800/80 text-white hover:bg-slate-700">
              Back to Home
            </Button>
          </Link>
          <LogoutButton />
        </CardContent>
      </Card>
    </div>
  )
}
