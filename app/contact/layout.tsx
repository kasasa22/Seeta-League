import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Seeta League — reach the organizers of the Seeta High School alumni football championship by phone or email for registration, sponsorship and general enquiries.",
  alternates: { canonical: "/contact" },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
