"use client"

import { Suspense, lazy, useState, useEffect, memo } from "react"
import SplashScreen from "@/components/splash-screen"
import Navigation from "@/components/navigation"
import Hero from "@/components/hero"

// Lazy-loaded sections (non critiques pour le Above-The-Fold)
const Services = lazy(() => import("@/components/services"))
const Team = lazy(() => import("@/components/team"))
const Partners = lazy(() => import("@/components/partners"))
const Contact = lazy(() => import("@/components/contact"))
const Location = lazy(() => import("@/components/location"))
const Footer = lazy(() => import("@/components/footer"))
const ChatBot = lazy(() => import("@/components/chat-bot"))

function PageContent() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1600) // Optimisé pour UX
    return () => clearTimeout(timer)
  }, [])

  if (showSplash) {
    return <SplashScreen onAccess={() => setShowSplash(false)} />
  }

  return (
    <main className="w-full min-h-screen" role="main">
      <Navigation />
      <Hero />

      {/* Suspense wrapper optimisé */}
      <Suspense fallback={<SectionSkeleton />}>
        <Services />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Team />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Partners />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Contact />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Location />
      </Suspense>

      {/* Composants légers → pas de splash nécessaire */}
      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      <Suspense fallback={null}>
        <ChatBot />
      </Suspense>
    </main>
  )
}

/* Petit skeleton propre pour éviter le CLS */
const SectionSkeleton = memo(() => (
  <div className="w-full h-72 bg-muted/20 animate-pulse rounded-lg my-10" />
))

export default memo(PageContent)
