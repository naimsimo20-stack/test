"use client"

import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

// --- DATA (inchangée) ---
const blogPosts = [ /* ... ton tableau ici ... */ ]

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <Navigation />

      <main className="w-full pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <article
          className="max-w-3xl mx-auto"
          itemScope
          itemType="https://schema.org/BlogPosting"
        >
          {/* SEO structured data */}
          <meta itemProp="headline" content={post.title} />
          <meta itemProp="datePublished" content={post.date} />
          <meta itemProp="author" content={post.author} />
          <meta itemProp="image" content={post.image} />

          {/* Navigation */}
          <nav aria-label="Retour">
            <Link
              href="/blog"
              className="text-accent hover:text-accent/80 transition-colors mb-8 inline-flex items-center"
            >
              ← Retour au blog
            </Link>
          </nav>

          {/* Header */}
          <header className="mb-8">
            <div className="mb-4 flex items-center gap-3">
              <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-semibold">
                {post.category}
              </span>

              <time
                itemProp="datePublished"
                dateTime={post.date}
                className="text-muted-foreground text-sm"
              >
                {new Date(post.date).toLocaleDateString("fr-FR")}
              </time>
            </div>

            <h1
              className="text-4xl md:text-5xl font-bold text-foreground mb-4"
              itemProp="name"
            >
              {post.title}
            </h1>

            <div className="flex items-center justify-between py-4 border-b border-border">
              <div>
                <p className="text-muted-foreground text-sm">
                  Par <span itemProp="author">{post.author}</span>
                </p>
                <p className="text-muted-foreground text-sm">
                  {post.readTime} min de lecture
                </p>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <figure className="relative h-96 rounded-xl overflow-hidden mb-12 bg-muted">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              placeholder="blur"
              blurDataURL="/placeholder.png"
            />
          </figure>

          {/* Content */}
          <section
            itemProp="articleBody"
            className="prose prose-invert max-w-none mb-12 text-foreground"
          >
            {/* Sécurisé : préserve format, sans interpréter HTML */}
