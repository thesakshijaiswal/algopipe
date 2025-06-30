import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const LLMNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      label="LLM Engine"
      colorTheme="blue"
      footerText="AI Ready"
      handles={[
        {
          type: "target",
          position: Position.Left,
          id: `${id}-system`,
          style: { top: "33%" },
          className: "!bg-gradient-to-r !from-blue-500 !to-blue-600",
        },
        {
          type: "target",
          position: Position.Left,
          id: `${id}-prompt`,
          style: { top: "66%" },
          className: "!bg-gradient-to-r !from-indigo-500 !to-indigo-600",
        },
        {
          type: "source",
          position: Position.Right,
          id: `${id}-response`,
          className: "!bg-gradient-to-r !from-green-500 !to-emerald-600",
        },
      ]}
    >
      <div className="text-center">
        <div className="text-sm font-medium text-gray-700 mb-1">
          Language Model Processor
        </div>
        <div className="text-xs text-gray-500 w-44">
          Processes system prompts and user input to generate intelligent
          responses
        </div>
      </div>
    </BaseNode>
  );
};
