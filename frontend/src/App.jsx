import { useState } from "react";
import { PipelineToolbar } from "./PipelineToolbar";
import { PipelineUI } from "./PipelineUI";
import { Navbar } from "./components/Navbar";

const App = () => {
  const [draggingNodeType, setDraggingNodeType] = useState(null);

  return (
    <div id="app" className="min-h-screen bg-gray-50">
      <Navbar />
      <PipelineToolbar onStartDrag={setDraggingNodeType} />
      <main>
        <PipelineUI
          draggingNodeType={draggingNodeType}
          setDraggingNodeType={setDraggingNodeType}
        />
      </main>
    </div>
  );
};

export default App;
