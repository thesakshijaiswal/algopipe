import { useState } from "react";
import { useStore } from "./store";
import { Modal } from "./components/Modal";

export const SubmitButton = () => {
  const { nodes, edges } = useStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: "" });

  const handleSubmit = async () => {
    try {
      const pipelineData = { nodes, edges };
      console.log("Sending pipeline data:", pipelineData);

      if (nodes.length === 0) {
        setModalContent({
          title: "Submission Error",
          body: "⚠️ No pipeline found. Please create at least one node before submitting.",
        });
        setModalOpen(true);
        return;
      }

      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pipelineData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Backend response:", result);

      let body = `Number of Nodes: ${result.num_nodes}\n`;
      body += `Number of Edges: ${result.num_edges}\n`;
      body += `Is Valid DAG: ${result.is_dag ? "Yes" : "No"}\n\n`;
      body += result.is_dag
        ? "✅ Great! Your pipeline forms a valid Directed Acyclic Graph."
        : "⚠️ Warning: Your pipeline contains cycles and is not a valid DAG.";

      setModalContent({ title: "Pipeline Analysis Results", body });
      setModalOpen(true);
    } catch (error) {
      console.error("Error submitting pipeline:", error);
      setModalContent({
        title: "Submission Error",
        body: `Failed to submit pipeline. Make sure the backend is running.\n\nDetails: ${error.message}`,
      });
      setModalOpen(true);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalContent.title}
      >
        <pre className="whitespace-pre-wrap">{modalContent.body}</pre>
      </Modal>
    </>
  );
};
