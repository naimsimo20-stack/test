import { Metadata } from "next"
import BlogClientPage from "./page.client"

export const metadata: Metadata = {
  title: "Blog SEO | Prestigia Agency - Guides Marketing Digital",
  description:
    "Découvrez nos guides et articles sur le marketing digital, SEO, branding et développement web. Conseils d’experts pour optimiser votre présence en ligne.",
  keywords: [
    "blog marketing digital",
    "guides SEO",
    "conseils branding",
    "tutoriels web",
    "articles marketing Casablanca",
  ],
  alternates: {
    canonical: "https://prestigia-agency.com/blog",
  },
  openGraph: {
    title: "Blog | Prestigia Agency",
    description:
      "Articles & guides experts en SEO, branding, réseaux sociaux et développement.",
    type: "website",
    url: "https://prestigia-agency.com/blog",
  },
}

export default function BlogPage() {
  return <BlogClientPage />
}
