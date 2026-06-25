import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Shield, Eye, Lock, FileText, UserCheck, Mail } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[200px] sm:h-[250px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        <div className="relative z-10 flex h-full flex-col justify-end px-4 sm:px-6 pb-8 text-white">
          <div className="mx-auto w-full max-w-4xl">
            <Link href="/">
              <Button variant="ghost" size="sm" className="mb-4 text-white hover:bg-white/20">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-8 w-8 text-emerald-400" />
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                Legal
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              Privacy Policy
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
        <Card className="mb-6">
          <CardContent className="p-6">
            <p className="text-muted-foreground">
              <strong>Last Updated:</strong> January 2025
            </p>
            <p className="text-muted-foreground mt-2">
              This Privacy Policy explains how Seeta League ("we", "us", or "our") collects, uses,
              and protects your personal information when you use our website and services.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {/* Section 1 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Eye className="h-5 w-5 text-emerald-500" />
              </div>
              <h2 className="text-xl font-bold">1. Information We Collect</h2>
            </div>
            <Card>
              <CardContent className="p-6 space-y-4 text-muted-foreground">
                <p>We may collect the following types of information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong className="text-foreground">Personal Information:</strong> Name, email address,
                    phone number, and other contact details you provide when registering or contacting us.
                  </li>
                  <li>
                    <strong className="text-foreground">Player Information:</strong> Team affiliation,
                    jersey number, and match statistics for league participants.
                  </li>
                  <li>
                    <strong className="text-foreground">Usage Data:</strong> Information about how you
                    interact with our website, including pages visited and time spent on the site.
                  </li>
                  <li>
                    <strong className="text-foreground">Device Information:</strong> Browser type, IP
                    address, and device identifiers for analytics purposes.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Section 2 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-blue-500" />
              </div>
              <h2 className="text-xl font-bold">2. How We Use Your Information</h2>
            </div>
            <Card>
              <CardContent className="p-6 space-y-4 text-muted-foreground">
                <p>We use the collected information for the following purposes:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>To manage league operations, fixtures, and match results</li>
                  <li>To communicate important updates about matches and events</li>
                  <li>To display player statistics and team standings on our website</li>
                  <li>To respond to inquiries and provide customer support</li>
                  <li>To improve our website and user experience</li>
                  <li>To send newsletters and promotional content (with your consent)</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Section 3 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Lock className="h-5 w-5 text-amber-500" />
              </div>
              <h2 className="text-xl font-bold">3. Data Security</h2>
            </div>
            <Card>
              <CardContent className="p-6 space-y-4 text-muted-foreground">
                <p>
                  We implement appropriate security measures to protect your personal information
                  against unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Secure HTTPS encryption for all data transmission</li>
                  <li>Regular security audits and updates</li>
                  <li>Access controls limiting who can view personal data</li>
                  <li>Secure storage of sensitive information</li>
                </ul>
                <p>
                  However, no method of transmission over the Internet is 100% secure. While we strive
                  to protect your data, we cannot guarantee absolute security.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Section 4 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-rose-500/10 flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-rose-500" />
              </div>
              <h2 className="text-xl font-bold">4. Your Rights</h2>
            </div>
            <Card>
              <CardContent className="p-6 space-y-4 text-muted-foreground">
                <p>You have the following rights regarding your personal data:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong className="text-foreground">Access:</strong> Request a copy of the personal
                    data we hold about you.
                  </li>
                  <li>
                    <strong className="text-foreground">Correction:</strong> Request correction of any
                    inaccurate or incomplete information.
                  </li>
                  <li>
                    <strong className="text-foreground">Deletion:</strong> Request deletion of your
                    personal data, subject to legal obligations.
                  </li>
                  <li>
                    <strong className="text-foreground">Opt-out:</strong> Unsubscribe from marketing
                    communications at any time.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Section 5 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-purple-500" />
              </div>
              <h2 className="text-xl font-bold">5. Cookies and Tracking</h2>
            </div>
            <Card>
              <CardContent className="p-6 space-y-4 text-muted-foreground">
                <p>
                  Our website may use cookies and similar tracking technologies to enhance your
                  browsing experience. These include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong className="text-foreground">Essential Cookies:</strong> Required for the
                    website to function properly.
                  </li>
                  <li>
                    <strong className="text-foreground">Analytics Cookies:</strong> Help us understand
                    how visitors interact with our website.
                  </li>
                  <li>
                    <strong className="text-foreground">Preference Cookies:</strong> Remember your
                    settings and preferences (e.g., dark mode).
                  </li>
                </ul>
                <p>
                  You can control cookie settings through your browser preferences. Disabling certain
                  cookies may affect website functionality.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Section 6 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Mail className="h-5 w-5 text-emerald-500" />
              </div>
              <h2 className="text-xl font-bold">6. Contact Us</h2>
            </div>
            <Card>
              <CardContent className="p-6 space-y-4 text-muted-foreground">
                <p>
                  If you have any questions about this Privacy Policy or wish to exercise your rights,
                  please contact us:
                </p>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p><strong className="text-foreground">Email:</strong> info@seetaleague.com</p>
                  <p><strong className="text-foreground">Phone:</strong> +25670496769</p>
                  <p><strong className="text-foreground">Address:</strong> Seeta, Mukono District, Uganda</p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 7 */}
          <section>
            <Card className="bg-muted/50">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">7. Changes to This Policy</h2>
                <p className="text-muted-foreground">
                  We may update this Privacy Policy from time to time to reflect changes in our practices
                  or for legal reasons. We will notify you of any significant changes by posting the new
                  policy on this page and updating the "Last Updated" date. We encourage you to review
                  this policy periodically.
                </p>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Have questions about our privacy practices?
          </p>
          <Link href="/contact">
            <Button className="bg-emerald-500 hover:bg-emerald-600">
              <Mail className="mr-2 h-4 w-4" />
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
