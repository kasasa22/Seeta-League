import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { isAdminRequest } from "@/lib/server/admin"
import { getSelectedSeasonId } from "@/lib/seasons"
import { groqChat, parseDraft, AI_CONFIGURED, type ChatMessage } from "@/lib/ai"

const SETTING_KEY = "homepage_roundup"

export async function GET() {
  const supabase = await createClient()
  const { data } = await supabase.from("site_settings").select("value").eq("key", SETTING_KEY).maybeSingle()
  return NextResponse.json({ ok: true, roundup: data?.value ?? null })
}

export async function POST() {
  if (!(await isAdminRequest())) return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 })
  if (!AI_CONFIGURED())
    return NextResponse.json({ ok: false, message: "AI is not configured. Add GROQ_API_KEY to your environment." }, { status: 400 })

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

  const context = [
    `Competition: Seeta League (alumni football championship).`,
    `Current standings:\n${table || "No matches played yet."}`,
    `Top scorers: ${scorerList || "none yet"}.`,
    `Top assists: ${assistList || "none yet"}.`,
  ].join("\n")

  const messages: ChatMessage[] = [
    {
      role: "system",
      content:
        "You are a sports journalist for the Seeta League. Write a concise, lively 'Matchday Roundup' of about 110-170 words for a website homepage, based ONLY on the data provided — never invent figures. Respond as JSON with keys 'title' and 'body' (HTML using <p> paragraphs only).",
    },
    { role: "user", content: `Write a homepage roundup from this league data:\n${context}` },
  ]

  try {
    const raw = await groqChat(messages, { json: true, temperature: 0.7 })
    const draft = parseDraft(raw)
    const value = { title: draft.title, body: draft.body, generated_at: new Date().toISOString() }
    const { error } = await supabase
      .from("site_settings")
      .upsert({ key: SETTING_KEY, value, updated_at: new Date().toISOString() }, { onConflict: "key" })
    if (error) throw new Error(error.message)
    return NextResponse.json({ ok: true, roundup: value })
  } catch (err: any) {
    return NextResponse.json({ ok: false, message: err?.message || "Generation failed" }, { status: 500 })
  }
}
