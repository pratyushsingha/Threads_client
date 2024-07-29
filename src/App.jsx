import { useContext } from "react";
import { Outlet } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

import "./index.css";
import { Container, Sidebar, Spinner } from "@/components/Index";
import Header from "./components/Header";

function App() {
  // const { progress, setProgress, loading } = useContext(AppContext);
  return (
    <>
      <Container className="md:h-screen overflow-hidden">
        <div className="sm:mx-20 my-4 h-full flex">
          <div className="grid grid-cols-4 gap-4 sm:grid-cols-12 w-full h-full">
            <div className="hidden md:block sm:col-span-2 sticky top-0 h-full">
              <Sidebar />
            </div>
            <div className="sm:col-span-8 col-span-10 h-full overflow-y-auto hide-scrollbar">
              <Header />
              <div className="overflow-y-auto hide-scrollbar min-h-screen bg-[#181818] rounded-t-3xl ">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
        <div className="block md:hidden fixed bottom-0 left-0 w-full bg-black z-50">
          <Sidebar />
        </div>
      </Container>
    </>
  );
}

export default App;
