import React from "react";
import { Plane, Ship, Hotel, Car, Sun } from "lucide-react";

const HeroSection = ({ tripDetails }) => {
  return (
    <div className=" place-items-center bg-gradient-to-r from-blue-500 via-purple-500 to-purple-600 rounded-2xl p-8 mb-8 text-white shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <Plane className="w-8 h-8" />
        <Ship className="w-8 h-8" />
        <Hotel className="w-8 h-8" />
        <Car className="w-8 h-8" />
        <Sun className="w-8 h-8" />
      </div>
      <h2 className="text-5xl font-extrabold mb-3 tracking-tight">
        Hi,{" "}
        <span className="border-b-4 border-yellow-300">
          {tripDetails.userName || "Traveler"}
        </span>{" "}
        👋
      </h2>
      <h3 className="text-4xl font-bold mb-3 drop-shadow-md">
        {tripDetails.destination || "Your Destination"} ✈️ Itinerary
      </h3>
      <p className="text-2xl font-semibold flex items-center gap-2">
        <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm">
          <span className="text-yellow-400">
            🌅 {tripDetails?.days || tripDetails?.duration || "0"} Days
          </span>
        </span>
        <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm">
          <span className="text-cyan-400">
            🌙 {tripDetails?.nights || "0"} Nights
          </span>
        </span>
      </p>
    </div>
  );
};

export default HeroSection;
