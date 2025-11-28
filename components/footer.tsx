"use client"

import React, { useCallback, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Mail, MapPin, Phone, Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

const QuoteModal = dynamic(() => import("./quote-modal"), { ssr: false })

type NavLink = { label: string; href: string }

const NAV_LINKS: NavLink[] = [
  { label: "Accueil", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Fondateurs", href: "#team" },
  { label: "Partenaires", href: "#partners" },
  { label: "Contact", href: "#contact" },
  { label: "Blog", href: "/blog" },
]

const SERVICE_LINKS: NavLink[] = [
  { label: "SEO & SEM", href: "#services" },
  { label: "Branding", href: "#services" },
  { label: "Développement Web", href: "#services" },
  { label: "Marketing Stratégique", href: "#services" },
]

const LEGAL_LINKS: NavLink[] = [
  { label: "Mentions Légales", href: "/mentions-legales" },
  { label: "Politique de Confidentialité", href: "/politique-confidentialite" },
  { label: "Conditions d'Utilisation", href: "/conditions-utilisation" },
]

const SOCIALS: { label: string; href: string; Icon: React.ComponentType<any> }[] = [
  { label: "Facebook", href: "https://facebook.com/prestigia", Icon: Facebook },
  { label: "Instagram", href: "https://instagram.com/prestigia", Icon: Instagram },
  { label: "LinkedIn", href: "https://linkedin.com/company/prestigia", Icon: Linkedin },
  { label: "Twitter", href: "https://twitter.com/prestigia", Icon: Twitter },
]

// Utility to respect reduced motion preference
function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export default function FooterCompact(): JSX.Element {
  const [showQuoteModal, setShowQuoteModal] = useState(false)

  const handleNavClick = useCallback((href: string) => {
    if (!href.startsWith("#")) return
    const el = document.querySelector(href)
    if (!el) return
    el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" })
    // set focus for accessibility
    ;(el as HTMLElement | null)?.focus?.({ preventScroll: true })
  }, [])

  return (
    <>
      <QuoteModal isOpen={showQuoteModal} onClose={() => setShowQuoteModal(false)} />

      <footer className="bg-gradient-to-t from-card to-background border-t border-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 mb-12">
            {/* Logo & About */}
            <div className="lg:col-span-1 space-y-4">
              <div className="flex items-start gap-3">
                <Image
                  src="/images/prestigia-logo.png"
                  alt="Prestigia Agency"
                  width={48}
                  height={48}
                  className="rounded-lg"
                />
                <div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-accent via-accent to-purple-400 bg-clip-text text-transparent">
                    Prestigia
                  </div>
                  <div className="text-xs font-light tracking-widest text-accent/70 uppercase border-t border-accent/30 pt-1">
                    Agency
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed">
                Transformez votre présence digitale avec notre expertise en marketing stratégique et développement web.
              </p>

              <div className="flex gap-3 pt-4" role="list" aria-label="Réseaux sociaux">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-full bg-accent/10 hover:bg-accent hover:text-background transition-all duration-300 flex items-center justify-center text-accent"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="space-y-4">
              <h3 className="font-bold text-foreground text-lg">Navigation</h3>
              <ul className="space-y-3">
                {NAV_LINKS.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith("#") ? (
                      <button
                        onClick={() => handleNavClick(l.href)}
                        className="text-muted-foreground hover:text-accent transition-colors text-sm"
                        aria-label={`Aller à ${l.label}`}
                      >
                        {l.label}
                      </button>
                    ) : (
                      <Link href={l.href} className="text-muted-foreground hover:text-accent transition-colors text-sm">
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h3 className="font-bold text-foreground text-lg">Services</h3>
              <ul className="space-y-3">
                {SERVICE_LINKS.map((l) => (
                  <li key={l.label}>
                    <button
                      onClick={() => handleNavClick(l.href)}
                      className="text-muted-foreground hover:text-accent transition-colors text-sm"
                      aria-label={l.label}
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h3 className="font-bold text-foreground text-lg">Contact</h3>

              <div className="space-y-3">
                <a
                  href="tel:+212652768993"
                  className="w-full flex gap-3 items-center p-3 rounded-lg hover:bg-accent/5 transition-colors group"
                  aria-label="Téléphoner Prestigia Agency"
                >
                  <Phone className="w-5 h-5 text-accent flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div className="text-left flex-grow min-w-0">
                    <p className="text-muted-foreground text-xs">Téléphone</p>
                    <p className="text-foreground text-sm truncate">+212 652 768 993</p>
                  </div>
                </a>

                <a
                  href="mailto:contact@prestigia-agency.com?subject=Demande%20d'information%20-%20Prestigia%20Agency"
                  target="_self"
                  className="w-full flex gap-3 items-center p-3 rounded-lg hover:bg-accent/5 transition-colors group"
                  aria-label="Envoyer un email à Prestigia Agency"
                >
                  <Mail className="w-5 h-5 text-accent flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div className="text-left flex-grow min-w-0">
                    <p className="text-muted-foreground text-xs">Email</p>
                    <p className="text-foreground text-sm break-words text-xs md:text-sm">contact@prestigia-agency.com</p>
                  </div>
                </a>

                <a
                  href="https://www.google.com/maps?q=Bld+Qods+The+Gold+Center+Casablanca+Ain+Chock"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex gap-3 items-start p-3 rounded-lg hover:bg-accent/5 transition-colors group"
                  aria-label="Voir la localisation sur Google Maps"
                >
                  <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div className="text-left flex-grow">
                    <p className="text-muted-foreground text-xs">Localisation</p>
                    <p className="text-foreground text-xs md:text-sm hover:text-accent transition-colors">
                      Casablanca, Ain Chock
                      <br />
                      Bld Qods The Gold Center
                      <br />
                      Étage 1, Bureau 2
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* CTA */}
            <div className="space-y-4 flex flex-col sm:col-span-2 lg:col-span-1">
              <h3 className="font-bold text-foreground text-lg">Commencer</h3>
              <p className="text-muted-foreground text-sm flex-grow">Prêt à transformer votre présence digitale?</p>
              <button
                onClick={() => setShowQuoteModal(true)}
                className="bg-accent text-background px-6 py-3 rounded-full hover:bg-accent/90 transition-all duration-300 font-semibold hover:scale-105 w-full"
                aria-label="Demander un devis"
              >
                Demander un Devis
              </button>
            </div>
          </div>

          <div className="border-t border-border my-8" />

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-center sm:justify-between">
            <div className="text-muted-foreground text-xs md:text-sm text-center sm:text-left">
              © {new Date().getFullYear()} Prestigia Agency. Tous droits réservés.
            </div>

            <div className="flex flex-col xs:flex-row gap-4 sm:gap-6 text-center sm:text-right">
              {LEGAL_LINKS.map((l) => (
                <Link key={l.label} href={l.href} className="text-muted-foreground hover:text-accent transition-colors text-xs md:text-sm">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
