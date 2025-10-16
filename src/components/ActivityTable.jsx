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
  );
};

export default ActivityTable;
