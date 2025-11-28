import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Conditions d’Utilisation | Prestigia Agency",
  description: "Consultez les conditions générales d’utilisation du site web Prestigia Agency.",
  keywords: [
    "conditions d'utilisation",
    "Prestigia Agency",
    "mentions légales",
    "CGU",
    "règlement site web"
  ],
  alternates: {
    canonical: "https://prestigia-agency.com/conditions-utilisation",
  },
  openGraph: {
    title: "Conditions d’Utilisation | Prestigia Agency",
    description: "Lisez les conditions générales d’utilisation du site Prestigia Agency.",
    url: "https://prestigia-agency.com/conditions-utilisation",
    type: "article",
  },
}

export default function ConditionsUtilisation() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-accent via-accent to-purple-400 bg-clip-text text-transparent">
          Conditions d’Utilisation
        </h1>

        <article className="space-y-8 text-muted-foreground leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Acceptation des Conditions</h2>
            <p>
              En accédant et en utilisant ce site web, vous acceptez d’être lié par les présentes conditions 
              d’utilisation. Si vous n’acceptez pas ces conditions, veuillez ne pas utiliser ce site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Utilisation Autorisée</h2>
            <p className="mb-4">Vous acceptez d’utiliser ce site web uniquement à des fins légales et de ne pas&nbsp;:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Violer toute loi ou réglementation applicable</li>
              <li>Enfreindre les droits de propriété intellectuelle</li>
              <li>Transmettre des contenus offensants, abusifs ou haineux</li>
              <li>Tenter d’accéder à des zones protégées du site</li>
              <li>Utiliser des outils automatisés ou des scripts pour accéder au site</li>
              <li>Spammer ou transmettre du contenu malveillant</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Propriété Intellectuelle</h2>
            <p>
              Tous les contenus, designs, graphiques et logos présents sur ce site sont la propriété exclusive de 
              Prestigia Agency ou de ses partenaires. Toute reproduction, copie ou modification est interdite 
              sans autorisation écrite préalable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Comptes Utilisateur</h2>
            <p>
              Si vous créez un compte sur notre site, vous êtes responsable de la confidentialité de vos identifiants. 
              Vous acceptez d’être responsable de toute activité réalisée depuis votre compte.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Limitation de Responsabilité</h2>
            <p>
              Prestigia Agency ne peut être tenue responsable des dommages directs ou indirects liés à l’utilisation 
              de ce site web, même en cas d’information préalable de la possibilité de tels dommages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Absence de Garantie</h2>
            <p>
              Le site est fourni «&nbsp;tel quel&nbsp;» sans garantie d’aucune sorte. Prestigia Agency ne garantit pas 
              l’exactitude ou la disponibilité des contenus présents.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Indemnisation</h2>
            <p>
              Vous acceptez d’indemniser Prestigia Agency contre toute réclamation, procédure ou perte résultant 
              de votre utilisation du site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Liens Externes</h2>
            <p>
              Ce site peut contenir des liens vers des ressources externes. Prestigia Agency n’est pas responsable 
              du contenu ou des pratiques de ces sites tiers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Modification des Conditions</h2>
            <p>
              Prestigia Agency se réserve le droit de modifier ces conditions à tout moment. 
              Les modifications prennent effet dès leur publication sur le site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Résiliation</h2>
            <p>
              Prestigia Agency peut suspendre ou résilier votre accès au site sans préavis et pour toute raison valable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Droit Applicable</h2>
            <p>
              Les présentes conditions sont régies par les lois du Maroc. Tout litige sera soumis aux tribunaux 
              compétents de Casablanca.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Contact</h2>
            <p>
              Pour toute question concernant ces conditions, vous pouvez nous contacter&nbsp;:<br />
              <strong>Email :</strong> contact@prestigia-agency.com<br />
              <strong>Téléphone :</strong> +212 652 768 993
            </p>
          </section>

          <p className="text-sm text-muted-foreground">Dernière mise à jour : Novembre 2024</p>

        </article>
      </div>
    </main>
  )
}
