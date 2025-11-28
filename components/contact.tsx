"use client"

import { useState, useRef, useCallback } from "react"
import { Mail, MapPin, Phone } from "lucide-react"

export default function Contact() {
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState("")
  const formRef = useRef<HTMLFormElement>(null)

  const clearFeedback = () => setTimeout(() => setFeedback(""), 3500)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setFeedback("")

    const formData = new FormData(e.currentTarget)

    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      subject: String(formData.get("subject") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    }

    if (payload.message.length < 5) {
      setFeedback("✗ Votre message est trop court.")
      setLoading(false)
      clearFeedback()
      return
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        setFeedback(`✗ Erreur: ${data.error}`)
      } else {
        setFeedback("✓ Message reçu ! Nous reviendrons vers vous très vite.")
        formRef.current?.reset()
        clearFeedback()
      }
    } catch (err) {
      console.error("Erreur :", err)
      setFeedback("✗ Erreur serveur. Veuillez réessayer.")
    } finally {
      setLoading(false)
    }
  }

  const openEmail = useCallback(() => {
    window.open(
      "mailto:contact@prestigia-agency.com?subject=Demande%20d'information&body=Bonjour%2C%20j'aimerais%20plus%20d'informations%20concernant%20vos%20services.",
      "_self"
    )
  }, [])

  const openWhatsApp = useCallback(() => {
    window.open(
      "https://wa.me/212652768993?text=Bonjour%20Prestigia%20Agency%2C%20je%20souhaite%20plus%20d'informations.",
      "_blank"
    )
  }, [])

  const openLocation = useCallback(() => {
    window.open(
      "https://www.google.com/maps?q=Bld+Qods+The+Gold+Center+Casablanca+Ain+Chock",
      "_blank"
    )
  }, [])

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Parlons de Votre <span className="text-accent">Projet</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Contactez-nous pour une consultation gratuite et découvrez comment nous pouvons transformer votre vision.
          </p>
        </div>

        {/* CONTACT OPTIONS */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div
            onClick={openEmail}
            className="bg-background border border-accent/10 rounded-xl p-6 text-center cursor-pointer hover:border-accent/50 hover:bg-background/80 transition-all duration-300"
          >
            <Mail className="w-10 h-10 text-accent mx-auto mb-4" />
            <h3 className="font-bold text-foreground mb-2">Email</h3>
            <p className="text-muted-foreground">contact@prestigia-agency.com</p>
            <p className="text-xs text-accent/60 mt-2">Envoyer un email</p>
          </div>

          <div
            onClick={openWhatsApp}
            className="bg-background border border-accent/10 rounded-xl p-6 text-center cursor-pointer hover:border-accent/50 hover:bg-background/80 transition-all duration-300"
          >
            <Phone className="w-10 h-10 text-accent mx-auto mb-4" />
            <h3 className="font-bold text-foreground mb-2">Téléphone</h3>
            <p className="text-muted-foreground">+212 652 768 993</p>
            <p className="text-xs text-accent/60 mt-2">WhatsApp</p>
          </div>

          <div
            onClick={openLocation}
            className="bg-background border border-accent/10 rounded-xl p-6 text-center cursor-pointer hover:border-accent/50 hover:bg-background/80 transition-all duration-300"
          >
            <MapPin className="w-10 h-10 text-accent mx-auto mb-4" />
            <h3 className="font-bold text-foreground mb-2">Localisation</h3>
            <p className="text-muted-foreground">Voir sur la carte</p>
            <p className="text-xs text-accent/60 mt-2">Google Maps</p>
          </div>
        </div>

        {/* FORMULAIRE */}
        <div className="bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/20 rounded-2xl p-8">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Votre nom"
                required
                maxLength={60}
                className="input-style"
              />
              <input
                type="email"
                name="email"
                placeholder="Votre email"
                required
                maxLength={120}
                className="input-style"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="tel"
                name="phone"
                placeholder="Votre téléphone"
                maxLength={20}
                className="input-style"
              />
              <input
                type="text"
                name="subject"
                placeholder="Sujet"
                required
                maxLength={80}
                className="input-style"
              />
            </div>

            <textarea
              name="message"
              placeholder="Votre message"
              rows={5}
              required
              minLength={5}
              maxLength={800}
              className="input-style resize-none"
            />

            {/* FEEDBACK MESSAGE */}
            {feedback && (
              <div
                className={`p-3 rounded-lg text-center font-semibold ${
                  feedback.includes("✓")
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
                aria-live="polite"
              >
                {feedback}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-background py-3 rounded-lg hover:bg-accent/90 transition-all duration-300 font-semibold text-lg hover:scale-105 disabled:opacity-50"
            >
              {loading ? "Envoi..." : "Envoyer le Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
