import React, { useRef } from "react";
import { Trash2, MapPin, Camera } from "lucide-react";

const DayCard = ({ day, index, updateDay, removeDay, canRemove }) => {
  const fileInputRef = useRef(null);

  // Add default values to prevent undefined errors
  if (!day) {
    return null;
  }

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateDay(day.id, "image", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border-2 border-blue-400 mb-6 overflow-hidden">
      <div className="flex">
        <div
          className="bg-purple-900 text-white w-20 flex items-center justify-center text-xl font-bold"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
          }}
        >
          Day {index + 1}
        </div>

        <div className="flex-1 p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1 flex gap-4">
              <div
                className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden flex-shrink-0 cursor-pointer hover:bg-gray-300 transition-colors relative group"
                onClick={handleImageClick}
              >
                {day?.image ? (
                  <>
                    <img
                      src={day.image}
                      alt="Day"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera size={32} className="text-white" />
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                    <MapPin size={32} />
                    <span className="text-xs mt-2">Click to add</span>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              <div className="flex-1">
                <input
                  type="date"
                  value={day?.date || ""}
                  onChange={(e) => updateDay(day.id, "date", e.target.value)}
                  className="text-lg font-bold mb-2 p-2 border border-gray-300 rounded w-full"
                />
                <input
                  type="text"
                  placeholder="Day Title (e.g., Arrival In Singapore & City Exploration)"
                  value={day?.title || ""}
                  onChange={(e) => updateDay(day.id, "title", e.target.value)}
                  className="text-sm p-2 border border-gray-300 rounded w-full"
                />
              </div>
            </div>
            {canRemove && (
              <button
                onClick={() => removeDay(day.id)}
                className="text-red-500 hover:text-red-700 ml-4"
              >
                <Trash2 size={20} />
              </button>
            )}
          </div>

          <div className="ml-36 space-y-4">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full border-2 border-purple-600 bg-white"></div>
                <div className="w-0.5 h-full bg-gray-300"></div>
              </div>
              <div className="flex-1 pb-4">
                <h4 className="font-bold text-gray-900 mb-2">Morning</h4>
                <textarea
                  placeholder="Morning activities..."
                  value={day?.morning || ""}
                  onChange={(e) => updateDay(day.id, "morning", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded text-sm"
                  rows="2"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full border-2 border-purple-600 bg-white"></div>
                <div className="w-0.5 h-full bg-gray-300"></div>
              </div>
              <div className="flex-1 pb-4">
                <h4 className="font-bold text-gray-900 mb-2">Afternoon</h4>
                <textarea
                  placeholder="Afternoon activities..."
                  value={day?.afternoon || ""}
                  onChange={(e) =>
                    updateDay(day.id, "afternoon", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded text-sm"
                  rows="2"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full border-2 border-purple-600 bg-white"></div>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 mb-2">Evening</h4>
                <textarea
                  placeholder="Evening activities..."
                  value={day?.evening || ""}
                  onChange={(e) => updateDay(day.id, "evening", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded text-sm"
                  rows="2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayCard;
