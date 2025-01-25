"use client"

import { useState } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Coffee, ShoppingBag, Ticket } from "lucide-react"

interface Activity {
  id: string
  name: string
  type: "restaurant" | "store" | "activity"
  description: string
}

const activities: Activity[] = [
  { id: "1", name: "Skyline Café", type: "restaurant", description: "Enjoy panoramic views while dining" },
  { id: "2", name: "Duty-Free Emporium", type: "store", description: "Shop tax-free luxury goods" },
  { id: "3", name: "Virtual Reality Lounge", type: "activity", description: "Experience immersive VR games" },
  { id: "4", name: "Gourmet Burger Bar", type: "restaurant", description: "Savor artisanal burgers" },
  { id: "5", name: "Tech Gadget Hub", type: "store", description: "Explore the latest tech innovations" },
  { id: "6", name: "Mini Golf Course", type: "activity", description: "Play a round of indoor mini golf" },
]

export function ActivityCarousel({
  activeActivity,
  setActiveActivity,
}: { activeActivity: string | null; setActiveActivity: (id: string | null) => void }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "60px",
    beforeChange: (current: number, next: number) => setActiveActivity(activities[next].id),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          centerPadding: "20px",
        },
      },
    ],
  }

  const getIcon = (type: "restaurant" | "store" | "activity") => {
    switch (type) {
      case "restaurant":
        return <Coffee className="h-6 w-6 text-yellow-500" />
      case "store":
        return <ShoppingBag className="h-6 w-6 text-blue-500" />
      case "activity":
        return <Ticket className="h-6 w-6 text-green-500" />
    }
  }

  return (
    <div className="mb-8">
      <Slider {...settings}>
        {activities.map((activity) => (
          <div key={activity.id} className="px-2">
            <Card
              className={`gradient-card border-none rounded-2xl overflow-hidden transition-all duration-300 ${
                activity.id === activeActivity ? "scale-105 shadow-lg" : "scale-95 opacity-75"
              }`}
              onClick={() => setActiveActivity(activity.id)}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getIcon(activity.type)}
                  {activity.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{activity.description}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  )
}

