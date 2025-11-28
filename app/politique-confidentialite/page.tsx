import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Politique de Confidentialité | Prestigia Agency",
  description:
    "Consultez la politique de confidentialité de Prestigia Agency. Découvrez comment vos données personnelles sont collectées, utilisées, protégées et vos droits conformément au RGPD.",
  keywords: [
    "politique de confidentialité",
    "RGPD",
    "protection des données",
    "Prestigia Agency",
    "données personnelles",
    "agence digitale Casablanca",
  ],
  alternates: {
    canonical: "https://www.prestigia-agency.com/politique-de-confidentialite",
  },
  openGraph: {
    title: "Politique de Confidentialité | Prestigia Agency",
    description:
      "Découvrez comment Prestigia Agency protège vos données personnelles conformément au RGPD.",
    url: "https://www.prestigia-agency.com/politique-de-confidentialite",
    siteName: "Prestigia Agency",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Politique de Confidentialité | Prestigia Agency",
    description:
      "Politique RGPD : collecte, utilisation, protection et droits relatifs à vos données personnelles.",
  },
}

export const dynamic = "force-static"

export default function PolitiqueConfidentialite() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PrivacyPolicy",
    name: "Politique de Confidentialité - Prestigia Agency",
    url: "https://www.prestigia-agency.com/politique-de-confidentialite",
    description:
      "Politique RGPD de Prestigia Agency concernant la collecte, l'utilisation, la protection et les droits des utilisateurs.",
    publisher: {
      "@type": "Organization",
      name: "Prestigia Agency",
      url: "https://www.prestigia-agency.com",
      email: "contact@prestigia-agency.com",
      telephone: "+212652768993",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Bld Qods The Gold Center, Étage 1, Bureau 2",
        addressLocality: "Casablanca",
        addressCountry: "MA",
      },
    },
  }

  return (
    <main className="min-h-screen bg-background pt-24 pb-20">
      {/* JSON-LD SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-10 bg-gradient-to-r from-accent via-accent to-purple-400 bg-clip-text text-transparent">
          Politique de Confidentialité
        </h1>

        <article className="space-y-10 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Introduction</h2>
            <p>
              Chez Prestigia Agency, nous accordons une grande importance à la protection
              de votre vie privée. Cette politique explique la nature des données que nous
              collectons, la manière dont nous les utilisons et les mesures mises en place
              pour assurer leur sécurité.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Données Collectées</h2>
            <p className="mb-3">Nous pouvons collecter les informations suivantes :</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Numéro de téléphone</li>
              <li>Société et poste</li>
              <li>Localisation géographique</li>
              <li>Données de navigation (cookies, analytics)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Utilisation des Données</h2>
            <p className="mb-3">Vos informations sont utilisées pour :</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Répondre à vos demandes de contact ou devis</li>
              <li>Envoyer des contenus marketing (si vous y consentez)</li>
              <li>Améliorer l’expérience utilisateur</li>
              <li>Analyser les performances du site</li>
              <li>Respecter nos obligations légales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Protection des Données</h2>
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles avancées telles
              que le chiffrement SSL, la sécurisation des formulaires et des protocoles d'accès
              stricts pour protéger vos données contre l'accès non autorisé, la perte ou le vol.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Droits des Utilisateurs</h2>
            <p className="mb-3">
              Vous disposez de droits sur vos données conformément au RGPD :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Droit d'accès</li>
              <li>Droit de rectification</li>
              <li>Droit à l'effacement</li>
              <li>Droit à la portabilité</li>
              <li>Droit d'opposition au traitement</li>
            </ul>
            <p className="mt-4">
              Pour exercer vos droits, contactez-nous à :{" "}
              <strong>contact@prestigia-agency.com</strong>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Cookies</h2>
            <p>
              Nous utilisons des cookies pour améliorer votre expérience. Vous pouvez accepter
              ou refuser les cookies non essentiels en modifiant les paramètres de votre
              navigateur ou via notre bandeau de consentement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Partage des Données</h2>
            <p>
              Vos données ne sont jamais vendues. Elles peuvent être partagées uniquement
              avec des prestataires essentiels (hébergement, analytics) ou lorsque la loi
              l'exige.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Contact</h2>
            <p>
              Pour toute question relative à cette politique :<br />
              <strong>Email :</strong> contact@prestigia-agency.com<br />
              <strong>Téléphone :</strong> +212 652 768 993
            </p>
          </section>

          <footer>
            <p className="text-sm text-muted-foreground">
              Dernière mise à jour : Novembre 2024
            </p>
          </footer>
        </article>
      </div>
    </main>
  )
}
