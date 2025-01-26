import express from 'express';
import cors from 'cors';
import { flights } from './data/flights';

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// Search flights endpoint
app.post('/api/flights/search', (req, res) => {
    const { origin, destination, date } = req.body;
    console.log('Received search request:', { origin, destination, date });

    // Filter flights based on search criteria
    const matchingFlights = flights.filter(flight => 
        flight.origin.code === origin &&
        flight.destination.code === destination &&
        flight.departureTime.startsWith(date)
    );

    res.json(matchingFlights);
});

// Get airports endpoint
app.get('/api/airports', (req, res) => {
    const { search } = req.query;
    const airports = [
        { code: 'DFW', name: 'Dallas/Fort Worth International', city: 'Dallas', country: 'USA' },
        { code: 'JFK', name: 'John F. Kennedy International', city: 'New York', country: 'USA' },
        { code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles', country: 'USA' },
        { code: 'ORD', name: "O'Hare International", city: 'Chicago', country: 'USA' },
        { code: 'MIA', name: 'Miami International', city: 'Miami', country: 'USA' },
    ];

    if (search) {
        const searchStr = search.toString().toLowerCase();
        const filtered = airports.filter(airport => 
            airport.code.toLowerCase().includes(searchStr) ||
            airport.name.toLowerCase().includes(searchStr) ||
            airport.city.toLowerCase().includes(searchStr)
        );
        res.json(filtered);
    } else {
        res.json(airports);
    }
});

// Alternative flights endpoint
app.post('/api/flights/alternatives', (req, res) => {
    const { origin, destination, date } = req.body;
    console.log('Received alternatives request:', { origin, destination, date });

    // Return alternative flights
    const alternativeFlights = flights.filter(flight => 
        flight.origin.code === origin &&
        flight.destination.code === destination &&
        flight.departureTime.startsWith(date)
    );

    res.json(alternativeFlights);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 