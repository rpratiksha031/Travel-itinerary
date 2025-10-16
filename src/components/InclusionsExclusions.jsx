import React from "react";

const InclusionsExclusions = ({
  inclusions,
  setInclusions,
  exclusions,
  setExclusions,
}) => {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Inclusions</h2>
          <textarea
            value={inclusions}
            onChange={(e) => setInclusions(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg"
            rows="8"
            placeholder="Enter inclusions (one per line)"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Exclusions</h2>
          <textarea
            value={exclusions}
            onChange={(e) => setExclusions(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg"
            rows="8"
            placeholder="Enter exclusions (one per line)"
          />
        </div>
      </div>
    </div>
  );
};

export default InclusionsExclusions;
