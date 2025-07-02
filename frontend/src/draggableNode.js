export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={`${type} min-w-[80px] h-[60px] flex items-center justify-center 
      flex-col rounded-lg bg-[#1C2536] cursor-grab border-b-violet-600 border-b-4`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      draggable
    >
      <div className="flex flex-col items-center justify-center text-white">
        <span className="text-sm">{label}</span>
      </div>
    </div>
  );
};
