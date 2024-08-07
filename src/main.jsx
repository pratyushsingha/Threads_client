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
  App,
} from "@/components/Index";
import "./index.css";
import LikedTweets from "./pages/LikedTweets";
import AuthLayout from "./components/AuthLayout";
import { Provider } from "react-redux";
import { store } from "./store/store";
import RepostPage from "./pages/RepostPage";
import RepliedTweetsPage from "./pages/RepliedTweetsPage";
import ErrorPage from "./pages/ErrorPage";
import FeedPage from "./pages/FeedPage";
import SearchPage from "./pages/SearchPage";
import ActivityPage, {
  AllActivities,
  FollowActivities,
  LikeActivities,
  ReplyActivities,
  RepostActivities,
} from "./pages/ActivityPage";
import FollowingTweetPage from "./pages/FollowingTweetPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "/",
            element: <FeedPage />,
          },
          {
            path: "/following",
            element: <FollowingTweetPage />,
          },
          {
            path: "/liked",
            element: <LikedTweets />,
          },
          {
            path: "/saved",
            element: <BookmarkedTweets />,
          },
        ],
      },
      { path: "/search", element: <SearchPage /> },
      {
        path: "/activity",
        element: <ActivityPage />,
        children: [
          {
            path: "/activity/",
            element: <AllActivities />,
          },
          {
            path: "/activity/likes",
            element: <LikeActivities />,
          },
          {
            path: "/activity/follows",
            element: <FollowActivities />,
          },
          {
            path: "/activity/reposts",
            element: <RepostActivities />,
          },
          {
            path: "/activity/replies",
            element: <ReplyActivities />,
          },
        ],
      },
      { path: "/tweet/:id", element: <TweetDetails /> },
      {
        path: "/profile/:username",
        element: <Profile />,
        children: [
          { path: "/profile/:username", element: <Tweets /> },
          { path: "/profile/:username/edit", element: <UserDetails /> },
          { path: "/profile/:username/reposts", element: <RepostPage /> },
          {
            path: "/profile/:username/replies",
            element: <RepliedTweetsPage />,
          },
        ],
      },
      {
        path: "*",
        element: <ErrorPage />,
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
