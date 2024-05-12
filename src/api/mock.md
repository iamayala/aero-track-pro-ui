{
  "id": 1,
  "part_id": 1,
  "quantity": 100,
  "order_date": "2024-05-11T22:00:00.000Z",
  "expected_delivery_date": "2024-05-24T22:00:00.000Z",
  "status": "available",
  "created_at": "2024-05-10T17:52:27.000Z",
  "updated_at": "2024-05-10T17:53:09.000Z",
  "part_number": "P12345",
  "part_name": "Engine Spark Plug",
  "manufacturer": "ACME Corporation",
  "description": "High-performance spark plug for aircraft engines",
  "unit_price": "50.00",
  "location": "Warehouse A"
}

user

{
  "id": 1,
  "username": "james.cameron",
  "password": "$2b$10$CcTGA.8X16kR7Y5PpTP9t.uXZ2WsNfQwZ3/V/qoR7kY6uEMSWQNwK",
  "email": "jamescameron@aero.pro",
  "role": "technician",
  "full_name": "james jr. cameron",
  "status": 1,
  "created_at": "2024-05-08T09:51:30.000Z",
  "updated_at": "2024-05-08T10:02:36.000Z"
}

aircraft
[
  {
    "id": 1,
    "registration_number": "ABC122",
    "manufacturer": "Boeing",
    "model": "737",
    "year_of_manufacture": 2010,
    "capacity": 150,
    "fuel_capacity": "20000.00",
    "max_speed": "500.00",
    "max_range": "3000.00",
    "current_location": "New York",
    "status": 1,
    "created_at": "2024-05-10T18:01:31.000Z",
    "updated_at": "2024-05-10T18:40:12.000Z"
  }
]

flight
[
  {
    "id": 1,
    "flight_number": "FL123",
    "departure_airport": "JFK",
    "departure_datetime": "2024-05-10T06:00:00.000Z",
    "arrival_airport": "LAX",
    "arrival_datetime": "2024-05-10T10:00:00.000Z",
    "aircraft_id": 1,
    "pilot_id": 1,
    "co_pilot_id": 2,
    "crew_members": [
      "John Doe",
      "Jane Smith"
    ],
    "passengers": [
      "Alice",
      "Bob"
    ],
    "status": 1,
    "created_at": "2024-05-10T18:01:31.000Z",
    "updated_at": "2024-05-10T18:40:12.000Z",
    "registration_number": "ABC122",
    "manufacturer": "Boeing",
    "model": "737",
    "year_of_manufacture": 2010,
    "capacity": 150,
    "fuel_capacity": "20000.00",
    "max_speed": "500.00",
    "max_range": "3000.00",
    "current_location": "New York"
  }
]

maintenance
[
  {
    "id": 1,
    "activity_type": "maintenance",
    "activity_description": "Routine maintenance check",
    "aircraft_id": 1,
    "technician_id": "technician1",
    "start_datetime": "2024-05-10T06:00:00.000Z",
    "end_datetime": "2024-05-10T10:00:00.000Z",
    "parts_replaced": [
      "part1",
      "part2"
    ],
    "issues_resolved": "No issues found",
    "status": "completed",
    "created_at": "2024-05-10T18:36:52.000Z",
    "updated_at": "2024-05-10T18:43:49.000Z",
    "aircraft_manufacturer": "Boeing",
    "aircraft_model": "737",
    "registration_number": "ABC122",
    "technician_name": "james jr. cameron",
    "technician_email": "jamescameron@aero.pro"
  }
]