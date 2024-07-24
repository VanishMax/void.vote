// ~/components/VoteTallyBar.tsx
import React, { useState } from "react";

type VoteTallyBarProps = {
  yes: number;
  no: number;
  abstain: number;
};

const VoteTallyBar: React.FC<VoteTallyBarProps> = ({ yes, no, abstain }) => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const total = yes + no + abstain;

  // Check if total is 0 to avoid division by zero
  const yesPercentage = total === 0 ? 0 : (yes * 100 * 100) / total;
  const noPercentage = total === 0 ? 0 : (no * 100 * 100) / total;
  const abstainPercentage = total === 0 ? 0 : (abstain * 100 * 100) / total;

  const formatVotes = (votes: number) => (votes / 1_000_000).toFixed(6);
  const formatPercentage = (percentage: number) => percentage.toFixed(2);

  return (
    <div className="w-full">
      <div className="relative h-8 flex rounded-full overflow-hidden">
        <div
          className="bg-green-500 h-full"
          style={{ width: `${yesPercentage}%` }}
          onMouseEnter={() => setHoveredSection("yes")}
          onMouseLeave={() => setHoveredSection(null)}
        ></div>
        <div
          className="bg-red-500 h-full"
          style={{ width: `${noPercentage}%` }}
          onMouseEnter={() => setHoveredSection("no")}
          onMouseLeave={() => setHoveredSection(null)}
        ></div>
        <div
          className="bg-slate-500 h-full"
          style={{ width: `${abstainPercentage}%` }}
          onMouseEnter={() => setHoveredSection("abstain")}
          onMouseLeave={() => setHoveredSection(null)}
        ></div>
      </div>
      {hoveredSection && (
        <div className="mt-2 text-center">
          {hoveredSection === "yes" && (
            <span className="text-green-400">
              Yes: {formatVotes(yes)} UM ({formatPercentage(yesPercentage)}%)
            </span>
          )}
          {hoveredSection === "no" && (
            <span className="text-red-400">
              No: {formatVotes(no)} UM ({formatPercentage(noPercentage)}%)
            </span>
          )}
          {hoveredSection === "abstain" && (
            <span className="text-slate-400">
              Abstain: {formatVotes(abstain)} UM (
              {formatPercentage(abstainPercentage)}%)
            </span>
          )}
        </div>
      )}
      {!hoveredSection && (
        <div className="mt-2 text-center text-gray-300">
          Total Votes: {formatVotes(total)} UM | Hover over sections for details
        </div>
      )}
    </div>
  );
};

export default VoteTallyBar;
