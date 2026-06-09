import { notFound } from "next/navigation"
import { getTeamDetail } from "@/lib/details"
import { TeamProfile } from "@/components/details/team-profile"

export default async function TeamDetailsPage({ params }: { params: { id: string } }) {
  const detail = await getTeamDetail(params.id)
  if (!detail) notFound()

  return (
    <div className="min-h-screen bg-background">
      <TeamProfile detail={detail} backHref="/teams" backLabel="Back to Teams" playerBase="/players" />
    </div>
  )
}
