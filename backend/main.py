from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

def is_dag(nodes: List[Dict], edges: List[Dict]) -> bool:
    """
    Check if the graph formed by nodes and edges is a Directed Acyclic Graph (DAG)
    using DFS-based cycle detection
    """
    # Create adjacency list
    graph = {}
    node_ids = set()
    
    # Initialize graph with all nodes
    for node in nodes:
        node_id = node.get('id')
        if node_id:
            graph[node_id] = []
            node_ids.add(node_id)
    
    # Add edges to adjacency list
    for edge in edges:
        source = edge.get('source')
        target = edge.get('target')
        if source and target and source in graph and target in graph:
            graph[source].append(target)
    
    # DFS-based cycle detection
    # 0 = white (unvisited), 1 = gray (visiting), 2 = black (visited)
    color = {node_id: 0 for node_id in node_ids}
    
    def has_cycle_dfs(node):
        if color[node] == 1: 
            return True
        if color[node] == 2:  
            return False
        
        color[node] = 1  
        
        for neighbor in graph[node]:
            if has_cycle_dfs(neighbor):
                return True
        
        color[node] = 2 
        return False
    
    for node_id in node_ids:
        if color[node_id] == 0:
            if has_cycle_dfs(node_id):
                return False  
    
    return True  

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline_data: PipelineData):
    """
    Parse the pipeline data and return
    - Number of nodes
    - Number of edges  
    - Whether the graph is a DAG
    """
    try:
        nodes = pipeline_data.nodes
        edges = pipeline_data.edges
        
        num_nodes = len(nodes)
        num_edges = len(edges)
        if num_nodes == 0:
            return {
                "num_nodes": 0,
                "num_edges": 0,
                "is_dag": False,
                "error": "No graph submitted."
            }
        is_dag_result = is_dag(nodes, edges)
        
        return {
            "num_nodes": num_nodes,
            "num_edges": num_edges,
            "is_dag": is_dag_result
        }
    
    except Exception as e:
        return {
            "error": f"Error processing pipeline: {str(e)}",
            "num_nodes": 0,
            "num_edges": 0,
            "is_dag": False
        }

# Add this for Render deployment
if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)