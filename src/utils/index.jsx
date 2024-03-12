import { Home, BellDot, Mails, Bot } from "lucide-react";

export const sidebarItems = [
  {
    _id: 1,
    title: "Home",
    icon: <Home />,
    path: "",
  },
  {
    _id: 2,
    title: "Notifications",
    icon: <BellDot />,
    path: "notifications",
  },
  {
    _id: 3,
    title: "Messages",
    icon: <Mails />,
    path: "chat",
  },
  {
    _id: 4,
    title: "Grok",
    icon: <Bot />,
    path: "grok",
  },
];

export const profileRoutes = [
  {
    _id: 1,
    title: "Tweets",
    path: "",
  },
  {
    _id: 2,
    title: "Liked Tweets",
    path: "likedTweets",
  },
  {
    _id: 3,
    title: "Bookmarked Tweets",
    path: "bookmarkedTweets",
  },
];
