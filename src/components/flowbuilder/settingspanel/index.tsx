import { useEffect, useState } from "react";
import "./settingspanel.css";
const SettingsPanel = (props: any) => {
  const {
    activeNode,
    onNodeTextChange,
    handleSelectedNodes,
    cloneNode,
    handleDeleteNode,
  } = props;
  const [text, setText] = useState("");

  useEffect(() => {
    setText(activeNode?.data?.message ?? "");
  }, [activeNode]);
  const handleTextChange = (event: any) => {
    setText(event.target.value);
    onNodeTextChange(event.target.value);
  };

  return (
    <>
      <div className="panel_header">
        <button onClick={handleSelectedNodes}>
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
            />
          </svg>
        </button>
        Message
      </div>

      <div className="node_edit_text_wrapper">
        <label>Text</label>
        <textarea
          className="node_input"
          placeholder="write your message"
          required
          value={text}
          rows={3}
          onChange={handleTextChange}
        />
      </div>
      <div className="panel_footer">
        <button className="secondary_btn" onClick={cloneNode}>
          <img src="/assets/clone-icon.svg" className="icon medium" alt="" />
          Clone Node
        </button>
        <button
          className="critical_btn"
          onClick={() => handleDeleteNode(activeNode.id)}
        >
          <img src="/assets/delete-icon.svg" className="icon medium" />
          Delete Node
        </button>
      </div>
    </>
  );
};

export default SettingsPanel;
