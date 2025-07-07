export const DraggableNode = ({ type, label, icon: Icon, onStartDrag }) => {
  const handleMouseDown = (event) => {
    const appData = { nodeType: type };
    event.dataTransfer?.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
    event.target.style.cursor = "grabbing";
  };

  const handleTouchStart = () => {
    onStartDrag(type);
  };

  return (
    <div
      className="min-w-[80px] h-[60px] flex items-center justify-center 
      flex-col rounded-lg bg-[#1C2536] cursor-grab border-b-violet-600 border-b-4"
      draggable
      onDragStart={handleMouseDown}
      onDragEnd={(e) => (e.target.style.cursor = "grab")}
      onTouchStart={handleTouchStart}
    >
      <div className="flex flex-col items-center justify-center text-white">
        {Icon && <Icon className="text-xl mb-1" />}
        <span className="text-sm">{label}</span>
      </div>
    </div>
  );
};
