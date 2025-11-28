"use client"

import { useEffect, useRef } from "react"

export default function Footer3DBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    containerRef.current.appendChild(canvas)

    const resize = () => {
      canvas.width = containerRef.current!.clientWidth
      canvas.height = containerRef.current!.clientHeight
    }

    resize()

    window.addEventListener("resize", resize)

    const PARTICLE_COUNT = 60
    const particles = Array.from({ length: PARTICLE_COUNT }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      size: Math.random() * 1.8 + 0.8,
      opacity: Math.random() * 0.5 + 0.4,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Effet glow léger
      ctx.fillStyle = "rgba(0,0,0,0)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Dessin particules
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        // Glow effect
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4)
        gradient.addColorStop(0, `rgba(168, 85, 247, ${p.opacity})`)
        gradient.addColorStop(1, "rgba(168, 85, 247, 0)")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2)
        ctx.fill()

        // Core point
        ctx.fillStyle = `rgba(168, 85, 247, ${p.opacity})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // Lignes entre particules
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 140) {
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.25 * (1 - dist / 140)})`
            ctx.lineWidth = 0.8
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      window.removeEventListener("resize", resize)
      canvas.remove()
    }
  }, [])

  return <div ref={containerRef} className="w-full h-64 opacity-70 relative overflow-hidden" />
}
