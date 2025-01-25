import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const flights = [
  {
    id: 1,
    from: "New York (JFK)",
    to: "Los Angeles (LAX)",
    date: "May 15, 2023",
    time: "10:00 AM",
    flightNumber: "AA1234",
  },
  {
    id: 2,
    from: "Chicago (ORD)",
    to: "Miami (MIA)",
    date: "June 2, 2023",
    time: "2:30 PM",
    flightNumber: "AA5678",
  },
]

export function UpcomingFlights() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Upcoming Flights</h2>
      <div className="space-y-4">
        {flights.map((flight) => (
          <Card key={flight.id}>
            <CardHeader>
              <CardTitle>
                {flight.from} to {flight.to}
              </CardTitle>
              <CardDescription>
                {flight.date} at {flight.time}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Flight Number: {flight.flightNumber}</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Manage Booking</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

