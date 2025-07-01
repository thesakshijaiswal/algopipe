import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const APICallNode = ({ id }) => {
  const [method, setMethod] = useState("GET");

  return (
    <BaseNode
      id={id}
      label="API Call"
      colorTheme="emerald"
      footerText="Calls external API"
      handles={[
        { type: "target", position: Position.Left, id: `${id}-trigger` },
        { type: "source", position: Position.Right, id: `${id}-response` },
      ]}
    >
      <div className="space-y-2">
        <label className="block text-xs font-medium text-gray-700">
          HTTP Method
        </label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="w-full px-2 py-1 bg-white border border-gray-200 rounded text-xs"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
    </BaseNode>
  );
};
