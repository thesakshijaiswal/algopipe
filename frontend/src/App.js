import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <PipelineToolbar />
      <PipelineUI />
    </div>
  );
}

export default App;
