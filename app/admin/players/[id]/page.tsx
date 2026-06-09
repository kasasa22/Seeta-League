import { notFound } from "next/navigation"
import { getPlayerDetail } from "@/lib/details"
import { PlayerProfile } from "@/components/details/player-profile"

export default async function AdminPlayerDetailPage({ params }: { params: { id: string } }) {
  const detail = await getPlayerDetail(params.id)
  if (!detail) notFound()

  return <PlayerProfile detail={detail} backHref="/admin/players" backLabel="Back to Players" />
}
