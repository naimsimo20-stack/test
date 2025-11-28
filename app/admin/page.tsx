"use client"

import { useState, useEffect, useCallback } from "react"
import { Mail, FileText, Calendar } from "lucide-react"

type Quote = {
  id: number
  name: string
  email: string
  phone: string | null
  company: string | null
  service: string
  budget: string | null
  message: string | null
  created_at: string
}

type Message = {
  id: number
  name: string
  email: string
  subject: string
  message: string
  created_at: string
}

export default function AdminPage() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"quotes" | "messages">("quotes")

  /** Optimisation : useCallback pour éviter de recréer la fonction */
  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [quotesRes, messagesRes] = await Promise.all([
        fetch("/api/quotes-list"),
        fetch("/api/contacts-list"),
      ])

      if (quotesRes.ok) {
        const quoteData = await quotesRes.json()
        setQuotes(quoteData?.data ?? [])
      }

      if (messagesRes.ok) {
        const messageData = await messagesRes.json()
        setMessages(messageData?.data ?? [])
      }
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const EmptyState = ({ icon: Icon, message }: { icon: any; message: string }) => (
    <div className="text-center py-12 bg-card rounded-lg border border-border">
      <Icon className="mx-auto w-12 h-12 text-muted-foreground mb-4" aria-hidden="true" />
      <p className="text-muted-foreground">{message}</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-primary">Dashboard Admin</h1>
          <p className="text-muted-foreground mt-2">
            Gérez vos demandes de devis et messages de contact
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          {[
            { label: "Demandes de Devis", value: "quotes", count: quotes.length, Icon: FileText },
            { labe
