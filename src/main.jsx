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
  TweetDetails,
  Profile,
  UserDetails,
  Tweets,
  BookmarkedTweets
} from "@/components/Index";
import "./index.css";
import LikedTweets from "./pages/LikedTweets";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/tweet/:id", element: <TweetDetails /> },
      {
        path: "/profile/:username",
        element: <Profile />,
        children: [
          { path: "/profile/:username/", element: <Tweets /> },
          { path: "/profile/:username/bookmarkedTweets", element: <BookmarkedTweets /> },
          { path: "/profile/:username/likedTweets", element: <LikedTweets /> },
          { path: "/profile/:username/edit", element: <UserDetails /> },
        ],
      },
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
