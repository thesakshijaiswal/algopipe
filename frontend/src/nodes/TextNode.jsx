import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");

  const hasVariables = currText.includes("{{");

  return (
    <BaseNode
      id={id}
      label="Text Node"
      colorTheme="amber"
      footerText="Content ready"
      handles={[
        {
          type: "source",
          position: Position.Right,
          id: `${id}-output`,
          className: "!bg-gradient-to-r !from-amber-500 !to-orange-600",
        },
      ]}
    >
      <div className="space-y-1">
        <label className="block text-xs font-medium text-gray-700 tracking-wide">
          Content Text
        </label>
        <textarea
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          rows={2}
          className="w-full px-2 py-1.5 bg-white/80 border border-gray-200 rounded-md text-xs placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 hover:bg-white hover:border-amber-300 resize-none font-mono"
          placeholder="Enter your text content..."
        />
      </div>

      {hasVariables && (
        <div className="flex items-center gap-1 mt-1">
          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
          <span className="text-xs text-purple-600 font-medium">
            Template variables detected
          </span>
        </div>
      )}
    </BaseNode>
  );
};
