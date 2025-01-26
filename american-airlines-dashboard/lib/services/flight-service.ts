const FLIGHT_ENGINE_URL = 'http://localhost:3000'; // Flight Engine API URL

export interface Flight {
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
    layovers?: {
        airport: {
            code: string;
            city: string;
        };
        duration: number;
    }[];
}

export interface RebookingOption {
    type: 'credits' | 'fastest' | 'accessible' | 'cheapest';
    id: number;
    flightNumber: string;
    title: string;
    score: number;
    time: string;
    benefits: string[];
}

export async function searchFlights(params: {
    date: string;
    origin?: string;
    destination?: string;
    flightNumber?: string;
}) {
    try {
        const queryParams = new URLSearchParams({
            date: params.date,
            ...(params.origin && { origin: params.origin.toUpperCase() }),
            ...(params.destination && { destination: params.destination.toUpperCase() }),
            ...(params.flightNumber && { flightNumber: params.flightNumber })
        });

        console.log('Searching flights with params:', queryParams.toString());
        const response = await fetch(`/api/flights?${queryParams}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch flights');
        }

        const data = await response.json();
        console.log('Received flight data:', data);
        return data;
    } catch (error) {
        console.error('Error searching flights:', error);
        throw error;
    }
}

export function calculateScore(flight: Flight): number {
    let score = 70; // Base score

    // Capacity score (0-10 points)
    const totalCapacity = flight.aircraft.passengerCapacity.total;
    score += (totalCapacity / 300) * 10;
    
    // Time of day score (0-10 points)
    const hour = new Date(flight.departureTime).getHours();
    if (hour >= 8 && hour <= 20) {
        score += 10 - Math.abs(14 - hour) / 2;
    }
    
    // Aircraft model score (0-10 points)
    const preferredModels: Record<string, number> = {
        '787': 10,
        '777': 8,
        '321': 6,
        '737': 5
    };
    
    score += preferredModels[flight.aircraft.model] || 3;

    // Direct flight bonus (0-5 points)
    if (!flight.layovers || flight.layovers.length === 0) {
        score += 5;
    } else {
        // Penalty for multiple layovers
        score -= flight.layovers.length * 2;
    }
    
    // Ensure score doesn't exceed 100 or go below 0
    return Math.min(100, Math.max(0, Math.round(score)));
}

export function formatTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/New_York' // Default to EST/EDT for US flights
    });
}

export function getTimeZone(airportCode: string): string {
    // Map of airport codes to time zones
    const timeZones: Record<string, string> = {
        'DFW': 'America/Chicago',
        'JFK': 'America/New_York',
        'LAX': 'America/Los_Angeles',
        'ORD': 'America/Chicago',
        'MIA': 'America/New_York',
        // Add more airports as needed
    };
    return timeZones[airportCode] || 'America/New_York';
} 