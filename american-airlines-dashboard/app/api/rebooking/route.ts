import { NextResponse } from 'next/server';

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
}

interface RebookingOption {
    id: number;
    flightNumber: string;
    origin: any;
    destination: any;
    departureTime: string;
    arrivalTime: string;
    aircraft: any;
    benefits: {
        voucher: number;
        priorityBoarding: boolean;
        hotelCredit: number;
    };
    score: number;
}

// Replace mock FlightService with actual API calls
class FlightService {
    private baseUrl = 'http://localhost:8080';

    async getFlights(query: any) {
        try {
            const response = await fetch(`${this.baseUrl}/api/flights/alternatives`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(query)
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch alternative flights');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error fetching flights:', error);
            throw error;
        }
    }
}

function calculateScore(flight: Flight): number {
    let score = 100;
    
    // Capacity score (0-30 points)
    const totalCapacity = flight.aircraft.passengerCapacity.total;
    score += (totalCapacity / 300) * 30;
    
    // Time of day score (0-20 points)
    const hour = new Date(flight.departureTime).getHours();
    if (hour >= 8 && hour <= 20) {
        score += 20 - Math.abs(14 - hour);
    }
    
    // Aircraft model score (0-20 points)
    const preferredModels: { [key: string]: number } = {
        '787': 20,
        '777': 18,
        '321': 15,
        '737': 12
    };
    score += preferredModels[flight.aircraft.model] || 10;
    
    return Math.round(score);
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const origin = searchParams.get('origin');
    const destination = searchParams.get('destination');

    if (!date) {
        return NextResponse.json(
            { error: 'Date is required' },
            { status: 400 }
        );
    }

    try {
        const flightService = new FlightService();
        const flights = await flightService.getFlights({
            date,
            origin,
            destination
        });

        const options: RebookingOption[] = flights.map((flight: Flight, index: number) => ({
            id: index + 1,
            flightNumber: flight.flightNumber,
            origin: flight.origin,
            destination: flight.destination,
            departureTime: flight.departureTime,
            arrivalTime: flight.arrivalTime,
            aircraft: flight.aircraft,
            benefits: {
                voucher: Math.floor(Math.random() * 3 + 1) * 100,
                priorityBoarding: Math.random() > 0.5,
                hotelCredit: Math.random() > 0.7 ? 200 : 0
            },
            score: calculateScore(flight)
        }));

        options.sort((a, b) => b.score - a.score);

        return NextResponse.json(options);
    } catch (error) {
        console.error('Rebooking error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch rebooking options' },
            { status: 500 }
        );
    }
} 