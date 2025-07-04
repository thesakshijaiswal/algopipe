import { useState, useRef, useCallback, useMemo } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import {
  InputNode,
  LLMNode,
  OutputNode,
  TextNode,
  APICallNode,
  MathNode,
  DateFormatterNode,
  LoggerNode,
  ConditionNode,
} from "./nodes";
import "reactflow/dist/style.css";

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  Input: InputNode,
  llm: LLMNode,
  Output: OutputNode,
  text: TextNode,
  API: APICallNode,
  math: MathNode,
  date: DateFormatterNode,
  log: LoggerNode,
  cond: ConditionNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const [nodeColors, setNodeColors] = useState(new Map());
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData("application/reactflow")) {
        const appData = JSON.parse(
          event.dataTransfer.getData("application/reactflow")
        );
        const type = appData?.nodeType;

        if (typeof type === "undefined" || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance, addNode, getNodeID]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const getNodeColor = useCallback(
    (nodeId) => {
      if (nodeColors.has(nodeId)) {
        return nodeColors.get(nodeId);
      }

      const r = Math.floor(Math.random() * 50 + 150);
      const g = Math.floor(Math.random() * 50 + 150);
      const b = Math.floor(Math.random() * 50 + 150);
      const color = `rgb(${r}, ${g}, ${b})`;

      setNodeColors((prev) => new Map(prev.set(nodeId, color)));
      return color;
    },
    [nodeColors]
  );

  const nodeColorMap = useMemo(() => {
    const colorMap = new Map();
    nodes.forEach((node) => {
      if (!colorMap.has(node.id)) {
        colorMap.set(node.id, getNodeColor(node.id));
      }
    });
    return colorMap;
  }, [nodes, getNodeColor]);

  return (
    <>
      <div ref={reactFlowWrapper} style={{ width: "100wv", height: "73vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType="smoothstep"
        >
          <Background color="#aaa" gap={gridSize} />
          <Controls className="flex-col space-y-3 bg-violet-100 p-2" />
          <MiniMap
            className="shadow-lg"
            style={{ backgroundColor: "white" }}
            nodeColor={(node) =>
              nodeColorMap.get(node.id) || getNodeColor(node.id)
            }
            maskColor="rgba(124, 58, 237, 0.1)"
          />
        </ReactFlow>
      </div>
    </>
  );
};
