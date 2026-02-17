import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Newspaper, ArrowRight, Calendar } from "lucide-react"

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

export default async function NewsPage() {
  const supabase = await createClient()

  const { data: blogs } = await supabase
    .from("blogs")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 py-16 sm:py-20">
        <div className="absolute inset-0">
          <img
            src="/football-match-action.png"
            alt="News"
            className="h-full w-full object-cover opacity-10"
          />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            Latest Updates
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4">
            News & Stories
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Stay updated with the latest match reports, team news, and highlights from the Seeta League
          </p>
        </div>
      </section>

      {/* News Grid */}
      <div className="container mx-auto px-4 py-12">
        {blogs && blogs.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog: Blog, index: number) => (
              <Link key={blog.id} href={`/news/${blog.id}`}>
                <Card className="group overflow-hidden h-full hover:shadow-xl hover:border-emerald-500/50 transition-all duration-300">
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <img
                      src={blog.image_url || "/football-match-action.png"}
                      alt={blog.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    {index === 0 && (
                      <Badge className="absolute top-4 right-4 bg-emerald-500 text-white">
                        Latest
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <Calendar className="h-3.5 w-3.5" />
                      <time dateTime={blog.created_at}>
                        {new Date(blog.created_at).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                    </div>
                    <h2 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-emerald-500 transition-colors">
                      {blog.title}
                    </h2>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      {blog.body.replace(/<[^>]*>/g, "").substring(0, 150)}...
                    </p>
                    <div className="flex items-center text-emerald-500 text-sm font-semibold">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Newspaper className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">No News Yet</h2>
            <p className="text-muted-foreground mb-6">
              Check back soon for the latest updates from the Seeta League
            </p>
            <Link href="/">
              <Button>Return Home</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
