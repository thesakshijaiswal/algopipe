import { Handle, Position } from "reactflow";

export const LLMNode = ({ id, data }) => {
  return (
    <div className="group relative">
      <div className="w-80 bg-white/95 backdrop-blur-sm border-2 border-blue-200 hover:border-blue-400 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-indigo-50 opacity-60"></div>

        <div className="relative z-10 p-3 h-full flex flex-col">
          <div className="flex items-center justify-center mb-2">
            <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md hover:shadow-lg transform transition-all duration-200">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse"></div>
                LLM Engine
              </span>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-sm font-medium text-gray-700 mb-1">
                Language Model Processor
              </div>
              <div className="text-xs text-gray-500 w-44 mt-">
                Processes system prompts and user input to generate intelligent
                responses
              </div>
            </div>
          </div>

          <div className="absolute left-1 top-10 space-y-8">
            <div className="bg-blue-100 px-2 py-0.5 rounded-r-md text-xs font-medium text-blue-700 shadow-sm">
              System
            </div>
            <div className="bg-indigo-100 px-2 py-0.5 rounded-r-md text-xs font-medium text-indigo-700 shadow-sm">
              Prompt
            </div>
          </div>

          <div className="absolute right-1 top-1/2 transform -translate-y-1/2">
            <div className="bg-green-100 px-2 py-0.5 rounded-l-md text-xs font-medium text-green-700 shadow-sm">
              Response
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-xs">AI Ready</span>
            </div>
            <div className="opacity-70 text-xs">
              ID: {id?.slice(-5) || "N/A"}
            </div>
          </div>
        </div>

        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-system`}
        style={{ top: `${100 / 3}%` }}
        className="!w-3 !h-3 !bg-gradient-to-r !from-blue-500 !to-blue-600 !border-2 !border-white hover:!scale-125 !transition-transform !duration-200 !shadow-md"
      />
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-prompt`}
        style={{ top: `${200 / 3}%` }}
        className="!w-3 !h-3 !bg-gradient-to-r !from-indigo-500 !to-indigo-600 !border-2 border-white hover:!scale-125 !transition-transform !duration-200 !shadow-md"
      />

      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-response`}
        className="!w-4 !h-4 !bg-gradient-to-r !from-green-500 !to-emerald-600 !border-2 !border-white hover:!scale-125 !transition-transform !duration-200 !shadow-lg"
      />

      <div className="absolute -left-2 top-1/3 w-6 h-0.5 bg-gradient-to-l from-blue-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute -left-2 top-2/3 w-6 h-0.5 bg-gradient-to-l from-indigo-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-8 h-0.5 bg-gradient-to-r from-green-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};
