import { useContext } from "react";
import { Outlet } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

import "./index.css";
import { AppContext } from "@/components/Index";

function App() {
  const { progress, setProgress } = useContext(AppContext);
  return (
    <>
      <LoadingBar
        color="#3F51B5"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        shadow="true"
        className="pb-1"
      />
      <div className="sm:mx-20 my-4">
        <Outlet />
      </div>
    </>
  );
}

export default App;
