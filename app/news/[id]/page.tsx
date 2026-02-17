import { createClient } from "@/lib/supabase/server"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  Calendar,
  Clock,
  Trophy,
  ChevronRight,
  Users,
  BarChart3,
} from "lucide-react"

interface Blog {
  id: string
  title: string
  body: string
  image_url: string | null
  author_email: string | null
  is_published: boolean
  created_at: string
  updated_at: string | null
}

export default async function BlogPostPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = await createClient()

  const { data: blog, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", params.id)
    .eq("is_published", true)
    .single()

  if (error || !blog) {
    notFound()
  }

  // Fetch related posts
  const { data: relatedPosts } = await supabase
    .from("blogs")
    .select("*")
    .eq("is_published", true)
    .neq("id", params.id)
    .order("created_at", { ascending: false })
    .limit(4)

  // Calculate read time
  const wordCount = blog.body.replace(/<[^>]*>/g, "").split(/\s+/).length
  const readTime = Math.max(1, Math.ceil(wordCount / 200))

  const formattedDate = new Date(blog.created_at).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/news" className="hover:text-foreground transition-colors">
              News
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground truncate max-w-[200px]">
              {blog.title.substring(0, 30)}...
            </span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <header className="container mx-auto px-4 pt-8 pb-6">
        <div className="max-w-6xl mx-auto">
          {/* Category Badge */}
          <div className="flex items-center gap-3 mb-4">
            <Badge className="bg-emerald-500 text-white border-0">
              Match Report
            </Badge>
            <span className="text-sm text-muted-foreground">Matchday 3</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-6 max-w-4xl">
            {blog.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-6 border-b">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={blog.created_at}>{formattedDate}</time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{readTime} min read</span>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="container mx-auto px-4 mb-8">
        <div className="max-w-6xl mx-auto">
          <div className="relative aspect-[21/9] rounded-xl overflow-hidden shadow-2xl">
            <img
              src={blog.image_url || "/football-match-action.png"}
              alt={blog.title}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-16">
            {/* Article Body */}
            <article className="min-w-0">
              <div
                className="
                  text-lg leading-loose text-muted-foreground
                  [&>p]:mb-8
                  [&>p:first-of-type]:text-xl [&>p:first-of-type]:text-foreground [&>p:first-of-type]:font-medium [&>p:first-of-type]:leading-relaxed
                  [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-foreground [&>h3]:mt-12 [&>h3]:mb-5
                  [&>h4]:text-xl [&>h4]:font-bold [&>h4]:text-foreground [&>h4]:mt-10 [&>h4]:mb-4
                  [&>ul]:my-8 [&>ul]:space-y-4 [&>ul]:pl-0
                  [&>ul>li]:flex [&>ul>li]:items-start [&>ul>li]:gap-3 [&>ul>li]:text-muted-foreground
                  [&>ul>li]:before:content-[''] [&>ul>li]:before:w-2 [&>ul>li]:before:h-2 [&>ul>li]:before:bg-emerald-500 [&>ul>li]:before:rounded-full [&>ul>li]:before:mt-2.5 [&>ul>li]:before:flex-shrink-0
                  [&_strong]:text-foreground [&_strong]:font-semibold
                  [&_a]:text-emerald-500 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-emerald-400
                "
                dangerouslySetInnerHTML={{ __html: blog.body }}
              />

              {/* Tags */}
              <div className="mt-12 pt-8 border-t flex flex-wrap gap-2">
                <Badge variant="outline" className="px-3 py-1">Seeta League</Badge>
                <Badge variant="outline" className="px-3 py-1">Matchday 3</Badge>
                <Badge variant="outline" className="px-3 py-1">2025 Season</Badge>
                <Badge variant="outline" className="px-3 py-1">Match Report</Badge>
              </div>

              {/* Article Navigation */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/news" className="flex-1">
                  <Button variant="outline" className="w-full gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to News
                  </Button>
                </Link>
                <Link href="/table" className="flex-1">
                  <Button className="w-full gap-2 bg-emerald-500 hover:bg-emerald-600">
                    <Trophy className="h-4 w-4" />
                    View Standings
                  </Button>
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block space-y-6 mt-0">
              {/* Sticky Container */}
              <div className="sticky top-24 space-y-6">
                {/* Quick Links */}
                <div className="rounded-xl border bg-card p-5">
                  <h3 className="font-bold mb-4">Quick Links</h3>
                  <nav className="space-y-1">
                    <Link
                      href="/table"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                        <Trophy className="h-5 w-5 text-emerald-500" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Standings</p>
                        <p className="text-xs text-muted-foreground">View full table</p>
                      </div>
                    </Link>
                    <Link
                      href="/fixtures"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                        <Calendar className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Fixtures</p>
                        <p className="text-xs text-muted-foreground">Upcoming matches</p>
                      </div>
                    </Link>
                    <Link
                      href="/teams"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                        <Users className="h-5 w-5 text-amber-500" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Teams</p>
                        <p className="text-xs text-muted-foreground">All teams</p>
                      </div>
                    </Link>
                  </nav>
                </div>

                {/* Season Promo */}
                <div className="rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 p-6 text-white">
                  <div className="flex items-center gap-2 mb-3">
                    <BarChart3 className="h-5 w-5 text-emerald-400" />
                    <span className="text-sm font-medium text-emerald-400">Season 2025</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Follow the Action</h3>
                  <p className="text-sm text-white/70 mb-4">
                    Stay updated with live scores, standings, and all the latest from the Seeta League.
                  </p>
                  <Link href="/">
                    <Button size="sm" className="w-full bg-white text-slate-900 hover:bg-white/90">
                      Go to Homepage
                    </Button>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Related Articles */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="border-t bg-muted/20 py-12 sm:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl sm:text-3xl font-black">More Stories</h2>
                <Link href="/news">
                  <Button variant="outline" size="sm" className="gap-2">
                    All News
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {relatedPosts.map((post: Blog, index: number) => (
                  <Link key={post.id} href={`/news/${post.id}`} className="group">
                    <article>
                      <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-3">
                        <img
                          src={post.image_url || "/football-match-action.png"}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {index === 0 && (
                          <Badge className="absolute top-2 left-2 bg-emerald-500 text-white text-xs">
                            Latest
                          </Badge>
                        )}
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground">
                          {new Date(post.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                        <h3 className="font-semibold leading-snug line-clamp-2 group-hover:text-emerald-500 transition-colors">
                          {post.title}
                        </h3>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
