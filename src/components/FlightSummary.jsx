import React from "react";
import { Plus, Trash2 } from "lucide-react";

const FlightSummary = ({ flights, setFlights }) => {
  const addFlight = () => {
    setFlights([
      ...flights,
      {
        id: flights.length + 1,
        date: "",
        airline: "",
        flightNo: "",
        route: "",
      },
    ]);
  };

  const removeFlight = (id) => {
    setFlights(flights.filter((flight) => flight.id !== id));
  };

  const updateFlight = (id, field, value) => {
    setFlights(
      flights.map((flight) =>
        flight.id === id ? { ...flight, [field]: value } : flight
      )
    );
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">
        Flight <span className="text-purple-600">Summary</span>
      </h2>
      <div className="space-y-3">
        {flights.map((flight) => (
          <div
            key={flight.id}
            className="bg-purple-50 rounded-lg p-4 flex items-center gap-4 border border-purple-200"
          >
            <input
              type="date"
              value={flight.date}
              onChange={(e) => updateFlight(flight.id, "date", e.target.value)}
              className="p-3 border border-purple-300 rounded-lg bg-white font-semibold w-40"
            />
            <div className="flex-1 flex gap-3">
              <input
                type="text"
                placeholder="Airline (e.g., Fly Air India)"
                value={flight.airline}
                onChange={(e) =>
                  updateFlight(flight.id, "airline", e.target.value)
                }
                className="flex-1 p-3 border border-purple-300 rounded-lg bg-white"
              />
              <input
                type="text"
                placeholder="Flight No (e.g., AX-123)"
                value={flight.flightNo}
                onChange={(e) =>
                  updateFlight(flight.id, "flightNo", e.target.value)
                }
                className="w-32 p-3 border border-purple-300 rounded-lg bg-white"
              />
              <input
                type="text"
                placeholder="Route (e.g., From Delhi (DEL) To Singapore (SIN))"
                value={flight.route}
                onChange={(e) =>
                  updateFlight(flight.id, "route", e.target.value)
                }
                className="flex-1 p-3 border border-purple-300 rounded-lg bg-white"
              />
            </div>
            {flights.length > 1 && (
              <button
                onClick={() => removeFlight(flight.id)}
                className="text-red-500"
              >
                <Trash2 size={20} />
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={addFlight}
        className="mt-4 flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
      >
        <Plus size={20} />
        Add Flight
      </button>
      <p className="text-xs text-gray-600 mt-3">
        Note: All Flights Include Meals, Seat Choice (Excluding XL), And
        20g/25Kg Checked Baggage.
      </p>
    </div>
  );
};

export default FlightSummary;
