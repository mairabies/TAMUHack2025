"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, CreditCard, Plane, Shield, DollarSign, Map } from "lucide-react"
import { RebookingOption, searchFlights, calculateScore, formatTime } from "@/lib/services/flight-service"

interface RebookingOptionsProps {
    searchParams?: {
        date?: string;
        origin?: string;
        destination?: string;
        flightNumber?: string;
    };
}

interface Flight {
    flightNumber: string;
    origin: {
        code: string;
        city: string;
    };
    destination: {
        code: string;
        city: string;
    };
    departureTime: string;
    arrivalTime: string;
    aircraft: {
        model: string;
        passengerCapacity: {
            total: number;
            main: number;
            first: number;
        };
    };
    // Add layover information
    layovers?: {
        airport: {
            code: string;
            city: string;
        };
        duration: number;
    }[];
    // UI specific properties
    type?: 'credits' | 'fastest' | 'accessible' | 'cheapest';
    title?: string;
    score?: number;
    time?: string;
    benefits?: string[];
}

export function RebookingOptions({ searchParams }: RebookingOptionsProps) {
    const [flights, setFlights] = useState<Flight[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log('SearchParams changed:', searchParams);
        if (searchParams?.date && searchParams?.origin && searchParams?.destination) {
            fetchFlights();
        }
    }, [searchParams]);

    async function fetchFlights() {
        setLoading(true);
        setError(null);
        try {
            const params = new URLSearchParams({
                date: searchParams?.date || '',
                origin: searchParams?.origin || '',
                destination: searchParams?.destination || ''
            });

            console.log('Fetching flights with params:', params.toString());
            const response = await fetch(`/api/flights?${params}`);
            console.log('Response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Error:', errorText);
                throw new Error(`Failed to fetch flights: ${errorText}`);
            }

            const data = await response.json();
            console.log('Received flight data:', data);
            
            // Transform flight data to include UI properties
            const enhancedFlights = data.map((flight: Flight) => ({
                ...flight,
                type: determineFlightType(flight),
                title: `${flight.origin.code} → ${flight.destination.code}`,
                score: calculateScore(flight),
                time: formatTime(flight.departureTime),
                benefits: generateBenefits(flight)
            }));

            console.log('Enhanced flights:', enhancedFlights);
            setFlights(enhancedFlights);
        } catch (err) {
            console.error('Error fetching flights:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch flights');
        } finally {
            setLoading(false);
        }
    }

    function determineFlightType(flight: Flight): Flight['type'] {
        // Logic to determine flight type based on characteristics
        return 'fastest';
    }

    function generateBenefits(flight: Flight): string[] {
        const benefits = [
            `${flight.aircraft.model} Aircraft`,
            `Departure: ${formatTime(flight.departureTime)} ${flight.origin.code}`,
            `Arrival: ${formatTime(flight.arrivalTime)} ${flight.destination.code}`
        ];

        // Add layover information if exists
        if (flight.layovers && flight.layovers.length > 0) {
            const layoverText = flight.layovers.length === 1
                ? `1 layover in ${flight.layovers[0].airport.code}`
                : `${flight.layovers.length} layovers: ${flight.layovers.map(l => l.airport.code).join(', ')}`;
            benefits.push(layoverText);
        } else {
            benefits.push('Direct flight');
        }

        return benefits;
    }

    const getCardStyle = (type: RebookingOption['type']) => {
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

    if (loading) {
        return <div className="flex justify-center p-8">Loading flights...</div>;
    }

    if (error) {
        return <div className="text-red-500 p-4">{error}</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flights.map((flight) => (
                <Card
                    key={flight.flightNumber}
                    className={`gradient-card border-none rounded-2xl overflow-hidden transform hover:scale-105 transition-all ${getCardStyle(flight.type)}`}
                >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div>
                            <CardTitle className="text-lg font-bold flex items-center gap-2">
                                <Plane className="h-5 w-5" />
                                {flight.title}
                            </CardTitle>
                            {(!flight.layovers || flight.layovers.length === 0) && (
                                <span className="text-xs text-green-500 mt-1">Direct Flight</span>
                            )}
                        </div>
                        <Badge
                            variant="secondary"
                            className={`${flight.score && flight.score >= 95 ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}
                        >
                            {flight.score}% match
                        </Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Flight {flight.flightNumber}</span>
                                <span className="text-sm font-medium">{flight.time}</span>
                            </div>
                            <ul className="space-y-2">
                                {flight.benefits?.map((benefit, index) => (
                                    <li key={index} className="text-sm flex items-center gap-2">
                                        <Map className="h-4 w-4 text-blue-500" />
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                            <Button 
                                className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                                onClick={() => {
                                    alert(`Selected flight ${flight.flightNumber}\nFrom: ${flight.origin.city}\nTo: ${flight.destination.city}`);
                                }}
                            >
                                Select this flight
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

