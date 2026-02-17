import { createClient } from "@supabase/supabase-js"
import { readFileSync } from "fs"
import { resolve } from "path"

// Load .env.local manually
const envPath = resolve(process.cwd(), ".env.local")
const envContent = readFileSync(envPath, "utf-8")
const envVars: Record<string, string> = {}
envContent.split("\n").forEach((line) => {
  const [key, ...valueParts] = line.split("=")
  if (key && valueParts.length > 0) {
    envVars[key.trim()] = valueParts.join("=").trim()
  }
})

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = envVars.SUPABASE_SERVICE_ROLE_KEY || envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

const updatedBlog = {
  title: "Godfather's Dominate Club de Chege with Emphatic 4-0 Victory",
  body: `<p>In a stunning Matchday 3 display, <strong>Godfather's</strong> delivered a masterclass performance, crushing <strong>Club de Chege</strong> 4-0 in what was one of the most one-sided encounters of the season.</p>

<p>The comprehensive victory marks a significant statement from Godfather's, who have been searching for consistency this campaign. This result will serve as a massive confidence boost as they look to climb the league table.</p>

<h3>Match Report</h3>
<p>From the first whistle, Godfather's were in complete control. Their pressing and quick passing carved open the Club de Chege defense time and again, with the goals flowing freely throughout the match.</p>

<p>Club de Chege, who came into the game hoping to continue their push towards the upper half of the standings, were overwhelmed by the intensity and quality on display. Their defense had no answers to the relentless attacking waves.</p>

<h3>A Statement Win</h3>
<p>The 4-0 scoreline reflects the dominance Godfather's showed on the pitch. Every department clicked into gear, from the solid defensive organization to the clinical finishing up front.</p>

<p>This result will have ripple effects across the league table, with Godfather's gaining valuable goal difference while Club de Chege will need to regroup quickly after this heavy defeat.</p>

<h3>What's Next</h3>
<p>Godfather's will look to build on this momentum in the coming weeks, while Club de Chege must address the defensive frailties exposed in this match. The battle for mid-table positioning continues to intensify!</p>`,
  image_url: "/club_de_shege_vs_Godfathers.jpg",
}

async function updateBlog() {
  console.log("Searching for Club de Chege blog to update...")

  // Find the existing blog
  const { data: existingBlog, error: findError } = await supabase
    .from("blogs")
    .select("*")
    .ilike("title", "%Club de Chege%")
    .single()

  if (findError || !existingBlog) {
    console.error("Could not find the blog:", findError?.message)
    return
  }

  console.log(`Found blog: "${existingBlog.title}" (ID: ${existingBlog.id})`)

  // Update the blog
  const { data, error } = await supabase
    .from("blogs")
    .update({
      title: updatedBlog.title,
      body: updatedBlog.body,
      image_url: updatedBlog.image_url,
      updated_at: new Date().toISOString(),
    })
    .eq("id", existingBlog.id)
    .select()
    .single()

  if (error) {
    console.error("Error updating blog:", error.message)
  } else {
    console.log(`Successfully updated blog: "${data.title}"`)
  }
}

updateBlog()
