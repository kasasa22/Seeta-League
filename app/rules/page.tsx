import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Shield, Users, FileText, Trophy, AlertCircle, CheckCircle, Calendar, DollarSign, RefreshCw } from "lucide-react"
import Image from "next/image"

export default function RulesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[250px] sm:h-[300px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
          <img
            src="/football-stadium-pitch.jpg"
            alt="Rules"
            className="h-full w-full object-cover opacity-20 mix-blend-overlay"
          />
        </div>
        <div className="relative z-10 flex h-full flex-col justify-end px-4 sm:px-6 pb-6 sm:pb-8 text-white">
          <div className="mx-auto w-full max-w-7xl">
            <Link href="/">
              <Button variant="ghost" size="sm" className="mb-3 sm:mb-4 text-white hover:bg-white/20">
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span className="text-sm sm:text-base">Back to Home</span>
              </Button>
            </Link>
            <div className="flex items-center gap-2 sm:gap-3 mb-4">
              <Image 
                src="/logo.jpg" 
                alt="Seeta League Logo" 
                width={60} 
                height={60}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full drop-shadow-lg"
              />
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">League Rules & Regulations</h1>
                <p className="mt-1 text-sm sm:text-base md:text-lg text-white/90">Official guidelines for Season 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
        {/* Important Notice */}
        <Card className="mb-8 border-accent/30 bg-gradient-to-br from-accent/10 to-accent/5">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-start gap-3 sm:gap-4">
              <AlertCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg sm:text-xl font-black mb-2">Important Notice</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  All teams and players must read and agree to these rules before participating in the Seeta Football League. 
                  Failure to comply with these regulations may result in penalties or disqualification.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Registration Rules */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-lg bg-blue-500/20 p-2 sm:p-3">
              <Users className="h-6 w-6 sm:h-7 sm:w-7 text-blue-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">Team Registration Rules</h2>
          </div>

          <div className="grid gap-4 sm:gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-1" />
                  <div>
                    <CardTitle className="text-lg sm:text-xl">1. Eligibility</CardTitle>
                    <p className="text-sm sm:text-base text-muted-foreground mt-2">
                      Only <strong>alumni of Seeta High School</strong> are eligible to participate in the league.
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-1" />
                  <div>
                    <CardTitle className="text-lg sm:text-xl">2. Team Composition</CardTitle>
                    <p className="text-sm sm:text-base text-muted-foreground mt-2">
                      Teams must consist of a <strong>minimum of 8 players</strong> and a <strong>maximum of 20 players</strong> that will partake in the whole season of the League.
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-1" />
                  <div>
                    <CardTitle className="text-lg sm:text-xl">3. Player Registration</CardTitle>
                    <p className="text-sm sm:text-base text-muted-foreground mt-2">
                      Each player must register with the team captains providing:
                    </p>
                    <ul className="mt-2 space-y-1 text-sm sm:text-base text-muted-foreground ml-4">
                      <li>• Year of study at Seeta High School (e.g., 2020-2026)</li>
                      <li>• Campus they studied at (Main, Nama, Green, etc.)</li>
                    </ul>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-1" />
                  <div>
                    <CardTitle className="text-lg sm:text-xl">4. Team Name</CardTitle>
                    <p className="text-sm sm:text-base text-muted-foreground mt-2">
                      Teams must choose a <strong>unique name</strong> that is respectful and does not infringe on any trademarks or copyrights.
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="border-accent/50">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-accent mt-1" />
                  <div>
                    <CardTitle className="text-lg sm:text-xl">5. Player Album (MANDATORY)</CardTitle>
                    <p className="text-sm sm:text-base text-muted-foreground mt-2">
                      A team <strong>MUST</strong> provide a full list of the players in their team for the entire season with:
                    </p>
                    <ul className="mt-2 space-y-1 text-sm sm:text-base text-muted-foreground ml-4">
                      <li>• Full names of all players</li>
                      <li>• Passport photos</li>
                      <li>• Years of Study at Seeta High School</li>
                      <li>• Campus of Study</li>
                    </ul>
                    <div className="mt-4 p-3 rounded-lg bg-accent/10 border border-accent/30">
                      <p className="text-sm font-semibold text-accent">
                        ⚠️ NOTE: No additional player will be allowed to be added to the team until the transfer window opens
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Player Eligibility Rules */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-lg bg-emerald-500/20 p-2 sm:p-3">
              <Shield className="h-6 w-6 sm:h-7 sm:w-7 text-emerald-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">Player Eligibility Rules</h2>
          </div>

          <div className="grid gap-4 sm:gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-400 mt-1" />
                  <div>
                    <CardTitle className="text-lg sm:text-xl">1. Age and Class</CardTitle>
                    <p className="text-sm sm:text-base text-muted-foreground mt-2">
                      Players must be <strong>alumni of Seeta High School</strong> with an open section of only <strong>two (2) foreign players</strong> per team.
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="border-destructive/30 bg-destructive/5">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-destructive mt-1" />
                  <div>
                    <CardTitle className="text-lg sm:text-xl">2. Current Students</CardTitle>
                    <p className="text-sm sm:text-base text-muted-foreground mt-2">
                      <strong>Current students</strong> of Seeta High School are <strong>NOT eligible</strong> to participate in the alumni league.
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-400 mt-1" />
                  <div>
                    <CardTitle className="text-lg sm:text-xl">3. Professional Players</CardTitle>
                    <p className="text-sm sm:text-base text-muted-foreground mt-2">
                      Professional athletes may be subject to additional rules or restrictions. Contact league administrators for clarification.
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Team Responsibility */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-lg bg-amber-500/20 p-2 sm:p-3">
              <Trophy className="h-6 w-6 sm:h-7 sm:w-7 text-amber-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">Team Responsibilities</h2>
          </div>

          <div className="grid gap-4 sm:gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-amber-400 mt-1" />
                  <div>
                    <CardTitle className="text-lg sm:text-xl">1. Team Captain</CardTitle>
                    <p className="text-sm sm:text-base text-muted-foreground mt-2">
                      Each team must designate a <strong>captain</strong> who will be responsible for:
                    </p>
                    <ul className="mt-2 space-y-1 text-sm sm:text-base text-muted-foreground ml-4">
                      <li>• Communicating with league administrators</li>
                      <li>• Ensuring their team follows the rules</li>
                      <li>• Managing team logistics and coordination</li>
                    </ul>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-amber-400 mt-1" />
                  <div>
                    <CardTitle className="text-lg sm:text-xl">2. Payment and Fees</CardTitle>
                    <p className="text-sm sm:text-base text-muted-foreground mt-2">
                      Teams are responsible for paying all the league fees before participating.
                    </p>
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                        <span className="text-sm sm:text-base">Team Fee (per game week)</span>
                        <Badge className="bg-amber-500">UGX 100,000</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                        <span className="text-sm sm:text-base">Team Commitment Fee</span>
                        <Badge className="bg-amber-500">UGX 50,000</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* League Rules */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-lg bg-purple-500/20 p-2 sm:p-3">
              <FileText className="h-6 w-6 sm:h-7 sm:w-7 text-purple-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">League Rules</h2>
          </div>

          <div className="grid gap-4 sm:gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-400 mt-1" />
                  <div>
                    <CardTitle className="text-lg sm:text-xl">1. Game Rules</CardTitle>
                    <p className="text-sm sm:text-base text-muted-foreground mt-2">
                      Teams must follow the <strong>rules of the game</strong> as outlined by the league administrators. Standard football rules apply unless otherwise specified.
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-400 mt-1" />
                  <div>
                    <CardTitle className="text-lg sm:text-xl">2. Sportsmanship</CardTitle>
                    <p className="text-sm sm:text-base text-muted-foreground mt-2">
                      Teams are expected to demonstrate <strong>good sportsmanship</strong> and respect towards:
                    </p>
                    <ul className="mt-2 space-y-1 text-sm sm:text-base text-muted-foreground ml-4">
                      <li>• Opponents</li>
                      <li>• Match officials</li>
                      <li>• Spectators</li>
                    </ul>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="border-destructive/30 bg-destructive/5">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-destructive mt-1" />
                  <div>
                    <CardTitle className="text-lg sm:text-xl">3. Disciplinary Action</CardTitle>
                    <p className="text-sm sm:text-base text-muted-foreground mt-2">
                      Teams may be subject to <strong>disciplinary action</strong> for:
                    </p>
                    <ul className="mt-2 space-y-1 text-sm sm:text-base text-muted-foreground ml-4">
                      <li>• Violating league rules</li>
                      <li>• Engaging in unsportsmanlike conduct</li>
                      <li>• Verbal or physical abuse</li>
                      <li>• Match misconduct</li>
                    </ul>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Registration Process */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-lg bg-cyan-500/20 p-2 sm:p-3">
              <Calendar className="h-6 w-6 sm:h-7 sm:w-7 text-cyan-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">Registration Process</h2>
          </div>

          <div className="grid gap-4 sm:gap-6">
            <Card className="border-destructive/30 bg-destructive/5">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-destructive mt-1" />
                  <div>
                    <CardTitle className="text-lg sm:text-xl">1. Registration Deadline</CardTitle>
                    <p className="text-sm sm:text-base text-muted-foreground mt-2">
                      Teams must register by the <strong>specified deadline</strong> to secure their spot in the league.
                    </p>
                    <div className="mt-3 p-3 rounded-lg bg-destructive/10 border border-destructive/30">
                      <p className="text-sm font-semibold text-destructive">
                        📅 Deadline: 16th October 2025
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-cyan-400 mt-1" />
                  <div>
                    <CardTitle className="text-lg sm:text-xl">2. Registration Fee</CardTitle>
                    <p className="text-sm sm:text-base text-muted-foreground mt-2">
                      A <strong>registration fee</strong> is required to participate in the league. Payment must be completed before fixtures are released.
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Changes and Refunds */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-lg bg-orange-500/20 p-2 sm:p-3">
              <RefreshCw className="h-6 w-6 sm:h-7 sm:w-7 text-orange-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">Changes and Refunds</h2>
          </div>

          <div className="grid gap-4 sm:gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <RefreshCw className="h-5 w-5 text-orange-400 mt-1" />
                  <div>
                    <CardTitle className="text-lg sm:text-xl">1. Roster Changes</CardTitle>
                    <p className="text-sm sm:text-base text-muted-foreground mt-2">
                      Teams may be allowed to make changes to their roster <strong>only during the transfer windows</strong>. Transfer window dates will be announced by league administrators.
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-orange-400 mt-1" />
                  <div>
                    <CardTitle className="text-lg sm:text-xl">2. Refunds</CardTitle>
                    <p className="text-sm sm:text-base text-muted-foreground mt-2">
                      Refunds may be available under certain circumstances such as:
                    </p>
                    <ul className="mt-2 space-y-1 text-sm sm:text-base text-muted-foreground ml-4">
                      <li>• Team withdrawal prior to the start of the league</li>
                      <li>• League cancellation due to unforeseen circumstances</li>
                    </ul>
                    <p className="text-sm text-muted-foreground mt-2">
                      Contact league administrators for refund requests.
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Footer CTA */}
        <Card className="border-accent/30 bg-gradient-to-br from-accent/10 to-accent/5">
          <CardContent className="p-6 sm:p-8 text-center">
            <Trophy className="h-12 w-12 sm:h-16 sm:w-16 text-accent mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-black mb-2">Ready to Join?</h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-6">
              Register your team now and be part of Seeta League 2025
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/">
                <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
                  Back to Home
                </Button>
              </Link>
              <Link href="/admin">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Admin Portal
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

