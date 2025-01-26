"use client"

import { SearchBar } from "@/components/search-bar"
import { FlightInfo } from "@/components/flight-info"
import { RebookingOptions } from "@/components/rebooking-options"
import { SortDropdown } from "@/components/sort-dropdown"
import { useSearchParams } from "next/navigation"

export default function RebookingDashboard() {
  const searchParams = useSearchParams()
  const params = {
    date: searchParams.get('date') || '',
    origin: searchParams.get('origin') || '',
    destination: searchParams.get('destination') || '',
  }

  return (
    <div className="min-h-screen gradient-bg">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">AI Flight Rebooking</h1>
        <div className="space-y-6">
          <div className="flex flex-col items-center md:flex-row md:justify-between gap-4">
            <SearchBar />
            <SortDropdown />
          </div>
          <FlightInfo />
          <RebookingOptions searchParams={params} />
        </div>
      </main>
    </div>
  )
}

