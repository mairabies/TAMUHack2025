import { Plane, Clock, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function FlightInfo() {
  return (
    <Card className="gradient-card border-none rounded-2xl overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <Plane className="h-5 w-5 text-blue-400" />
            <span>Flight AA123</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-purple-400" />
            <span>JFK → LAX</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-pink-400" />
            <span>Original Departure: 2:30 PM EST</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

