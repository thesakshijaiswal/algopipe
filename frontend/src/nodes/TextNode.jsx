import { useState, useEffect, useRef } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);
  const extractVariables = (text) => {
    const regex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;
    const matches = new Set();
    let match;
    while ((match = regex.exec(text)) !== null) {
      matches.add(match[1]);
    }
    return Array.from(matches);
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
      textarea.style.width = "100%";
    }

    setVariables(extractVariables(currText));
  }, [currText]);

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
        ...variables.map((variable, index) => ({
          type: "target",
          position: Position.Left,
          id: variable,
          style: {
            top: 40 + index * 24,
            background: "#a855f7",
          },
        })),
      ]}
    >
      <div className="space-y-1">
        <label className="block text-xs font-medium text-gray-700 tracking-wide">
          Content Text
        </label>
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          rows={1}
          className="w-full px-2 py-1.5 bg-white/80 border border-gray-200 rounded-md text-xs placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 hover:bg-white hover:border-amber-300 resize-none font-mono"
          placeholder="Enter your text content..."
        />
      </div>

      {variables.length > 0 && (
        <div className="flex items-center gap-1 mt-1">
          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
          <span className="text-xs text-purple-600 font-medium">
            {variables.length} variable{variables.length > 1 && "s"} detected
          </span>
        </div>
      )}
    </BaseNode>
  );
};
