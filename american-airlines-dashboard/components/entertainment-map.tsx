"use client"

import { useState } from "react"
import { Coffee, ShoppingBag, Ticket, MapPin } from "lucide-react"

interface Activity {
  id: string
  name: string
  type: "restaurant" | "store" | "activity"
  position: { x: number; y: number }
}

const activities: Activity[] = [
  { id: "1", name: "Skyline Café", type: "restaurant", position: { x: 20, y: 30 } },
  { id: "2", name: "Duty-Free Emporium", type: "store", position: { x: 50, y: 60 } },
  { id: "3", name: "Virtual Reality Lounge", type: "activity", position: { x: 80, y: 40 } },
  { id: "4", name: "Gourmet Burger Bar", type: "restaurant", position: { x: 30, y: 70 } },
  { id: "5", name: "Tech Gadget Hub", type: "store", position: { x: 70, y: 20 } },
  { id: "6", name: "Mini Golf Course", type: "activity", position: { x: 40, y: 50 } },
]

export function EntertainmentMap({
  activeActivity,
  setActiveActivity,
}: { activeActivity: string | null; setActiveActivity: (id: string | null) => void }) {
  const getIcon = (type: "restaurant" | "store" | "activity") => {
    switch (type) {
      case "restaurant":
        return <Coffee className="h-6 w-6" />
      case "store":
        return <ShoppingBag className="h-6 w-6" />
      case "activity":
        return <Ticket className="h-6 w-6" />
    }
  }

  return (
    <div className="relative w-full h-[400px] bg-blue-100 rounded-lg overflow-hidden">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className={`absolute cursor-pointer transition-all duration-300 ${
            activeActivity === activity.id ? "scale-125 z-10" : ""
          }`}
          style={{ left: `${activity.position.x}%`, top: `${activity.position.y}%` }}
          onClick={() => setActiveActivity(activity.id)}
        >
          <div
            className={`p-1 rounded-full ${
              activity.type === "restaurant"
                ? "bg-yellow-500"
                : activity.type === "store"
                  ? "bg-blue-500"
                  : "bg-green-500"
            }`}
          >
            {getIcon(activity.type)}
          </div>
          {activeActivity === activity.id && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white p-2 rounded shadow-lg">
              <p className="text-sm font-semibold">{activity.name}</p>
            </div>
          )}
        </div>
      ))}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <MapPin className="h-8 w-8 text-red-500" />
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white p-2 rounded shadow-lg">
          <p className="text-sm font-semibold">You are here</p>
        </div>
      </div>
    </div>
  )
}

