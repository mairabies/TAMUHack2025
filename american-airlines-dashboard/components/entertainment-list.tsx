"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Coffee, ShoppingBag, Ticket, MapPin, Clock, DollarSign } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Entertainment {
  id: string
  name: string
  type: "restaurant" | "store" | "activity"
  location: string
  price: number // 1-5 scale
  distance: number // in meters
  duration?: number // in minutes, for activities
}

const entertainmentOptions: Entertainment[] = [
  { id: "1", name: "Skyline Café", type: "restaurant", location: "Terminal A", price: 3, distance: 150 },
  { id: "2", name: "Duty-Free Emporium", type: "store", location: "Terminal B", price: 4, distance: 300 },
  {
    id: "3",
    name: "Virtual Reality Lounge",
    type: "activity",
    location: "Terminal C",
    price: 5,
    distance: 450,
    duration: 30,
  },
  { id: "4", name: "Gourmet Burger Bar", type: "restaurant", location: "Terminal A", price: 2, distance: 200 },
  { id: "5", name: "Tech Gadget Hub", type: "store", location: "Terminal B", price: 3, distance: 350 },
  {
    id: "6",
    name: "Mini Golf Course",
    type: "activity",
    location: "Terminal C",
    price: 2,
    distance: 500,
    duration: 45,
  },
]

export function EntertainmentList() {
  const [filter, setFilter] = useState<"all" | "restaurant" | "store" | "activity">("all")
  const [sort, setSort] = useState<"price" | "distance" | "duration">("distance")

  const filteredAndSortedOptions = entertainmentOptions
    .filter((option) => filter === "all" || option.type === filter)
    .sort((a, b) => {
      if (sort === "price") return a.price - b.price
      if (sort === "duration") return (a.duration || 0) - (b.duration || 0)
      return a.distance - b.distance
    })

  const getIcon = (type: "restaurant" | "store" | "activity") => {
    switch (type) {
      case "restaurant":
        return <Coffee className="h-5 w-5 text-yellow-500" />
      case "store":
        return <ShoppingBag className="h-5 w-5 text-blue-500" />
      case "activity":
        return <Ticket className="h-5 w-5 text-green-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
          <SelectTrigger className="w-[180px] bg-white/10 backdrop-blur-sm border-transparent focus:border-blue-300 text-white">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="restaurant">Restaurants</SelectItem>
            <SelectItem value="store">Stores</SelectItem>
            <SelectItem value="activity">Activities</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={(value: any) => setSort(value)}>
          <SelectTrigger className="w-[180px] bg-white/10 backdrop-blur-sm border-transparent focus:border-blue-300 text-white">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="distance">Distance</SelectItem>
            <SelectItem value="price">Price</SelectItem>
            <SelectItem value="duration">Duration</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedOptions.map((option) => (
          <Card key={option.id} className="gradient-card border-none rounded-2xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                {getIcon(option.type)}
                {option.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-purple-400" />
                  <span className="text-sm">{option.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-400" />
                  <span className="text-sm">{option.distance}m away</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-400" />
                  <span className="text-sm">{"$".repeat(option.price)}</span>
                </div>
                {option.duration && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-pink-400" />
                    <span className="text-sm">{option.duration} min</span>
                  </div>
                )}
              </div>
              <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                More Info
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

