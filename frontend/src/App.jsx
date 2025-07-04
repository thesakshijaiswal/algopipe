import { PipelineToolbar } from "./PipelineToolbar";
import { PipelineUI } from "./PipelineUI";
import { Navbar } from "./components/Navbar";

const App = () => {
  return (
    <div id="app" className="min-h-screen bg-gray-50">
      <Navbar />
      <PipelineToolbar />
      <main>
        <PipelineUI />
      </main>
    </div>
  );
};

export default App;
