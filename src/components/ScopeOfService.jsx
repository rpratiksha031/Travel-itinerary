import React from "react";
import { Plus, Trash2 } from "lucide-react";

const ScopeOfService = ({ scopeOfService, setScopeOfService }) => {
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

  return (
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
  );
};

export default ScopeOfService;
