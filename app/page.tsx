import { Metadata } from "next"
import ClientPageContent from "@/app/client-page-content"

export const metadata: Metadata = {
  title: "Prestigia Agency | Excellence Digitale, SEO, Branding & Web",
  description:
    "Prestigia Agency booste votre présence digitale avec des services premium : SEO, branding, design, développement web et marketing stratégique. Découvrez notre expertise.",
  alternates: {
    canonical: "https://prestigia-agency.com",
  },
  openGraph: {
    title: "Prestigia Agency | Excellence Digitale & Marketing",
    description:
      "Agence digitale experte en SEO, branding, web design et marketing stratégique. Nous créons des expériences innovantes pour faire grandir votre marque.",
    url: "https://prestigia-agency.com",
    type: "website",
    siteName: "Prestigia Agency",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prestigia Agency | Agence Marketing & Digitale",
    description:
      "Découvrez l’expertise de Prestigia Agency en SEO, branding, design et développement web.",
  },
}

export default function Page() {
  return <ClientPageContent />
}
