import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Trophy,
  Users,
  Target,
  Heart,
  Calendar,
  MapPin,
  ArrowLeft,
  Star,
  Shield,
  Handshake,
} from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[300px] sm:h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
          <img
            src="/aerial-football-stadium.png"
            alt="Stadium"
            className="h-full w-full object-cover opacity-20 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        <div className="relative z-10 flex h-full flex-col justify-end px-4 sm:px-6 pb-8 text-white">
          <div className="mx-auto w-full max-w-6xl">
            <Link href="/">
              <Button variant="ghost" size="sm" className="mb-4 text-white hover:bg-white/20">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <Badge className="mb-4 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
              Est. 2024
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4">
              About Seeta League
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl">
              Where alumni legends reunite on the pitch to relive their glory days
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
        {/* Our Story */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-emerald-500/10 text-emerald-500 border-emerald-500/30">
                Our Story
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-6">
                More Than Just Football
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  The Seeta League was born from a simple idea: bringing together alumni who share
                  a passion for football and a desire to stay connected with their roots. What started
                  as casual weekend kickabouts has evolved into a fully organized competitive league.
                </p>
                <p>
                  Founded in 2024, our league brings together players from various graduating classes,
                  creating a unique blend of experience, skill, and camaraderie. Every match is a
                  celebration of our shared history and love for the beautiful game.
                </p>
                <p>
                  Today, the Seeta League stands as a testament to the enduring bonds formed during
                  our school years. With 21 teams competing across the season, we've created something
                  special that goes beyond the final score.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/logo.jpg"
                  alt="Seeta League Logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-emerald-500 text-white p-4 rounded-xl shadow-lg">
                <p className="text-3xl font-black">21</p>
                <p className="text-sm">Teams</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-16">
          <div className="grid sm:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/30">
              <CardContent className="p-6 sm:p-8">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">Our Mission</h3>
                <p className="text-muted-foreground">
                  To provide a platform for alumni to reconnect through competitive football,
                  promoting fitness, friendship, and fair play while keeping the spirit of our
                  school days alive.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/30">
              <CardContent className="p-6 sm:p-8">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">Our Vision</h3>
                <p className="text-muted-foreground">
                  To become the premier alumni football league, inspiring other communities to
                  create similar platforms that celebrate heritage, build lasting friendships,
                  and promote healthy lifestyles.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-emerald-500/10 text-emerald-500 border-emerald-500/30">
              What We Stand For
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Our Core Values
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-7 w-7 text-emerald-500" />
                </div>
                <h3 className="font-bold mb-2">Integrity</h3>
                <p className="text-sm text-muted-foreground">
                  Fair play on and off the pitch
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                  <Handshake className="h-7 w-7 text-blue-500" />
                </div>
                <h3 className="font-bold mb-2">Unity</h3>
                <p className="text-sm text-muted-foreground">
                  Bringing alumni together as one family
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-7 w-7 text-amber-500" />
                </div>
                <h3 className="font-bold mb-2">Excellence</h3>
                <p className="text-sm text-muted-foreground">
                  Striving for the best in everything
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-14 h-14 rounded-full bg-rose-500/10 flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-7 w-7 text-rose-500" />
                </div>
                <h3 className="font-bold mb-2">Passion</h3>
                <p className="text-sm text-muted-foreground">
                  Love for the game and community
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-16">
          <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white overflow-hidden">
            <CardContent className="p-8 sm:p-12">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Users className="h-6 w-6 text-emerald-400" />
                  </div>
                  <p className="text-4xl sm:text-5xl font-black text-emerald-400">21</p>
                  <p className="text-white/70">Teams</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Trophy className="h-6 w-6 text-emerald-400" />
                  </div>
                  <p className="text-4xl sm:text-5xl font-black text-emerald-400">200+</p>
                  <p className="text-white/70">Players</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Calendar className="h-6 w-6 text-emerald-400" />
                  </div>
                  <p className="text-4xl sm:text-5xl font-black text-emerald-400">50+</p>
                  <p className="text-white/70">Matches</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <MapPin className="h-6 w-6 text-emerald-400" />
                  </div>
                  <p className="text-4xl sm:text-5xl font-black text-emerald-400">1</p>
                  <p className="text-white/70">Season</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-4">
            Ready to Join the Action?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Whether you want to play, support, or just stay connected with fellow alumni,
            the Seeta League welcomes you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/teams">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600">
                <Users className="mr-2 h-5 w-5" />
                View Teams
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Contact Us
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
