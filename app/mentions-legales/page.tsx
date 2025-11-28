import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mentions Légales | Prestigia Agency",
  description:
    "Retrouvez les mentions légales officielles de Prestigia Agency, agence digitale située à Casablanca : informations légales, propriété intellectuelle, hébergement et responsabilités.",
  keywords: [
    "mentions légales",
    "Prestigia Agency",
    "agence digitale Casablanca",
    "informations légales",
    "propriété intellectuelle",
  ],
  alternates: {
    canonical: "https://www.prestigia-agency.com/mentions-legales",
  },
  openGraph: {
    title: "Mentions Légales | Prestigia Agency",
    description:
      "Informations légales officielles de Prestigia Agency : société, hébergement, propriété intellectuelle, responsabilités.",
    url: "https://www.prestigia-agency.com/mentions-legales",
    siteName: "Prestigia Agency",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mentions Légales | Prestigia Agency",
    description:
      "Consultez les mentions légales de Prestigia Agency, agence digitale basée à Casablanca.",
  },
}

// --- JSON-LD pour Google (LegalService Schema) ---
export const dynamic = "force-static"

export default function MentionsLegales() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "Prestigia Agency",
    url: "https://www.prestigia-agency.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Bld Qods The Gold Center, Étage 1, Bureau 2",
      addressLocality: "Casablanca",
      addressCountry: "MA",
    },
    email: "contact@prestigia-agency.com",
    telephone: "+212652768993",
  }

  return (
    <main className="min-h-screen bg-background pt-24 pb-20">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-10 bg-gradient-to-r from-accent via-accent to-purple-400 bg-clip-text text-transparent">
          Mentions Légales
        </h1>

        <article className="space-y-10 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Informations Légales</h2>
            <ul className="space-y-1">
              <li><strong>Entreprise :</strong> Prestigia Agency</li>
              <li><strong>Forme juridique :</strong> SARL</li>
              <li><strong>Siège social :</strong> Bld Qods The Gold Center, Étage 1, Bureau 2, Casablanca</li>
              <li><strong>Téléphone :</strong> +212 652 768 993</li>
              <li><strong>Email :</strong> contact@prestigia-agency.com</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Responsable de Publication</h2>
            <p>
              Le directeur de la publication est le gérant de la SARL Prestigia Agency.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Hébergement</h2>
            <p>
              <strong>Hébergeur :</strong> Vercel Inc.<br />
              <strong>Pays :</strong> États-Unis<br />
              <strong>Site :</strong> vercel.com
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Propriété Intellectuelle</h2>
            <p>
              L’ensemble des contenus du site (textes, images, vidéos, logos, etc.)
              est protégé par le droit d’auteur. Toute reproduction totale ou partielle
              sans autorisation écrite est interdite.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Limitation de Responsabilité</h2>
            <p>
              Bien que nous nous efforcions de fournir des informations exactes,
              Prestigia Agency ne peut garantir l’absence d’erreurs ou omissions.
              Aucune responsabilité ne pourra être engagée en cas d’utilisation du site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Liens Externes</h2>
            <p>
              Les liens vers des sites tiers sont fournis à titre informatif.
              Prestigia Agency n’est pas responsable de leur contenu.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Modification</h2>
            <p>
              Prestigia Agency peut modifier les présentes mentions légales à tout moment.
            </p>
          </section>

          <footer className="pt-4">
            <p className="text-sm text-muted-foreground">Dernière mise à jour : Novembre 2024</p>
          </footer>
        </article>
      </div>
    </main>
  )
}
