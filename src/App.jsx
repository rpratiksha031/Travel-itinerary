import React, { useState, useRef } from "react";
import {
  Plus,
  Trash2,
  Download,
  Plane,
  Hotel,
  MapPin,
  Calendar,
  Users,
  Car,
  Ship,
  Sun,
} from "lucide-react";

const ItineraryBuilder = () => {
  const [tripDetails, setTripDetails] = useState({
    userName: "",
    destination: "",
    duration: "",
    nights: "",
    departureFrom: "",
    departureDate: "",
    arrivalDate: "",
    destinationCity: "",
    travelers: "",
  });

  const [days, setDays] = useState([
    {
      id: 1,
      date: "",
      title: "",
      image: "",
      morning: "",
      afternoon: "",
      evening: "",
    },
  ]);

  const [flights, setFlights] = useState([
    { id: 1, date: "", airline: "", flightNo: "", route: "" },
  ]);

  const [hotels, setHotels] = useState([
    { id: 1, city: "", checkIn: "", checkOut: "", nights: "", hotelName: "" },
  ]);

  const [activities, setActivities] = useState([
    { id: 1, city: "", activity: "", type: "", duration: "" },
  ]);

  const [payment, setPayment] = useState({
    totalAmount: "",
    tcs: "",
    installments: [{ id: 1, amount: "", dueDate: "" }],
  });

  const [inclusions, setInclusions] = useState("");
  const [exclusions, setExclusions] = useState("");
  const [importantNotes, setImportantNotes] = useState([
    { id: 1, point: "", details: "" },
  ]);
  const [scopeOfService, setScopeOfService] = useState([
    { id: 1, service: "", details: "" },
  ]);

  const addDay = () => {
    setDays([
      ...days,
      {
        id: days.length + 1,
        date: "",
        title: "",
        image: "",
        morning: "",
        afternoon: "",
        evening: "",
      },
    ]);
  };

  const removeDay = (id) => {
    setDays(days.filter((day) => day.id !== id));
  };

  const updateDay = (id, field, value) => {
    setDays(
      days.map((day) => (day.id === id ? { ...day, [field]: value } : day))
    );
  };

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

  const addActivity = () => {
    setActivities([
      ...activities,
      {
        id: activities.length + 1,
        city: "",
        activity: "",
        type: "",
        duration: "",
      },
    ]);
  };

  const removeActivity = (id) => {
    setActivities(activities.filter((activity) => activity.id !== id));
  };

  const updateActivity = (id, field, value) => {
    setActivities(
      activities.map((activity) =>
        activity.id === id ? { ...activity, [field]: value } : activity
      )
    );
  };

  const addInstallment = () => {
    setPayment({
      ...payment,
      installments: [
        ...payment.installments,
        { id: payment.installments.length + 1, amount: "", dueDate: "" },
      ],
    });
  };

  const removeInstallment = (id) => {
    setPayment({
      ...payment,
      installments: payment.installments.filter((inst) => inst.id !== id),
    });
  };

  const updateInstallment = (id, field, value) => {
    setPayment({
      ...payment,
      installments: payment.installments.map((inst) =>
        inst.id === id ? { ...inst, [field]: value } : inst
      ),
    });
  };

  const addImportantNote = () => {
    setImportantNotes([
      ...importantNotes,
      { id: importantNotes.length + 1, point: "", details: "" },
    ]);
  };

  const removeImportantNote = (id) => {
    setImportantNotes(importantNotes.filter((note) => note.id !== id));
  };

  const updateImportantNote = (id, field, value) => {
    setImportantNotes(
      importantNotes.map((note) =>
        note.id === id ? { ...note, [field]: value } : note
      )
    );
  };

  const addScopeOfService = () => {
    setScopeOfService([
      ...scopeOfService,
      { id: scopeOfService.length + 1, service: "", details: "" },
    ]);
  };

  const removeScopeOfService = (id) => {
    setScopeOfService(scopeOfService.filter((scope) => scope.id !== id));
  };

  const updateScopeOfService = (id, field, value) => {
    setScopeOfService(
      scopeOfService.map((scope) =>
        scope.id === id ? { ...scope, [field]: value } : scope
      )
    );
  };

  const generatePDF = async () => {
    try {
      // Dynamic import to avoid build issues
      const jsPDF = (await import("jspdf")).default;
      const html2canvas = (await import("html2canvas")).default;

      const doc = new jsPDF("p", "mm", "a4");
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      let yPosition = 20;

      // Helper function to add text with word wrap
      const addText = (text, x, y, maxWidth, fontSize = 10) => {
        doc.setFontSize(fontSize);
        const lines = doc.splitTextToSize(text, maxWidth);
        doc.text(lines, x, y);
        return lines.length * (fontSize * 0.35);
      };

      // Header
      doc.setFillColor(99, 102, 241); // Purple
      doc.rect(0, 0, pageWidth, 40, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.text(`Hi, ${tripDetails.userName || "Traveler"}!`, 20, 15);
      doc.setFontSize(18);
      doc.text(`${tripDetails.destination || "Destination"} Itinerary`, 20, 25);
      doc.setFontSize(12);
      doc.text(
        `${tripDetails.duration || "0 Days"} ${
          tripDetails.nights || "0 Nights"
        }`,
        20,
        33
      );

      yPosition = 50;
      doc.setTextColor(0, 0, 0);

      // Trip Overview
      doc.setFontSize(14);
      doc.setFont(undefined, "bold");
      doc.text("Trip Overview", 20, yPosition);
      yPosition += 7;
      doc.setFontSize(10);
      doc.setFont(undefined, "normal");
      doc.text(
        `From: ${tripDetails.departureFrom} | Departure: ${tripDetails.departureDate}`,
        20,
        yPosition
      );
      yPosition += 5;
      doc.text(
        `To: ${tripDetails.destinationCity} | Arrival: ${tripDetails.arrivalDate}`,
        20,
        yPosition
      );
      yPosition += 5;
      doc.text(`Travelers: ${tripDetails.travelers}`, 20, yPosition);
      yPosition += 10;

      // Daily Itinerary
      doc.setFontSize(14);
      doc.setFont(undefined, "bold");
      doc.text("Daily Itinerary", 20, yPosition);
      yPosition += 7;
      doc.setFont(undefined, "normal");
      doc.setFontSize(10);

      days.forEach((day, index) => {
        if (yPosition > pageHeight - 40) {
          doc.addPage();
          yPosition = 20;
        }

        doc.setFont(undefined, "bold");
        doc.text(`Day ${index + 1}: ${day.date} - ${day.title}`, 20, yPosition);
        yPosition += 6;
        doc.setFont(undefined, "normal");

        if (day.morning) {
          doc.text("Morning:", 25, yPosition);
          yPosition += 5;
          yPosition += addText(day.morning, 30, yPosition, pageWidth - 50, 9);
        }

        if (day.afternoon) {
          doc.text("Afternoon:", 25, yPosition);
          yPosition += 5;
          yPosition += addText(day.afternoon, 30, yPosition, pageWidth - 50, 9);
        }

        if (day.evening) {
          doc.text("Evening:", 25, yPosition);
          yPosition += 5;
          yPosition += addText(day.evening, 30, yPosition, pageWidth - 50, 9);
        }

        yPosition += 5;
      });

      // Flights
      if (yPosition > pageHeight - 60) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(14);
      doc.setFont(undefined, "bold");
      doc.text("Flight Summary", 20, yPosition);
      yPosition += 7;
      doc.setFont(undefined, "normal");
      doc.setFontSize(10);

      flights.forEach((flight) => {
        if (yPosition > pageHeight - 20) {
          doc.addPage();
          yPosition = 20;
        }
        doc.text(
          `${flight.date}: ${flight.airline} ${flight.flightNo} - ${flight.route}`,
          25,
          yPosition
        );
        yPosition += 6;
      });

      yPosition += 5;

      // Hotels
      if (yPosition > pageHeight - 40) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(14);
      doc.setFont(undefined, "bold");
      doc.text("Hotel Bookings", 20, yPosition);
      yPosition += 7;
      doc.setFont(undefined, "normal");
      doc.setFontSize(10);

      hotels.forEach((hotel) => {
        if (yPosition > pageHeight - 20) {
          doc.addPage();
          yPosition = 20;
        }
        doc.text(
          `${hotel.city}: ${hotel.hotelName} (${hotel.checkIn} to ${hotel.checkOut}, ${hotel.nights} nights)`,
          25,
          yPosition
        );
        yPosition += 6;
      });

      yPosition += 5;

      // Activities
      if (yPosition > pageHeight - 40) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(14);
      doc.setFont(undefined, "bold");
      doc.text("Activities", 20, yPosition);
      yPosition += 7;
      doc.setFont(undefined, "normal");
      doc.setFontSize(10);

      activities.forEach((activity) => {
        if (yPosition > pageHeight - 20) {
          doc.addPage();
          yPosition = 20;
        }
        doc.text(
          `${activity.city}: ${activity.activity} (${activity.type}, ${activity.duration})`,
          25,
          yPosition
        );
        yPosition += 6;
      });

      // Payment
      if (yPosition > pageHeight - 50) {
        doc.addPage();
        yPosition = 20;
      }

      yPosition += 5;
      doc.setFontSize(14);
      doc.setFont(undefined, "bold");
      doc.text("Payment Plan", 20, yPosition);
      yPosition += 7;
      doc.setFont(undefined, "normal");
      doc.setFontSize(10);
      doc.text(`Total Amount: ${payment.totalAmount}`, 25, yPosition);
      yPosition += 6;
      doc.text(`TCS: ${payment.tcs}`, 25, yPosition);
      yPosition += 8;

      doc.setFont(undefined, "bold");
      doc.text("Installments:", 25, yPosition);
      yPosition += 6;
      doc.setFont(undefined, "normal");

      payment.installments.forEach((inst, index) => {
        if (yPosition > pageHeight - 20) {
          doc.addPage();
          yPosition = 20;
        }
        doc.text(
          `${index + 1}. ${inst.amount} - Due: ${inst.dueDate}`,
          30,
          yPosition
        );
        yPosition += 6;
      });

      // Inclusions & Exclusions
      if (inclusions || exclusions) {
        if (yPosition > pageHeight - 40) {
          doc.addPage();
          yPosition = 20;
        }

        yPosition += 5;

        if (inclusions) {
          doc.setFont(undefined, "bold");
          doc.text("Inclusions:", 20, yPosition);
          yPosition += 6;
          doc.setFont(undefined, "normal");
          const inclusionLines = inclusions.split("\n");
          inclusionLines.forEach((line) => {
            if (yPosition > pageHeight - 20) {
              doc.addPage();
              yPosition = 20;
            }
            if (line.trim()) {
              doc.text(`• ${line.trim()}`, 25, yPosition);
              yPosition += 5;
            }
          });
          yPosition += 3;
        }

        if (exclusions) {
          if (yPosition > pageHeight - 40) {
            doc.addPage();
            yPosition = 20;
          }
          doc.setFont(undefined, "bold");
          doc.text("Exclusions:", 20, yPosition);
          yPosition += 6;
          doc.setFont(undefined, "normal");
          const exclusionLines = exclusions.split("\n");
          exclusionLines.forEach((line) => {
            if (yPosition > pageHeight - 20) {
              doc.addPage();
              yPosition = 20;
            }
            if (line.trim()) {
              doc.text(`• ${line.trim()}`, 25, yPosition);
              yPosition += 5;
            }
          });
        }
      }

      // Save the PDF
      const fileName = `${tripDetails.destination || "Itinerary"}_${
        tripDetails.userName || "Travel"
      }_Plan.pdf`;
      doc.save(fileName);

      alert("PDF generated successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please check the console for details.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header matching Figma design */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900">
            Itinerary Builder
          </h1>
          <p className="text-gray-500 mt-1">
            Create a professional travel itinerary PDF
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Hero Section - Gradient Header like Figma */}
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-purple-600 rounded-2xl p-8 mb-8 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Plane className="w-8 h-8" />
            <Ship className="w-8 h-8" />
            <Hotel className="w-8 h-8" />
            <Car className="w-8 h-8" />
            <Sun className="w-8 h-8" />
          </div>
          <h2 className="text-4xl font-bold mb-2">
            Hi,{" "}
            <span className="border-b-4 border-white">
              {tripDetails.userName || "Traveler"}
            </span>
            !
          </h2>
          <h3 className="text-3xl font-semibold mb-2">
            {tripDetails.destination || "Your Destination"} Itinerary
          </h3>
          <p className="text-xl">
            {tripDetails.duration || "0 Days"}{" "}
            {tripDetails.nights || "0 Nights"}
          </p>
        </div>

        {/* Trip Overview Box */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-4 gap-6 text-sm">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Departure From:
              </label>
              <input
                type="text"
                value={tripDetails.departureFrom}
                onChange={(e) =>
                  setTripDetails({
                    ...tripDetails,
                    departureFrom: e.target.value,
                  })
                }
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
                onChange={(e) =>
                  setTripDetails({
                    ...tripDetails,
                    departureDate: e.target.value,
                  })
                }
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
                onChange={(e) =>
                  setTripDetails({
                    ...tripDetails,
                    arrivalDate: e.target.value,
                  })
                }
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
                onChange={(e) =>
                  setTripDetails({
                    ...tripDetails,
                    destinationCity: e.target.value,
                  })
                }
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
                onChange={(e) =>
                  setTripDetails({ ...tripDetails, userName: e.target.value })
                }
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
                onChange={(e) =>
                  setTripDetails({ ...tripDetails, travelers: e.target.value })
                }
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
                onChange={(e) =>
                  setTripDetails({ ...tripDetails, duration: e.target.value })
                }
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
                onChange={(e) =>
                  setTripDetails({ ...tripDetails, nights: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="3 Nights"
              />
            </div>
          </div>
        </div>

        {/* Daily Itinerary - Purple Sidebar Design */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Daily Itinerary
          </h2>
          {days.map((day, index) => (
            <div
              key={day.id}
              className="bg-white rounded-xl shadow-md border-2 border-blue-400 mb-6 overflow-hidden"
            >
              <div className="flex">
                {/* Purple Sidebar */}
                <div
                  className="bg-purple-900 text-white w-20 flex items-center justify-center text-xl font-bold"
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                  }}
                >
                  Day {index + 1}
                </div>

                {/* Content Area */}
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1 flex gap-4">
                      <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                        {day.image ? (
                          <img
                            src={day.image}
                            alt="Day"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <MapPin size={40} />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <input
                          type="date"
                          value={day.date}
                          onChange={(e) =>
                            updateDay(day.id, "date", e.target.value)
                          }
                          className="text-lg font-bold mb-2 p-2 border border-gray-300 rounded w-full"
                        />
                        <input
                          type="text"
                          placeholder="Day Title (e.g., Arrival In Singapore & City Exploration)"
                          value={day.title}
                          onChange={(e) =>
                            updateDay(day.id, "title", e.target.value)
                          }
                          className="text-sm p-2 border border-gray-300 rounded w-full mb-2"
                        />
                        <input
                          type="text"
                          placeholder="Image URL"
                          value={day.image}
                          onChange={(e) =>
                            updateDay(day.id, "image", e.target.value)
                          }
                          className="text-xs p-2 border border-gray-300 rounded w-full text-gray-500"
                        />
                      </div>
                    </div>
                    {days.length > 1 && (
                      <button
                        onClick={() => removeDay(day.id)}
                        className="text-red-500 hover:text-red-700 ml-4"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>

                  {/* Timeline Design */}
                  <div className="ml-36 space-y-4">
                    {/* Morning */}
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full border-2 border-purple-600 bg-white"></div>
                        <div className="w-0.5 h-full bg-gray-300"></div>
                      </div>
                      <div className="flex-1 pb-4">
                        <h4 className="font-bold text-gray-900 mb-2">
                          Morning
                        </h4>
                        <textarea
                          placeholder="Morning activities..."
                          value={day.morning}
                          onChange={(e) =>
                            updateDay(day.id, "morning", e.target.value)
                          }
                          className="w-full p-3 border border-gray-300 rounded text-sm"
                          rows="2"
                        />
                      </div>
                    </div>

                    {/* Afternoon */}
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full border-2 border-purple-600 bg-white"></div>
                        <div className="w-0.5 h-full bg-gray-300"></div>
                      </div>
                      <div className="flex-1 pb-4">
                        <h4 className="font-bold text-gray-900 mb-2">
                          Afternoon
                        </h4>
                        <textarea
                          placeholder="Afternoon activities..."
                          value={day.afternoon}
                          onChange={(e) =>
                            updateDay(day.id, "afternoon", e.target.value)
                          }
                          className="w-full p-3 border border-gray-300 rounded text-sm"
                          rows="2"
                        />
                      </div>
                    </div>

                    {/* Evening */}
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full border-2 border-purple-600 bg-white"></div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-2">
                          Evening
                        </h4>
                        <textarea
                          placeholder="Evening activities..."
                          value={day.evening}
                          onChange={(e) =>
                            updateDay(day.id, "evening", e.target.value)
                          }
                          className="w-full p-3 border border-gray-300 rounded text-sm"
                          rows="2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={addDay}
            className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
          >
            <Plus size={20} />
            Add Day
          </button>
        </div>

        {/* Flight Summary */}
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
                  onChange={(e) =>
                    updateFlight(flight.id, "date", e.target.value)
                  }
                  className="p-3 border border-purple-300 rounded-lg bg-white font-semibold w-40"
                />
                <div className="flex-1 flex gap-3">
                  <input
                    type="text"
                    placeholder="Airline & Flight No (e.g., Fly Air India AX-123)"
                    value={
                      flight.airline && flight.flightNo
                        ? `${flight.airline} ${flight.flightNo}`
                        : ""
                    }
                    onChange={(e) => {
                      const parts = e.target.value.split(" ");
                      updateFlight(
                        flight.id,
                        "airline",
                        parts.slice(0, -1).join(" ")
                      );
                      updateFlight(
                        flight.id,
                        "flightNo",
                        parts[parts.length - 1]
                      );
                    }}
                    className="flex-1 p-3 border border-purple-300 rounded-lg bg-white"
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

        {/* Hotel Bookings */}
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
                  onChange={(e) =>
                    updateHotel(hotel.id, "city", e.target.value)
                  }
                  className="p-2 border border-gray-300 rounded text-sm"
                  placeholder="Singapore"
                />
                <input
                  type="date"
                  value={hotel.checkIn}
                  onChange={(e) =>
                    updateHotel(hotel.id, "checkIn", e.target.value)
                  }
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
                  onChange={(e) =>
                    updateHotel(hotel.id, "nights", e.target.value)
                  }
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

        {/* Important Notes */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Important <span className="text-purple-600">Notes</span>
          </h2>
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            <div className="grid grid-cols-2 gap-4 bg-purple-900 text-white p-4 font-bold">
              <div>Point</div>
              <div>Details</div>
            </div>
            {importantNotes.map((note) => (
              <div
                key={note.id}
                className="grid grid-cols-2 gap-4 p-4 bg-purple-50 border-b border-purple-100"
              >
                <input
                  type="text"
                  value={note.point}
                  onChange={(e) =>
                    updateImportantNote(note.id, "point", e.target.value)
                  }
                  className="p-3 border border-gray-300 rounded"
                  placeholder="Airlines Standard Policy"
                />
                <div className="flex gap-2 items-center">
                  <textarea
                    value={note.details}
                    onChange={(e) =>
                      updateImportantNote(note.id, "details", e.target.value)
                    }
                    className="flex-1 p-3 border border-gray-300 rounded"
                    placeholder="Details..."
                    rows="2"
                  />
                  {importantNotes.length > 1 && (
                    <button
                      onClick={() => removeImportantNote(note.id)}
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
            onClick={addImportantNote}
            className="mt-4 flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
          >
            <Plus size={20} />
            Add Note
          </button>
        </div>

        {/* Scope of Service */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Scope Of <span className="text-purple-600">Service</span>
          </h2>
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            <div className="grid grid-cols-2 gap-4 bg-purple-900 text-white p-4 font-bold">
              <div>Service</div>
              <div>Details</div>
            </div>
            {scopeOfService.map((scope) => (
              <div
                key={scope.id}
                className="grid grid-cols-2 gap-4 p-4 bg-purple-50 border-b border-purple-100"
              >
                <input
                  type="text"
                  value={scope.service}
                  onChange={(e) =>
                    updateScopeOfService(scope.id, "service", e.target.value)
                  }
                  className="p-3 border border-gray-300 rounded"
                  placeholder="Flight Tickets And Hotel Vouchers"
                />
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={scope.details}
                    onChange={(e) =>
                      updateScopeOfService(scope.id, "details", e.target.value)
                    }
                    className="flex-1 p-3 border border-gray-300 rounded"
                    placeholder="Delivered 3 Days Post Full Payment"
                  />
                  {scopeOfService.length > 1 && (
                    <button
                      onClick={() => removeScopeOfService(scope.id)}
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
            onClick={addScopeOfService}
            className="mt-4 flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
          >
            <Plus size={20} />
            Add Service
          </button>
        </div>

        {/* Activity Table */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Activity <span className="text-purple-600">Table</span>
          </h2>
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            <div className="grid grid-cols-4 gap-4 bg-purple-900 text-white p-4 font-bold text-sm">
              <div>City</div>
              <div>Activity</div>
              <div>Type</div>
              <div>Time Required</div>
            </div>
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="grid grid-cols-4 gap-4 p-4 bg-purple-50 border-b border-purple-100 items-center"
              >
                <input
                  type="text"
                  value={activity.city}
                  onChange={(e) =>
                    updateActivity(activity.id, "city", e.target.value)
                  }
                  className="p-2 border border-gray-300 rounded text-sm"
                  placeholder="Rio De Janeiro"
                />
                <input
                  type="text"
                  value={activity.activity}
                  onChange={(e) =>
                    updateActivity(activity.id, "activity", e.target.value)
                  }
                  className="p-2 border border-gray-300 rounded text-sm"
                  placeholder="Sydney Harbour Cruise"
                />
                <input
                  type="text"
                  value={activity.type}
                  onChange={(e) =>
                    updateActivity(activity.id, "type", e.target.value)
                  }
                  className="p-2 border border-gray-300 rounded text-sm"
                  placeholder="Nature/Sightseeing"
                />
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={activity.duration}
                    onChange={(e) =>
                      updateActivity(activity.id, "duration", e.target.value)
                    }
                    className="flex-1 p-2 border border-gray-300 rounded text-sm"
                    placeholder="2-3 Hours"
                  />
                  {activities.length > 1 && (
                    <button
                      onClick={() => removeActivity(activity.id)}
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
            onClick={addActivity}
            className="mt-4 flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
          >
            <Plus size={20} />
            Add Activity
          </button>
        </div>

        {/* Payment Plan */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Payment <span className="text-purple-600">Plan</span>
          </h2>
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Total Amount
                </label>
                <input
                  type="text"
                  value={payment.totalAmount}
                  onChange={(e) =>
                    setPayment({ ...payment, totalAmount: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg text-lg font-bold"
                  placeholder="₹ 90,000"
                />
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  TCS
                </label>
                <input
                  type="text"
                  value={payment.tcs}
                  onChange={(e) =>
                    setPayment({ ...payment, tcs: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Not Collected"
                />
              </div>
            </div>

            <h3 className="text-lg font-bold mb-3">Installments</h3>
            <div className="bg-purple-900 text-white grid grid-cols-3 gap-4 p-4 rounded-t-lg font-bold">
              <div>Installment</div>
              <div>Amount</div>
              <div>Due Date</div>
            </div>
            {payment.installments.map((inst, index) => (
              <div
                key={inst.id}
                className="grid grid-cols-3 gap-4 p-4 bg-purple-50 border-b border-purple-100 items-center"
              >
                <div className="font-semibold">Installment {index + 1}</div>
                <input
                  type="text"
                  value={inst.amount}
                  onChange={(e) =>
                    updateInstallment(inst.id, "amount", e.target.value)
                  }
                  className="p-2 border border-gray-300 rounded"
                  placeholder="₹50,000"
                />
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={inst.dueDate}
                    onChange={(e) =>
                      updateInstallment(inst.id, "dueDate", e.target.value)
                    }
                    className="flex-1 p-2 border border-gray-300 rounded"
                    placeholder="Initial Payment"
                  />
                  {payment.installments.length > 1 && (
                    <button
                      onClick={() => removeInstallment(inst.id)}
                      className="text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </div>
            ))}
            <button
              onClick={addInstallment}
              className="mt-4 flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
            >
              <Plus size={20} />
              Add Installment
            </button>
          </div>
        </div>

        {/* Inclusions & Exclusions */}
        <div className="mb-8">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Inclusions</h2>
              <textarea
                value={inclusions}
                onChange={(e) => setInclusions(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg"
                rows="8"
                placeholder="Enter inclusions (one per line)"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Exclusions</h2>
              <textarea
                value={exclusions}
                onChange={(e) => setExclusions(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg"
                rows="8"
                placeholder="Enter exclusions (one per line)"
              />
            </div>
          </div>
        </div>

        {/* Generate PDF Button */}
        <div className="flex justify-center mt-12 mb-8">
          <button
            onClick={generatePDF}
            className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white px-12 py-5 rounded-2xl text-xl font-bold hover:from-purple-700 hover:to-purple-900 transition shadow-2xl transform hover:scale-105"
          >
            <Download size={28} />
            GENERATE PDF ITINERARY
          </button>
        </div>

        {/* Footer note */}
        <div className="text-center text-sm text-gray-500 mt-8 pb-8">
          <p className="font-semibold">PLAN.PACK.GO!</p>
          <p className="mt-2">
            All data will be used to generate a professional PDF itinerary
            matching the Figma design
          </p>
        </div>
      </div>
    </div>
  );
};

export default ItineraryBuilder;
