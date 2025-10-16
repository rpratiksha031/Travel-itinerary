import React from "react";
import { Download } from "lucide-react";

const GeneratePDFButton = ({ onGenerate }) => {
  return (
    <div className="flex justify-center mt-12 mb-8">
      <button
        onClick={onGenerate}
        className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white px-12 py-5 rounded-2xl text-xl font-bold hover:from-purple-700 hover:to-purple-900 transition shadow-2xl transform hover:scale-105"
      >
        <Download size={28} />
        GENERATE PDF ITINERARY
      </button>
    </div>
  );
};

export default GeneratePDFButton;
