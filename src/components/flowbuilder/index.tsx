import {
  DragEvent,
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactFlow, {
  Controls,
  Background,
  BackgroundVariant,
  addEdge,
  ReactFlowProvider,
  Node,
  Edge,
} from "reactflow";
import { ToastContainer, toast } from "react-toastify";
import ELK from "elkjs/lib/elk.bundled.js";

import MessageNode from "./flowcustomnodes/messagenode.tsx";
import { generateUniqueId } from "../../utils/utils.ts";
import { Errors } from "../../statics/errors.ts";
import { toastOptions, elkOptions } from "../../statics/constants.ts";

/* style imports */
import "reactflow/dist/style.css";
import "./flowcustomnodes/customnodes.css";
import "./flowbuilder.css";

const elk = new ELK();

const getLayoutedElements = (nodes: any, edges: Edge, options: any = {}) => {
  const graph: any = {
    id: "root",
    layoutOptions: options,
    children: nodes.map((node: Node) => ({
      ...node,
      targetPosition: "left",
      sourcePosition: "right",

      // Hardcode a width and height for elk to use when layouting.
      width: 150,
      height: 75,
    })),
    edges: edges,
  };

  return elk
    .layout(graph)
    .then((layoutedGraph: any) => ({
      nodes: layoutedGraph.children.map((node: any) => ({
        ...node,
        // React Flow expects a position property on the node instead of `x`
        // and `y` fields.
        position: { x: node.x, y: node.y },
      })),

      edges: layoutedGraph.edges,
    }))
    .catch(console.error);
};

export const Flow = (props: any) => {
  const {
    nodes,
    setNodes,
    onNodesChange,
    edges,
    setEdges,
    onEdgesChange,
    parentReferance,
  } = props;

  const nodeTypes = useMemo(() => ({ messageNode: MessageNode }), [nodes]);

  const reactFlowWrapper: any = useRef(null);

  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  /* share child methods with parent component */
  useImperativeHandle(parentReferance, () => ({
    alignFlow: onLayout,
    triggerToast: triggerToast,
  }));

  useLayoutEffect(() => {
    onLayout();
  }, [reactFlowInstance]);

  const onDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onInit = (reactFlowInstance: any) =>
    setReactFlowInstance(reactFlowInstance);

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();

    const type = event.dataTransfer.getData("application/reactflow");
    const label = event.dataTransfer.getData("content");

    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    const node_id = generateUniqueId(5);
    const newNode: Edge | any = {
      id: node_id,
      type,
      position,
      data: { message: label, id: node_id },
    };
    setNodes((nodes: Array<Node>) => nodes.concat(newNode));
  };

  /* layout the nodes and edges using elk algorithm */
  const onLayout = useCallback(() => {
    getLayoutedElements(nodes, edges, elkOptions).then(
      ({ nodes: layoutedNodes, edges: layoutedEdges }: any) => {
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);

        window.requestAnimationFrame(() => reactFlowInstance?.fitView());
      }
    );
  }, [nodes, edges]);

  const updateNodeElements = (newEdgeConnection: any): void => {
    const { source, target } = newEdgeConnection;
    /* update parent and child ids when new connection is established */
    setNodes((nodes: Array<Node>) => {
      return nodes.map((node: Node) => {
        if (node.id === target) {
          Array.isArray(node.data.parent_id)
            ? node.data.parent_id.push(source)
            : (node.data.parent_id = [source]);
        }
        if (node.id === source) {
          Array.isArray(node.data.child_id)
            ? node.data.child_id.push(target)
            : (node.data.child_id = [target]);
        }
        return node;
      });
    });
  };

  const triggerToast = (message: string, type: string) => {
    switch (type) {
      case "error":
        toast.error(message, toastOptions);
        break;
      case "success":
        toast.success(message, toastOptions);
        break;
      default:
        break;
    }
  };


  const onConnect = useCallback(
    (params: any) => {
      let errorMessage: string | undefined = undefined;
      if (params.source === params.target) {
        errorMessage = Errors.SAME_SOURCE_TARGET;
      }
      setEdges((eds: Array<Edge>) => {
        eds.map((edge: any) => {
          if (edge.source === params.source && edge.target === params.target) {
            errorMessage = Errors.LINKED;
          }
        });
        if (errorMessage) {
          triggerToast(errorMessage, "error");
          return eds;
        }
        updateNodeElements(params);
        return addEdge({ ...params, markerEnd: { type: "arrowclosed" } }, eds);
      });
    },
    [setEdges]
  );

  return (
    <>
      <div className="flow">
        <ReactFlowProvider>
          <div
            className="reactflow-wrapper"
            ref={reactFlowWrapper}
            style={{ height: "100%" }}
          >
            <ReactFlow
              nodes={nodes}
              nodeTypes={nodeTypes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onDragOver={onDragOver}
              onInit={onInit}
              onDrop={onDrop}
            >
              <Background variant={BackgroundVariant.Cross} />
              <Controls />
            </ReactFlow>
          </div>
        </ReactFlowProvider>
      </div>
      <ToastContainer />
    </>
  );
};
