import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const LoggerNode = ({ id }) => {
  const [log, setLog] = useState("System initialized...");

  return (
    <BaseNode
      id={id}
      label="Logger"
      colorTheme="blue"
      className="w-64 text-green-300"
      footerText="Logs incoming data"
      handles={[{ type: "target", position: Position.Left, id: `${id}-input` }]}
    >
      <textarea
        value={log}
        onChange={(e) => setLog(e.target.value)}
        rows={3}
        className=" px-2 py-1 text-xs font-mono bg-black border border-gray-600 rounded resize-none text-green-200"
      />
    </BaseNode>
  );
};
