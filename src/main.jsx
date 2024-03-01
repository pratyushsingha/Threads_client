import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Home,
  Register,
  AppContextProvider,
  Toaster,
  ThemeProvider,
  Login,
  App,
} from "@/components/Index";
import "./index.css";
import TweetDetails from "./pages/TweetDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/tweet/:id", element: <TweetDetails /> },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <AppContextProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AppContextProvider>
  </ThemeProvider>
);
