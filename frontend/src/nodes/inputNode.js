import { useState } from "react";
import { Handle, Position } from "reactflow";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data.inputType || "Text");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <div className="group relative">
      <div className="w-56 bg-white/95 backdrop-blur-sm border-2 border-violet-200 hover:border-violet-400 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-transparent to-purple-50 opacity-60"></div>

        <div className="relative z-10 p-4">
          <div className="flex justify-center mb-4">
            <div className="px-3 py-1 bg-gradient-to-r from-violet-500 to-purple-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md hover:shadow-lg transform transition-all duration-200">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse"></div>
                Input Node
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 tracking-wide">
                Node Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={currName}
                  onChange={handleNameChange}
                  placeholder="Enter node name..."
                  className="w-full px-3 py-2.5 bg-white/80 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all duration-200 hover:bg-white hover:border-violet-300"
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-400/10 to-purple-400/10 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 tracking-wide">
                Input Type
              </label>
              <div className="relative">
                <select
                  value={inputType}
                  onChange={handleTypeChange}
                  className="w-full px-3 py-2.5 bg-white/80 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all duration-200 hover:bg-white hover:border-violet-300 cursor-pointer appearance-none"
                >
                  <option value="Text">Text Input</option>
                  <option value="File">File Upload</option>
                </select>

                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400 group-hover:text-violet-500 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Ready to connect</span>
            </div>
            <div className="opacity-70">ID: {id?.slice(-7) || "N/A"}</div>
          </div>
        </div>

        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-value`}
        className="!w-4 !h-4 !bg-gradient-to-r !from-violet-500 !to-purple-600 !border-2 !border-white hover:!scale-125 !transition-transform !duration-200 !shadow-lg"
      />

      <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-8 h-0.5 bg-gradient-to-r from-violet-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};
