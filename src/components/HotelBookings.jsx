import React from "react";
import { Plus, Trash2 } from "lucide-react";

const HotelBookings = ({ hotels, setHotels }) => {
  const addHotel = () => {
    setHotels([
      ...hotels,
      {
        id: hotels.length + 1,
        city: "",
        checkIn: "",
        checkOut: "",
        nights: "",
        hotelName: "",
      },
    ]);
  };

  const removeHotel = (id) => {
    setHotels(hotels.filter((hotel) => hotel.id !== id));
  };

  const updateHotel = (id, field, value) => {
    setHotels(
      hotels.map((hotel) =>
        hotel.id === id ? { ...hotel, [field]: value } : hotel
      )
    );
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">
        Hotel <span className="text-purple-600">Bookings</span>
      </h2>
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <div className="grid grid-cols-5 gap-4 bg-purple-900 text-white p-4 font-bold text-sm">
          <div>City</div>
          <div>Check In</div>
          <div>Check Out</div>
          <div>Nights</div>
          <div>Hotel Name</div>
        </div>
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="grid grid-cols-5 gap-4 p-4 bg-purple-50 border-b border-purple-100 items-center"
          >
            <input
              type="text"
              value={hotel.city}
              onChange={(e) => updateHotel(hotel.id, "city", e.target.value)}
              className="p-2 border border-gray-300 rounded text-sm"
              placeholder="Singapore"
            />
            <input
              type="date"
              value={hotel.checkIn}
              onChange={(e) => updateHotel(hotel.id, "checkIn", e.target.value)}
              className="p-2 border border-gray-300 rounded text-sm"
            />
            <input
              type="date"
              value={hotel.checkOut}
              onChange={(e) =>
                updateHotel(hotel.id, "checkOut", e.target.value)
              }
              className="p-2 border border-gray-300 rounded text-sm"
            />
            <input
              type="number"
              value={hotel.nights}
              onChange={(e) => updateHotel(hotel.id, "nights", e.target.value)}
              className="p-2 border border-gray-300 rounded text-sm"
              placeholder="2"
            />
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={hotel.hotelName}
                onChange={(e) =>
                  updateHotel(hotel.id, "hotelName", e.target.value)
                }
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="Hotel Name"
              />
              {hotels.length > 1 && (
                <button
                  onClick={() => removeHotel(hotel.id)}
                  className="text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={addHotel}
        className="mt-4 flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
      >
        <Plus size={20} />
        Add Hotel
      </button>
      <div className="mt-4 text-xs text-gray-600 space-y-1">
        <p>1. All Hotels Are Tentative And Can Be Replaced With Similar.</p>
        <p>2. Breakfast Included For All Hotel Stays</p>
        <p>3. All Hotels Will Be 4* And Above Category</p>
        <p>
          4. A maximum occupancy of 2 people/room is allowed in most hotels.
        </p>
      </div>
    </div>
  );
};

export default HotelBookings;
