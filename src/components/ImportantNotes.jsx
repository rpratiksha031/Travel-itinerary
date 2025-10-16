import React from "react";
import { Plus, Trash2 } from "lucide-react";

const ImportantNotes = ({ importantNotes, setImportantNotes }) => {
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

  return (
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
  );
};

export default ImportantNotes;
