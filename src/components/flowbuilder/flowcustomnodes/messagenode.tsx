import { Handle, Position } from "reactflow";

export default function MessageNode({ data, selected }: any) {

  return (
    <>
      <div className={`${selected ? "selected message-node" : "message-node"}`}>
        <div className="message-node-header">
          <b>Send Message</b>
        <img src="/assets/message-icon.svg" className="icon xs"/>
        </div>
        <div className="message-content">
          <p>{data.message}</p>
          {/* <p>{data.id}</p> */}
        </div>
      </div>
      <>
        <Handle type="source" position={Position.Right} />
        <Handle
          type="target"
          position={Position.Left}
          id="a"
          style={{ top: "25%" }}
        />
        <Handle
          type="target"
          position={Position.Left}
          id="b"
          style={{ top: "50%" }}
        />
        <Handle
          type="target"
          position={Position.Left}
          id="c"
          style={{ top: "75%" }}
        />
      </>
    </>
  );
}
