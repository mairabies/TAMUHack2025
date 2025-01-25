"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Users } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface HelpDesk {
  id: string
  name: string
  location: string
  waitTime: number
  peopleInLine: number
  coordinates: {
    lat: number
    lng: number
  }
  distance: number // in meters
}

const helpDesks: HelpDesk[] = [
  {
    id: "1",
    name: "Terminal A Help Desk",
    location: "Near Gate A15",
    waitTime: 15,
    peopleInLine: 5,
    coordinates: { lat: 40.6413, lng: -73.7781 },
    distance: 100,
  },
  {
    id: "2",
    name: "Terminal B Central",
    location: "Main Concourse",
    waitTime: 30,
    peopleInLine: 12,
    coordinates: { lat: 40.6423, lng: -73.7781 },
    distance: 250,
  },
  {
    id: "3",
    name: "Terminal C Service Center",
    location: "Food Court Level",
    waitTime: 5,
    peopleInLine: 2,
    coordinates: { lat: 40.6433, lng: -73.7781 },
    distance: 500,
  },
]

export function HelpDeskList() {
  const [selectedDesk, setSelectedDesk] = useState<HelpDesk | null>(null)
  const sortedHelpDesks = helpDesks.sort((a, b) => a.distance - b.distance)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedHelpDesks.map((desk) => (
        <Card key={desk.id} className="gradient-card border-none rounded-2xl overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl font-bold">{desk.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-sm">{desk.distance}m away</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-sm">{desk.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-purple-400" />
                <span className="text-sm">~{desk.waitTime} min wait</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-pink-400" />
                <span className="text-sm">{desk.peopleInLine} people in line</span>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    onClick={() => setSelectedDesk(desk)}
                  >
                    View on Map
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>{desk.name}</DialogTitle>
                  </DialogHeader>
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${desk.coordinates.lat},${desk.coordinates.lng}`}
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

