import { useState } from "react";
import { Handle, Position } from "reactflow";

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState(data.outputType || "Text");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <div className="group relative">
      <div className="w-56 bg-white/95 backdrop-blur-sm border-2 border-emerald-200 hover:border-emerald-400 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-transparent to-teal-50 opacity-60"></div>

        <div className="relative z-10 p-3 h-full flex flex-col">
          <div className="flex justify-center mb-2">
            <div className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md hover:shadow-lg transform transition-all duration-200">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse"></div>
                Output Node
              </span>
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-700 tracking-wide">
                Node Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={currName}
                  onChange={handleNameChange}
                  placeholder="Enter output name..."
                  className="w-full px-2 py-1.5 bg-white/80 border border-gray-200 rounded-md text-xs placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-200 hover:bg-white hover:border-emerald-300"
                />
                <div className="absolute inset-0 rounded-md bg-gradient-to-r from-emerald-400/10 to-teal-400/10 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-700 tracking-wide">
                Output Type
              </label>
              <div className="relative">
                <select
                  value={outputType}
                  onChange={handleTypeChange}
                  className="w-full px-2 py-1.5 bg-white/80 border border-gray-200 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-200 hover:bg-white hover:border-emerald-300 cursor-pointer appearance-none"
                >
                  <option value="Text">Text Output</option>
                  <option value="File">Image Output</option>
                </select>

                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-3 h-3 text-gray-400 group-hover:text-emerald-500 transition-colors"
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

          <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
              <span className="text-xs">Awaiting input</span>
            </div>
            <div className="opacity-70 text-xs">
              ID: {id?.slice(-8) || "N/A"}
            </div>
          </div>
        </div>

        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-400/20 to-teal-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-value`}
        className="!w-4 !h-4 !bg-gradient-to-r !from-emerald-500 !to-teal-600 !border-2 !border-white hover:!scale-125 !transition-transform !duration-200 !shadow-lg"
      />

      <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-8 h-0.5 bg-gradient-to-l from-emerald-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};
