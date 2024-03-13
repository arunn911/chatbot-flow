// NodesPanel.js
import { DragEvent, FC } from "react";
import "./nodespanel.css";
import { staticNodes } from "../../../statics/availablenodes";

const NodesPanel: FC = () => {
  const handleDragStart = (
    event: DragEvent<HTMLDivElement>,
    nodeType: string,
    content: string
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("content", content);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div>
      {staticNodes.map((node: any, key: number) => {
        return (
          <div
            className="flow-node"
            draggable
            onDragStart={(event: DragEvent<HTMLDivElement>) =>
              handleDragStart(event, node.type, node.default_value)
            }
            key={key}
          >
            <img src={node.icon} alt="" />
            {node.title}
          </div>
        );
      })}
    </div>
  );
};

export default NodesPanel;
