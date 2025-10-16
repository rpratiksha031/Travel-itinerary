import React from "react";

const TripOverview = ({ tripDetails, setTripDetails }) => {
  const handleChange = (field, value) => {
    setTripDetails({ ...tripDetails, [field]: value });
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-6">
      <div className="grid grid-cols-4 gap-6 text-sm">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Departure From:
          </label>
          <input
            type="text"
            value={tripDetails.departureFrom}
            onChange={(e) => handleChange("departureFrom", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Mumbai"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Departure:
          </label>
          <input
            type="date"
            value={tripDetails.departureDate}
            onChange={(e) => handleChange("departureDate", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Arrival:
          </label>
          <input
            type="date"
            value={tripDetails.arrivalDate}
            onChange={(e) => handleChange("arrivalDate", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Destination:
          </label>
          <input
            type="text"
            value={tripDetails.destinationCity}
            onChange={(e) => handleChange("destinationCity", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Singapore"
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-6 text-sm mt-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Traveler Name:
          </label>
          <input
            type="text"
            value={tripDetails.userName}
            onChange={(e) => handleChange("userName", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Rahul"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            No. Of Travellers:
          </label>
          <input
            type="number"
            value={tripDetails.travelers}
            onChange={(e) => handleChange("travelers", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="4"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Duration:
          </label>
          <input
            type="text"
            value={tripDetails.duration}
            onChange={(e) => handleChange("duration", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="4 Days"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Nights:
          </label>
          <input
            type="text"
            value={tripDetails.nights}
            onChange={(e) => handleChange("nights", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="3 Nights"
          />
        </div>
      </div>
    </div>
  );
};

export default TripOverview;
