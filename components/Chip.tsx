import React from "react";

interface ChipProps {
  text: string;
}

const Chip: React.FC<ChipProps> = ({ text }) => {
  return (
    <span className="text-xs text-indigo-400 font-semibold bg-indigo-50 rounded px-2 py-1">
      {text}
    </span>
  );
};

export default Chip;
