import EditNode from "../settingspanel";
import Nodes from "../nodespanel";

import "./sidebar.css";
const Sidebar = (props: any) => {
  const {
    activeNode,
    onNodeTextChange,
    handleDeleteNode,
    handleSelectedNodes,
    cloneNode,
  } = props;
  return (
    <aside className="sidebar">
      {activeNode ? (
        <EditNode
          onNodeTextChange={onNodeTextChange}
          activeNode={activeNode}
          handleSelectedNodes={handleSelectedNodes}
          cloneNode={cloneNode}
          handleDeleteNode={handleDeleteNode}
        />
      ) : (
        <Nodes />
      )}
    </aside>
  );
};

export default Sidebar;
