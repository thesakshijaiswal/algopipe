import { useState, useRef, useCallback, useMemo, useEffect } from "react";
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

export const PipelineUI = ({ draggingNodeType, setDraggingNodeType }) => {
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

  const getInitNodeData = (nodeID, type) => ({
    id: nodeID,
    nodeType: `${type}`,
  });

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData("application/reactflow")) {
        const appData = JSON.parse(
          event.dataTransfer.getData("application/reactflow")
        );
        const type = appData?.nodeType;

        if (!type) return;

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

  const onTouchEnd = useCallback(
    (event) => {
      if (!draggingNodeType || !reactFlowInstance) return;

      const touch = event.changedTouches?.[0];
      if (!touch) return;

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.project({
        x: touch.clientX - bounds.left,
        y: touch.clientY - bounds.top,
      });

      const nodeID = getNodeID(draggingNodeType);
      const newNode = {
        id: nodeID,
        type: draggingNodeType,
        position,
        data: getInitNodeData(nodeID, draggingNodeType),
      };

      addNode(newNode);
      setDraggingNodeType(null);
    },
    [draggingNodeType, reactFlowInstance, addNode, getNodeID]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);
  useEffect(() => {
    setNodeColors((prevColors) => {
      const updatedColors = new Map(prevColors);
      let hasNew = false;

      nodes.forEach((node) => {
        if (!updatedColors.has(node.id)) {
          const r = Math.floor(Math.random() * 50 + 150);
          const g = Math.floor(Math.random() * 50 + 150);
          const b = Math.floor(Math.random() * 50 + 150);
          updatedColors.set(node.id, `rgb(${r}, ${g}, ${b})`);
          hasNew = true;
        }
      });

      return hasNew ? updatedColors : prevColors;
    });
  }, [nodes]);

  const getNodeColor = (nodeId) => {
    return nodeColors.get(nodeId) || "rgb(200, 200, 200)";
  };

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
    <div
      ref={reactFlowWrapper}
      style={{ width: "100vw", height: "73vh" }}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onTouchEnd={onTouchEnd}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
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
          nodeColor={(node) => getNodeColor(node.id)}
          maskColor="rgba(124, 58, 237, 0.1)"
        />
      </ReactFlow>
    </div>
  );
};
