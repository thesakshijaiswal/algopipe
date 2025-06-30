import { useState } from "react";
import { Handle, Position } from "reactflow";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <div className="group relative">
      <div className="w-56 bg-white/95 backdrop-blur-sm border-2 border-amber-200 hover:border-amber-400 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-transparent to-orange-50 opacity-60"></div>

        <div className="relative z-10 p-3 h-full flex flex-col">
          <div className="flex justify-center mb-2">
            <div className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md hover:shadow-lg transform transition-all duration-200">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse"></div>
                Text Node
              </span>
            </div>
          </div>

          <div className="flex-1 space-y-1">
            <label className="block text-xs font-medium text-gray-700 tracking-wide">
              Content Text
            </label>
            <div className="relative">
              <textarea
                value={currText}
                onChange={handleTextChange}
                placeholder="Enter your text content..."
                rows={2}
                className="w-full px-2 py-1.5 bg-white/80 border border-gray-200 rounded-md text-xs placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 hover:bg-white hover:border-amber-300 resize-none font-mono"
              />
              <div className="absolute inset-0 rounded-md bg-gradient-to-r from-amber-400/10 to-orange-400/10 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
            </div>
          </div>

          {currText.includes("{{") && (
            <div className="flex items-center gap-1 mt-1">
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
              <span className="text-xs text-purple-600 font-medium">
                Template variables detected
              </span>
            </div>
          )}

          <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
              <span className="text-xs">Content ready</span>
            </div>
            <div className="opacity-70 text-xs">
              ID: {id?.slice(-6) || "N/A"}
            </div>
          </div>
        </div>

        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        className="!w-4 !h-4 !bg-gradient-to-r !from-amber-500 !to-orange-600 !border-2 !border-white hover:!scale-125 !transition-transform !duration-200 !shadow-lg"
      />

      <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-8 h-0.5 bg-gradient-to-r from-amber-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};
