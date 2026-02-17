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

const matchday3Blogs = [
  {
    title: "Finest Brothers Maintain League Lead with Victory Over Allies",
    body: `<p>In an electrifying Matchday 3 encounter, <strong>Finest Brothers</strong> continued their dominant run at the top of the Seeta League table with a convincing victory against <strong>Allies</strong>.</p>

<p>The league leaders, who now sit comfortably at the summit with <strong>22 points</strong> from 8 games, showcased their championship credentials with a clinical performance that left no doubt about their title aspirations.</p>

<h3>Match Highlights</h3>
<p>Finest Brothers came out with intent from the first whistle, pressing high and creating early chances. Their attacking prowess proved too much for the Allies defense, which has been struggling this season.</p>

<p>Allies, currently sitting in 6th place with 15 points, showed glimpses of quality but couldn't match the intensity and precision of the league leaders. Despite the loss, they remain in contention for a top-half finish.</p>

<h3>Standings Update</h3>
<p>With this result, Finest Brothers extend their lead at the top, while Allies will need to regroup quickly with tough fixtures ahead. The title race is heating up with Panthers (21 pts) and Losti City (20 pts) breathing down their necks.</p>

<p>The battle for supremacy in the Seeta League continues to deliver thrilling football week after week!</p>`,
    image_url: "/Allies_vs_finest_brothers.jpg",
    is_published: true,
  },
  {
    title: "Club de Chege Edge Past Godfather's in Tight Contest",
    body: `<p>In what was a closely fought Matchday 3 battle, <strong>Club de Chege</strong> secured a vital win against <strong>Godfather's</strong> in a match that had fans on the edge of their seats until the final whistle.</p>

<p>Club de Chege, currently positioned 7th in the table with <strong>13 points</strong>, continue their push towards the upper half of the standings with this important victory. The win gives them momentum heading into the crucial second half of the season.</p>

<h3>Match Report</h3>
<p>Both teams came into this fixture knowing the importance of three points. Godfather's, sitting in 9th place with just 8 points from 8 games, were desperate to kickstart their season but found Club de Chege in resolute form.</p>

<p>The match was a tactical affair with both sides showing defensive discipline. However, Club de Chege's attacking quality made the difference, as they converted their chances when it mattered most.</p>

<h3>What This Means</h3>
<p>For Godfather's, the search for consistency continues. With only 2 wins all season, they'll need to find form quickly to avoid being dragged into a relegation battle.</p>

<p>Club de Chege can take confidence from this result as they eye a top-six finish with strong performances in upcoming fixtures.</p>`,
    image_url: "/club_de_shege_vs_Godfathers.jpg",
    is_published: true,
  },
  {
    title: "The Villagers Continue Strong Form Against Kawaago",
    body: `<p><strong>The Villagers</strong> delivered another impressive performance in Matchday 3, overcoming <strong>Kawaago</strong> to maintain their position as genuine title contenders this season.</p>

<p>Sitting 4th in the league with <strong>18 points</strong>, The Villagers have been one of the most consistent teams in the competition, boasting an impressive record of 6 wins from 8 matches.</p>

<h3>Dominant Display</h3>
<p>From the opening moments, The Villagers imposed their style of play on the match. Their fluid passing and movement created numerous opportunities against a Kawaago side that has struggled for consistency this campaign.</p>

<p>Kawaago, languishing in 14th place with only 3 points from 6 games, showed fighting spirit but lacked the quality to trouble The Villagers' well-organized defense. Their season has been hampered by a poor goal difference of -23.</p>

<h3>Title Implications</h3>
<p>With this victory, The Villagers keep pace with the frontrunners - Finest Brothers (22 pts), Panthers (21 pts), and Losti City (20 pts). The title race is shaping up to be one of the most competitive in league history.</p>

<p>For Kawaago, the focus shifts to survival as they look to climb out of the bottom half in the coming weeks.</p>`,
    image_url: "/kawago_vs_villagers.jpg",
    is_published: true,
  },
  {
    title: "Losti City: The Dark Horses of Seeta League 2025",
    body: `<p><strong>Losti City</strong> have emerged as one of the surprise packages of the Seeta League 2025 season, currently occupying <strong>3rd place</strong> in the standings with an impressive <strong>20 points</strong> from 9 games.</p>

<h3>Season So Far</h3>
<p>Losti City's rise to prominence has been built on solid defensive foundations and clinical finishing. With 6 wins, 2 draws, and just 1 loss, they have proven themselves as genuine title challengers.</p>

<p>Their goal difference of +27 is the best in the league, highlighting their attacking prowess and defensive stability. The team has scored 33 goals while conceding only 6 - a remarkable record that puts them among the elite.</p>

<h3>Key Strengths</h3>
<ul>
<li><strong>Best defense in the league</strong> - Only 6 goals conceded in 9 games</li>
<li><strong>Clinical finishing</strong> - 33 goals scored, averaging nearly 4 per game</li>
<li><strong>Consistency</strong> - Only 1 defeat all season</li>
</ul>

<h3>Title Race Analysis</h3>
<p>With Finest Brothers leading on 22 points and Panthers on 21, Losti City are firmly in the mix. The upcoming fixtures will be crucial in determining whether they can sustain their challenge.</p>

<p>The squad has shown remarkable team spirit and tactical discipline under their management, making them the team to watch as the season enters its decisive phase.</p>`,
    image_url: "/losti_city_team.jpg",
    is_published: true,
  },
  {
    title: "Matchday 3 Roundup: Drama, Goals, and Table Shakeup",
    body: `<p>Matchday 3 of the Seeta League 2025 delivered another weekend of thrilling football action, with crucial results across all fixtures shaping the league table.</p>

<h3>Results Summary</h3>
<p>The weekend's action saw several important results that have significant implications for both the title race and the battle to avoid the bottom spots.</p>

<h3>Top of the Table</h3>
<p><strong>Finest Brothers</strong> maintained their position at the summit with 22 points, but <strong>Panthers</strong> (21 pts) and <strong>Losti City</strong> (20 pts) are breathing down their necks. <strong>The Villagers</strong> round out the top four with 18 points.</p>

<h3>The Battle in the Middle</h3>
<p><strong>Super Strikers</strong> (16 pts) and <strong>Allies</strong> (15 pts) occupy 5th and 6th respectively, while <strong>Club de Chege</strong> (13 pts) sits in 7th. The mid-table is incredibly tight with several teams separated by just a few points.</p>

<h3>Concerns at the Bottom</h3>
<p>At the other end, <strong>Legends</strong> remain winless with 0 points from 5 games, while <strong>Raptors</strong> (1 pt) and <strong>Top Bins</strong> (2 pts) also face an uphill battle to escape the relegation zone.</p>

<h3>Looking Ahead</h3>
<p>With the season progressing, every point becomes increasingly valuable. The title race is wide open, and the relegation battle promises to be equally dramatic. Stay tuned for more exciting Seeta League action!</p>`,
    image_url: "/football-match-action.png",
    is_published: true,
  },
]

async function seedMatchday3Blogs() {
  console.log("Seeding Matchday 3 blog posts...")

  for (const blog of matchday3Blogs) {
    const { data, error } = await supabase
      .from("blogs")
      .insert([blog])
      .select()
      .single()

    if (error) {
      console.error(`Error creating blog "${blog.title}":`, error.message)
    } else {
      console.log(`Created blog: "${blog.title}" (ID: ${data.id})`)
    }
  }

  console.log("\nDone! Matchday 3 blogs have been created.")
}

seedMatchday3Blogs()
