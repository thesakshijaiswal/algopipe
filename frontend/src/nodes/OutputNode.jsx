import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState(data.outputType || "Text");

  return (
    <BaseNode
      id={id}
      label="Output Node"
      colorTheme="emerald"
      footerText="Awaiting input"
      handles={[
        {
          type: "target",
          position: Position.Left,
          id: `${id}-value`,
          className: "!bg-gradient-to-r !from-emerald-500 !to-teal-600",
        },
      ]}
    >
      <div className="space-y-1">
        <label className="block text-xs font-medium text-gray-700 tracking-wide">
          Node Name
        </label>
        <input
          type="text"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
          className="w-full px-2 py-1.5 bg-white/80 border border-gray-200 rounded-md text-xs placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-200 hover:bg-white hover:border-emerald-300"
          placeholder="Enter output name..."
        />
      </div>

      <div className="space-y-1">
        <label className="block text-xs font-medium text-gray-700 tracking-wide">
          Output Type
        </label>
        <select
          value={outputType}
          onChange={(e) => setOutputType(e.target.value)}
          className="w-full px-2 py-1.5 bg-white/80 border border-gray-200 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-200 hover:bg-white hover:border-emerald-300 cursor-pointer"
        >
          <option value="Text">Text Output</option>
          <option value="File">Image Output</option>
        </select>
      </div>
    </BaseNode>
  );
};
