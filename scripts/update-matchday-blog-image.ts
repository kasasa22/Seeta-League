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

async function updateMatchdayBlogImage() {
  console.log("Updating Matchday 3 Roundup blog image...")

  // Find the blog with "Matchday 3 Roundup" in the title
  const { data: blog, error: findError } = await supabase
    .from("blogs")
    .select("id, title")
    .ilike("title", "%Matchday 3 Roundup%")
    .single()

  if (findError || !blog) {
    console.error("Could not find Matchday 3 Roundup blog:", findError?.message)
    return
  }

  console.log(`Found blog: "${blog.title}" (ID: ${blog.id})`)

  // Update the image_url
  const { error: updateError } = await supabase
    .from("blogs")
    .update({ image_url: "/matchday.jpg" })
    .eq("id", blog.id)

  if (updateError) {
    console.error("Error updating blog:", updateError.message)
  } else {
    console.log("Successfully updated image to /matchday.jpg")
  }
}

updateMatchdayBlogImage()
