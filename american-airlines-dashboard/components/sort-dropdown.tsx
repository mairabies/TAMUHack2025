"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SortDropdown() {
  return (
    <Select defaultValue="match">
      <SelectTrigger className="w-[180px] bg-white/10 backdrop-blur-sm border-transparent focus:border-blue-300 text-white">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="match">Best Match</SelectItem>
        <SelectItem value="time">Departure Time</SelectItem>
        <SelectItem value="price">Price</SelectItem>
        <SelectItem value="duration">Duration</SelectItem>
      </SelectContent>
    </Select>
  )
}

