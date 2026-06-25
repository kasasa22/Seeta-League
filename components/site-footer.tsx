import Link from 'next/link'
import { Trophy, Mail, MapPin, Phone } from 'lucide-react'

const footerLinks = {
  league: [
    { href: '/fixtures', label: 'Fixtures' },
    { href: '/table', label: 'Standings' },
    { href: '/teams', label: 'Teams' },
    { href: '/news', label: 'News' },
  ],
  about: [
    { href: '/about', label: 'About Us' },
    { href: '/rules', label: 'Rules' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy', label: 'Privacy Policy' },
  ],
}

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg">
                <Trophy className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg leading-none tracking-tight">
                  SEETA
                </span>
                <span className="text-xs text-muted-foreground font-medium">
                  LEAGUE
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm mb-4">
              The official Seeta High School Alumni Football Championship.
              Bringing together former students through the beautiful game.
            </p>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Mukono, Uganda</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@seetaleague.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+25670496769</span>
              </div>
            </div>
          </div>

          {/* League Links */}
          <div>
            <h3 className="font-semibold mb-4">League</h3>
            <ul className="space-y-2">
              {footerLinks.league.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h3 className="font-semibold mb-4">Information</h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Seeta League. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Designed &amp; developed by{" "}
              <a
                href="https://kasasalivingstonetrevor.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-emerald-600 hover:underline dark:text-emerald-400"
              >
                Kasasa Livingstone Trevor
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
