import { useContext } from "react";
import { Outlet } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

import "./index.css";
import {
  AppContext,
  Container,
  Sidebar,
  Spinner,
} from "@/components/Index";

function App() {
  const { progress, setProgress, loading } = useContext(AppContext);
  return (
    <>
      <LoadingBar
        color="#3F51B5"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        shadow="true"
        className="pb-1"
      />

      <Container>
        <div className="sm:mx-20 my-4">
          <div className="grid grid-4 gap-4 sm:grid-cols-12">
            <Sidebar />
            {loading && <Spinner />}
            <div className="sm:col-span-8 col-span-10 overscroll-y-auto">
              <Outlet />
            </div>
            <div className="hidden sm:block sm:col-span-2">who to follow</div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default App;
