import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { isAdminRequest } from "@/lib/server/admin"
import { getSelectedSeasonId } from "@/lib/seasons"
import { groqChat, parseDraft, AI_CONFIGURED, type ChatMessage } from "@/lib/ai"

const matchSelect =
  "*, home_team:teams!matches_home_team_id_fkey(name), away_team:teams!matches_away_team_id_fkey(name)"

const PERSONA =
  "You are the lead writer for the Seeta League, an alumni football championship that connects generations. Your voice is energetic, vivid and fan-first — the kind of writing supporters love to share."
const FORMAT =
  "Respond as JSON with keys 'title' (a punchy, eye-catching headline) and 'body'. The body must be rich HTML using <p> paragraphs, <h3> sub-headings, <ul>/<li> bullet lists, and <strong> for emphasis on key names, numbers and dates. Keep paragraphs short and scannable."
const ACCURACY =
  "Base everything STRICTLY on the facts provided — never invent players, scores, figures, dates or events. Do not include markdown code fences."

export async function GET() {
  if (!(await isAdminRequest())) return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 })

  const supabase = await createClient()
  const seasonId = await getSelectedSeasonId()
  let q = supabase
    .from("matches")
    .select(matchSelect)
    .eq("is_completed", true)
    .order("match_date", { ascending: false })
    .limit(20)
  if (seasonId) q = q.eq("season_id", seasonId)
  const { data } = await q

  const matches = (data ?? []).map((m: any) => ({
    id: m.id,
    label: `${m.home_team?.name ?? "Home"} ${m.home_score ?? 0}-${m.away_score ?? 0} ${m.away_team?.name ?? "Away"}${
      m.match_day ? ` · MD${m.match_day}` : ""
    }`,
  }))
  return NextResponse.json({ ok: true, configured: AI_CONFIGURED(), matches })
}

async function buildMatchContext(matchId: string): Promise<string | null> {
  const supabase = await createClient()
  const { data: match } = await supabase.from("matches").select(matchSelect).eq("id", matchId).maybeSingle()
  if (!match) return null

  const { data: events } = await supabase
    .from("match_events")
    .select("event_type, team_id, player:players(name)")
    .eq("match_id", matchId)

  const goalLine = (teamId: string) =>
    (events ?? [])
      .filter((e: any) => e.team_id === teamId && e.event_type === "goal")
      .map((e: any) => (e.player as any)?.name ?? "Unknown")
      .join(", ") || "no recorded scorers"
  const assistLine = (teamId: string) =>
    (events ?? [])
      .filter((e: any) => e.team_id === teamId && e.event_type === "assist")
      .map((e: any) => (e.player as any)?.name ?? "Unknown")
      .join(", ") || "none"

  const m: any = match
  return [
    `Competition: Seeta League (alumni football championship).`,
    `Fixture: ${m.home_team?.name} vs ${m.away_team?.name}.`,
    m.match_day ? `Matchday: ${m.match_day}.` : "",
    m.match_date ? `Date: ${new Date(m.match_date).toDateString()}.` : "",
    `Final score: ${m.home_team?.name} ${m.home_score ?? 0} - ${m.away_score ?? 0} ${m.away_team?.name}.`,
    `${m.home_team?.name} scorers: ${goalLine(m.home_team_id)}. Assists: ${assistLine(m.home_team_id)}.`,
    `${m.away_team?.name} scorers: ${goalLine(m.away_team_id)}. Assists: ${assistLine(m.away_team_id)}.`,
  ]
    .filter(Boolean)
    .join("\n")
}

async function buildRoundupContext(): Promise<string> {
  const supabase = await createClient()
  const seasonId = await getSelectedSeasonId()
  const withSeason = (q: any) => (seasonId ? q.eq("season_id", seasonId) : q)

  const { data: standings } = await withSeason(
    supabase.from("league_standings").select("*").order("points", { ascending: false }).limit(8)
  )
  const { data: scorers } = await withSeason(
    supabase.from("top_scorers").select("*").order("goals", { ascending: false }).limit(5)
  )
  const { data: assists } = await withSeason(
    supabase.from("top_assists").select("*").order("assists", { ascending: false }).limit(5)
  )

  const table = (standings ?? [])
    .map(
      (s: any, i: number) =>
        `${i + 1}. ${s.team_name} — ${s.points} pts (P${s.played} W${s.won} D${s.drawn} L${s.lost} GF${s.goals_for} GA${s.goals_against})`
    )
    .join("\n")
  const scorerList = (scorers ?? []).map((s: any) => `${s.player_name} (${s.team_name}) — ${s.goals}`).join(", ")
  const assistList = (assists ?? []).map((a: any) => `${a.player_name} (${a.team_name}) — ${a.assists}`).join(", ")

  return [
    `Competition: Seeta League (alumni football championship).`,
    `Current standings:\n${table || "No matches played yet."}`,
    `Top scorers: ${scorerList || "none yet"}.`,
    `Top assists: ${assistList || "none yet"}.`,
  ].join("\n")
}

export async function POST(req: Request) {
  if (!(await isAdminRequest())) return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 })
  if (!AI_CONFIGURED())
    return NextResponse.json({ ok: false, message: "AI is not configured. Add GROQ_API_KEY to your environment." }, { status: 400 })

  const { kind, prompt, matchId } = await req.json().catch(() => ({}))

  let system = ""
  let userContent = ""

  try {
    if (kind === "report") {
      if (!matchId) return NextResponse.json({ ok: false, message: "Select a match first." }, { status: 400 })
      const ctx = await buildMatchContext(matchId)
      if (!ctx) return NextResponse.json({ ok: false, message: "Match not found." }, { status: 404 })
      system = `${PERSONA} Write a vivid, detailed match report of about 350-500 words that a passionate football fan would love to read.
${FORMAT}
Structure it like a real match report: a dramatic opening hook, a flowing account of how the game unfolded (build around the actual scorers and assists), a paragraph on each team's performance, and a forward-looking closing line. Use an energetic, broadcaster-style voice.
${ACCURACY}`
      userContent = `Write the match report from these facts:\n${ctx}`
    } else if (kind === "roundup") {
      const ctx = await buildRoundupContext()
      system = `${PERSONA} Write a lively, detailed 'Matchday Roundup' of about 300-450 words covering the title race, in-form teams, surprise results, and standout players.
${FORMAT}
Use <h3> sub-headings (e.g. "At the Top", "Golden Boot Race", "Talking Points") with short punchy paragraphs and a <ul> highlight list.
${ACCURACY}`
      userContent = `Write the roundup from this league data:\n${ctx}`
    } else if (kind === "notice") {
      if (!prompt || !String(prompt).trim())
        return NextResponse.json({ ok: false, message: "Describe what the notice is about." }, { status: 400 })
      system = `${PERSONA} Write a rich, exciting, well-structured official notice of about 300-450 words that grabs a football fan's attention.
${FORMAT}
Open with a bold, hype-building intro paragraph, then organise the details under clear <h3> section headings with <ul> bullet lists for any figures, dates, or items, bolding key numbers and names. End with a motivating call-to-action or rallying line. Tasteful football emojis in headings are welcome (⚽ 🏆 🔥 💰 🧤).
${ACCURACY}`
      userContent = `Write the official notice about: ${String(prompt).trim()}`
    } else {
      return NextResponse.json({ ok: false, message: "Unknown generation type." }, { status: 400 })
    }

    const messages: ChatMessage[] = [
      { role: "system", content: system },
      { role: "user", content: userContent },
    ]
    const raw = await groqChat(messages, { json: true, temperature: 0.8, maxTokens: 2200 })
    const draft = parseDraft(raw)
    return NextResponse.json({ ok: true, ...draft })
  } catch (err: any) {
    return NextResponse.json({ ok: false, message: err?.message || "Generation failed" }, { status: 500 })
  }
}
