import { useContext } from "react";
import { Outlet } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

import "./index.css";
import { Container, Sidebar, Spinner } from "@/components/Index";

function App() {
  // const { progress, setProgress, loading } = useContext(AppContext);
  return (
    <>
      <Container className="md:h-screen overflow-hidden">
        <div className="sm:mx-20 my-4 h-full flex">
          <div className="grid grid-cols-4 gap-4 sm:grid-cols-12 w-full h-full">
            <div className="sm:col-span-2 sticky top-0 h-full">
              <Sidebar />
            </div>
            <div className="sm:col-span-8 col-span-10 h-full overflow-y-auto hide-scrollbar">
              
              <Outlet />
            </div>
            <div className="hidden sm:block sm:col-span-2 sticky top-0 h-full">
              who to follow
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default App;
