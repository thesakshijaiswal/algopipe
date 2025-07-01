import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const ConditionNode = ({ id }) => {
  const [condition, setCondition] = useState("x > 10");

  return (
    <BaseNode
      id={id}
      label="Condition Node"
      colorTheme="amber"
      footerText="Conditional Branch"
      handles={[
        { type: "target", position: Position.Left, id: `${id}-input` },
        { type: "source", position: Position.Right, id: `${id}-if` },
        {
          type: "source",
          position: Position.Right,
          id: `${id}-else`,
          style: { top: "70%" },
        },
      ]}
    >
      <div className="space-y-1">
        <label className="text-xs font-medium text-gray-700">Condition</label>
        <input
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          className="w-full px-2 py-1 border border-gray-200 rounded text-xs"
          placeholder="e.g. x > 10"
        />
      </div>
    </BaseNode>
  );
};
