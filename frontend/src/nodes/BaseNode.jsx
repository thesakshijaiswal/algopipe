import { Handle } from "reactflow";

export const BaseNode = ({
  id,
  label,
  colorTheme = "violet",
  handles = [],
  children,
  footerText,
  className = "",
  minHeight = 0,
}) => {
  const borderColor = {
    violet: "border-violet-200 hover:border-violet-400",
    emerald: "border-emerald-200 hover:border-emerald-400",
    blue: "border-blue-200 hover:border-blue-400",
    amber: "border-amber-200 hover:border-amber-400",
  }[colorTheme];

  const bgGradient = {
    violet: "from-violet-50 to-purple-50",
    emerald: "from-emerald-50 to-teal-50",
    blue: "from-blue-50 to-indigo-50",
    amber: "from-amber-50 to-orange-50",
  }[colorTheme];

  const tagColor = {
    violet: "from-violet-500 to-purple-600",
    emerald: "from-emerald-500 to-teal-600",
    blue: "from-blue-500 to-indigo-600",
    amber: "from-amber-500 to-orange-600",
  }[colorTheme];

  const getHoverGradient = () => {
    const gradients = {
      violet: "bg-gradient-to-r from-violet-400/20 to-purple-400/20",
      emerald: "bg-gradient-to-r from-emerald-400/20 to-teal-400/20",
      blue: "bg-gradient-to-r from-blue-400/20 to-indigo-400/20",
      amber: "bg-gradient-to-r from-amber-400/20 to-orange-400/20",
    };
    return gradients[colorTheme];
  };

  const contentHeight = Math.max(minHeight, 200);

  return (
    <div className={`group relative ${className}`}>
      <div
        className={`w-56 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 overflow-hidden ${borderColor}`}
        style={{ minHeight: `${contentHeight}px` }}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br opacity-60 ${bgGradient}`}
        ></div>

        <div
          className="relative z-10 p-4"
          style={{ minHeight: `${contentHeight - 8}px` }}
        >
          <div className="flex justify-center mb-4">
            <div
              className={`px-3 py-1 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md hover:shadow-lg bg-gradient-to-r transform transition-all duration-200 ${tagColor}`}
            >
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse"></div>
                {label}
              </span>
            </div>
          </div>

          <div className="space-y-4">{children}</div>

          {footerText && (
            <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>{footerText}</span>
              </div>
              <div className="opacity-70">ID: {id}</div>
            </div>
          )}
        </div>

        <div
          className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${getHoverGradient()}`}
        ></div>
      </div>

      {handles.map((h, index) => (
        <Handle
          key={`${h.id}-${index}`}
          type={h.type}
          position={h.position}
          id={h.id}
          style={{
            ...h.style,
            position: "absolute",
            zIndex: 10,
            width: 12,
            height: 12,
            borderRadius: "9999px",

            left:
              h.position === "left"
                ? -6
                : h.position === "right"
                  ? "calc(100% - 6px)"
                  : h.style?.left,
            right: h.position === "right" ? -6 : h.style?.right,
          }}
          className={`!border-2 !border-white hover:!scale-110 !transition-transform !duration-200 !shadow-lg ${
            h.className || ""
          }`}
          isConnectable={true}
        />
      ))}
    </div>
  );
};
