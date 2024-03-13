import { useContext, useEffect, useRef, useState } from "react";
import { Edge, Node, useEdgesState, useNodesState } from "reactflow";

import TopbarContext from "../../context/provider";
import Sidebar from "../../components/flowbuilder/flowsidebar";
import { Flow } from "../../components/flowbuilder";

import { Errors } from "../../statics/errors";
import { initialEdges, initialNodes } from "../../statics/constants";
import { debounce, generateUniqueId } from "../../utils/utils";

import "./flow.css";

export default function FlowBuilder() {

  const [activeNode, setActiveNode] = useState<Node | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(initialEdges);
  const childRef = useRef<any>(null);

  const [_topbar, setTopbar] = useContext(TopbarContext);

  useEffect(() => {
    const selectedNode = nodes.find((node: any) => node.selected);
    setActiveNode(selectedNode ?? null);
  }, [nodes, setNodes]);

  const onNodeTextChange = debounce((value: string) => {
    setNodes((nodes: Array<Node>) => {
      return nodes.map((node: Node) => {
        if (activeNode && node.id === activeNode.id) {
          node.data.message = value;
        }
        return node;
      });
    });
  }, 500);
  const layoutCallback = (callback: Function) => {
    callback();
  };

  useEffect(() => {
    setTopbar(setTopbarContent());
  }, []);

  const setTopbarContent = () => {
    return (
      <div className="ml-4 flex items-center md:ml-6">
        <button className="primary_btn" onClick={alignFlow}>
          Align Flow
        </button>
        <button className="primary_btn" onClick={saveFlow}>
          {" "}
          Save flow
        </button>
      </div>
    );
  };

  const alignFlow = () => {
    if (childRef.current) {
      childRef.current.alignFlow();
    }
  };

  const handleSelectedNodes = () => {
    setNodes((nodes: Array<Node>) => {
      return nodes.map((node: Node) => {
        node.selected = false;
        return node;
      });
    });
  };

  const cloneNode = () => {
    if (!activeNode) return;
    const new_node_id = generateUniqueId(5);
    const newNodeY = activeNode.position.y + 100;

    const newNode: any = {
      ...activeNode,
      id: new_node_id,
      data: { ...activeNode.data, id: new_node_id },
      position: { ...activeNode.position, y: newNodeY },
      y: newNodeY,
      selected: false,
    };

    // copy activenode and concat with existing nodes
    setNodes((nodes: any) => nodes.concat(newNode));
  };

  const saveFlow = () => {
    let emptyTargetNodes = 0;
    //check all the nodes are having parent node
    setNodes((nodes: any) => {
      return nodes.map((node: any) => {
        if (
          !node.data.parent_id ||
          (Array.isArray(node.data.parent_id) &&
            node.data.parent_id.length === 0)
        )
          emptyTargetNodes++;
        return node;
      });
    });

    return emptyTargetNodes > 1
      ? childRef.current.triggerToast(Errors.EMPTY, "error")
      : childRef.current.triggerToast("Saved successfully", "success");
  };

  const handleDeleteNode = (nodeId: any) => {
    // Filter out the deleted node
    const filteredNodes = nodes.filter((node) => node.id !== nodeId);

    // Filter out edges connected to the deleted node
    const filteredEdges = edges.filter(
      (edge) => edge.source !== nodeId && edge.target !== nodeId
    );

    // Update state with filtered nodes and edges
    setNodes(filteredNodes);
    setEdges(filteredEdges);
  };

  return (
    <div className="flow_wrapper">
      <Flow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        setNodes={setNodes}
        setEdges={setEdges}
        layoutCallback={layoutCallback}
        parentReferance={childRef}
      />

      <Sidebar
        activeNode={activeNode}
        onNodeTextChange={onNodeTextChange}
        cloneNode={cloneNode}
        handleDeleteNode={handleDeleteNode}
        handleSelectedNodes={handleSelectedNodes}
      />
    </div>
  );
}
