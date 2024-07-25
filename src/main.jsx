import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Home,
  Register,
  Toaster,
  ThemeProvider,
  Login,
  TweetDetails,
  Profile,
  UserDetails,
  Tweets,
  BookmarkedTweets,
} from "@/components/Index";
import "./index.css";
import LikedTweets from "./pages/LikedTweets";
import AuthLayout from "./components/AuthLayout";
import { Provider } from "react-redux";
import { store } from "./store/store";
import CommentDetails from "./pages/CommentDetails";
import RepostPage from "./pages/RepostPage";
import RepliedTweetsPage from "./pages/RepliedTweetsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/tweet/:id", element: <TweetDetails /> },
      {
        path: "/profile/:username",
        element: <Profile />,
        children: [
          { path: "/profile/:username", element: <Tweets /> },
          // {
          //   path: "/profile/:username/bookmarkedTweets",
          //   element: <BookmarkedTweets />,
          // },
          // { path: "/profile/:username/likedTweets", element: <LikedTweets /> },
          { path: "/profile/:username/edit", element: <UserDetails /> },
          { path: "/profile/:username/reposts", element: <RepostPage /> },
          {
            path: "/profile/:username/replies",
            element: <RepliedTweetsPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "profile/:username/reposts",
    element: <RepostPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
