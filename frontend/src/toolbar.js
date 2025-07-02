import { MdInput } from "react-icons/md";
import { FaBrain, FaTerminal, FaCodeBranch } from "react-icons/fa";
import { RiText } from "react-icons/ri";
import {
  BsBoxArrowInDown,
  BsCalculator,
  BsCalendar,
  BsBug,
} from "react-icons/bs";
import { DraggableNode } from "./draggableNode";
import { useEffect, useRef } from "react";

const nodeConfig = [
  { type: "Input", label: "Input", icon: MdInput },
  { type: "llm", label: "LLM", icon: FaBrain },
  { type: "Output", label: "Output", icon: BsBoxArrowInDown },
  { type: "text", label: "Text", icon: RiText },
  { type: "API", label: "API Call", icon: FaTerminal },
  { type: "math", label: "Math", icon: BsCalculator },
  { type: "date", label: "Date", icon: BsCalendar },
  { type: "log", label: "Logger", icon: BsBug },
  { type: "cond", label: "Condition", icon: FaCodeBranch },
];

export const PipelineToolbar = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);
  return (
    <div className="p-3">
      <div
        className="mt-5 flex overflow-x-auto whitespace-nowrap gap-3 pb-2"
        ref={scrollRef}
      >
        {nodeConfig.map((node) => (
          <DraggableNode
            key={node.type}
            type={node.type}
            label={node.label}
            icon={node.icon}
          />
        ))}
      </div>
      <div className="rounded-md bg-slate-100 px-4 py-2 text-sm text-slate-900 border border-slate-300 shadow-sm w-full lg:w-2/5 mt-2">
        Tip : Drag and drop the boxes above in order to create a node.
      </div>
    </div>
  );
};
