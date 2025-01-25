"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function SearchBar() {
  return (
    <div className="relative w-full max-w-xl">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search flights..."
        className="pl-10 bg-white/10 backdrop-blur-sm border-transparent focus:border-blue-300 text-white placeholder-white/70"
      />
    </div>
  )
}

