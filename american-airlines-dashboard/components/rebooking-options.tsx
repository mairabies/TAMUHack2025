"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, CreditCard, Plane, Shield, DollarSign, Map } from "lucide-react"

interface RebookingOption {
  id: string
  title: string
  flight: string
  time: string
  benefits: string[]
  type: "credits" | "fastest" | "accessible" | "cheapest" | "regular"
  score: number
}

export function RebookingOptions() {
  const [options, setOptions] = useState<RebookingOption[]>([
    {
      id: "1",
      title: "Best use of credits",
      flight: "AA456",
      time: "4:30 PM EST",
      benefits: ["$200 hotel credit applied", "Meal voucher included", "Premium seat"],
      type: "credits",
      score: 95,
    },
    {
      id: "2",
      title: "Fastest to next flight",
      flight: "AA789",
      time: "3:15 PM EST",
      benefits: ["45 min wait time", "Direct flight", "Gate nearby"],
      type: "fastest",
      score: 98,
    },
    {
      id: "3",
      title: "Most accessible",
      flight: "AA234",
      time: "5:00 PM EST",
      benefits: ["Wheelchair service", "Priority boarding", "Close to assistance"],
      type: "accessible",
      score: 92,
    },
    {
      id: "4",
      title: "Best value",
      flight: "AA567",
      time: "6:45 PM EST",
      benefits: ["Lowest fare", "Meal included", "Extra legroom"],
      type: "cheapest",
      score: 88,
    },
  ])

  const getCardStyle = (type: string) => {
    switch (type) {
      case "credits":
        return "border-purple-400 gradient-border"
      case "fastest":
        return "border-blue-400 gradient-border"
      case "accessible":
        return "border-green-400 gradient-border"
      case "cheapest":
        return "border-orange-400 gradient-border"
      default:
        return "border-gray-200"
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "credits":
        return <CreditCard className="h-5 w-5 text-purple-500" />
      case "fastest":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "accessible":
        return <Shield className="h-5 w-5 text-green-500" />
      case "cheapest":
        return <DollarSign className="h-5 w-5 text-orange-500" />
      default:
        return <Plane className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {options.map((option) => (
        <Card
          key={option.id}
          className={`gradient-card border-none rounded-2xl overflow-hidden transform hover:scale-105 transition-all`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              {getIcon(option.type)}
              {option.title}
            </CardTitle>
            <Badge
              variant="secondary"
              className={`${option.score >= 95 ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}
            >
              {option.score}% match
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Flight {option.flight}</span>
                <span className="text-sm font-medium">{option.time}</span>
              </div>
              <ul className="space-y-2">
                {option.benefits.map((benefit, index) => (
                  <li key={index} className="text-sm flex items-center gap-2">
                    <Map className="h-4 w-4 text-blue-500" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                Select this flight
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

