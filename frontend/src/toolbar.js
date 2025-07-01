import { DraggableNode } from "./draggableNode";

export const PipelineToolbar = () => {
  return (
    <div style={{ padding: "10px" }}>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <DraggableNode type="Input" label="Input" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="Output" label="Output" />
        <DraggableNode type="text" label="Text" />
        <DraggableNode type="API" label="API Call" />
        <DraggableNode type="math" label="Math" />
        <DraggableNode type="date" label="Date" />
        <DraggableNode type="log" label="Logger" />
        <DraggableNode type="cond" label="Condition" />
      </div>
    </div>
  );
};
