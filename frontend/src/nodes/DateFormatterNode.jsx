import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const DateFormatterNode = ({ id }) => {
  const [format, setFormat] = useState("YYYY-MM-DD");

  return (
    <BaseNode
      id={id}
      label="Date Formatter"
      colorTheme="violet"
      footerText="Formats dates"
      handles={[
        { type: "target", position: Position.Left, id: `${id}-input` },
        { type: "source", position: Position.Right, id: `${id}-output` },
      ]}
    >
      <div className="space-y-2">
        <label className="block text-xs font-medium text-gray-700">
          Format
        </label>
        <input
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className="w-full px-2 py-1 bg-white border border-gray-200 rounded text-xs"
          placeholder="e.g., DD/MM/YYYY"
        />
      </div>
    </BaseNode>
  );
};
