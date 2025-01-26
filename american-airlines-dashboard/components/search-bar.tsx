"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function SearchBar() {
  const router = useRouter()
  const [searchParams, setSearchParams] = useState({
    origin: '',
    destination: '',
    date: ''
  })

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  // Set max date to 1 year from today
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  const maxDateString = maxDate.toISOString().split('T')[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchParams.origin && searchParams.destination && searchParams.date) {
      const queryString = new URLSearchParams(searchParams).toString()
      router.push(`/?${queryString}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-4 w-full max-w-xl">
      <div className="flex flex-1 gap-2">
        <div className="relative flex-1">
          <Input
            placeholder="Origin (e.g., DFW)"
            className="pl-10 bg-white/10 backdrop-blur-sm border-transparent focus:border-blue-300 text-white placeholder-white/70"
            value={searchParams.origin}
            onChange={(e) => setSearchParams(prev => ({ ...prev, origin: e.target.value.toUpperCase() }))}
            maxLength={3}
          />
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>

        <div className="relative flex-1">
          <Input
            placeholder="Destination (e.g., JFK)"
            className="pl-10 bg-white/10 backdrop-blur-sm border-transparent focus:border-blue-300 text-white placeholder-white/70"
            value={searchParams.destination}
            onChange={(e) => setSearchParams(prev => ({ ...prev, destination: e.target.value.toUpperCase() }))}
            maxLength={3}
          />
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>

        <div className="relative flex-1">
          <Input
            type="date"
            min={today}
            max={maxDateString}
            className="pl-10 bg-white/10 backdrop-blur-sm border-transparent focus:border-blue-300 text-white placeholder-white/70"
            value={searchParams.date}
            onChange={(e) => setSearchParams(prev => ({ ...prev, date: e.target.value }))}
          />
        </div>
      </div>

      <Button 
        type="submit"
        className="bg-blue-500 hover:bg-blue-600"
        disabled={!searchParams.origin || !searchParams.destination || !searchParams.date}
      >
        Search
      </Button>
    </form>
  )
}

