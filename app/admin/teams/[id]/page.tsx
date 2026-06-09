import { notFound } from "next/navigation"
import { getTeamDetail } from "@/lib/details"
import { TeamProfile } from "@/components/details/team-profile"

export default async function AdminTeamDetailPage({ params }: { params: { id: string } }) {
  const detail = await getTeamDetail(params.id)
  if (!detail) notFound()

  return <TeamProfile detail={detail} backHref="/admin/teams" backLabel="Back to Teams" playerBase="/admin/players" />
}
