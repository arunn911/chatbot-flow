import { Suspense, lazy } from "react";
import Topbar from "../../components/topbar";
import Loader from "../../components/loader";
// import FlowBuilder from "../flow";
const FlowBuilder = lazy(() => import("../flow"));

const AppLayout = () => {
  return (
    <>
      <div className="header">
        <Topbar />
      </div>
      <div className="content">
        <Suspense fallback={<Loader />}></Suspense>
        <FlowBuilder />
      </div>
    </>
  );
};

export default AppLayout;
