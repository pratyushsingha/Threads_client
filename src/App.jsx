import { Outlet } from "react-router-dom";
import "./index.css";
import { Container, Sidebar } from "@/components/Index";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Container className="h-screen flex flex-col">
        <div className="flex-1 flex">
          <div className="hidden md:block md:w-1/4 lg:w-1/5 xl:w-1/6 h-full">
            <Sidebar />
          </div>
          <div className="flex-1 flex flex-col overflow-hidden my-3">
            <Header />
            <div className="flex-1 md:w-8/12 overflow-y-auto hide-scrollbar bg-[#181818] rounded-t-3xl">
              <Outlet />
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
