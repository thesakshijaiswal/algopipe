import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data.inputType || "Text");

  return (
    <BaseNode
      id={id}
      label="Input Node"
      colorTheme="violet"
      footerText="Ready to connect"
      handles={[
        {
          type: "source",
          position: Position.Right,
          id: `${id}-value`,
          className: "!bg-gradient-to-r !from-violet-500 !to-purple-600",
        },
      ]}
    >
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 tracking-wide">
          Node Name
        </label>
        <input
          type="text"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
          className="w-full px-3 py-2.5 bg-white/80 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all duration-200 hover:bg-white hover:border-violet-300"
          placeholder="Enter node name..."
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 tracking-wide">
          Input Type
        </label>
        <select
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
          className="w-full px-3 py-2.5 bg-white/80 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all duration-200 hover:bg-white hover:border-violet-300 cursor-pointer"
        >
          <option value="Text">Text Input</option>
          <option value="File">File Upload</option>
        </select>
      </div>
    </BaseNode>
  );
};
