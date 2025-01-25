"use client"

import { useState, useEffect } from "react"

export function AnimatedSubtitle({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState("")

  useEffect(() => {
    let i = 0
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => prev + text.charAt(i))
        i++
      } else {
        clearInterval(typingInterval)
      }
    }, 50)

    return () => clearInterval(typingInterval)
  }, [text])

  return <h2 className="text-2xl font-semibold text-white mb-8 h-8">{displayText}</h2>
}

