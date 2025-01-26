import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const date = searchParams.get('date');
        const origin = searchParams.get('origin');
        const destination = searchParams.get('destination');

        console.log('API received request with params:', { date, origin, destination });

        if (!date) {
            return NextResponse.json(
                { error: 'Date parameter is required' },
                { status: 400 }
            );
        }

        // Call Flight-Engine API
        const flightEngineParams = new URLSearchParams({
            date,
            ...(origin && { origin: origin.toUpperCase() }),
            ...(destination && { destination: destination.toUpperCase() })
        });

        console.log('Calling Flight-Engine with params:', flightEngineParams.toString());
        const response = await fetch(`http://localhost:8080/flights?${flightEngineParams}`);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Flight-Engine API Error:', errorText);
            throw new Error(`Flight-Engine API error: ${errorText}`);
        }

        const flights = await response.json();
        console.log('Received flights from Flight-Engine:', flights);

        return NextResponse.json(flights);
    } catch (error) {
        console.error('Flight search error:', error);
        return NextResponse.json(
            { error: 'Failed to search flights', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
} 