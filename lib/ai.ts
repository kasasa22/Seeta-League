const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile"

export interface ChatMessage {
  role: "system" | "user" | "assistant"
  content: string
}

export const AI_CONFIGURED = () => !!process.env.GROQ_API_KEY

export async function groqChat(
  messages: ChatMessage[],
  opts?: { json?: boolean; temperature?: number; maxTokens?: number }
): Promise<string> {
  const key = process.env.GROQ_API_KEY
  if (!key) throw new Error("AI is not configured. Add GROQ_API_KEY to your environment.")

  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages,
      temperature: opts?.temperature ?? 0.8,
      max_tokens: opts?.maxTokens ?? 2048,
      ...(opts?.json ? { response_format: { type: "json_object" } } : {}),
    }),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(`AI request failed (${res.status}): ${text.slice(0, 300)}`)
  }

  const json = await res.json()
  return json?.choices?.[0]?.message?.content ?? ""
}

export interface DraftResult {
  title: string
  body: string
}

export function parseDraft(raw: string): DraftResult {
  const cleaned = raw
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim()
  try {
    const obj = JSON.parse(cleaned)
    const title = typeof obj.title === "string" ? obj.title : ""
    const body = typeof obj.body === "string" ? obj.body : typeof obj.body_html === "string" ? obj.body_html : ""
    if (body) return { title, body }
  } catch {
    // fall through to plain-text handling
  }
  // Not valid JSON — treat the whole thing as the body.
  const asHtml = cleaned
    .split(/\n{2,}/)
    .map((p) => `<p>${p.replace(/\n/g, "<br/>").trim()}</p>`)
    .join("")
  return { title: "", body: asHtml }
}
