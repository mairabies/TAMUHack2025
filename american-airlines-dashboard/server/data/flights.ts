export const flights = [
    {
        flightNumber: "AA1234",
        origin: {
            code: "DFW",
            city: "Dallas"
        },
        destination: {
            code: "JFK",
            city: "New York"
        },
        departureTime: "2024-03-21T10:00:00",
        arrivalTime: "2024-03-21T14:00:00",
        aircraft: {
            model: "787",
            passengerCapacity: {
                total: 280,
                main: 240,
                first: 40
            }
        }
    },
    {
        flightNumber: "AA5678",
        origin: {
            code: "DFW",
            city: "Dallas"
        },
        destination: {
            code: "LAX",
            city: "Los Angeles"
        },
        departureTime: "2024-03-21T11:30:00",
        arrivalTime: "2024-03-21T13:30:00",
        aircraft: {
            model: "777",
            passengerCapacity: {
                total: 300,
                main: 260,
                first: 40
            }
        }
    },
    // Add more mock flights as needed
]; 