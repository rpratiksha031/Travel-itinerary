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
    <div className="mb-6 md:mb-8 px-4 md:px-0">
      <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
        Flight <span className="text-purple-600">Summary</span>
      </h2>
      <div className="space-y-3 md:space-y-4">
        {flights.map((flight) => (
          <div
            key={flight.id}
            className="bg-purple-50 rounded-lg p-3 md:p-4 border border-purple-200"
          >
            {/* Mobile: Stacked Layout, Desktop: Horizontal */}
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
              {/* Date and Delete Button Row (Mobile) */}
              <div className="flex items-center gap-3">
                <input
                  type="date"
                  value={flight.date}
                  onChange={(e) =>
                    updateFlight(flight.id, "date", e.target.value)
                  }
                  className="flex-1 md:flex-none md:w-40 p-2.5 md:p-3 border border-purple-300 rounded-lg bg-white font-semibold text-sm md:text-base"
                />
                {flights.length > 1 && (
                  <button
                    onClick={() => removeFlight(flight.id)}
                    className="text-red-500 md:hidden flex-shrink-0"
                    aria-label="Remove flight"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>

              {/* Flight Details */}
              <div className="flex-1 flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Airline"
                  value={flight.airline}
                  onChange={(e) =>
                    updateFlight(flight.id, "airline", e.target.value)
                  }
                  className="w-full md:flex-1 p-2.5 md:p-3 border border-purple-300 rounded-lg bg-white text-sm md:text-base"
                />
                <input
                  type="text"
                  placeholder="Flight No"
                  value={flight.flightNo}
                  onChange={(e) =>
                    updateFlight(flight.id, "flightNo", e.target.value)
                  }
                  className="w-full md:w-32 p-2.5 md:p-3 border border-purple-300 rounded-lg bg-white text-sm md:text-base"
                />
                <input
                  type="text"
                  placeholder="Route (e.g., DEL to SIN)"
                  value={flight.route}
                  onChange={(e) =>
                    updateFlight(flight.id, "route", e.target.value)
                  }
                  className="w-full md:flex-1 p-2.5 md:p-3 border border-purple-300 rounded-lg bg-white text-sm md:text-base"
                />
              </div>

              {/* Delete Button (Desktop) */}
              {flights.length > 1 && (
                <button
                  onClick={() => removeFlight(flight.id)}
                  className="hidden md:block text-red-500 flex-shrink-0"
                  aria-label="Remove flight"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={addFlight}
        className="mt-3 md:mt-4 w-full md:w-auto flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-2.5 md:py-3 rounded-lg hover:bg-purple-700 transition font-semibold text-sm md:text-base"
      >
        <Plus size={18} className="md:w-5 md:h-5" />
        Add Flight
      </button>
      <p className="text-xs text-gray-600 mt-2 md:mt-3">
        Note: All Flights Include Meals, Seat Choice (Excluding XL), And
        20g/25Kg Checked Baggage.
      </p>
    </div>
  );
};

export default FlightSummary;
