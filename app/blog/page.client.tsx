"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  image: string
  date: string
  author: string
  readTime: number
  tags: string[]
}

const blogPosts: BlogPost[] = [ /* … tes données inchangées … */ ]

const categories = ["Tous", "SEO", "Branding", "Développement", "Marketing", "Conseil"]

export default function BlogClientPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tous")

  const filteredPosts =
    selectedCategory === "Tous"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory)

  return (
    <>
      <Navigation />

      <main
        className="w-full pt-32 pb-20 px-4 sm:px-6 lg:px-8"
        itemScope
        itemType="https://schema.org/Blog"
      >
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <header className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
              Notre <span className="text-accent">Blog</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Guides, conseils et stratégies pour réussir votre transformation digitale.
            </p>
          </header>

          {/* Filter */}
          <nav
            aria-label="Filtrer les articles du blog"
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSe
