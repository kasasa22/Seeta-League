import { notFound } from "next/navigation"
import { getPlayerDetail } from "@/lib/details"
import { PlayerProfile } from "@/components/details/player-profile"

export default async function PlayerDetailsPage({ params }: { params: { id: string } }) {
  const detail = await getPlayerDetail(params.id)
  if (!detail) notFound()

  const back = detail.team
    ? { href: `/teams/${detail.team.id}`, label: `Back to ${detail.team.name}` }
    : { href: "/teams", label: "Back to Teams" }

  return (
    <div className="min-h-screen bg-background">
      <PlayerProfile detail={detail} backHref={back.href} backLabel={back.label} />
    </div>
  )
}
