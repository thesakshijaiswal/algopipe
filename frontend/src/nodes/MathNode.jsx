import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const MathNode = ({ id }) => {
  const [operator, setOperator] = useState("+");

  return (
    <BaseNode
      id={id}
      label="Math Node"
      colorTheme="blue"
      footerText="Math Engine"
      handles={[
        { type: "target", position: Position.Left, id: `${id}-a` },
        {
          type: "target",
          position: Position.Left,
          id: `${id}-b`,
          style: { top: "66%" },
        },
        { type: "source", position: Position.Right, id: `${id}-result` },
      ]}
    >
      <div className="flex items-center gap-2">
        <input
          className="w-1/3 px-2 py-1 border rounded text-xs"
          placeholder="A"
        />
        <select
          className="w-1/3 px-2 py-1 border rounded text-xs"
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
        >
          <option>+</option>
          <option>-</option>
          <option>*</option>
          <option>/</option>
        </select>
        <input
          className="w-1/3 px-2 py-1 border rounded text-xs"
          placeholder="B"
        />
      </div>
    </BaseNode>
  );
};
