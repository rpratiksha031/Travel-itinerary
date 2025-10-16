import React from "react";
import { Plus } from "lucide-react";
import DayCard from "./DayCard";

const DailyItinerary = ({ days, setDays }) => {
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

  return (
    <div className="mb-6 md:mb-8 px-4 md:px-0">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">
        Daily Itinerary
      </h2>
      <div className="space-y-4 md:space-y-6">
        {days.map((day, index) => (
          <DayCard
            key={day.id}
            day={day}
            index={index}
            updateDay={updateDay}
            removeDay={removeDay}
            canRemove={days.length > 1}
          />
        ))}
      </div>
      <button
        onClick={addDay}
        className="flex items-center justify-center gap-2 bg-purple-600 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-lg hover:bg-purple-700 transition font-semibold w-full md:w-auto mt-4 md:mt-6 text-sm md:text-base"
      >
        <Plus className="w-5 h-5" />
        Add Day
      </button>
    </div>
  );
};

export default DailyItinerary;
