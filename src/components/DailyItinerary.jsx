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
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Daily Itinerary</h2>
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
      <button
        onClick={addDay}
        className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
      >
        <Plus size={20} />
        Add Day
      </button>
    </div>
  );
};

export default DailyItinerary;
