import React from "react";
import { Plus, Trash2 } from "lucide-react";

const ActivityTable = ({ activities, setActivities }) => {
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

  return (
    <div className="mb-8 px-4 sm:px-0">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">
        Activity <span className="text-purple-600">Table</span>
      </h2>

      {/* Desktop/Tablet View */}
      <div className="hidden sm:block bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 bg-purple-900 text-white p-3 sm:p-4 font-bold text-xs sm:text-sm">
          <div>City</div>
          <div>Activity</div>
          <div className="hidden sm:block">Type</div>
          <div className="hidden sm:block">Time Required</div>
        </div>
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 p-3 sm:p-4 bg-purple-50 border-b border-purple-100 items-center"
          >
            <input
              type="text"
              value={activity.city}
              onChange={(e) =>
                updateActivity(activity.id, "city", e.target.value)
              }
              className="p-2 border border-gray-300 rounded text-xs sm:text-sm"
              placeholder="Rio De Janeiro"
            />
            <input
              type="text"
              value={activity.activity}
              onChange={(e) =>
                updateActivity(activity.id, "activity", e.target.value)
              }
              className="p-2 border border-gray-300 rounded text-xs sm:text-sm"
              placeholder="Sydney Harbour Cruise"
            />
            <input
              type="text"
              value={activity.type}
              onChange={(e) =>
                updateActivity(activity.id, "type", e.target.value)
              }
              className="hidden sm:block p-2 border border-gray-300 rounded text-xs sm:text-sm"
              placeholder="Nature/Sightseeing"
            />
            <div className="hidden sm:flex gap-2 items-center">
              <input
                type="text"
                value={activity.duration}
                onChange={(e) =>
                  updateActivity(activity.id, "duration", e.target.value)
                }
                className="flex-1 p-2 border border-gray-300 rounded text-xs sm:text-sm"
                placeholder="2-3 Hours"
              />
              {activities.length > 1 && (
                <button
                  onClick={() => removeActivity(activity.id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="bg-white rounded-xl shadow-md border border-gray-200 p-4"
          >
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-purple-900 mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={activity.city}
                  onChange={(e) =>
                    updateActivity(activity.id, "city", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                  placeholder="Rio De Janeiro"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-purple-900 mb-1">
                  Activity
                </label>
                <input
                  type="text"
                  value={activity.activity}
                  onChange={(e) =>
                    updateActivity(activity.id, "activity", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                  placeholder="Sydney Harbour Cruise"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-purple-900 mb-1">
                  Type
                </label>
                <input
                  type="text"
                  value={activity.type}
                  onChange={(e) =>
                    updateActivity(activity.id, "type", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                  placeholder="Nature/Sightseeing"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-purple-900 mb-1">
                  Time Required
                </label>
                <input
                  type="text"
                  value={activity.duration}
                  onChange={(e) =>
                    updateActivity(activity.id, "duration", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                  placeholder="2-3 Hours"
                />
              </div>
              {activities.length > 1 && (
                <button
                  onClick={() => removeActivity(activity.id)}
                  className="w-full flex items-center justify-center gap-2 text-red-500 hover:text-red-700 border border-red-300 rounded-lg py-2 transition"
                >
                  <Trash2 size={18} />
                  <span className="font-semibold text-sm">Remove Activity</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addActivity}
        className="mt-4 w-full sm:w-auto flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-semibold text-sm sm:text-base"
      >
        <Plus size={20} />
        Add Activity
      </button>
    </div>
  );
};

export default ActivityTable;
