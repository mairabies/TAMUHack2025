import { NextResponse } from 'next/server';

interface Airport {
    code: string;
    name: string;
    city: string;
    country: string;
}

class AirportAPI {
    private readonly baseUrl = 'http://localhost:8080';

    async getAirports(): Promise<Airport[]> {
        try {
            const response = await fetch(`${this.baseUrl}/airports`);
            console.log('Fetching airports from:', `${this.baseUrl}/airports`);
            
            if (!response.ok) {
                const text = await response.text();
                throw new Error(`Airport API error: ${text}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Failed to fetch airports:', error);
            throw error;
        }
    }

    async getAirport(code: string): Promise<Airport> {
        try {
            const response = await fetch(`${this.baseUrl}/airports?code=${code.toUpperCase()}`);
            if (!response.ok) {
                const text = await response.text();
                throw new Error(`Airport API error: ${text}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Failed to fetch airport:', error);
            throw error;
        }
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const code = searchParams.get('code');

        const airportAPI = new AirportAPI();
        
        // Allow fetching all airports when no code is provided
        if (!code) {
            const airports = await airportAPI.getAirports();
            return NextResponse.json(airports);
        }

        const airport = await airportAPI.getAirport(code);
        return NextResponse.json(airport);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Airport API error:', error);
            return NextResponse.json(
                { error: 'Failed to fetch airport data', details: error.message },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { error: 'An unexpected error occurred' },
            { status: 500 }
        );
    }
} 