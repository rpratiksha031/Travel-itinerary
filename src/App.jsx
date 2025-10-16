import React, { useState } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import TripOverview from "./components/TripOverview";
import DailyItinerary from "./components/DailyItinerary";
import FlightSummary from "./components/FlightSummary";
import HotelBookings from "./components/HotelBookings";
import ActivityTable from "./components/ActivityTable";
import PaymentPlan from "./components/PaymentPlan";
import InclusionsExclusions from "./components/InclusionsExclusions";
import ImportantNotes from "./components/ImportantNotes";
import ScopeOfService from "./components/ScopeOfService";
import GeneratePDFButton from "./components/GeneratePDFButton";
import { generatePDF } from "./utils/pdfGenerator";

const App = () => {
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

  const handleGeneratePDF = () => {
    generatePDF({
      tripDetails,
      days,
      flights,
      hotels,
      activities,
      payment,
      inclusions,
      exclusions,
      importantNotes,
      scopeOfService,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-8 py-8">
        <HeroSection tripDetails={tripDetails} />

        <TripOverview
          tripDetails={tripDetails}
          setTripDetails={setTripDetails}
        />

        <DailyItinerary days={days} setDays={setDays} />

        <FlightSummary flights={flights} setFlights={setFlights} />

        <HotelBookings hotels={hotels} setHotels={setHotels} />

        <ActivityTable activities={activities} setActivities={setActivities} />

        <PaymentPlan payment={payment} setPayment={setPayment} />

        <InclusionsExclusions
          inclusions={inclusions}
          setInclusions={setInclusions}
          exclusions={exclusions}
          setExclusions={setExclusions}
        />

        <ImportantNotes
          importantNotes={importantNotes}
          setImportantNotes={setImportantNotes}
        />

        <ScopeOfService
          scopeOfService={scopeOfService}
          setScopeOfService={setScopeOfService}
        />

        <GeneratePDFButton onGenerate={handleGeneratePDF} />

        <div className="text-center text-sm text-gray-500 mt-8 pb-8">
          <p className="font-bold text-purple-600">PLAN.PACK.GO!</p>
        </div>
      </div>
    </div>
  );
};

export default App;
