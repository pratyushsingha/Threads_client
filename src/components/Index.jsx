import { sidebarItems, profileRoutes } from "@/utils/Index";
import { Button } from "./ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster.jsx";
import { ThemeProvider } from "@/context/theme-provider.jsx";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

import Login from "@/pages/auth/Login.jsx";
import App from "@/App";
import Home from "@/pages/Home";
import Register from "@/pages/auth/Register.jsx";
import TweetCard from "@/components/Tweet";
import Spinner from "@/components/loader/Spinner";
import Container from "@/components/Container";
import Sidebar from "@/components/Sidebar";
import CommentCard from "@/components/CommentCard";
import TweetBox from "@/components/TweetBox";
import TweetDetails from "@/pages/TweetDetails";
import Profile from "@/pages/auth/Profile";
import UserDetails from "@/pages/auth/UserDetails";
import InputDiv from "./InputDiv";
import PassStrengthBar from "./PaawordStrengthBar";
import Tweets from "@/pages/Tweets";
import BookmarkedTweets from "@/pages/BookmarkedTweets";

export {
  sidebarItems,
  profileRoutes,
  Button,
  Container,
  Sidebar,
  TweetCard,
  Spinner,
  useToast,
  Home,
  Register,
  Toaster,
  ThemeProvider,
  Login,
  App,
  Label,
  Input,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  CommentCard,
  TweetBox,
  Separator,
  Switch,
  TweetDetails,
  Profile,
  UserDetails,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  InputDiv,
  PassStrengthBar,
  Tweets,
  BookmarkedTweets,
  Checkbox,
};
