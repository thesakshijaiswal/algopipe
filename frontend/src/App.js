import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./SubmitButton";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;
