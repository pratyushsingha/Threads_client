import { Home, BellDot, Mails, Bot, BookmarkCheck } from "lucide-react";

export const sidebarItems = [
  {
    _id: 1,
    title: "Home",
    icon: <Home />,
  },
  {
    _id: 2,
    title: "Notifications",
    icon: <BellDot />,
  },
  {
    _id: 3,
    title: "Messages",
    icon: <Mails />,
  },
  {
    _id: 4,
    title: "Grok",
    icon: <Bot />,
  },
  {
    _id: 5,
    title: "Bookmarks",
    icon: <BookmarkCheck />,
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
