"use client"

import {
  getCLS,
  getFID,
  getFCP,
  getLCP,
  getTTFB,
  type Metric,
} from "web-vitals"

let sentMetrics = new Set<string>() // Avoid sending duplicates

function sendToAnalytics(metric: Metric) {
  const url = process.env.NEXT_PUBLIC_ANALYTICS_URL
  if (!url) return

  const body = JSON.stringify({
    id: metric.id,
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    timestamp: Date.now(),
  })

  // 🛑 Avoid spamming: send each metric type only once
  if (sentMetrics.has(metric.name)) return
  sentMetrics.add(metric.name)

  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body)
  } else {
    // Fallback (Safari, older browsers)
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body,
    })
  }
}

export function reportWebVitals(metric: Metric) {
  // Dev mode = log
  if (process.env.NODE_ENV === "development") {
    console.log("[Web Vitals]", metric)
  }

  // Production = analytics
  if (typeof window !== "undefined") {
    sendToAnalytics(metric)
  }
}

export function initWebVitals() {
  // Ensures this only runs client-side
  if (typeof window === "undefined") return

  try {
    getCLS(reportWebVitals)
    getFID(reportWebVitals)
    getFCP(reportWebVitals)
    getLCP(reportWebVitals)
    getTTFB(reportWebVitals)
  } catch (error) {
    console.error("Error initializing Web Vitals:", error)
  }
}
