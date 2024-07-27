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
    title: "Replies",
    path: "replies",
  },
  {
    _id: 3,
    title: "Reposts",
    path: "reposts",
  },
];

export const homeRoutes = [
  {
    _id: 1,
    title: "For you",
    path: "",
  },
  {
    _id: 2,
    title: "Follwing",
    path: "following",
  },
  {
    _id: 3,
    title: "Liked",
    path: "liked",
  },
  {
    _id: 1,
    title: "Saved",
    path: "saved",
  },
];
