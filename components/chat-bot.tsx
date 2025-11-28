// ======= FILE: chatbot/types.ts =======
export type Sender = "user" | "bot"

export type QuickReply = {
  label: string
  value: string
  action?: "call" | "whatsapp" | "email" | "maps"
}

export type Message = {
  id: string
  text: string
  sender: Sender
  timestamp: string // ISO
  quickReplies?: QuickReply[]
}

export type InternalTask = {
  TYPE_DE_DEMANDE: string
  URGENCE: "basse" | "normale" | "élevée"
  ACTION_INTERNE: string
}

// ======= FILE: chatbot/knowledge.ts =======
import type { InternalTask, QuickReply } from "./types"

type KBEntry = {
  id: string
  keywords: string[]
  response: (task: InternalTask) => string
  quickReplies?: QuickReply[]
}

// Reuse your previous knowledge base but keep only data / pure functions here
export const KNOWLEDGE_BASE: KBEntry[] = [
  {
    id: "services",
    keywords: ["service", "offre", "propose", "faire", "capabilities", "quoi", "aide"],
    response: (task) => `✅ Je note votre demande :\n• Type : ${task.TYPE_DE_DEMANDE}\n• Urgence : ${task.URGENCE}\n• Action agence : ${task.ACTION_INTERNE}\n\nNos services :\n🎨 Design Web & Branding\n📱 Développement Mobile & Web\n🔍 SEO & Optimisation Performance\n📊 Publicités Facebook/Instagram/TikTok\n📝 Création de Contenu & Copywriting\n💼 Stratégie Marketing Digitale\n⚡ Analyse & Optimisation Conversion\n\nQuel service vous intéresse particulièrement ?`,
    quickReplies: [
      { label: "🎨 Design Web", value: "design web" },
      { label: "📱 Mobile", value: "développement mobile" },
      { label: "🔍 SEO", value: "SEO" },
      { label: "📊 Pub Digitale", value: "publicité" },
    ],
  },
  {
    id: "contact",
    keywords: ["contact", "joindre", "appeler", "email", "téléphone", "adresse"],
    response: (task) => `✅ Comment nous joindre :\n\n📱 Téléphone : +212 652 768 993\n📧 Email : contact@prestigia-agency.com\n💬 WhatsApp : Disponible 24/7\n📍 Localisation : Casablanca, Ain Chock\n\nChoisissez votre méthode de contact :`,
    quickReplies: [
      { label: "☎️ Appeler directement", value: "appeler", action: "call" },
      { label: "💬 Discuter sur WhatsApp", value: "whatsapp", action: "whatsapp" },
      { label: "📧 Envoyer un email", value: "email", action: "email" },
      { label: "🗺️ Voir localisation", value: "localisation", action: "maps" },
    ],
  },
  {
    id: "faq",
    keywords: ["faq", "question", "réponse", "comment", "pourquoi"],
    response: (task) => `✅ Questions fréquentes :\n\nCombien de temps prend un projet ? En moyenne 4-8 semaines...\n\nVous voulez un exemple précis ?`,
    quickReplies: [
      { label: "⏱️ Délai projet", value: "combien de temps" },
      { label: "🛡️ Garantie", value: "garantie" },
    ],
  },
]

// ======= FILE: chatbot/engine.ts =======
import { KNOWLEDGE_BASE } from "./knowledge"
import type { InternalTask } from "./types"

// Lightweight scoring: counts keyword hits, also supports partial match
export function identifyTask(userInput: string): InternalTask {
  const input = userInput.toLowerCase()
  if (/design|site|web|création/.test(input)) {
    return { TYPE_DE_DEMANDE: "Projet Web ou Design", URGENCE: "normale", ACTION_INTERNE: "Audit technique et proposition" }
  }
  if (/seo|référenc|google/.test(input)) {
    return { TYPE_DE_DEMANDE: "Optimisation SEO", URGENCE: "normale", ACTION_INTERNE: "Audit SEO gratuit" }
  }
  if (/publicit|facebook|instagram|tiktok|ads/.test(input)) {
    return { TYPE_DE_DEMANDE: "Campagne Publicitaire", URGENCE: "normale", ACTION_INTERNE: "Proposition de budget" }
  }
  if (/urgent|immédiat|asap|rapidement/.test(input)) {
    return { TYPE_DE_DEMANDE: "Projet urgent", URGENCE: "élevée", ACTION_INTERNE: "Contact direct responsable" }
  }
  return { TYPE_DE_DEMANDE: "Demande générale", URGENCE: "basse", ACTION_INTERNE: "Qualification" }
}

function scoreEntry(entryKeywords: string[], inputWords: string[]): number {
  let score = 0
  for (const kw of entryKeywords) {
    for (const w of inputWords) {
      if (w === kw) score += 2
      else if (w.includes(kw) || kw.includes(w)) score += 1
      else if (kw.startsWith(w) || w.startsWith(kw.substring(0, 3))) score += 0.5
    }
  }
  return score
}

export function findBestMatch(userInput: string) {
  const normalized = userInput.toLowerCase().replace(/[.,!?;:]/g, " ")
  const words = normalized.split(/\s+/).filter(Boolean)
  const task = identifyTask(userInput)

  let best = { entry: null as any, score: 0 }
  for (const entry of KNOWLEDGE_BASE) {
    const s = scoreEntry(entry.keywords, words)
    if (s > best.score) best = { entry, score: s }
  }

  if (best.entry && best.score > 0) {
    return { response: best.entry.response(task), quickReplies: best.entry.quickReplies }
  }

  // fallback generic
  return {
    response: `Merci pour votre question ! Pouvez-vous préciser un peu ? Voici ce que nous proposons si vous avez besoin d'inspiration :\n• SEO\n• Design Web\n• Campagnes Ads\n• Stratégie digitale`,
    quickReplies: [
      { label: "🔍 Audit SEO", value: "audit seo" },
      { label: "🎨 Design Web", value: "design web" },
    ],
  }
}

// ======= FILE: chatbot/actions.ts =======
export function handleContactAction(action?: string) {
  if (!action) return
  switch (action) {
    case "call":
      window.location.href = "tel:+212652768993"
      break
    case "whatsapp":
      window.open("https://wa.me/212652768993?text=Bonjour%20Prestigia%20Agency", "_blank")
      break
    case "email":
      window.location.href = "mailto:contact@prestigia-agency.com"
      break
    case "maps":
      window.open("https://maps.google.com/?q=Bld+Qods+The+Gold+Center+Casablanca+Ain+Chock", "_blank")
      break
  }
}

// ======= FILE: chatbot/components/MessageList.tsx =======
import React from "react"
import type { Message } from "../types"

export function MessageList({ messages }: { messages: Message[] }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3" aria-live="polite">
      {messages.map((m) => (
        <div key={m.id} className={`flex ${m.sender === "bot" ? "justify-start" : "justify-end"}`}>
          <div className={`max-w-xs rounded-lg px-3 py-2 text-sm whitespace-pre-wrap ${m.sender === "bot" ? "bg-accent/10 text-foreground border border-accent/20" : "bg-accent text-white"}`}>
            {m.text}
          </div>
        </div>
      ))}
    </div>
  )
}

// ======= FILE: chatbot/components/QuickReplies.tsx =======
import React from "react"
import type { QuickReply } from "../types"

export function QuickReplies({ replies, onSelect }: { replies?: QuickReply[]; onSelect: (r: QuickReply) => void }) {
  if (!replies || replies.length === 0) return null
  return (
    <div className="pt-2">
      <div className="flex flex-wrap gap-2">
        {replies.map((r) => (
          <button
            key={r.value}
            onClick={() => onSelect(r)}
            className="px-3 py-1.5 bg-accent/10 hover:bg-accent/20 border border-accent/30 rounded-full text-xs font-medium text-foreground transition-all duration-200 hover:scale-105 whitespace-nowrap hover:border-accent/60"
            aria-label={`Répondre: ${r.label}`}
          >
            {r.label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ======= FILE: chatbot/components/InputBar.tsx =======
import React, { useRef, useEffect } from "react"

export function InputBar({ value, onChange, onSend, disabled }: { value: string; onChange: (v: string) => void; onSend: () => void; disabled?: boolean }) {
  const ref = useRef<HTMLInputElement | null>(null)
  useEffect(() => ref.current?.focus(), [])
  return (
    <div className="border-t border-accent/20 p-3 flex gap-2">
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            onSend()
          }
        }}
        placeholder="Votre message..."
        className="flex-1 px-3 py-2 bg-background border border-accent/20 rounded-lg text-sm focus:outline-none focus:border-accent/60 transition-colors"
        aria-label="Message"
      />
      <button
        onClick={onSend}
        disabled={disabled}
        className="px-3 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
        aria-label="Envoyer"
      >
        ➤
      </button>
    </div>
  )
}

// ======= FILE: chatbot/index.tsx =======
"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"
import dynamic from "next/dynamic"
import { v4 as uuidv4 } from "uuid"

import type { Message, QuickReply } from "./types"
import { findBestMatch, identifyTask } from "./engine"
import { handleContactAction } from "./actions"
import { MessageList } from "./components/MessageList"
import { QuickReplies } from "./components/QuickReplies"
import { InputBar } from "./components/InputBar"

const QuoteModal = dynamic(() => import("./quote-modal"), { ssr: false })

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  const endRef = useRef<HTMLDivElement | null>(null)

  // scroll to bottom
  const scroll = useCallback(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => scroll(), [messages, scroll])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        pushBotMessage(`Bonjour 👋\n\nJe suis l'assistant Prestigia Agency. Comment puis-je vous aider aujourd'hui ?`, [
          { label: "🎨 Services", value: "services" },
          { label: "📂 Portfolio", value: "portfolio" },
          { label: "👥 Équipe", value: "equipe" },
          { label: "❓ Questions", value: "faq" },
        ])
      }, 500)
    }
  }, [isOpen, messages.length])

  const pushBotMessage = useCallback((text: string, quickReplies?: QuickReply[]) => {
    const m: Message = { id: uuidv4(), text, sender: "bot", timestamp: new Date().toISOString(), quickReplies }
    setMessages((s) => [...s, m])
    setIsTyping(false)
  }, [])

  const pushUserMessage = useCallback((text: string) => {
    const m: Message = { id: uuidv4(), text, sender: "user", timestamp: new Date().toISOString() }
    setMessages((s) => [...s, m])
  }, [])

  const sendMessage = useCallback(() => {
    const trimmed = inputValue.trim()
    if (!trimmed) return
    // limit length for safety
    if (trimmed.length > 800) trimmed = trimmed.slice(0, 800)

    pushUserMessage(trimmed)
    setInputValue("")
    setIsTyping(true)

    // compute reply
    setTimeout(() => {
      const task = identifyTask(trimmed)
      const { response, quickReplies } = findBestMatch(trimmed)
      pushBotMessage(response, quickReplies)
    }, 800 + Math.random() * 600)
  }, [inputValue, pushUserMessage, pushBotMessage])

  const handleQuickReply = useCallback((reply: QuickReply) => {
    if (reply.action) {
      handleContactAction(reply.action)
      return
    }
    pushUserMessage(reply.value)
    setIsTyping(true)
    setTimeout(() => {
      const { response, quickReplies } = findBestMatch(reply.value)
      pushBotMessage(response, quickReplies)
    }, 800 + Math.random() * 600)
  }, [pushUserMessage, pushBotMessage])

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-4">
      <button
        onClick={() => { setIsOpen((s) => !s) }}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-accent to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 flex items-center justify-center font-bold text-xl"
        aria-label={isOpen ? "Fermer le chat" : "Ouvrir le chat"}
      >
        {isOpen ? "✕" : "💬"}
      </button>

      {isOpen && (
        <div className="w-full max-w-md bg-background border border-accent/20 rounded-2xl shadow-2xl flex flex-col h-96 overflow-hidden" role="dialog" aria-modal="true">
          <div className="bg-gradient-to-r from-accent to-purple-600 text-white px-4 py-3 font-semibold text-center">Prestigia Assistant</div>

          <MessageList messages={messages} />

          {/* quick replies for last bot message */}
          {messages.length > 0 && messages[messages.length - 1].sender === 'bot' && (
            <QuickReplies replies={messages[messages.length - 1].quickReplies} onSelect={handleQuickReply} />
          )}

          <div ref={endRef} />

          <InputBar value={inputValue} onChange={(v) => setInputValue(v)} onSend={sendMessage} disabled={isTyping} />
        </div>
      )}

      {showQuoteModal && <QuoteModal isOpen={showQuoteModal} onClose={() => setShowQuoteModal(false)} />}
    </div>
  )
}

// ======= FILE: chatbot/quote-modal.tsx =======
import React from "react"

export default function QuoteModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-card rounded-lg p-6 max-w-lg w-full">
        <h3 className="text-xl font-bold mb-4">Demander un devis</h3>
        <p className="text-sm text-muted-foreground mb-4">Notre équipe vous contactera sous 24h.</p>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-muted rounded">Fermer</button>
          <button className="px-4 py-2 bg-accent text-background rounded">Envoyer</button>
        </div>
      </div>
    </div>
  )
}

/* ======= USAGE =======

1) Place the `chatbot` folder under `/components` or `/app/components`.
2) Import the ChatBot component dynamically where you want it:

   import dynamic from "next/dynamic"
   const ChatBot = dynamic(() => import("@/components/chatbot/index"), { ssr: false })

3) Ensure tailwind variables (accent, background, etc.) exist in globals.css.
4) Optional: persist messages to localStorage or backend.

*/
