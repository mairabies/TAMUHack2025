"use client"

import { useState } from "react"
import { EntertainmentMap } from "@/components/entertainment-map"
import { ActivityCarousel } from "@/components/activity-carousel"
import { AnimatedSubtitle } from "@/components/animated-subtitle"

export default function EntertainmentPage() {
  const [activeActivity, setActiveActivity] = useState<string | null>(null)

  return (
    <div className="min-h-screen entertainment-bg">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-4">Airport Entertainment</h1>
        <AnimatedSubtitle text="Discover fun around every corner!" />
        <div className="space-y-8">
          <ActivityCarousel activeActivity={activeActivity} setActiveActivity={setActiveActivity} />
          <EntertainmentMap activeActivity={activeActivity} setActiveActivity={setActiveActivity} />
        </div>
      </main>
    </div>
  )
}

